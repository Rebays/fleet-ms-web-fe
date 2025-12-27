import React from 'react';
import { MapPin, BarChart3, Wrench, ShieldCheck } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Left Side: SIG FMS Branding & Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center p-12 xl:p-20 border-r border-gray-800/50 bg-[#020617] overflow-hidden">
        
        {/* Animated Background Elements */}
        <div className="absolute -top-20 -right-20 w-100 h-100 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-100 h-100 bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-lg">
          {/* Top Identifier (Logo removed to match login page) */}
          <div className="mb-6 flex items-center gap-2">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500/80">
               Official Portal
             </span>
             <div className="h-px w-12 bg-blue-500/30" />
          </div>

          <h1 className="text-5xl xl:text-6xl font-black text-white mb-4 leading-none tracking-tighter">
            SIG <span className="text-blue-600">FMS</span>
          </h1>
          
          <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-sm">
            National command center for government asset oversight and fleet efficiency.
          </p>

          {/* Feature Grid - Now more compact */}
          <div className="space-y-3">
            <FeatureCard 
              icon={<MapPin size={16} />} 
              title="Asset Tracking" 
              desc="Live GPS across provinces." 
            />
            <FeatureCard 
              icon={<Wrench size={16} />} 
              title="Maintenance" 
              desc="Predictive servicing intelligence." 
            />
            <FeatureCard 
              icon={<BarChart3 size={16} />} 
              title="Analytics" 
              desc="Data-driven cost optimization." 
            />
          </div>
        </div>

        {/* System Footnote */}
        <div className="absolute bottom-10 left-12 xl:left-20 flex items-center gap-2 text-gray-600">
          <ShieldCheck size={14} className="text-gray-700" />
          <span className="text-[9px] uppercase font-bold tracking-[0.2em]">built and maintained by Rebays</span>
        </div>
      </div>

      {/* Right Side: Auth Form Content (Login / Forgot Password) */}
      <main className="flex-1 flex items-center justify-center p-6 bg-gray-950 relative overflow-hidden">
        {/* Mobile Background Glow */}
        <div className="lg:hidden absolute inset-0 bg-blue-600/5 blur-[100px] pointer-events-none" />

        <div className="w-full max-w-sm relative z-10">
          {/* Mobile-only branding - simplified to match desktop
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-black text-white tracking-tighter italic">SIG <span className="text-blue-500">FMS</span></h1>
            <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mt-1">Solomon Islands Gov</p>
          </div> */}
          
          {children}
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-900/30 border border-gray-800/40 hover:border-blue-500/30 transition-all group">
      <div className="text-blue-500 bg-blue-500/5 h-9 w-9 shrink-0 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
        {icon}
      </div>
      <div>
        <h4 className="text-xs font-bold text-gray-200">{title}</h4>
        <p className="text-[10px] text-gray-500 leading-tight">{desc}</p>
      </div>
    </div>
  );
}