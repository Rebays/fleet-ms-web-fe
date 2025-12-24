"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Truck, 
  Users, 
  Wrench, 
  FileText, 
  MapPin, 
  Settings, 
  LogOut,
  AlertCircle
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const menuItems = useMemo(() => [
    { name: 'Overview', href: '/', icon: LayoutDashboard },
    { name: 'Vehicles', href: '/vehicles', icon: Truck },
    { name: 'Drivers', href: '/drivers', icon: Users },
    { name: 'Maintenance', href: '/maintenance', icon: Wrench },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Live Map', href: '/livemap', icon: MapPin },
    { name: 'Settings', href: '/settings', icon: Settings },
  ], []);

  // useMemo ensures currentTitle only recalculates when pathname actually settles
  const currentTitle = useMemo(() => {
    const item = menuItems.find(m => m.href === pathname);
    if (item) return item.name;
    
    // Fallback for sub-routes (e.g., /vehicles/123)
    const partialMatch = menuItems.find(m => m.href !== '/' && pathname.startsWith(m.href));
    return partialMatch ? partialMatch.name : 'Overview';
  }, [pathname, menuItems]);

  // Updates the Browser Tab Title
  useEffect(() => {
    document.title = `${currentTitle} | FleetMS`;
  }, [currentTitle]);

  const handleLogout = () => {
    console.log("Logged out");
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-black">
      {/* --- Sidebar --- */}
      <aside className="w-64 bg-gray-950 border-r border-gray-800 flex flex-col">
        <div className="p-6">
          <h2 className="text-white text-xl font-bold tracking-tight">
            Fleet<span className="text-blue-500">MS</span>
          </h2>
          <p className="text-gray-500 text-xs mt-1">Solomon Islands Gov</p>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-600/10 text-blue-500' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-900'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={() => setIsLogoutModalOpen(true)}
            className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-red-400 transition-colors group"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 bg-gray-900 overflow-auto relative">
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-8 bg-gray-900/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-white font-semibold text-lg">{currentTitle}</h1>
            <div className="h-4 w-1px bg-gray-800 mx-2" />
            <div className="text-gray-400 text-[10px] font-medium uppercase tracking-widest">
              System Status: <span className="text-green-500 ml-1">● Online</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 border border-blue-400/20 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-blue-900/20">
              B
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>

      {/* --- Logout Confirmation Modal --- */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-950 border border-gray-800 w-full max-w-sm rounded-xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-red-500 mb-4">
              <AlertCircle size={24} />
              <h3 className="text-lg font-semibold text-white">Confirm Sign Out</h3>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Are you sure you want to sign out of the Fleet Management System?
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-900 text-gray-300 hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}