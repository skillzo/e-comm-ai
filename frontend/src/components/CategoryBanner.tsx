interface CategoryBannerProps {
  category: string;
  productCount: string;
  description: string;
}

export default function CategoryBanner({
  category,
  productCount,
  description,
}: CategoryBannerProps) {
  return (
    <div className="mb-12">
      <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
        {category}
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold uppercase mb-4 tracking-tight">
        Running
      </h1>
      <p className="text-sm text-gray-500 mb-6">{productCount} Products</p>
      <div className="max-w-3xl">
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
          {description}
        </p>
      </div>
    </div>
  );
}

