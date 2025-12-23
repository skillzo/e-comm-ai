import { RelatedProductCard } from "./ProductCard";
import { Product } from "../types";
import { useEffect, useState } from "react";
import { productService } from "../services/productService";

interface RelatedProductsProps {
  title?: string;
}

export default function RelatedProducts({
  title = "You Might Also Like",
}: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        // Shuffle array and take first 8
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setProducts(shuffled.slice(0, 8));
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="fcc py-20">
        <div className="border-t animate-spin w-20 h-20 border-gray-200 rounded-md p-4" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="max-w-[1600px] mx-auto px-4 py-12">
      <h3 className="text-2xl font-bold mb-6">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <RelatedProductCard key={index} product={product} />
        ))}
      </div>
    </section>
  );
}
