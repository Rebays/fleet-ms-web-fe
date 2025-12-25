// app/(dashboard)/layout.tsx
import React from 'react';
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { authRelay } from "@/better-auth/auth-server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";



export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  console.log(`[DASHBOARD LAYOUT] - Fires | ${new Date().toISOString()}`);
  
  const h = await headers();

  const cookieHeader = h.get("cookie") || "";
  console.log(`cookie: ${cookieHeader}`)
  const decodedCookie = decodeURIComponent(cookieHeader!);
  console.log(`decoded cookie: ${decodedCookie}`)


  // The session check call
  const session  = await authRelay.getSession({
    fetchOptions: {
      headers: { 
        "cookie": decodedCookie, // pass the decoded cookie.
      },
      signal: AbortSignal.timeout(5000),
      onRequest: () => {
        console.log(`[DASHBOARD LAYOUT] - authRelay calling Auth Server...`);
      },
    }
  });

  // 1. Check if the session is MISSING
  if (!session.data?.session.token) {
    console.log(`[AUTH] - session is ${session.data?.session.token}`)
    // send to route
    redirect("/api/auth/clear-session?reason=missing");
  } 

  // 2. Check if the session is EXPIRED
  const expiresAt = new Date(session.data.session.expiresAt);
  const now = new Date();

  if (expiresAt < now) {
    console.log(`[AUTH] - Token exists but expired at ${expiresAt.toISOString()}. Clearing...`);
  
    // We send them to the same "Janitor" route to wipe the cookie
    redirect("/api/auth/clear-session?reason=expired");
  }

  // 3. SUCCESS: Session exists and is still fresh
  console.log(`[AUTH] - Session active for: ${session.data.user.email}`);

  
  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <main className="flex-1 bg-gray-900 overflow-auto relative">
        <DashboardHeader userInitials={'U'} />
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}