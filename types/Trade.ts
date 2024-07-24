export type TradeMovement = 'buy' | 'sell';

export interface Trade {
    timestamp: string;
    side: TradeMovement;
    size: number;
    price: number;
    symbol: string;
    grossValue: number;
    tickDirection: string;
}