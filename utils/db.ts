import { createPool } from "mysql2/promise";

export const pool = createPool({
  database: "mega-ads",
  host: "localhost",
  user: "root",
  namedPlaceholders: true,
  decimalNumbers: true,
});
