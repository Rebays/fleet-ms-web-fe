// app/(dashboard)/maintenance/page.tsx
import React from 'react';
import { 
  Wrench, 
  Clock, 
  History, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Calendar,
} from 'lucide-react';

export default function MaintenancePage() {
  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Maintenance Hub</h1>
          <p className="text-gray-400 text-sm mt-1">Schedule services, track repairs, and manage fleet health.</p>
        </div>
        <button className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-lg shadow-yellow-900/20">
          <Plus size={18} />
          Create Work Order
        </button>
      </div>

      {/* 2. Maintenance KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MaintenanceStat title="In Shop" value="04" icon={<Wrench className="text-yellow-500" />} />
        <MaintenanceStat title="Pending" value="12" icon={<Clock className="text-blue-500" />} />
        <MaintenanceStat title="Completed (MTD)" value="24" icon={<CheckCircle2 className="text-green-500" />} />
        <MaintenanceStat title="Overdue" value="02" icon={<AlertTriangle className="text-red-500" />} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 3. Active Work Orders (The "Queue") */}
        <div className="xl:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <History size={20} className="text-gray-400" />
            Active Work Orders
          </h3>
          <div className="grid gap-4">
            <WorkOrderCard 
              vehicle="HNR-123" 
              service="Engine Overhaul" 
              technician="Garage A" 
              progress={65} 
              priority="High"
            />
            <WorkOrderCard 
              vehicle="HNR-456" 
              service="Tyre Replacement" 
              technician="QuickFix Ltd" 
              progress={100} 
              priority="Normal"
            />
            <WorkOrderCard 
              vehicle="HNR-901" 
              service="Routine Oil Change" 
              technician="In-house" 
              progress={20} 
              priority="Low"
            />
          </div>
        </div>

        {/* 4. Upcoming Preventive Maintenance */}
        <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-blue-400" />
            Upcoming Services
          </h3>
          <div className="space-y-6">
            <UpcomingItem vehicle="HNR-777" task="Brake Inspection" due="In 2 days" />
            <UpcomingItem vehicle="HNR-002" task="Transmission Flush" due="In 5 days" />
            <UpcomingItem vehicle="HNR-555" task="Annual Safety Cert" due="In 1 week" />
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-700">
             <div className="flex justify-between items-center mb-4">
               <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Parts Inventory</h4>
               <span className="text-[10px] bg-red-900/40 text-red-400 px-2 py-0.5 rounded">2 Low</span>
             </div>
             <div className="space-y-3">
                <InventoryItem name="10W-40 Oil" stock="12L" status="ok" />
                <InventoryItem name="Brake Pads (Hilux)" stock="2 Sets" status="low" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function MaintenanceStat({ title, value, icon }: any) {
  return (
    <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-[11px] font-bold uppercase">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className="p-3 bg-gray-800 rounded-xl">{icon}</div>
      </div>
    </div>
  );
}

function WorkOrderCard({ vehicle, service, technician, progress, priority }: any) {
  return (
    <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-2xl hover:bg-gray-800 transition group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center border border-gray-700">
             <Wrench size={20} className="text-gray-400 group-hover:text-yellow-500 transition" />
          </div>
          <div>
            <h4 className="text-white font-bold">{vehicle} — {service}</h4>
            <p className="text-xs text-gray-500 font-medium">Assigned to: {technician}</p>
          </div>
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase ${
          priority === 'High' ? 'bg-red-900/30 text-red-500' : 'bg-gray-700 text-gray-300'
        }`}>
          {priority} Priority
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold text-gray-400">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${progress === 100 ? 'bg-green-500' : 'bg-yellow-600'}`} 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function UpcomingItem({ vehicle, task, due }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
      <div>
        <p className="text-sm font-semibold text-gray-200">{vehicle}: {task}</p>
        <p className="text-xs text-gray-500">{due}</p>
      </div>
    </div>
  );
}

function InventoryItem({ name, stock, status }: any) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-400">{name}</span>
      <span className={`font-mono font-bold ${status === 'low' ? 'text-red-400' : 'text-gray-200'}`}>{stock}</span>
    </div>
  );
}