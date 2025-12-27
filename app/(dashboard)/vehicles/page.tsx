// app/(dashboard)/vehicles/page.tsx
import React from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Car, 
  MoreHorizontal, 
  Activity, 
  MapPin, 
  Settings 
} from 'lucide-react';

export default function VehiclesPage() {
  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className=" font-bold text-white tracking-tight text-3xl">Vehicle Registry</h1>
          <p className="text-gray-400 text-sm">Manage and monitor 42 active assets across Honiara.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition">
          <Plus size={18} />
          Register New Vehicle
        </button>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search by Plate, Model, or Driver..." 
            className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-gray-800 border border-gray-700 px-4 py-2 rounded-xl text-sm text-gray-300 hover:bg-gray-700 transition">
            <Filter size={18} />
            Filters
          </button>
          <select className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-xl text-sm text-gray-300 focus:outline-none">
            <option>All Categories</option>
            <option>Sedans</option>
            <option>Trucks</option>
            <option>Vans</option>
          </select>
        </div>
      </div>

      {/* 3. Vehicle Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <VehicleCard 
          plate="HNR-102" 
          model="Toyota HiAce (2022)" 
          driver="Samuel K." 
          status="Active" 
          fuel={78} 
          location="Henderson" 
        />
        <VehicleCard 
          plate="HNR-205" 
          model="Toyota Hilux (2021)" 
          driver="Unassigned" 
          status="In Service" 
          fuel={12} 
          location="Central Depot" 
        />
        <VehicleCard 
          plate="HNR-888" 
          model="Isuzu GIGA Truck" 
          driver="Luke W." 
          status="Active" 
          fuel={92} 
          location="Port Cruz" 
        />
      </div>
    </div>
  );
}

// --- Sub-component for Asset Cards ---

function VehicleCard({ plate, model, driver, status, fuel, location }: any) {
  const isActive = status === "Active";

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5 hover:border-gray-500 transition group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4 items-center">
          <div className={`p-3 rounded-xl ${isActive ? 'bg-blue-900/30 text-blue-400' : 'bg-yellow-900/30 text-yellow-500'}`}>
            <Car size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">{plate}</h3>
            <p className="text-xs text-gray-400 uppercase font-semibold">{model}</p>
          </div>
        </div>
        <button className="text-gray-500 hover:text-white transition">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 my-5 border-y border-gray-700/50 py-4">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-gray-500" />
          <div className="text-[11px]">
            <p className="text-gray-500 uppercase font-bold">Driver</p>
            <p className="text-gray-200 font-medium">{driver}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-gray-500" />
          <div className="text-[11px]">
            <p className="text-gray-500 uppercase font-bold">Location</p>
            <p className="text-gray-200 font-medium">{location}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
          <span className="text-gray-500">Fuel Level</span>
          <span className={fuel < 20 ? 'text-red-500' : 'text-gray-300'}>{fuel}%</span>
        </div>
        <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${fuel < 20 ? 'bg-red-500' : 'bg-blue-600'}`} 
            style={{ width: `${fuel}%` }}
          />
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <button className="flex-1 bg-gray-900 border border-gray-700 text-white text-xs py-2 rounded-lg font-bold hover:bg-gray-700 transition">
          View Logs
        </button>
        <button className="bg-gray-900 border border-gray-700 text-gray-400 p-2 rounded-lg hover:text-white transition">
          <Settings size={16} />
        </button>
      </div>
    </div>
  );
}