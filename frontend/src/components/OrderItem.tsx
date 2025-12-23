interface OrderItemProps {
  image: string;
  name: string;
  details: string;
  price: string;
  status: string;
  statusIcon?: string;
  actions: Array<{ label: string; onClick: () => void; primary?: boolean }>;
}

export default function OrderItem({ 
  image, 
  name, 
  details, 
  price, 
  status, 
  statusIcon,
  actions 
}: OrderItemProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
        <img alt={name} className="w-full h-full object-cover" src={image} />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-[#0d131b]">{name}</h3>
            <p className="text-[#4c6c9a] text-sm">{details}</p>
          </div>
          <span className="font-bold text-[#0d131b]">{price}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          {statusIcon && (
            <span className={`material-symbols-outlined text-[20px] ${
              status.includes('Delivered') ? 'text-emerald-600' : 'text-emerald-600'
            }`}>
              {statusIcon}
            </span>
          )}
          <p className={`text-sm font-medium ${
            status.includes('Delivered') ? 'text-emerald-600' : 'text-emerald-600'
          }`}>
            {status}
          </p>
        </div>
        <div className="mt-2 flex gap-3">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`${
                action.primary
                  ? 'bg-black hover:bg-blue-600 text-white'
                  : 'border border-slate-300 text-[#0d131b] hover:bg-slate-50'
              } text-sm font-bold py-2 px-4 rounded-lg transition-colors`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

