'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mountain } from 'lucide-react';
import { TamilNaduLogo } from './tamil-nadu-logo';

export function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 4000); // 4-second splash screen

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-8 bg-background overflow-hidden">
      <div className="animate-in fade-in-0 zoom-in-75 duration-1500">
        <TamilNaduLogo size={128} />
      </div>
      <div className="flex items-center gap-4 font-headline text-5xl font-bold text-primary animate-in fade-in-0 slide-in-from-bottom-10 delay-500 duration-1500">
        <Mountain className="h-12 w-12" />
        <span>CivicConnect</span>
      </div>
    </div>
  );
}
