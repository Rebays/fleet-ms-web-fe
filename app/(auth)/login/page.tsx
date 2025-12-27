"use client";

import { Suspense } from "react";
import { Info, ShieldCheck } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="h-full flex flex-col justify-center animate-in fade-in zoom-in-95 duration-700 overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-900/10 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-sm mx-auto space-y-6 relative z-10">
        {/* Header Section (Logo Removed) */}
        <div className="space-y-1 text-center sm:text-left">
         
          <div className="h-px w-full bg-linear-to-r from-gray-800 via-gray-700 to-transparent my-3" />
          <h3 className="text-lg font-semibold text-gray-200 tracking-tight">
            SIG FMS | Portal Signin
          </h3>
          <p className="text-xs text-gray-500">
            Use your official <span className="text-blue-400 font-medium">@solomons.gov.sb</span> credentials
          </p>
        </div>

        {/* Form Container with Glass Effect */}
        <div className="bg-gray-900/40 backdrop-blur-md border border-gray-800 p-1 rounded-2xl shadow-2xl">
          <Suspense fallback={
            <div className="py-8 flex flex-col items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <div className="text-gray-500 text-[10px] font-medium uppercase tracking-widest">Loading portal...</div>
            </div>
          }>
            <LoginForm />
          </Suspense>
        </div>

        {/* Notices Section (Tightened Spacing) */}
        <div className="space-y-2">
          <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl flex items-start gap-3 transition-colors hover:bg-blue-500/10">
            <ShieldCheck className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <p className="text-[10px] leading-relaxed text-gray-400 ">
              <strong className="text-gray-200">Authorization Notice:</strong> You may be verified but unauthorised to log into the SIG FMS.
            </p>
          </div>

          <div className="p-3 bg-gray-900/40 border border-gray-800/50 rounded-xl flex items-start gap-3 transition-colors hover:bg-gray-800/80">
            <Info className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-[10px] leading-relaxed text-gray-500">
                <span className="text-gray-400 font-medium">Account issues?</span> Contact the <strong className="text-gray-300">ICTSU Helpdesk</strong> for credential resets.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Brand Label */}
        {/* <div className="pt-2 text-center">
          <p className="text-[9px] uppercase tracking-[0.4em] font-black text-gray-600">
            ICTSU Secure Access Gateway
          </p>
        </div> */}
      </div>
    </div>
  );
}