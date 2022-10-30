import { FieldPacket } from "mysql2";
import { AddEntity, NewAddEntity, SimpleAddEntity } from "../types";
import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";
import { v4 as uuid } from "uuid";

type AddRecordResult = [AddEntity[], FieldPacket[]];

export class AddRecord implements AddEntity {
  public id: string;
  public name: string;
  public description: string;
  public price: number;
  public url: string;
  public lat: number;
  public lon: number;

  constructor(obj: NewAddEntity) {
    if (obj.name === "" || obj.name.length > 100) {
      throw new ValidationError(
        "Ad's name cannot be empty or have more than 100 characters."
      );
    }

    if (obj.description.length > 1000) {
      throw new ValidationError(
        "Ad's description cannot be longer than 1000 characters."
      );
    }

    if (obj.price < 0 || obj.price > 9999999) {
      throw new ValidationError(
        "Ad's price cannot be less than 0 or higher than 9999999."
      );
    }

    if (obj.url === "" || obj.url.length > 100) {
      throw new ValidationError(
        "Ad's link cannot be empty or have more than 100 characters."
      );
    }

    if (typeof obj.lat !== "number" || typeof obj.lon !== "number") {
      throw new ValidationError("Add cannot be localized.");
    }

    if (obj.id != null) {
      this.id = obj.id;
    }

    this.name = obj.name;
    this.description = obj.description;
    this.lat = obj.lat;
    this.lon = obj.lon;
    this.price = obj.price;
    this.url = obj.url;
  }

  static async getOne(id: string): Promise<AddRecord | null> {
    const [results] = (await pool.execute(
      "SELECT * FROM `ads` WHERE id = :id",
      {
        id,
      }
    )) as AddRecordResult;

    return results.length === 0 ? null : new AddRecord(results[0]);
  }

  static async getAll(name: string): Promise<SimpleAddEntity[]> {
    const [results] = (await pool.execute(
      "SELECT * FROM `ads` WHERE `name` LIKE :search",
      { search: `%${name}%` }
    )) as AddRecordResult;
    return results.map((result) => {
      const { id, lat, lon } = result;
      return { id, lat, lon };
    });
  }

  async insert(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!this.id) {
      this.id = uuid();
    } else {
      throw new Error("Record is already inserted in database");
    }

    await pool.execute(
      "INSERT INTO `ads`(`id`, `name`, `description`, `price`, `url`, `lat`, `lon`) VALUEs(:id, :name, :description, :price, :url, :lat, :lon)",
      this
    );
  }
}
