// app/auth-unavailable/page.tsx
import Link from "next/link";

export default function AuthUnavailable() {
  return (
    <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-700 p-6">
      
      {/* Visual: ID Badge / Biometric Auth Failure */}
      <div className="relative flex items-center justify-center mb-10">
        <div className="absolute w-24 h-24 bg-red-500/10 rounded-xl animate-pulse" />
        <div className="relative w-20 h-28 bg-gray-950 border-2 border-gray-800 rounded-xl flex flex-col items-center justify-center overflow-hidden shadow-2xl">
          <svg className="w-10 h-10 text-gray-700 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <div className="w-10 h-1 bg-gray-800 rounded-full mb-1" />
          <div className="w-6 h-1 bg-gray-800 rounded-full" />
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
        </div>
      </div>

      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-white tracking-tight uppercase">
            Auth Server Offline
          </h2>
          <p className="text-gray-500 text-xs font-medium uppercase tracking-[0.2em]">
            SIG Fleet Management System
          </p>
        </div>

        {/* Updated User-Friendly Instructions */}
        <div className="space-y-4">
          <div className="flex gap-4 p-4 rounded-xl bg-gray-900/30 border border-gray-800/50">
            <div className="shrink-0 w-6 h-6 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-xs font-bold font-mono">!</div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-200">Service Unreachable</p>
              <p className="text-xs text-gray-500 leading-relaxed">The SIG FMS Auth Server is currently down or undergoing maintenance.</p>
            </div>
          </div>

          <div className="flex gap-4 p-4 rounded-xl bg-gray-900/30 border border-gray-800/50">
            <div className="shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-xs font-bold font-mono">i</div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-200">Operator Action</p>
              <p className="text-xs text-gray-500 leading-relaxed">No action is required on your end. Please wait for the service to resume.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Link 
            href="/"
            className="group flex items-center justify-center gap-3 w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-blue-900/20"
          >
            <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Attempt Reconnection</span>
          </Link>
          
          <p className="text-center text-[10px] text-gray-600 uppercase tracking-widest">
            Gateway Status: <span className="text-red-600 font-bold animate-pulse">NO_RESPONSE</span>
          </p>
        </div>
      </div>

      {/* Decorative Accents */}
      <div className="fixed top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-gray-800 opacity-20" />
      <div className="fixed bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-gray-800 opacity-20" />

    </div>
  );
}