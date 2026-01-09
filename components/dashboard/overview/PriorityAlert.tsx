import { AlertCircle } from "lucide-react";
import { AlertItem } from "./AlertItem";

interface Alert {
    index: string,
    type: string,
    entity: string,
    text: string,
    severity: "high" | "medium" | "low"
}

const alerts: Alert[] = [
    {index: '1', type: 'Service', entity: 'Toyota Hilux (HNR-123)', text: 'Oil Change Overdue', severity: 'high'},
    {index: '2', type: 'License', entity: 'Isuzu Truck (HNR-456)',  text: 'Registration Expires in 3 days', severity: 'medium'},
    {index: '3', type: 'Safety', entity: 'Driver John Doe', text: 'Hard Braking Detected (3x)', severity: 'low'}
]

function PriorityAlerts() {
    return ( 
         
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center gap-2 mb-4 text-white">
            <AlertCircle size={18} className="text-red-500" />
            <h3 className="text-lg font-semibold">Priority Alerts</h3>
          </div>

          <div className="space-y-4">
            {alerts.map((alert) => (
              <AlertItem 
                key={alert.index}
                entity={alert.entity} 
                type={alert.type} 
                text={alert.text} 
                severity={alert.severity} 
              />
            ))}
          </div>

          <button 
            className="cursor-pointer w-full mt-6 py-2 text-sm text-gray-400 hover:text-white transition border border-dashed border-gray-600 rounded-lg">
            View All Alerts
          </button>

        </div>
     );
}

export default PriorityAlerts;