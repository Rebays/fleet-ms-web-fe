import { 
  MapPin, 
  MoreVertical 
} from 'lucide-react'; 

export function VehicleRow({ id, driver, loc, status, last }: any) {
  return (
    <tr className="hover:bg-gray-700/50 transition-colors">
      <td className="px-6 py-4 font-medium text-white">{id}</td>
      <td className="px-6 py-4">{driver}</td>
      <td className="px-6 py-4 flex items-center gap-1">
        <MapPin size={14} className="text-gray-500" /> {loc}
      </td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${status === 'In Motion' ? 'bg-green-900/40 text-green-400' : 'bg-gray-900 text-gray-400'}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-500">{last}</td>
      <td className="px-6 py-4 text-right">
        <button className="text-gray-500 hover:text-white"><MoreVertical size={16} /></button>
      </td>
    </tr>
  );
}