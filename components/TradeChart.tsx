'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart';

import { TrendingDown, TrendingUp } from 'lucide-react';
import { Trade } from '../types/Trade';

const chartConfig = {
  sell: {
    label: 'Sell',
    color: 'hsl(var(--chart-1))',
    icon: TrendingUp,
  },
  buy: {
    label: 'Buy',
    color: 'hsl(var(--chart-2))',
    icon: TrendingDown,
  },
} satisfies ChartConfig;

export type TradeChartData = {
  time: string;
  sell: number;
  buy: number;
};

type TradeChartProps = {
  data: Trade[];
  className?: string;
};

export default function TradesChart({ data, className }: TradeChartProps) {
  const tradeChartData = React.useMemo(() => {
    const tradesGroup: Record<string, TradeChartData> = data.reduce(
      (tradesGroup, { side, size, timestamp }) => {
        const time: string = Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }).format(new Date(timestamp));

        let data: TradeChartData = { time, buy: 0, sell: 0 };

        if (timestamp in tradesGroup) {
          const oldSideValue: number = tradesGroup[timestamp][side];
          data = { ...tradesGroup[timestamp], [side]: oldSideValue + size };
        } else {
          data[side] = size;
        }

        return {
          ...tradesGroup,
          [time]: data,
        };
      },
      {},
    );

    return Object.values(tradesGroup).slice(25);
  }, [data]);

  return (
    <Card className={`${className}`}>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Linear Chart</CardTitle>
          <CardDescription>Evaluate points and size</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <LineChart data={tradeChartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return value;
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return value;
                  }}
                  indicator="dot"
                />
              }
            />
            <Line
              dataKey="buy"
              type="linear"
              strokeWidth={2}
              stroke="var(--color-buy)"
              dot={true}
            />
            <Line
              dataKey="sell"
              type="linear"
              strokeWidth={2}
              stroke="var(--color-sell)"
              dot={true}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
