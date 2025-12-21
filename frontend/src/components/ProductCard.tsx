import { Link } from "react-router-dom";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  productId?: number | string;
}

export default function ProductCard({ product, productId }: ProductCardProps) {
  const cardContent = (
    <>
      <div className="relative aspect-[4/5] bg-gray-100 mb-4 overflow-hidden rounded-sm">
        <img
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          src={product.image}
        />
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100">
          <span className="material-icons-outlined text-lg">
            favorite_border
          </span>
        </button>
        {product.badge && (
          <div
            className={`absolute bottom-3 left-3 ${product.badge.bgColor} text-white text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider`}
          >
            {product.badge.text}
          </div>
        )}
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-base mb-1 group-hover:underline">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-1">{product.fit}</p>
          <p className="text-sm text-gray-500">{product.color}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center text-xs font-bold mb-1">
            <span className="material-icons text-xs mr-1">star</span>{" "}
            {product.rating}
          </div>
        </div>
      </div>
      <div className="mt-2 font-bold text-lg">${product.price}</div>
    </>
  );

  if (productId !== undefined) {
    return (
      <Link to={`/product/${productId}`} className="group cursor-pointer block">
        {cardContent}
      </Link>
    );
  }

  return <div className="group cursor-pointer">{cardContent}</div>;
}

