interface TrackingStep {
  label: string;
  date: string;
  icon: string;
  completed: boolean;
  active?: boolean;
}

interface TrackingStepperProps {
  steps: TrackingStep[];
  collapsed?: boolean;
}

export default function TrackingStepper({ steps, collapsed = false }: TrackingStepperProps) {
  if (collapsed) {
    const completedStep = steps.find(step => step.completed && !step.active);
    return (
      <div className="bg-slate-50 rounded-xl p-4 mt-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white">
            <span className="material-symbols-outlined text-[18px]">check</span>
          </div>
          <div>
            <p className="text-sm font-bold text-[#0d131b]">Package Delivered</p>
            <p className="text-xs text-[#4c6c9a]">Was left at front porch</p>
          </div>
        </div>
        <button className="text-black text-sm font-bold hover:underline">View Tracking History</button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 rounded-xl p-6 mt-2">
      <h4 className="font-bold text-[#0d131b] mb-6">Delivery Status</h4>
      <div className="relative flex flex-col md:flex-row justify-between w-full">
        <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-200 md:left-2 md:right-2 md:top-[15px] md:h-0.5 md:w-auto md:bottom-auto -z-0"></div>
        {steps.map((step, index) => (
          <div key={index} className="relative z-10 flex md:flex-col items-center gap-4 md:gap-2 mb-6 md:mb-0 last:mb-0">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step.completed || step.active
                ? 'bg-black text-white ring-4 ring-slate-50'
                : 'bg-slate-200 text-slate-400 ring-4 ring-slate-50'
            } ${step.active ? 'shadow-[0_0_0_4px_rgba(19,109,236,0.2)]' : ''}`}>
              <span className="material-symbols-outlined text-[18px]">{step.icon}</span>
            </div>
            <div className="text-left md:text-center pt-0 md:pt-2">
              <p className={`text-sm font-bold ${
                step.completed || step.active
                  ? 'text-black'
                  : 'text-slate-400'
              }`}>
                {step.label}
              </p>
              <p className="text-xs text-[#4c6c9a]">{step.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

