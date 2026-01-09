import { VehicleRow } from "./VehicleRow";

function LiveVehicleStatus() {
    return (
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h3 className="font-semibold text-white">Live Vehicle Status</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-900/50 text-gray-400 text-xs uppercase">
              <tr>
                <th className="px-6 py-4">Vehicle ID</th>
                <th className="px-6 py-4">Current Driver</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Ping</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-300 divide-y divide-gray-700">
              <VehicleRow id="HNR-123" driver="Samuel K." loc="Henderson Airport" status="In Motion" last="2 mins ago" />
              <VehicleRow id="HNR-456" driver="Unassigned" loc="Main Depot" status="Parked" last="14 mins ago" />
              <VehicleRow id="HNR-888" driver="Luke W." loc="Point Cruz Wharf" status="In Motion" last="Just now" />
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default LiveVehicleStatus;