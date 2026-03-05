import bcrypt from "bcryptjs";
import "dotenv/config";
import { makeDb } from "./lib/db";

const db = makeDb();

const email = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
const password = (process.env.ADMIN_PASSWORD || "").trim();

if (!email) throw new Error("Missing ADMIN_EMAIL");
if (!password || password.length < 10) throw new Error("ADMIN_PASSWORD must be 10+ chars");

const { rows } = await db.query("select id from admin_users where email = $1 limit 1", [email]);
if (rows[0]) {
  console.log("Admin already exists");
  process.exit(0);
}

const hash = await bcrypt.hash(password, 12);
await db.query("insert into admin_users (email, password_hash, access_level) values ($1, $2, $3)", [email, hash, "admin"]);
console.log("Seeded admin:", email);
process.exit(0);
