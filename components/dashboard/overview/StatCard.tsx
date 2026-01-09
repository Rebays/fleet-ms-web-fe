import { ArrowUpRight } from "lucide-react";

export function StatCard({ title, value, change, icon, color = "text-white" }: any) {
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