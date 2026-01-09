export function AlertItem({ entity, type, text, severity }: { entity: string, type: string, text: string, severity: 'high' | 'medium' | 'low' }) {
  const borderColors = {
    high: 'border-red-500',
    medium: 'border-yellow-500',
    low: 'border-blue-500'
  };

  return (
    <div className={`flex flex-col p-3 rounded-lg bg-gray-900 border-l-4 ${borderColors[severity]}`}>
      <span className="text-[10px] uppercase font-bold text-gray-500">{type}</span>
      <p className="text-sm text-gray-200 mt-1">{entity} - {text}</p>
    </div>
  );
}