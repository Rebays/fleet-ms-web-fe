"use client";

import { useState } from "react";
import { authClient } from "@/better-auth/auth-client"; // Adjust path to your client instance
import { useRouter } from "next/navigation";

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

    const { data, error: authError } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/assets", // Where to go after successful login
    }, {
      onRequest: () => setIsLoading(true),
      onError: (ctx) => {
        setError(ctx.error.message || "Invalid credentials");
        setIsLoading(false);
      },
      onSuccess: () => {
        router.push("/assets");
        router.refresh(); // Refresh to update the server-side session state
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">Sign In</h2>
        <p className="text-gray-400 text-sm">Enter your SIG credentials to access the FMS.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {error && (
          <div className="p-3 text-sm bg-red-500/10 border border-red-500/50 text-red-500 rounded">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-400 uppercase">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            placeholder="name@gov.sb"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-400 uppercase">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : "Login to Dashboard"}
        </button>
      </form>

      <div className="text-center">
        <button className="text-sm text-gray-500 hover:text-blue-400 transition-colors">
          Forgot your SIG access password?
        </button>
      </div>
    </div>
  );
}