import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";

export const client = new Client({
  connectionString: process.env.Database_URL as string,
});

client.connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("DB connection error:", err));

const db = drizzle(client, { schema, logger: true });

export default db; // ✅ This is crucial for import db from "../Drizzle/db" to work
