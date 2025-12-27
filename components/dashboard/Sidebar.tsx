"use client";

import React, { useState } from 'react';
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
  ShieldCheck
} from 'lucide-react';
import { LogoutModal } from '@/components/dashboard/LogoutModal';

export const MENU_ITEMS = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Vehicles', href: '/vehicles', icon: Truck },
  { name: 'Drivers', href: '/drivers', icon: Users },
  { name: 'Maintenance', href: '/maintenance', icon: Wrench },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Live Map', href: '/livemap', icon: MapPin },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <aside className="w-72 bg-gray-950 border-r border-gray-800/60 flex flex-col relative overflow-hidden">
        {/* Subtle Background Glow Effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/10 blur-[100px] pointer-events-none" />

        {/* Branding Area */}
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-900/40">
              <Truck size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-white text-xl font-bold tracking-tight leading-none">
                SIG<span className="text-blue-500">FMS</span>
              </h2>
              
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1.5 mt-2">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                prefetch={false}
                className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 relative ${
                  isActive 
                    ? 'bg-blue-600/10 text-blue-400 shadow-[inset_0_0_20px_rgba(37,99,235,0.05)]' 
                    : 'text-gray-500 hover:text-gray-200 hover:bg-gray-900/50'
                }`}
              >
                <div className="flex items-center gap-3.5 z-10">
                  <Icon size={20} className={`transition-colors duration-300 ${isActive ? 'text-blue-500' : 'group-hover:text-gray-300'}`} />
                  <span className="font-semibold text-sm tracking-wide">{item.name}</span>
                </div>

                {/* Active Indicator Pillar */}
                {isActive && (
                  <div className="absolute right-0 w-1 h-5 bg-blue-500 rounded-l-full shadow-[0_0_15px_rgba(37,99,235,0.8)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Area with System Status */}
        <div className="mt-auto p-4 space-y-4">
          {/* Status Indicator Widget */}
          <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">System Health</span>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-blue-500" />
              <span className="text-xs text-gray-400 font-medium">ICTSU Secured</span>
            </div>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)} 
            className="flex items-center gap-3 px-4 py-3.5 w-full text-gray-500 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all duration-300 group"
          >
            <LogOut size={19} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      <LogoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}