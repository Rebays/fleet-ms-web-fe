// app/(dashboard)/layout.tsx
import React from 'react';
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { authRelay } from "@/better-auth/auth-server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // 1. SESSION CHECK (The Gatekeeper)
  const h = await headers();
  const session = await authRelay.getSession({
    fetchOptions: {
      headers: { "cookie": h.get("cookie") || "" },
      signal: AbortSignal.timeout(5000),
    }
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-black">
      {/* 2. Sidebar (Client Component for interactivity) */}
      <Sidebar />

      <main className="flex-1 bg-gray-900 overflow-auto relative">
        {/* 3. Header (Client Component for dynamic titles) */}
        <DashboardHeader userInitials={'U'} />
        
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}