// app/(dashboard)/livemap/page.tsx
import React from 'react';
import { 
  Map as MapIcon, 
  Navigation, 
  Layers, 
  Search, 
  Info, 
  Maximize2, 
  Signal, 
  WifiOff 
} from 'lucide-react';

export default function LiveMapPage() {
  return (
    <div className="h-[calc(100vh-120px)] flex flex-col space-y-4">
      {/* 1. Map Header / Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <MapIcon className="text-blue-500" />
            Live Fleet Tracking
          </h1>
          <p className="text-gray-400 text-sm">Real-time GPS positioning for 34 active units.</p>
        </div>
        <div className="flex items-center gap-2 bg-gray-800 p-1 rounded-xl border border-gray-700">
          <button className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-lg shadow-blue-900/20">Live View</button>
          <button className="px-4 py-1.5 text-gray-400 text-xs font-bold hover:text-white transition">History Playback</button>
        </div>
      </div>

      {/* 2. Main Map Container */}
      <div className="flex-1 flex gap-4 overflow-hidden">
        
        {/* Sidebar: Active Vehicle List */}
        <div className="w-80 bg-gray-900 border border-gray-800 rounded-2xl flex flex-col overflow-hidden xl:flex">
          <div className="p-4 border-b border-gray-800 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Find vehicle..." 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-9 pr-3 text-xs text-gray-200 focus:outline-none"
              />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase">
              <span>Status</span>
              <span>32 Connected / 2 Offline</span>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto divide-y divide-gray-800">
            <MapVehicleItem id="HNR-123" driver="Samuel K." speed="45 km/h" status="moving" />
            <MapVehicleItem id="HNR-456" driver="Luke W." speed="0 km/h" status="parked" />
            <MapVehicleItem id="HNR-789" driver="David T." speed="12 km/h" status="moving" />
            <MapVehicleItem id="HNR-002" driver="John D." speed="-" status="offline" />
          </div>
        </div>

        {/* The Map Interface */}
        <div className="flex-1 bg-gray-800 rounded-2xl border border-gray-700 relative overflow-hidden">
          {/* Mock Map Background */}
          <div className="absolute inset-0 opacity-40 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/159.95,-9.43,12/800x600?access_token=YOUR_TOKEN')] bg-cover bg-center">
            {/* These would be dynamic markers in a real MapLibre/Leaflet implementation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
               <VehicleMarker label="HNR-123" direction={45} status="moving" />
            </div>
            <div className="absolute top-1/3 left-1/4">
               <VehicleMarker label="HNR-456" direction={0} status="parked" />
            </div>
          </div>

          {/* Map Overlays */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <MapControlIcon icon={<Layers size={18} />} label="Layers" />
            <MapControlIcon icon={<Navigation size={18} />} label="Recenter" />
            <MapControlIcon icon={<Maximize2 size={18} />} label="Fullscreen" />
          </div>

          {/* Bottom Info Bar */}
          <div className="absolute bottom-4 left-4 right-4 bg-gray-900/90 backdrop-blur-md border border-gray-700 p-3 rounded-xl flex justify-between items-center">
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-gray-300 font-medium">Tracking Active</span>
              </div>
              <div className="text-[10px] text-gray-500 flex flex-col">
                <span className="uppercase font-bold tracking-tighter text-gray-600">Map Provider</span>
                <span className="text-gray-400">Mapbox / OpenStreetMap</span>
              </div>
            </div>
            <button className="text-blue-400 hover:text-blue-300 text-xs font-bold flex items-center gap-1">
              <Info size={14} /> Map Legend
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- Helper Components ---

function MapVehicleItem({ id, driver, speed, status }: any) {
  return (
    <div className="p-4 hover:bg-gray-800/50 cursor-pointer transition group">
      <div className="flex justify-between items-start mb-1">
        <h4 className="text-sm font-bold text-white group-hover:text-blue-400">{id}</h4>
        <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
          status === 'moving' ? 'bg-green-900/30 text-green-400' : 
          status === 'offline' ? 'bg-red-900/30 text-red-400' : 'bg-gray-700 text-gray-300'
        }`}>
          {status}
        </span>
      </div>
      <div className="flex justify-between text-[11px] text-gray-500">
        <span>{driver}</span>
        <span className="font-mono text-gray-400">{speed}</span>
      </div>
    </div>
  );
}

function MapControlIcon({ icon, label }: any) {
  return (
    <button className="p-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition shadow-xl" title={label}>
      {icon}
    </button>
  );
}

function VehicleMarker({ label, direction, status }: any) {
  return (
    <div className="flex flex-col items-center gap-1 group cursor-pointer">
      <div className="bg-gray-900 text-[10px] font-bold text-white px-2 py-0.5 rounded border border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
        {label}
      </div>
      <div className={`p-1.5 rounded-full border-2 ${
        status === 'moving' ? 'bg-blue-600 border-white animate-bounce' : 'bg-gray-600 border-gray-400'
      }`}>
        <Navigation size={14} className="text-white" style={{ transform: `rotate(${direction}deg)` }} />
      </div>
    </div>
  );
}