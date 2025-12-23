import OrderItem from './OrderItem';
import TrackingStepper from './TrackingStepper';

interface OrderItemData {
  image: string;
  name: string;
  details: string;
  price: string;
  status: string;
  statusIcon?: string;
  actions: Array<{ label: string; onClick: () => void; primary?: boolean }>;
}

interface TrackingStep {
  label: string;
  date: string;
  icon: string;
  completed: boolean;
  active?: boolean;
}

interface OrderCardProps {
  orderNumber: string;
  orderDate: string;
  total: string;
  shipTo: string;
  items: OrderItemData[];
  trackingSteps: TrackingStep[];
  collapsed?: boolean;
}

export default function OrderCard({
  orderNumber,
  orderDate,
  total,
  shipTo,
  items,
  trackingSteps,
  collapsed = false
}: OrderCardProps) {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      <div className="flex flex-wrap justify-between items-center gap-4 bg-slate-50 p-4 md:px-6 border-b border-slate-100">
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <div className="flex flex-col">
            <span className="text-[#4c6c9a] text-xs font-medium uppercase tracking-wider">Order Placed</span>
            <span className="text-[#0d131b] text-sm font-medium">{orderDate}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#4c6c9a] text-xs font-medium uppercase tracking-wider">Total</span>
            <span className="text-[#0d131b] text-sm font-medium">{total}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#4c6c9a] text-xs font-medium uppercase tracking-wider">Ship To</span>
            <div className="group relative flex items-center gap-1 cursor-pointer">
              <span className="text-black text-sm font-medium hover:underline">{shipTo}</span>
              <span className="material-symbols-outlined text-black text-[16px]">expand_more</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[#4c6c9a] text-xs font-medium uppercase tracking-wider">Order # {orderNumber}</span>
          <div className="flex gap-3 text-sm font-medium text-black mt-1">
            <a className="hover:underline" href="#">View Details</a>
            <span className="text-slate-300">|</span>
            <a className="hover:underline" href="#">Invoice</a>
          </div>
        </div>
      </div>
      <div className="p-6 flex flex-col gap-8">
        {items.map((item, index) => (
          <div key={index}>
            <OrderItem {...item} />
            {index < items.length - 1 && <hr className="border-slate-100 mt-6" />}
          </div>
        ))}
        <TrackingStepper steps={trackingSteps} collapsed={collapsed} />
      </div>
    </div>
  );
}

