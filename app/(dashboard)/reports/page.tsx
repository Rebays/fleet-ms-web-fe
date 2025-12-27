// app/(dashboard)/reports/page.tsx
import React from 'react';
import { 
  BarChart3, 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  PieChart, 
  Filter,
  Share2
} from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Analytics & Reports</h1>
          <p className="text-gray-400 text-sm mt-1">Generate insights on fleet performance and operational costs.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 bg-gray-800 border border-gray-700 text-gray-300 px-4 py-2 rounded-xl text-sm hover:bg-gray-700 transition">
            <Calendar size={18} />
            Schedule
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition shadow-lg shadow-blue-900/20">
            <BarChart3 size={18} />
            New Custom Report
          </button>
        </div>
      </div>

      {/* 2. Quick Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InsightCard 
          title="Total Cost of Ownership" 
          value="$45,200" 
          trend="+12%" 
          isPositive={false} 
          label="This Quarter"
        />
        <InsightCard 
          title="Fuel Efficiency (Fleet)" 
          value="14.2 L/100km" 
          trend="-4%" 
          isPositive={true} 
          label="vs Last Month"
        />
        <InsightCard 
          title="Utilization Rate" 
          value="82%" 
          trend="+5%" 
          isPositive={true} 
          label="Avg. Daily"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3. Report Templates List */}
        <div className="lg:col-span-2 bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Standard Report Templates</h3>
            <Filter size={18} className="text-gray-500 cursor-pointer" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReportTemplate 
              title="Monthly Fuel Consumption" 
              desc="Breakdown of fuel costs by vehicle and driver." 
              lastRun="2 days ago" 
            />
            <ReportTemplate 
              title="Maintenance ROI" 
              desc="Analysis of repair costs vs vehicle age." 
              lastRun="1 week ago" 
            />
            <ReportTemplate 
              title="Driver Safety Leaderboard" 
              desc="Ranking based on incidents and efficiency." 
              lastRun="Yesterday" 
            />
            <ReportTemplate 
              title="Fleet Utilization" 
              desc="Daily idle time vs. active engine hours." 
              lastRun="3 hours ago" 
            />
          </div>
        </div>

        {/* 4. Recent Downloads / Scheduled Reports */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Exports</h3>
          <div className="space-y-4">
            <ExportItem name="Nov_Fuel_Audit.pdf" date="Dec 24" size="2.4 MB" />
            <ExportItem name="Maintenance_Summary.xlsx" date="Dec 20" size="1.1 MB" />
            <ExportItem name="Driver_Safety_Q4.pdf" date="Dec 15" size="4.8 MB" />
          </div>
          
          <div className="mt-8">
            <h4 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-widest">Visual Snapshot</h4>
            <div className="aspect-square rounded-xl bg-gray-800 flex items-center justify-center text-gray-500 text-xs text-center p-4 italic border border-dashed border-gray-700">
               [ Image of a distribution pie chart: Maintenance vs Fuel vs Insurance costs ]
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function InsightCard({ title, value, trend, isPositive, label }: any) {
  return (
    <div className="bg-gray-800/40 border border-gray-700 p-5 rounded-2xl">
      <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{title}</p>
      <div className="flex items-end gap-3 mt-2">
        <h2 className="text-2xl font-bold text-white">{value}</h2>
        <span className={`text-xs font-bold mb-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {trend}
        </span>
      </div>
      <p className="text-[10px] text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function ReportTemplate({ title, desc, lastRun }: any) {
  return (
    <div className="p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500 transition group">
      <div className="flex justify-between items-start mb-2">
        <div className="p-2 bg-blue-900/20 text-blue-400 rounded-lg">
          <FileText size={20} />
        </div>
        <button className="text-gray-600 hover:text-white transition"><Share2 size={16} /></button>
      </div>
      <h4 className="text-white font-bold text-sm mb-1">{title}</h4>
      <p className="text-xs text-gray-500 leading-relaxed mb-4">{desc}</p>
      <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-700/50">
        <span className="text-[10px] text-gray-500 uppercase font-bold">Last run: {lastRun}</span>
        <button className="text-blue-400 hover:text-blue-300 text-xs font-bold flex items-center gap-1">
          <Download size={14} /> Run
        </button>
      </div>
    </div>
  );
}

function ExportItem({ name, date, size }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
      <div className="flex items-center gap-3">
        <div className="text-gray-500"><FileText size={18} /></div>
        <div>
          <p className="text-xs font-medium text-gray-200 truncate w-32">{name}</p>
          <p className="text-[10px] text-gray-500">{date} • {size}</p>
        </div>
      </div>
      <button className="text-gray-400 hover:text-white transition">
        <Download size={16} />
      </button>
    </div>
  );
}