// app/(dashboard)/layout.tsx
import React from 'react';
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { authRelay } from "@/better-auth/auth-client";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { IdleTimer } from '@/components/auth/IdleTimer';



export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  console.log(`[DASHBOARD LAYOUT] - Fires | ${new Date().toISOString()}`);
  
  const h = await headers();
  const cookieHeader = h.get("cookie") || "";
  const decodedCookie = decodeURIComponent(cookieHeader!);

  let sessionRemoved = false;
  let sessionExpired = false;

  try {

    const {data: session, error}  = await authRelay.getSession({
      fetchOptions: {
        headers: { 
          "cookie": decodedCookie, // pass the decoded cookie.
        },
        signal: AbortSignal.timeout(5000),
        onRequest: () => {
          console.log(`[DASHBOARD LAYOUT] - authRelay calling Auth Server...`);
        },
        onSuccess: (ctx) => {
          const jwt = ctx.response.headers.get('set-auth-jwt')
          console.log(`[DASHBOARD LAYOUT] - JWT token`)
          console.log(`[DASHBOARD LAYOUT] - ${jwt}`)
        }
      }
    });

    if(error){
      console.log(error.message)
      console.log('BERYY')
    }

    sessionRemoved = !session?.session;
    if(!sessionRemoved){
      const expiresAt = new Date(session!.session.expiresAt);
      const now = new Date();
      if (expiresAt < now)
        sessionExpired = true;
    }

    
  } catch (error) {
    console.log(`[DASHBOARD LAYOUT] - could not contact auth server. Redirecting to auth-server-down route to delete cookie in the browser.`)
    redirect("/api/auth/auth-server-down?error=auth_service_down");
  }
  
  if(sessionRemoved)
    redirect("/api/auth/clear-session?session=removed");

  if(sessionExpired)
    redirect("/api/auth/clear-session?session=expired");
  
  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <main className="flex-1 bg-gray-900 overflow-auto relative">
        <DashboardHeader userInitials={'U'} />
        <div className="p-8">
          {children}
        </div>
      </main>

      <IdleTimer /> {/* Sitting silently in the background */}
    </div>
  );
}