import { useEffect, useState } from "react"
import { Trade } from "../types/Trade";

const socket = new WebSocket('wss://ws.bitmex.com/realtime?subscribe=trade');

export const useXBtcTradesRealtime = () => {

    const [state, setState] = useState<'ready' | 'idle'>('idle');

    const subscribe = (callback: (newTrades: Trade[]) => void) => {
        socket.onmessage = function ({ data }: any) {
            const result = JSON.parse(data).data;
            let trades: Trade[] = [];

            if (result) {
                trades = result.map(({ grossValue,
                    price,
                    side,
                    size,
                    symbol,
                    tickDirection,
                    timestamp }) => {
                    const trade: Trade = {
                        grossValue,
                        price,
                        side: side.toLowerCase(),
                        size,
                        symbol,
                        tickDirection,
                        timestamp
                    }

                    return trade;
                });
            }


            callback(trades)
        };
    }

    const unsubscribe = () => {
        socket.close();
    }

    useEffect(() => {
        socket.onopen = function () {

            setState('ready')
        };

    }, []);

    return {
        state,
        subscribe,
        unsubscribe
    }
}