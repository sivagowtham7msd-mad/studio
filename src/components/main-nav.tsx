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
  <svg
    width="32"
    height="32"
    viewBox="0 0 160 160"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M80 0C35.84 0 0 35.84 0 80s35.84 80 80 80 80-35.84 80-80S124.16 0 80 0zm0 152C39.36 152 8 120.64 8 80S39.36 8 80 8s72 31.36 72 72-31.36 72-72 72z"
      fill="#006400"
    ></path>
    <path
      d="M104.93,121.2a55.5,55.5,0,0,1-49.86,0L48,136.8l-1.42-3.11L48,136.8,42.4,124,36.8,111.2,31.2,98.4,25.6,85.6,22.4,72.8,20.8,60,20.8,47.2,22.4,34.4l3.2,12.8,4.8,12.8,6.4,12.8,6.4,12.8,8,12.8,6.4-3.2,4.8-11.2,1.6-4.8c1.6-4.8,3.2-9.6,3.2-14.4s-1.6-9.6-3.2-14.4l-1.6-4.8-4.8-11.2-6.4-3.2L52,28l4.8-11.2,8-8,8-4.8,11.2,3.2,11.2-3.2,8,4.8,8,8,4.8,11.2-3.2,3.2-6.4,3.2-4.8,11.2-1.6,4.8c-1.6,4.8-3.2,9.6-3.2,14.4s1.6,9.6,3.2,14.4l1.6,4.8,4.8,11.2,6.4,3.2,8-12.8,6.4-12.8,6.4-12.8,4.8-12.8,3.2-12.8L137.6,34.4l1.6,12.8,1.6,12.8-1.6,12.8-6.4,12.8-4.8,12.8-6.4,12.8-6.4,12.8-5.6,12.8Z"
      fill="#FFD700"
    ></path>
    <text
      x="80"
      y="22"
      textAnchor="middle"
      fontSize="14"
      fill="#006400"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      transform="rotate(-52.5 44 26.5)"
    >
      GOVERNMENT
    </text>
    <text
      x="80"
      y="22"
      textAnchor="middle"
      fontSize="14"
      fill="#006400"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      transform="rotate(-20 59 21)"
    >
      OF
    </text>
    <text
      x="80"
      y="22"
      textAnchor="middle"
      fontSize="14"
      fill="#006400"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      transform="rotate(20 102 21)"
    >
      TAMIL
    </text>
    <text
      x="80"
      y="22"
      textAnchor="middle"
      fontSize="14"
      fill="#006400"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      transform="rotate(52.5 116 26.5)"
    >
      NADU
    </text>
    <path
      d="M62.4,103.2h35.2v9.6H62.4Z"
      fill="#FF9933"
      transform="translate(0, 10)"
    ></path>
    <path
      d="M62.4,112.8h35.2v9.6H62.4Z"
      fill="#FFFFFF"
      transform="translate(0, 10)"
    ></path>
    <path
      d="M62.4,122.4h35.2v9.6H62.4Z"
      fill="#138808"
      transform="translate(0, 10)"
    ></path>
    <circle cx="70.4" cy="117.6" r="3.2" fill="#000080" transform="translate(0, 10)"></circle>
    <circle cx="89.6" cy="117.6" r="3.2" fill="#000080" transform="translate(0, 10)"></circle>
    <path
      d="M80,88a5.6,5.6,0,0,0-5.6,5.6,2,2,0,0,1-4,0,9.6,9.6,0,0,1,19.2,0,2,2,0,0,1-4,0A5.6,5.6,0,0,0,80,88Z"
      fill="#DC143C"
    ></path>
    <path
      d="M80,96a3.2,3.2,0,1,0-3.2-3.2A3.2,3.2,0,0,0,80,96Zm0-4.8a1.6,1.6,0,1,1-1.6,1.6A1.6,1.6,0,0,1,80,91.2Z"
      fill="#DC143C"
    ></path>
_     <path
      d="M80,105.6a1,1,0,0,0,1-1V96a1,1,0,1,0-2,0v8.6A1,1,0,0,0,80,105.6Z"
      fill="#DC143C"
    ></path>
    <path
      d="M86.4,104a.8.8,0,0,0-.8-.8H74.4a.8.8,0,0,0,0,1.6h11.2A.8.8,0,0,0,86.4,104Z"
      fill="#DC143C"
    ></path>
    <path
      d="M80,108.8a12,12,0,1,0-12-12A12,12,0,0,0,80,108.8Zm0-22.4a10.4,10.4,0,1,1-10.4,10.4A10.4,10.4,0,0,1,80,86.4Z"
      fill="#DC143C"
    ></path>
    <path
      d="M80,84.8a1,1,0,0,0,1-1V76a1,1,0,0,0-2,0v7.8A1,1,0,0,0,80,84.8Z"
      fill="#DC143C"
    ></path>
    <path
      d="M90.5,89.5a1,1,0,0,0,.7-.3l5.5-5.5a1,1,0,0,0-1.4-1.4l-5.5,5.5a1,1,0,0,0,0,1.4A1,1,0,0,0,90.5,89.5Z"
      fill="#DC143C"
    ></path>
    <path
      d="M69.5,89.5a1,1,0,0,0,.7.3,1,1,0,0,0,.7-1.7l-5.5-5.5a1,1,0,0,0-1.4,1.4l5.5,5.5A1,1,0,0,0,69.5,89.5Z"
      fill="#DC143C"
    ></path>
    <text
      x="80"
      y="142"
      textAnchor="middle"
      fontSize="10"
      fill="#006400"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
    >
      TRUTH ALONE TRIUMPHS
    </text>
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
