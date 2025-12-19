'use client';

import * as React from 'react';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { AppHeader } from '@/components/app-header';
import { MainNav } from '@/components/main-nav';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  // Use cookie to determine default state
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    const sidebarState = document.cookie
      .split('; ')
      .find(row => row.startsWith('sidebar_state='))
      ?.split('=')[1];
    if (sidebarState) {
      setOpen(sidebarState === 'true');
    }
  }, []);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <Sidebar>
        <MainNav />
      </Sidebar>
      <SidebarInset>
        <AppHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
