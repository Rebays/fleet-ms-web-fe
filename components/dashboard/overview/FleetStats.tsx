import { getFleetOverview } from "@/modules/overview/api/getFleetOverview";
import { StatCard } from "./StatCard";
import { Fuel, MapPin, Truck, Wrench } from "lucide-react";

// This component handles its own data fetching
export async function FleetStats() {
  const { activeNow, totalVehicles, inMaintenance, fuelSpend } = await getFleetOverview();

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Total Vehicles" value={totalVehicles}
        change="+2 this month" icon={<Truck size={20} className="text-blue-400" />} 
      />
      <StatCard 
        title="Active Now" value={activeNow} color="text-green-500" 
        icon={<MapPin size={20} className="text-green-400" />} 
      />
      <StatCard 
        title="In Maintenance" value={inMaintenance} color="text-yellow-500" 
        icon={<Wrench size={20} className="text-yellow-400" />} 
      />
      <StatCard 
        title="Fuel Spend (MTD)" value={fuelSpend} change="-5% vs last month" 
        icon={<Fuel size={20} className="text-purple-400" />} 
      />
    </div>
  );
}