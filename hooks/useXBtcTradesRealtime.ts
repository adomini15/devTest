import { useEffect, useRef, useState } from "react"
import { Trade } from "../types/Trade";
import { WorkerMessageT } from "../types/WorkerMessage";
import { TradeWorkConfigT } from "../types/TradeWorkConfigT";

export const useXBtcTradesRealtime = () => {
    const workerRef = useRef<Worker>();
    const [status, setStatus] = useState<'running' | 'stopped' | 'terminated'>('stopped');
    const [trades, setTrades] = useState<Trade[]>([]);

    useEffect(() => {   
        workerRef.current = new Worker(new URL("../worker.ts", import.meta.url));

        workerRef.current.onmessage = ({ data: { data }}) => {
            let newTrades: Trade[] = [];

            if (data) {
                newTrades = data.map(({ grossValue,
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
            
            setTrades(newTrades)
        }

        workerRef.current.onerror = (error) => {
            console.error('Worker error:', error.message)
        }

        return () => {
            if (workerRef.current) {
                workerRef.current.terminate()
            }
        }
        
    }, []);

    const start = () => {
        setStatus('running')
    
        const workerMessage: WorkerMessageT<TradeWorkConfigT> = {
          type: 'init',
          payload: {
            data: {
              subscribe: 'trade'
            },
          },
        }

        if (workerRef.current) {
          workerRef.current.postMessage(workerMessage)
        }
    }


    const stop = () => {
        setStatus('stopped')
        const workerMessage: WorkerMessageT<TradeWorkConfigT> = {
          type: 'stop',
        }
        if (workerRef.current) {
          workerRef.current.postMessage(workerMessage)
        }
    }

    const terminate = () => {
        setStatus('terminated');
        const workerMessage: WorkerMessageT<TradeWorkConfigT> = {
            type: 'stop',
        }

        if (workerRef.current) {
            workerRef.current.postMessage(workerMessage)
            workerRef.current.terminate()
        }
    }


    return {
        incoming: trades,
        status,
        terminate,
        start,
        stop
    }
}