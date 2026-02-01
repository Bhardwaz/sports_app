import { sql } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

// Match status enum (DB enum: match_status)
export const matchStatus = pgEnum("match_status", [
  "scheduled",
  "live",
  "finished",
]);

// matches table
export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  sport: text("sport").notNull(),
  homeTeam: text("home_team").notNull(),
  awayTeam: text("away_team").notNull(),
  status: matchStatus("status").notNull().default("scheduled"),
  startTime: timestamp("start_time", { mode: "data" }),
  endTime: timestamp("end_time", { mode: "date" }),
  homeScore: integer("home_score").notNull().default(0),
  awayScore: integer("away_score").notNull().default(0),
  createdAt: timestamp("created_at", { mode: "utc" }).notNull().default(sql`now()`),
});

// commentary table
export const commentary = pgTable("commentary", {
  id: serial("id").primaryKey(),
  matchId: integer("match_id").references(() => matches.id, { onDelete: "cascade" }).notNull(),
  minute: integer("minute"),
  sequence: integer("sequence"),
  period: text("period"),
  eventType: text("event_type"),
  actor: text("actor"),
  team: text("team"),
  message: text("message").notNull(),
  metadata: jsonb("metadata"),
  tags: jsonb("tags"), // flexible array of tags (stored as JSONB)
  createdAt: timestamp("created_at", { mode: "utc" }).notNull().default(sql`now()`),
});
