"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, ArrowRight, ShieldAlert, Clock } from "lucide-react";
import { signInAction } from "@/app/actions/signin";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { GithubSignInButton } from "./GithubSignInButton";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(signInAction, null);
  const searchParams = useSearchParams();
  
  // NEW LOGIC: Distinguish between inactivity and general session expiry
  const isTimedOut = searchParams.get("session") === "timeout";
  const LoggedOut = searchParams.get("session") === "logout";
  const isRemoved = searchParams.get("session") === "removed";
  const isExpired = searchParams.get("session") === "expired";
  const authServiceDown = searchParams.get("error") === "auth_service_down";

  return (
    <form action={formAction} className="space-y-4">
      
      {/* IMPROVED ALERT: Handles both cases with specific messaging */}
      {isTimedOut && (
        <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <Clock className="w-4 h-4 text-amber-500" />
          <p className="text-xs text-amber-500 font-medium">
            You were logged out due to inactivity.  
          </p>
        </div>
      )}

      {LoggedOut && (
        <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <Clock className="w-4 h-4 text-amber-500" />
          <p className="text-xs text-amber-500 font-medium">
            You logged out. Sign in again.
          </p>
        </div>
      )}

      {isRemoved && (
        <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <Clock className="w-4 h-4 text-amber-500" />
          <p className="text-xs text-amber-500 font-medium">
            You have been kicked out. Try signing in again.
          </p>
        </div>
      )}

      {isExpired && (
        <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <Clock className="w-4 h-4 text-amber-500" />
          <p className="text-xs text-amber-500 font-medium">
            Your session has expired. Sign in again.
          </p>
        </div>
      )}

      {authServiceDown && (
        <div className="flex items-center gap-2 p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
          <ShieldAlert className="w-4 h-4 text-red-500" />
          <p className="text-xs text-red-500 font-medium">
            Oops! Sorry for the untimely boot. The auth service
            went down unexpectedly so we could not continually verify your session.
            We apologize for the inconvenience. Try again later.
          </p>
        </div>
      )}

      {/* Auth Error Messaging */}
      {state?.error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
          <ShieldAlert className="w-4 h-4 text-red-500" />
          <p className="text-xs text-red-500 font-medium">{state.error}</p>
        </div>
      )}

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
      <GoogleSignInButton />
      <GithubSignInButton/>
    </form>
  );
}