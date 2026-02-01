import "dotenv/config";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

// Create a pg Pool using the connection string from .env
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Create a Drizzle DB instance
export const db = drizzle(pool);
export { pool };
