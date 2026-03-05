import pg from "pg";

export type Db = pg.Pool;

export function makeDb(): Db {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("Missing DATABASE_URL");
  return new pg.Pool({ connectionString: url, max: 5 });
}
