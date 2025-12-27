// app/(dashboard)/drivers/page.tsx
import React from 'react';
import { 
  UserPlus, 
  Search, 
  ShieldCheck, 
  Star, 
  Phone, 
  CreditCard,
  AlertCircle,
  MoreVertical
} from 'lucide-react';

export default function DriversPage() {
  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Driver Management</h1>
          <p className="text-gray-400 text-sm mt-1">Monitor driver performance, licensing, and safety records.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-lg shadow-blue-900/20">
          <UserPlus size={18} />
          Add New Driver
        </button>
      </div>

      {/* 2. Stats Overview for Drivers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/40 border border-gray-700 p-4 rounded-2xl flex items-center gap-4">
          <div className="bg-green-500/20 p-3 rounded-lg text-green-500"><ShieldCheck /></div>
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase">Active Drivers</p>
            <p className="text-2xl font-bold text-white">28</p>
          </div>
        </div>
        <div className="bg-gray-800/40 border border-gray-700 p-4 rounded-2xl flex items-center gap-4">
          <div className="bg-yellow-500/20 p-3 rounded-lg text-yellow-500"><CreditCard /></div>
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase">License Renewals</p>
            <p className="text-2xl font-bold text-white">03</p>
          </div>
        </div>
        <div className="bg-gray-800/40 border border-gray-700 p-4 rounded-2xl flex items-center gap-4">
          <div className="bg-blue-500/20 p-3 rounded-lg text-blue-500"><Star /></div>
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase">Avg. Safety Score</p>
            <p className="text-2xl font-bold text-white">4.8/5</p>
          </div>
        </div>
      </div>

      {/* 3. Filter & Search */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search drivers by name or ID..." 
            className="w-full bg-gray-900 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>

      {/* 4. Driver Table */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-800/60 text-gray-400 text-[11px] font-bold uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Driver Details</th>
              <th className="px-6 py-4">Current Vehicle</th>
              <th className="px-6 py-4">License Status</th>
              <th className="px-6 py-4">Safety Score</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            <DriverRow 
              name="Samuel Kekeo" 
              id="DRV-001" 
              vehicle="HNR-102" 
              expiry="15 Mar 2026" 
              score={4.9} 
              status="Valid" 
            />
            <DriverRow 
              name="David Toiraena" 
              id="DRV-042" 
              vehicle="HNR-205" 
              expiry="02 Jan 2026" 
              score={3.2} 
              status="Expiring Soon" 
            />
            <DriverRow 
              name="Luke Waita" 
              id="DRV-088" 
              vehicle="Unassigned" 
              expiry="10 Nov 2025" 
              score={4.5} 
              status="Expired" 
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Helper Components ---

function DriverRow({ name, id, vehicle, expiry, score, status }: any) {
  const statusColors: any = {
    "Valid": "bg-green-900/30 text-green-400 border-green-800",
    "Expiring Soon": "bg-yellow-900/30 text-yellow-500 border-yellow-800",
    "Expired": "bg-red-900/30 text-red-500 border-red-800"
  };

  return (
    <tr className="hover:bg-gray-800/40 transition">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 font-bold">
            {name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{name}</p>
            <p className="text-xs text-gray-500">{id}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-300">
        {vehicle === "Unassigned" ? (
          <span className="text-gray-600 italic">No Vehicle</span>
        ) : (
          <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div>{vehicle}</span>
        )}
      </td>
      <td className="px-6 py-4">
        <div className={`inline-flex flex-col px-3 py-1 rounded-lg border ${statusColors[status]}`}>
          <span className="text-[10px] font-bold uppercase">{status}</span>
          <span className="text-xs opacity-80">{expiry}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-900 h-1.5 w-16 rounded-full overflow-hidden">
             <div 
               className={`h-full rounded-full ${score > 4 ? 'bg-green-500' : score > 3 ? 'bg-yellow-500' : 'bg-red-500'}`} 
               style={{ width: `${(score / 5) * 100}%` }}
             />
          </div>
          <span className="text-sm font-bold text-white">{score}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
          <button className="p-2 text-gray-500 hover:text-white transition"><Phone size={16} /></button>
          <button className="p-2 text-gray-500 hover:text-white transition"><MoreVertical size={16} /></button>
        </div>
      </td>
    </tr>
  );
}