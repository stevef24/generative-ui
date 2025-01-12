import { sql } from "drizzle-orm";
import { text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const benefits = pgTable("benefits", {
	id: text("id").primaryKey().notNull(),
	title: text("title").notNull(),
	description: text("description").notNull(),
	icon: text("icon").notNull(),
	category: text("category").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Benefit = typeof benefits.$inferSelect;
export type NewBenefit = typeof benefits.$inferInsert;
