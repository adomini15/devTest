import { sqliteTable, AnySQLiteColumn, integer, text } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const trades = sqliteTable("trades", {
	id: integer("id").primaryKey().notNull(),
	timestamp: integer("timestamp"),
	side: text("side"),
	size: integer("size").notNull(),
	price: integer("price"),
	symbol: text("symbol"),
	gross_value: integer("gross_value"),
	tick_direction: text("tick_direction").notNull(),
});