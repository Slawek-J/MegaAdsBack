import { AddRecord } from "../records/add.record";
import { AddEntity } from "../types";
import { pool } from "../utils/db";

const defaultObject = {
  description: "test description",
  lat: 30,
  lon: 89,
  name: "Test",
  price: 300,
  url: "http://www.test.com",
};

afterAll(async () => {
  await pool.end();
});

test("AddRecord.getOne returns data from database for one entry", async () => {
  const ad = await AddRecord.getOne("abc");
  expect(ad).toBeDefined();
  expect(ad?.id).toBe("abc");
  expect(ad?.name).toBe("Test");
});

test("AddRecord.getOne returns null from database for unexisting entry", async () => {
  const ad = await AddRecord.getOne("---");
  expect(ad).toBeNull();
});

test("AddRecord.getAll returns data from database for multiple entries", async () => {
  const ads = await AddRecord.getAll("");
  expect(ads).not.toEqual([]);
  expect(ads[0].id).toBeDefined();
});

test("AddRecord.getAll returns limited data", async () => {
  const ads = await AddRecord.getAll("");
  expect((ads[0] as AddEntity).price).toBeUndefined();
  expect((ads[0] as AddEntity).description).toBeUndefined();
});

test("AddRecord.getAll returns data from database when query starts with a", async () => {
  const ads = await AddRecord.getAll("e");
  expect(ads).not.toEqual([]);
  expect(ads[0].id).toBeDefined();
});

test("AddRecord.getAll returns empty array from database when querying for non existing entry", async () => {
  const ads = await AddRecord.getAll("-------");
  expect(ads).toEqual([]);
});

test("AddRecord.insert returns UUID", async () => {
  const ad = new AddRecord(defaultObject);

  await ad.insert();
  expect(ad.id).toBeDefined();
  expect(ad.id).toHaveLength(36);
  expect(typeof ad.id).toBe("string");
});

test("AddRecord.insert inserts data to database", async () => {
  const ad = new AddRecord(defaultObject);

  await ad.insert();

  const foundAd = await AddRecord.getOne(ad.id);

  expect(foundAd).toBeDefined();
  expect(foundAd).not.toBeNull();
  expect(foundAd?.id).toBe(ad.id);
});
