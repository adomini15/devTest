'use client';
import React, { useEffect, useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useXBtcTradesRealtime } from '../hooks/useXBtcTradesRealtime';
import { Trade } from '../types/Trade';
import TradeTable from '../components/TradeTable';
import TradeChart from '../components/TradeChart';
import { Button } from '../components/ui/button';
import { populate } from '../actions';
import Loading from '../components/Loading';
import { ScrollArea } from '../components/ui/scroll-area';
import Link from 'next/link';
import { CircleCheck } from 'lucide-react';

let lastUnsynchronizedIncoming = 0;

export default function Page() {
  const [isPending, startTransition] = useTransition();
  const { start, status, stop, terminate, incoming } = useXBtcTradesRealtime();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [upgraded, setUpgraded] = useState(false);

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (incoming) {
      setTrades((oldTrades) => {
        lastUnsynchronizedIncoming += incoming.length;

        return [...incoming, ...oldTrades];
      });
    }
  }, [incoming]);

  const handleSyncLastTrades = () => {
    setUpgraded(false);
    stop();

    startTransition(async () => {
      if (lastUnsynchronizedIncoming > 0) {
        await populate(trades.slice(-lastUnsynchronizedIncoming));
        lastUnsynchronizedIncoming = 0;
      }

      setUpgraded(true);
      start();
    });
  };

  console.log(incoming);

  // if (state == 'idle') {
  //   return <p>Loading</p>;
  // }

  return (
    <div className="text-base">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div>
              Recent Trades <span className="text-slate-400">BTCUSD</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="secondary" size="sm" disabled={isPending} asChild>
                <Link href={'/database'}>Show Database</Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={isPending}
                onClick={handleSyncLastTrades}
              >
                {isPending && <Loading width={20} height={20} className="mr-2" />}
                {!isPending && upgraded && (
                  <CircleCheck width={20} height={20} className="mr-2 text-green-400" />
                )}{' '}
                Sync Changes
              </Button>
            </div>
          </CardTitle>
          <CardDescription>Visualize the upcoming trades in realtime.</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-8">
          <TradeChart className="flex-1" data={trades} />

          <ScrollArea className="max-h-96">
            <TradeTable data={trades}></TradeTable>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
