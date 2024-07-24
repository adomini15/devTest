'use client';
import { Trade, TradeMovement } from '../types/Trade';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { CalendarClock, PackageOpen, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { capitalize, formatDate } from '../lib/utils';
import { Badge } from './ui/badge';

const columns: ColumnDef<Trade>[] = [
  {
    id: 'price',
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const price: number = parseFloat(row.getValue('price'));
      const side: TradeMovement = row.getValue('side');

      const sides = {
        buy: {
          className: 'text-green-400',
          icon: <TrendingUpIcon className="mr-2 inline-block h-4" />,
        },
        sell: {
          className: 'text-red-400',
          icon: <TrendingDownIcon className="mr-2 inline-block h-4" />,
        },
      };

      return (
        <div className={`${sides[side].className} font-medium`}>
          {sides[side].icon}
          {price}
        </div>
      );
    },
  },
  {
    id: 'size',
    accessorKey: 'size',
    header: 'Size',
    cell: ({ row }) => {
      const size: number = parseInt(row.getValue('size'));

      return (
        <div>
          <PackageOpen className="mr-2 inline-block h-4" />
          {size}
        </div>
      );
    },
  },
  {
    id: 'timestamp',
    accessorKey: 'timestamp',
    header: 'Date',
    cell: ({ row }) => {
      const date: string = formatDate(row.getValue('timestamp'));

      return (
        <div className="text-sm">
          <CalendarClock className="mr-2 inline-block h-4" />
          {date}
        </div>
      );
    },
  },
  {
    id: 'side',
    accessorKey: 'side',
    header: 'Side',
    cell: ({ row }) => {
      const side: TradeMovement = row.getValue('side');

      return (
        <Badge variant="outline" className="font-semibold">
          {capitalize(side)}
        </Badge>
      );
    },
  },
];

type TradeTableProps = {
  data: Trade[];
};

const TradeTable = ({ data }: TradeTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const side: TradeMovement = row.getValue('side');

              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TradeTable;
