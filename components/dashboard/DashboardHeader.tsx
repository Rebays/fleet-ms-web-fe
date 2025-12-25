// components/dashboard/DashboardHeader.tsx
"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { MENU_ITEMS } from './Sidebar';

export function DashboardHeader({ userInitials }: { userInitials: string }) {
  const pathname = usePathname();
  
  const title = MENU_ITEMS.find(m => m.href === pathname)?.name || 
               MENU_ITEMS.find(m => m.href !== '/' && pathname.startsWith(m.href))?.name || 
               'Overview';

  useEffect(() => {
    document.title = `${title} | FleetMS`;
  }, [title]);

  return (
    <header className="h-16 border-b border-gray-800 flex items-center justify-between px-8 bg-gray-900/50 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-white font-semibold text-lg">{title}</h1>
        <div className="h-4 w-1px bg-gray-800 mx-2" />
        <div className="text-gray-400 text-[10px] font-medium uppercase tracking-widest">
          System Status: <span className="text-green-500 ml-1">● Online</span>
        </div>
      </div>
      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-lg">
        {userInitials}
      </div>
    </header>
  );
}