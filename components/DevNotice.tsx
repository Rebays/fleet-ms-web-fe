"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Settings } from "lucide-react";

interface BlobProps {
  duration: number;
  delay: number;
}

function DevNotice() {
  const [isVisible, setIsVisible] = useState(true);

  // Lock scroll when component is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  const blobVariants: Variants = {
    floating: (custom: BlobProps) => ({
      x: [0, 40, -20, 0],
      y: [0, -50, 30, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.05, 0.95, 1],
      transition: {
        duration: custom.duration,
        repeat: Infinity,
        delay: custom.delay,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="dev-notice"
          initial={{ y: 0, opacity: 1 }}
          exit={{ 
            y: "100%", 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-9999 flex min-h-screen items-center justify-center bg-[#212020] font-sans overflow-hidden"
        >
          {/* 1. Engineering Grid */}
          <div 
            className="absolute inset-0 opacity-[0.05] z-0" 
            style={{ 
              backgroundImage: `radial-gradient(#06b6d4 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} 
          />

          {/* --- THE FIVE EDGE BLOBS --- */}
          <motion.div 
            variants={blobVariants}
            custom={{ duration: 15, delay: 0 } as BlobProps}
            animate="floating"
            className="absolute -top-32 -left-32 w-62.5 h-62.5 bg-[#06b6d4] opacity-20 blur-[100px] rounded-full z-10" 
          />
          <motion.div 
            variants={blobVariants}
            custom={{ duration: 18, delay: 1 } as BlobProps}
            animate="floating"
            className="absolute -top-20 -right-20 w-50 h-50 bg-[#fbbf24] opacity-15 blur-[80px] rounded-full z-10" 
          />
          <motion.div 
            variants={blobVariants}
            custom={{ duration: 16, delay: 4 } as BlobProps}
            animate="floating"
            className="absolute top-1/2 -right-32 w-55 h-55 bg-[#0891b2] opacity-15 blur-[90px] rounded-full z-10" 
          />
          <motion.div 
            variants={blobVariants}
            custom={{ duration: 20, delay: 2 } as BlobProps}
            animate="floating"
            className="absolute -bottom-32 left-0 w-70 h-70 bg-[#fbbf24] opacity-15 blur-[100px] rounded-full z-10" 
          />
          <motion.div 
            variants={blobVariants}
            custom={{ duration: 15, delay: 5 } as BlobProps}
            animate="floating"
            className="absolute -bottom-40 -right-40 w-75 h-75 bg-[#06b6d4] opacity-20 blur-[110px] rounded-full z-10" 
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#212020_85%)] z-20 pointer-events-none" />

          {/* --- CONTENT --- */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors p-2 z-100 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <main className="flex flex-col items-center gap-12 px-8 py-16 text-center max-w-4xl relative z-100">
            <div className="relative">
               <div className="absolute inset-0 bg-[#06b6d4]/20 blur-3xl rounded-full" />
               
               <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="relative z-10 flex items-center justify-center"
               >
                 <Settings 
                  size={120} 
                  strokeWidth={1} 
                  className="text-[#06b6d4] drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" 
                 />
               </motion.div>
            </div>

            <div className="flex flex-col gap-6">
              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tighter">
                Development is{" "} <br />
                <span className="bg-clip-text text-transparent bg-linear-to-r from-[#06b6d4] to-white">
                  in motion.
                </span>
              </h1>
              <p className="text-gray-400 max-w-xl mx-auto font-light text-lg">
                We're building something amazing in real-time.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsVisible(false)}
              className="cursor-pointer group mt-8 flex flex-col items-center gap-3 transition-opacity hover:opacity-80"
            >
              <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-500">👁️</span>
              <span className="text-[#06b6d4] text-xs font-black uppercase tracking-[0.3em] animate-pulse">
                Let me peek
              </span>
            </motion.button>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DevNotice;