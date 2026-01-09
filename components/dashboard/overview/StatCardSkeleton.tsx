export function StatCardSkeleton() {
  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <div className="h-4 w-24 bg-gray-700 rounded" />
          <div className="h-8 w-16 bg-gray-600 rounded" />
          <div className="h-3 w-20 bg-gray-700 rounded" />
        </div>
        <div className="h-10 w-10 bg-gray-700 rounded-lg" />
      </div>
    </div>
  );
}