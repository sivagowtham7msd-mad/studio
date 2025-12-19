'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { Separator } from '@/components/ui/separator';
import {
  Briefcase,
  LayoutDashboard,
  Pill,
  ShoppingCart,
  Stethoscope,
  User,
  Handshake,
} from 'lucide-react';

const TamilNaduLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" className="h-8 w-8 text-primary">
        <path fill="#8B4513" d="M256 16C123.6 16 16 123.6 16 256s107.6 240 240 240 240-107.6 240-240S388.4 16 256 16zm0 432c-106.1 0-192-85.9-192-192S149.9 64 256 64s192 85.9 192 192-85.9 192-192 192z"/>
        <path fill="#FF9933" d="M256 128v256c-70.7 0-128-57.3-128-128s57.3-128 128-128z"/>
        <path fill="#FFFFFF" d="M256 128v256c35.3 0 68.3-14.3 92.5-37.5S384 301.3 384 256s-14.3-68.3-37.5-92.5S291.3 128 256 128z"/>
        <path fill="#138808" d="M256 128v256c70.7 0 128-57.3 128-128S326.7 128 256 128z"/>
        <g fill="#000080">
            <path d="M256 244h-12v24h12c6.6 0 12-5.4 12-12s-5.4-12-12-12z"/>
            <circle cx="256" cy="256" r="12"/>
        </g>
    </svg>
);


export function MainNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <TamilNaduLogo />
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isActive('/dashboard')}
            tooltip="Dashboard"
          >
            <Link href="/dashboard">
              <LayoutDashboard />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
         <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isActive('/saviours')}
            tooltip="Our Saviours"
          >
            <Link href="/saviours">
              <Handshake />
              <span>Our Saviours</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isActive('/doctors')}
            tooltip="Book a Doctor"
          >
            <Link href="/doctors">
              <Stethoscope />
              <span>Book a Doctor</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isActive('/medicines')}
            tooltip="Order Medicines"
          >
            <Link href="/medicines">
              <Pill />
              <span>Order Medicines</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isActive('/groceries')}
            tooltip="Order Groceries"
          >
            <Link href="/groceries">
              <ShoppingCart />
              <span>Order Groceries</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isActive('/jobs')}
            tooltip="Job Finder"
          >
            <Link href="/jobs">
              <Briefcase />
              <span>Job Finder</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarFooter>
        <Separator className="my-2" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/profile')} tooltip="Profile">
              <Link href="/profile">
                <User />
                <span>My Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
