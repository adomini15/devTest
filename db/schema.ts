import {   integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const tradesTable = sqliteTable('trades', {
    id: integer('id').primaryKey(),
    timestamp: integer('timestamp', { mode:'timestamp'}).notNull(),
    side: text('side').$type<"sell" | "buy">().notNull(),
    size: integer('size').default(0),
    price: integer('price', { mode:'number'}).default(0),
    symbol: text('symbol').notNull(),
    grossValue: integer('gross_value', { mode:'number'}).default(0),
    tickDirection: text('tick_direction').notNull(),
   
});


export type InsertTrade = typeof tradesTable.$inferInsert;
export type SelectTrade = typeof tradesTable.$inferSelect;