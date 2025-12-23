import { useState } from "react";

export default function TopBanner() {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gray-100 text-xs text-center py-2 px-4 flex justify-between items-center border-b border-gray-200">
      <span className="flex-1 text-center font-medium">
        Get 10% off your first order when you sign up to our emails ✉️
      </span>
      <button
        onClick={() => setIsVisible(false)}
        className="text-gray-500 hover:text-gray-800"
      >
        <span className="material-icons-outlined text-sm">close</span>
      </button>
    </div>
  );
}
