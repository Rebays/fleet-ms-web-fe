"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { signOutAction } from "@/app/actions/signout";

export function IdleTimer() {
  const [isIdle, setIsIdle] = useState(false);
  // Set initial countdown state to 15s
  const [secondsRemaining, setSecondsRemaining] = useState(15); 
  const router = useRouter();

  // Thresholds set to 15 seconds
  const IDLE_THRESHOLD = 15 * 1000; 
  const WARNING_WINDOW = 15; 

  const autoLogout = useCallback(() => {
    router.push("/api/auth/clear-session?session=timeout");
  }, [router]);

  useEffect(() => {
    let idleTimeout: NodeJS.Timeout;

    const resetTimer = () => {
      // If modal is active, we don't reset via mouse move (requires button click)
      if (isIdle) return; 

      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        setIsIdle(true);
      }, IDLE_THRESHOLD);
    };

    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
    events.forEach((name) => window.addEventListener(name, resetTimer));
    resetTimer();

    return () => {
      events.forEach((name) => window.removeEventListener(name, resetTimer));
      clearTimeout(idleTimeout);
    };
  }, [isIdle, IDLE_THRESHOLD]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isIdle && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (isIdle && secondsRemaining <= 0) {
      autoLogout();
    }
    return () => clearInterval(interval);
  }, [isIdle, secondsRemaining, autoLogout]);

  if (!isIdle) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-gray-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-gray-900 border-2 border-amber-500/30 p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-sm w-full mx-4 text-center space-y-6 animate-in zoom-in-95 duration-300">
        
        <div className="relative flex justify-center">
          <div className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-10"></div>
          <div className="relative p-4 bg-amber-500/10 rounded-full">
            <ShieldAlert className="w-10 h-10 text-amber-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white tracking-tight">Security Timeout</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            You have been inactive. To protect your data, this session will close in:
          </p>
        </div>

        <div className="py-2">
          {/* tabular-nums ensures the clock doesn't wobble as it counts down */}
          <span className="text-6xl font-mono font-bold text-amber-500 tracking-tighter tabular-nums">
            00:{secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <button 
            onClick={() => {
              setIsIdle(false);
              setSecondsRemaining(WARNING_WINDOW);
            }} 
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-900/20"
          >
            I'm Still Working
          </button>
          
          <button 
            onClick={signOutAction}
            className="w-full py-2 text-gray-500 hover:text-white text-xs transition-colors"
          >
            Logout Now
          </button>
        </div>
      </div>
    </div>
  );
}