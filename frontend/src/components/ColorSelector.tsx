import { Color } from "../types";

interface ColorSelectorProps {
  colors: Color[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export default function ColorSelector({
  colors,
  selectedColor,
  onColorSelect,
}: ColorSelectorProps) {
  return (
    <div className="mb-8">
      <p className="text-sm mb-3 font-medium">
        Color:{" "}
        <span className="text-gray-600 font-normal">{selectedColor}</span>
      </p>
      <div className="grid grid-cols-6 gap-2">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => onColorSelect(color.name)}
            className={`${
              color.name === selectedColor
                ? "ring-2 ring-black"
                : "hover:ring-1 hover:ring-gray-400"
            } rounded overflow-hidden aspect-square`}
          >
            {color.image ? (
              <img
                alt={color.name}
                className={`w-full h-full object-cover ${
                  color.name === selectedColor
                    ? ""
                    : "opacity-80 hover:opacity-100"
                }`}
                src={color.image}
              />
            ) : (
              <div className="relative bg-gray-100 flex items-center justify-center w-full h-full">
                <span className="material-icons-outlined text-gray-400 text-lg">
                  image_not_supported
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
      <a
        className="text-xs text-gray-500 mt-2 underline block hover:text-black"
        href="#"
      >
        Show more colours
      </a>
    </div>
  );
}

