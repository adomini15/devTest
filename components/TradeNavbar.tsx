import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import Link from 'next/link';
import { Database, House } from 'lucide-react';

const items = [
  {
    Icon: () => <House className="mr-1 h-4 w-4" />,
    href: '/',
    label: 'Home',
  },
  {
    Icon: () => <Database className="mr-1 h-4 w-4" />,
    href: '/database',
    label: 'Database',
  },
];

function TradeNavbar() {
  return (
    <Breadcrumb className="px-8 py-4">
      <BreadcrumbList>
        {items.map(({ Icon, href, label }) => (
          <>
            <BreadcrumbItem>
              <Icon />
              <BreadcrumbLink asChild>
                <Link href={href}>{label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default TradeNavbar;
