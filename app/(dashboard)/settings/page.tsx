// app/(dashboard)/settings/page.tsx
import React from 'react';
import { 
  User, 
  Shield, 
  Bell, 
  Database, 
  Globe, 
  Key, 
  Smartphone,
  History,
  Save
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">System Settings</h1>
          <p className="text-gray-400 text-sm mt-1">Configure your FleetMS environment and security preferences.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-bold transition shadow-lg shadow-blue-900/20">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <div className="md:col-span-3 space-y-1">
          <SettingsNavLink icon={<User size={18}/>} label="Profile" active />
          <SettingsNavLink icon={<Shield size={18}/>} label="Security" />
          <SettingsNavLink icon={<Bell size={18}/>} label="Notifications" />
          <SettingsNavLink icon={<Globe size={18}/>} label="Fleet Rules" />
          <SettingsNavLink icon={<Database size={18}/>} label="Integrations" />
          <SettingsNavLink icon={<History size={18}/>} label="Audit Logs" />
        </div>

        {/* Content Area */}
        <div className="md:col-span-9 space-y-6">
          
          {/* Section: Fleet Logic */}
          <section className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6 space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-3">Operational Rules</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Idle Timeout (Minutes)</label>
                <input type="number" defaultValue={15} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                <p className="text-[10px] text-gray-500">Auto-signout after inactivity.</p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Speed Limit Warning (km/h)</label>
                <input type="number" defaultValue={60} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                <p className="text-[10px] text-gray-500">Threshold for high-speed alerts.</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-xl border border-gray-800">
              <div>
                <p className="text-sm font-medium text-white">Geofencing Alerts</p>
                <p className="text-xs text-gray-500">Notify if vehicles leave Honiara boundary.</p>
              </div>
              <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                 <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </section>

          {/* Section: Security / Auth */}
          <section className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-3">Security & Authentication</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 hover:bg-gray-800/50 rounded-lg transition">
                <div className="p-2 bg-gray-900 rounded-lg text-gray-400"><Smartphone size={20}/></div>
                <div>
                  <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
                  <p className="text-xs text-gray-500">Secure your account with SMS or Authenticator App.</p>
                  <button className="mt-2 text-xs text-blue-400 font-bold">Setup 2FA</button>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 hover:bg-gray-800/50 rounded-lg transition">
                <div className="p-2 bg-gray-900 rounded-lg text-gray-400"><Key size={20}/></div>
                <div>
                  <p className="text-sm font-medium text-white">API Access Tokens</p>
                  <p className="text-xs text-gray-500">Generate keys for GPS tracking hardware integrations.</p>
                  <button className="mt-2 text-xs text-blue-400 font-bold">Manage Tokens</button>
                </div>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <div className="p-6 border border-red-900/30 bg-red-900/10 rounded-2xl">
            <h4 className="text-red-500 font-bold text-sm mb-1">Danger Zone</h4>
            <p className="text-xs text-red-400/70 mb-4">Permanent actions that cannot be undone.</p>
            <button className="text-xs bg-red-900/20 text-red-500 border border-red-900/50 px-4 py-2 rounded-lg hover:bg-red-900/40 transition">
              Purge System Audit Logs
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function SettingsNavLink({ icon, label, active = false }: any) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
      active ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
    }`}>
      {icon}
      {label}
    </button>
  );
}