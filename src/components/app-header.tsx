'use client';
import * as React from 'react';
import {
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from './ui/button';
import { UserCircle, ShoppingCart } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';

function AppHeaderContent() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <div className="flex items-center gap-2">
         <SidebarTrigger className="md:hidden" />
      </div>

      <Tabs defaultValue="people" className="hidden md:block">
        <TabsList>
          <TabsTrigger value="people">For People</TabsTrigger>
          <TabsTrigger value="saviours">For Saviours</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="ml-auto flex items-center gap-4">
        <Link href="/orders/123-abc">
            <Button variant="ghost" size="icon" className="rounded-full">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Shopping Cart</span>
            </Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <UserCircle className="h-6 w-6" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/profile">Profile</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/orders/123-abc">My Orders</Link></DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}


export function AppHeader() {
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? <AppHeaderContent /> : null;
}
