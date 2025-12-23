// src/app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Left Side: SIG FMS Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 items-center justify-center p-12 border-r border-gray-800">
        <div className="max-w-md">
          {/* SIG FMS Logo / Identifier */}
          <div className="mb-8 inline-block px-3 py-1 rounded bg-blue-600 text-white text-xs font-bold uppercase tracking-widest">
            Solomon Islands Government
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
            SIG FMS
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Centralized Fleet Management System for government assets and vehicle oversight.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-300">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>Real-time Asset Tracking</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>Maintenance Scheduling</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>Utilization Analytics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Auth Form Content (Login / Forgot Password) */}
      <main className="flex-1 flex items-center justify-center p-8 bg-gray-950 overflow-auto">
        <div className="w-full max-w-md">
          {/* Mobile-only branding (shows when the left pane is hidden) */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-2xl font-bold text-white">SIG FMS</h1>
            <p className="text-gray-500 text-sm">Fleet Management Portal</p>
          </div>
          
          {children}
        </div>
      </main>
    </div>
  );
}