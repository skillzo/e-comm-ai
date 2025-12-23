import { ProductImage } from "../types";

interface ProductImageGalleryProps {
  images: ProductImage[];
}

export default function ProductImageGallery({
  images,
}: ProductImageGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 p-1">
      {images.map((img, index) => (
        <div
          key={index}
          className="relative bg-gray-200 aspect-[4/5] overflow-hidden group"
        >
          <img
            alt={img.alt}
            className="w-full h-full object-cover"
            src={img.src}
          />
          {index === 0 && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <span className="material-icons-outlined text-sm">
                chevron_left
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
