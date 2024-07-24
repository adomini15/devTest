import { TradeWorkConfigT } from "./types/TradeWorkConfigT";
import {  WorkerMessageT } from "./types/WorkerMessage"

let pricesWs: WebSocket | null = null;

self.onmessage = (e) => {
    const BASE_URL = 'wss://ws.bitmex.com/realtime';

    switch (e.data.type) {
        case 'init':
            const message: WorkerMessageT<TradeWorkConfigT> = e.data;

            pricesWs = new WebSocket(`${BASE_URL}?subscribe=${message.payload.data.subscribe}`);

            const initSubscription = () => {
                pricesWs?.addEventListener('message', function (event) {
                    self.postMessage(JSON.parse(event.data))
                })
            }

            initSubscription()

            break

        case 'stop':
        
            if (pricesWs) {
                console.log('Closing WebSocket connection...', pricesWs)
                pricesWs.close()
                pricesWs = null
            }
            break
          
        case 'error':
            if (pricesWs) {
                pricesWs.close()
                pricesWs = null 
            }
         
            break
          
        default:
            console.error('Unhandled message type:', e.data.type)
    }
}