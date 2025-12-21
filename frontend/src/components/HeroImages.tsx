import { HeroImage } from "../types";

interface HeroImagesProps {
  images: HeroImage[];
}

export default function HeroImages({ images }: HeroImagesProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-16">
      {images.map((img, index) => (
        <div key={index} className="aspect-[3/4] overflow-hidden bg-gray-100">
          <img
            alt={img.alt}
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
            src={img.src}
          />
        </div>
      ))}
    </div>
  );
}

