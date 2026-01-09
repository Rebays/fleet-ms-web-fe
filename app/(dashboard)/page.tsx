import { 
  Truck, 
  MapPin, 
  Wrench, 
  Fuel, 
} from 'lucide-react'; 
import { StatCard } from '@/components/dashboard/overview/StatCard';

import { getFleetOverview } from '@/modules/overview/api/getFleetOverview';
import PriorityAlerts from '@/components/dashboard/overview/PriorityAlert';
import LiveVehicleStatus from '@/components/dashboard/overview/LiveVehicleStatus';
import FleetUtilChart from '@/components/dashboard/overview/FleetUtilChart';
import { Suspense } from 'react';
import { StatCardSkeleton } from '@/components/dashboard/overview/StatCardSkeleton';
import { FleetStats } from '@/components/dashboard/overview/FleetStats';
import { FleetUtilChartSkeleton } from '@/components/dashboard/overview/FleetUtilChartSkeleton';


export default async function Page() {

  const headerText = 'Fleet Overview'
  const subText = 'Welcome back. Here is what is happening with the fleet today.'

  return (
    <div className="space-y-6">
      
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">{headerText}</h1>
          <p className="text-sm text-gray-400">{subText}</p>
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

      {/* Suspense catches the promise from FleetStats */}
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      }>
        <FleetStats />
      </Suspense>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Wrap the Chart in Suspense */}
        <Suspense fallback={<FleetUtilChartSkeleton />}>
          <FleetUtilChart />
        </Suspense>
       
       <PriorityAlerts/>
      </div>

      <LiveVehicleStatus/>
      
    </div>
  );
}
