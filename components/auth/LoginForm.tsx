"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, ArrowRight, ShieldAlert, Info, ShieldCheck, Clock } from "lucide-react";
import { signInAction } from "@/app/actions/signin";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(signInAction, null);
  const searchParams = useSearchParams();
  
  // Checks for both ?error=expired and ?session=expired
  const sessionError = searchParams.get("error") === "expired" || searchParams.get("session") === "expired";

  return (
    <form action={formAction} className="space-y-4">
      {sessionError && (
        <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <Clock className="w-4 h-4 text-amber-500" />
          <p className="text-xs text-amber-500 font-medium">
            Your session has timed out. Please sign in again.
          </p>
        </div>
      )}

      {state?.error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
          <ShieldAlert className="w-4 h-4 text-red-500" />
          <p className="text-xs text-red-500 font-medium">{state.error}</p>
        </div>
      )}

      {/* ... Rest of your input fields and button ... */}
      <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
              Domain Username / Email
            </label>
            <input
              name="email"
              type="text"
              required
              className="w-full bg-gray-900/40 border border-gray-800 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-gray-700"
              placeholder="username@solomons.gov.sb"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full bg-gray-900/40 border border-gray-800 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-gray-700"
              placeholder="••••••••••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full group relative flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-lg text-sm font-semibold transition-all disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Sign in
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
    </form>
  );
}