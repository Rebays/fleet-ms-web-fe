"use client";

import { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { FleetUtilChartSkeleton } from './FleetUtilChartSkeleton';

const data = [
  { day: 'Mon', distance: 650, fuel: 120 },
  { day: 'Tue', distance: 780, fuel: 145 },
  { day: 'Wed', distance: 820, fuel: 160 },
  { day: 'Thu', distance: 700, fuel: 130 },
  { day: 'Fri', distance: 900, fuel: 175 },
  { day: 'Sat', distance: 450, fuel: 90 },
  { day: 'Sun', distance: 300, fuel: 60 },
];

function FleetUtilChart() {
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a 3-second data fetch delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // 1. If loading, return the skeleton immediately
  if (isLoading) {
    return <FleetUtilChartSkeleton />;
  }

  // 2. Once loading is false, return the actual chart
  return (
    <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-700 flex justify-between items-center">
        <h3 className="font-semibold text-white">Fleet Utilization</h3>
        <div className="flex gap-4 items-center">
             <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-xs text-gray-400">Distance</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span className="text-xs text-gray-400">Fuel</span>
             </div>
        </div>
      </div>
      
      <div className="h-72 w-full p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorDistance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorFuel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} />
            <Area type="monotone" dataKey="distance" stroke="#3b82f6" fill="url(#colorDistance)" strokeWidth={3} />
            <Area type="monotone" dataKey="fuel" stroke="#a855f7" fill="url(#colorFuel)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default FleetUtilChart;