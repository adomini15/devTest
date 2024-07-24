'use server';

import { like, or } from "drizzle-orm";
import { db } from "../db";
import { tradesTable } from "../db/schema";
import { Trade } from "../types/Trade";

export async function search(query: string) {
    const trades = await db.select().from(tradesTable).where(or(
        ...['symbol','price','size','grossValue'].map((name) => {
            return like(tradesTable[name], `%${query}%`)
        })
    ));

    return trades.map(({timestamp, ...props}) => {
        return {
            ...props,
            timestamp: timestamp.toISOString()
        }
    })
}

export async function populate(trades: Trade[]) {
    await db.insert(tradesTable).values(trades.map(trade => {
        return {...trade, timestamp: new Date(trade.timestamp)}
    }));
}