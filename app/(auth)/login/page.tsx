"use client";

import { Suspense } from "react"; // Required for Build
import { Info, ShieldCheck } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm"; // Import your new component

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          SIG FMS | Portal Signin
        </h2>
        <p className="text-sm text-gray-500">
          Use your official <span className="text-blue-400">@solomons.gov.sb</span> credentials
        </p>
      </div>

      {/* THE FIX: Wrapping the form in Suspense */}
      <Suspense fallback={<div className="text-gray-500 text-xs text-center">Loading portal...</div>}>
        <LoginForm />
      </Suspense>

      {/* Notices Section */}
      <div className="space-y-3">
        {/* ... your notice divs stay here ... */}
        <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-[11px] leading-relaxed text-gray-400">
            <strong className="text-gray-300">Authorization Notice:</strong> You may be verified but unauthorised to log into the SIG FMS.
          </p>
        </div>
      </div>
    </div>
  );
}