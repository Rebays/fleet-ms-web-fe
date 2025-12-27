// app/(dashboard)/page.tsx
import React from 'react';
import { 
  Truck, 
  MapPin, 
  Wrench, 
  Fuel, 
  AlertCircle, 
  ArrowUpRight, 
  MoreVertical 
} from 'lucide-react'; // Using Lucide for professional iconography

export default function Page() {
  return (
    <div className="space-y-6">
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Fleet Overview</h1>
          <p className="text-sm text-gray-400">Welcome back. Here is what is happening with the fleet today.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition">
            Export Data
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            + Add Vehicle
          </button>
        </div>
      </div>

      {/* 2. KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Vehicles" 
          value="42" 
          change="+2 this month" 
          icon={<Truck size={20} className="text-blue-400" />} 
        />
        <StatCard 
          title="Active Now" 
          value="38" 
          color="text-green-500" 
          icon={<MapPin size={20} className="text-green-400" />} 
        />
        <StatCard 
          title="In Maintenance" 
          value="4" 
          color="text-yellow-500" 
          icon={<Wrench size={20} className="text-yellow-400" />} 
        />
        <StatCard 
          title="Fuel Spend (MTD)" 
          value="$12,450" 
          change="-5% vs last month" 
          icon={<Fuel size={20} className="text-purple-400" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3. Main Operational Chart */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700 flex justify-between items-center">
            <h3 className="font-semibold text-white">Fleet Utilization (Last 7 Days)</h3>
            <select className="bg-gray-900 border-gray-700 text-xs text-gray-300 rounded p-1">
              <option>Distance (km)</option>
              <option>Fuel (L)</option>
            </select>
          </div>
          <div className="h-72 flex items-center justify-center text-gray-500 italic">
            {/* Visual Placeholder for a Line/Bar Chart */}
            [ Utilization Graph: Peak usage at 10:00 AM daily ]
          </div>
        </div>

        {/* 4. Priority Alerts Sidebar */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center gap-2 mb-4 text-white">
            <AlertCircle size={18} className="text-red-500" />
            <h3 className="text-lg font-semibold">Priority Alerts</h3>
          </div>
          <div className="space-y-4">
            <AlertItem type="Service" text="Toyota Hilux (HNR-123) - Oil Change Overdue" severity="high" />
            <AlertItem type="License" text="Isuzu Truck (HNR-456) - Registration Expires in 3 days" severity="medium" />
            <AlertItem type="Safety" text="Driver John Doe - Hard Braking Detected (3x)" severity="low" />
          </div>
          <button className="w-full mt-6 py-2 text-sm text-gray-400 hover:text-white transition border border-dashed border-gray-600 rounded-lg">
            View All Alerts
          </button>
        </div>
      </div>

      {/* 5. Live Vehicle Status Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h3 className="font-semibold text-white">Live Vehicle Status</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-900/50 text-gray-400 text-xs uppercase">
              <tr>
                <th className="px-6 py-4">Vehicle ID</th>
                <th className="px-6 py-4">Current Driver</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Ping</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-300 divide-y divide-gray-700">
              <VehicleRow id="HNR-123" driver="Samuel K." loc="Henderson Airport" status="In Motion" last="2 mins ago" />
              <VehicleRow id="HNR-456" driver="Unassigned" loc="Main Depot" status="Parked" last="14 mins ago" />
              <VehicleRow id="HNR-888" driver="Luke W." loc="Point Cruz Wharf" status="In Motion" last="Just now" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function StatCard({ title, value, change, icon, color = "text-white" }: any) {
  return (
    <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 relative overflow-hidden group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-400 font-medium">{title}</p>
          <h2 className={`text-3xl font-bold mt-1 ${color}`}>{value}</h2>
        </div>
        <div className="p-2 bg-gray-900 rounded-lg border border-gray-700">
          {icon}
        </div>
      </div>
      {change && (
        <div className="flex items-center mt-4 text-xs font-medium text-gray-500">
          <ArrowUpRight size={14} className="mr-1 text-blue-400" />
          <span>{change}</span>
        </div>
      )}
    </div>
  );
}

function AlertItem({ type, text, severity }: { type: string, text: string, severity: 'high' | 'medium' | 'low' }) {
  const borderColors = {
    high: 'border-red-500',
    medium: 'border-yellow-500',
    low: 'border-blue-500'
  };

  return (
    <div className={`flex flex-col p-3 rounded-lg bg-gray-900 border-l-4 ${borderColors[severity]}`}>
      <span className="text-[10px] uppercase font-bold text-gray-500">{type}</span>
      <p className="text-sm text-gray-200 mt-1">{text}</p>
    </div>
  );
}

function VehicleRow({ id, driver, loc, status, last }: any) {
  return (
    <tr className="hover:bg-gray-700/50 transition-colors">
      <td className="px-6 py-4 font-medium text-white">{id}</td>
      <td className="px-6 py-4">{driver}</td>
      <td className="px-6 py-4 flex items-center gap-1">
        <MapPin size={14} className="text-gray-500" /> {loc}
      </td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${status === 'In Motion' ? 'bg-green-900/40 text-green-400' : 'bg-gray-900 text-gray-400'}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-500">{last}</td>
      <td className="px-6 py-4 text-right">
        <button className="text-gray-500 hover:text-white"><MoreVertical size={16} /></button>
      </td>
    </tr>
  );
}