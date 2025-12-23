"use client";

import { useState } from "react";
import { authRelay } from "@/better-auth/auth-server"; 
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, ShieldAlert, Info, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const fullEmail = email.includes("@") ? email : `${email}@solomons.gov.sb`;

    await authRelay.signIn.email({
      email: fullEmail,
      password,
      callbackURL: "/assets",
    }, {
      onRequest: () => setIsLoading(true),
      onError: (ctx) => {
        setError(ctx.error.message || "Invalid credentials");
        setIsLoading(false);
      },
      onSuccess: () => {
        router.push("/assets");
        router.refresh();
      }
    });
  };

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

      <form onSubmit={handleLogin} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <p className="text-xs text-red-500 font-medium">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
              Domain Username / Email
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-900/40 border border-gray-800 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-gray-700"
              placeholder="username@solomons.gov.sb"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-900/40 border border-gray-800 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-gray-700"
              placeholder="••••••••••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full group relative flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-lg text-sm font-semibold transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Sign in
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </form>

      {/* Notices Section */}
      <div className="space-y-3">
        {/* Authorization Notice */}
        <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-[11px] leading-relaxed text-gray-400">
            <strong className="text-gray-300">Authorization Notice:</strong> You may be verified but unauthorised to log into the SIG FMS. To request access, please notify the system administrator.
          </p>
        </div>

        {/* ICTSU Support Notice */}
        <div className="p-3 bg-gray-900/20 border border-gray-800/50 rounded-lg flex items-start gap-3">
          <Info className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <p className="text-[11px] leading-relaxed text-gray-500">
              <span className="text-gray-400 font-medium">Account issues?</span> Contact the <strong className="text-gray-400">ICTSU Helpdesk</strong> to reset your official domain credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}