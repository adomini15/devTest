'use client';
import React, { useEffect, useState, useTransition } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Trade } from '../../types/Trade';
import { search } from '../../actions';
import TradeTable from '../../components/TradeTable';

export default function Page() {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState('');
  const [trades, setTrades] = useState([]);

  const handleSearch = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    startTransition(async () => {
      const matches: Trade[] = await search(input);

      setTrades(matches);
    });
  }, [input]);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div>Recent Trades</div>
        </CardTitle>
        <CardDescription>Start searching any data into the database.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Input type="search" className="w-full" value={input} onChange={handleSearch} />

        <TradeTable data={trades} />
      </CardContent>
    </Card>
  );
}
