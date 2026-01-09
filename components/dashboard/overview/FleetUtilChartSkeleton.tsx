// components/dashboard/overview/FleetUtilChartSkeleton.tsx
export function FleetUtilChartSkeleton() {
  return (
    <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden animate-pulse">
      {/* Header Skeleton */}
      <div className="p-6 border-b border-gray-700 flex justify-between items-center">
        <div className="h-5 w-48 bg-gray-700 rounded" />
        <div className="flex gap-4">
          <div className="h-4 w-16 bg-gray-700 rounded" />
          <div className="h-4 w-16 bg-gray-700 rounded" />
        </div>
      </div>
      
      {/* Graph Body Skeleton */}
      <div className="h-72 w-full p-6 flex flex-col justify-end gap-4">
        <div className="flex items-end justify-between h-full w-full px-2">
          {/* Simulated Bars or Wave peaks */}
          <div className="w-8 bg-gray-700 rounded-t h-[40%]" />
          <div className="w-8 bg-gray-700 rounded-t h-[65%]" />
          <div className="w-8 bg-gray-700 rounded-t h-[80%]" />
          <div className="w-8 bg-gray-700 rounded-t h-[55%]" />
          <div className="w-8 bg-gray-700 rounded-t h-[90%]" />
          <div className="w-8 bg-gray-700 rounded-t h-[30%]" />
          <div className="w-8 bg-gray-700 rounded-t h-[20%]" />
        </div>
        
        {/* X-Axis Labels Skeleton */}
        <div className="flex justify-between w-full border-t border-gray-700 pt-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-3 w-8 bg-gray-700 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}