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
    width="48"
    height="48"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
  >
    <defs>
      <path
        id="text-path"
        d="M 50,100 A 50,50 0 1 1 150,100"
        transform="translate(0, -5)"
      ></path>
    </defs>
    <g stroke="none" fill="none">
      <circle cx="100" cy="100" r="95" fill="#000" />
      <circle cx="100" cy="100" r="90" fill="#E1C468" />
      <circle cx="100" cy="100" r="88" fill="#000" />

      <text
        fill="#E1C468"
        fontSize="22"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
      >
        <textPath href="#text-path" startOffset="18%" textAnchor="middle">
          TAMIL NADU POLICE
        </textPath>
      </text>

      <path
        d="M 100 45 L 140 100 L 60 100 Z"
        fill="none"
        stroke="#E1C468"
        strokeWidth="2"
      />
      <path
        d="M65,100 h70 v-5 h-70z M65,90 h70 v-5 h-70z M65,80 h70 v-5 h-70z M65,70 h70 v-5 h-70z M65,60 h70 v-5 h-70z"
        fill="none"
        stroke="#E1C468"
        strokeWidth="1.5"
      />
      <path d="M100 42 l-2 -5 l4 0 z" fill="#E1C468" />
      <path
        d="M90 42 h20 v-3 h-20 v3 M92 39 h16 v-2 h-16 v2 M94 37 h12 v-2 h-12 v2 M96 35 h8 v-2 h-8 v2"
        fill="#E1C468"
      />

      <g transform="translate(78, 98) scale(0.25)">
        <path
          d="M128.9,81.3c-2.3-4.9-3.7-10.4-3.7-16.3c0-11.4,4.2-22,11.2-30.2c-7.4-4.2-16-6.8-25.2-6.8c-28.5,0-51.7,23.2-51.7,51.7
          c0,8.2,1.9,16,5.3,22.9C36.2,96.8,16.5,96,16.5,96v15.2h10.9c0.2,0,0.5,0,0.8,0c21.4,0,40.1,11.2,50.7,28.2
          c9.9-17,28.7-28.2,50.7-28.2c0.2,0,0.3,0,0.5,0h10.9V96C140.9,96,131.7,90.4,128.9,81.3z M65.2,109.8c-2.6-2.1-5.8-3.3-9.2-3.3
          c-3.4,0-6.7,1.2-9.2,3.3c-1.8-1-3.4-2.2-4.9-3.4c8-6.5,19-6.5,27.1,0C70.3,106.9,67.1,108.9,65.2,109.8z M56,65
          c0-12.7,10.3-23,23-23s23,10.3,23,23s-10.3,23-23,23S56,77.7,56,65z M107.5,106.4c-2.3-1.4-4.8-2.2-7.5-2.2c-2.7,0-5.2,0.8-7.5,2.2
          c-1.9-0.8-3.6-1.8-5.2-2.9c8-6.5,19-6.5,27.1,0C110.1,105.1,108.8,105.9,107.5,106.4z"
          fill="#E1C468"
        />
      </g>
      <rect x="65" y="125" width="70" height="15" fill="#FF9933" />
      <rect x="65" y="140" width="70" height="15" fill="#FFFFFF" />
      <rect x="65" y="155" width="70" height="15" fill="#138808" />
      <circle cx="100" cy="147.5" r="5" fill="#000080" />

      <path
        d="M40 170 C 60 185, 140 185, 160 170 L 140 200 L 60 200 Z"
        fill="#C53030"
      />
      <path
        d="M45 172 C 60 184, 140 184, 155 172 L 140 195 L 65 195 Z"
        fill="none"
        stroke="#E1C468"
        strokeWidth="2"
      />
      <text
        x="100"
        y="186"
        textAnchor="middle"
        fill="#E1C468"
        fontSize="14"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
      >
        TRUTH ALONE TRIUMPHS
      </text>

      <path d="M50 110 h-15 v40 h15z M150 110 h15 v40 h-15z" fill="#E1C468" />
      <path
        d="M48 110 h-10 v38 h10z M152 110 h10 v38 h-10z"
        fill="#000"
        strokeWidth="0.5"
        stroke="#E1C468"
      />
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
            tooltip="Our Partners"
          >
            <Link href="/saviours">
              <Handshake />
              <span>Our Partners</span>
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
