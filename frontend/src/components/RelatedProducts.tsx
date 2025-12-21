import ProductCard from "./ProductCard";
import { Product } from "../types";

interface RelatedProductsProps {
  products: Product[];
  title?: string;
}

export default function RelatedProducts({
  products,
  title = "You Might Also Like",
}: RelatedProductsProps) {
  return (
    <section className="max-w-[1600px] mx-auto px-4 py-12">
      <h3 className="text-2xl font-bold mb-6">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            productId={product.id || index}
          />
        ))}
      </div>
    </section>
  );
}

