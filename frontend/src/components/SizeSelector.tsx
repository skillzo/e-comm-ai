import { Size } from "../types";

interface SizeSelectorProps {
  sizes: Size[];
  selectedSize: string | null;
  onSizeSelect: (size: string) => void;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSizeSelect,
}: SizeSelectorProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-medium">Select a size</p>
        <button className="flex items-center text-xs underline font-medium hover:text-gray-600">
          <span className="material-icons-outlined text-sm mr-1">
            straighten
          </span>
          Size Guide
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {sizes.map((size) => (
          <button
            key={size.value}
            onClick={() => !size.disabled && onSizeSelect(size.value)}
            disabled={size.disabled}
            className={`border ${
              size.value === selectedSize
                ? "border-black"
                : "border-gray-300 hover:border-black"
            } rounded py-3 text-sm font-medium transition ${
              size.disabled ? "opacity-50 relative cursor-not-allowed" : ""
            }`}
          >
            {size.value}
            {size.disabled && (
              <>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-6 bg-gray-400 rotate-45"></span>
                <span className="absolute top-1 right-2 material-icons-outlined text-[10px] text-gray-500">
                  notifications_none
                </span>
              </>
            )}
          </button>
        ))}
      </div>
      <div className="mt-4 flex items-center text-xs text-gray-600">
        <span className="material-icons-outlined text-green-600 mr-2 text-sm">
          check_circle
        </span>
        <span>
          Customers say it fits{" "}
          <span className="underline text-black font-medium">true to size</span>
        </span>
      </div>
    </div>
  );
}
