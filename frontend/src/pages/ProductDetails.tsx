import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProductImageGallery from "../components/ProductImageGallery";
import ColorSelector from "../components/ColorSelector";
import SizeSelector from "../components/SizeSelector";
import RelatedProducts from "../components/RelatedProducts";
import { productService } from "../services/productService";
import { useCart } from "../contexts/CartContext";
import { ProductImage, Color, Size, Product } from "../types";
import { formatNaira } from "../utils/formatCurrency";

const colors: Color[] = [
  {
    name: "Navy",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBFTogNb25lIqUBJrox2OEkLzyrrXRZDs75wvc9F8D4PZK9pKxztS3p6AMh2ovWzgYNGmi6G5NxF-ly2eyzJyL9qud50LO-Yv77lyFZn-2Hu-PJlbRTwxP6ztKFldYK3WnTcbGeN30JXcXIrjk95zw_1WJR1vhhKbMpt6x7lG6tWxLuVuDsssLFZwnvcU9QFrbywqolh9L-F4G6Zlr-5myvsxmgIDwmbRrlU2xrwRPhTfoES9sItSGSGliul56ikeU18QPhQHeRvg",
  },
  {
    name: "Black",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA-pFlybIXkdbGh6_7WQS15IejGaijJ9t8bqTfHhBqE9QjCD6DlZrboGI9JPd5gtqNVTrGYX75Q0SciY5kIy1BnIcSn3cLX2ek82Bz9sF5dbwB8IAJGY2HrFHnvhuo3zV2OF3kiViV5VOollVqdwPsk79HCTvOb1zZ-028WV-x7kAEiogoneqbGfc1sgB5FxAdk6ejaih68izDfWhJmPkXWQAvk9QfqHcI35Gbh9A9s3rEJlZ8IVrhhWNCKuhaNs2wUdIPObD9-aw",
  },
  {
    name: "White",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA56zLm37uB0X85t4a096SZ7aLHXJNDgZBvbg4PcXG4-jV6pTxTDLj_pMyrWGMasW2bRXVbgzSrWjqHRyseaCXcMzS3mfb9l-2fclEOyQsrgJ_2RdKRiTrrDp0iC7x-NhuWw7Y2nGOiNFwHhOBusskCh6HUU34evRpW4bZIIXv8sNqK05YpUSLoq5UizRBLxPMakmJoEqDCE2Cg_p1-gr3NTGjSHkEo3-WTP9Zn1Oz1PBA3rgHLRA9bljnsEakOPz34u6_C7xsC0g",
  },
  {
    name: "Green",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAoOqrXpL0RapELFgeV_wSp7IJC_3PTlXM8WXQh08qltBN4i-VK3hWsSAP9a63sfS112VVpbvZRfBEPgYGKajx_1IDS-rw4k71uHGdRgqw47YCrXKqy-oeGZ4RSyzUxbXHbX_A1Lz1_pleNocHr5lJPG1ZURJvpJQBTMuKUr748i3Gfmr6wYLxmVBVqwEq8mULCSmAq3b9AZc3OwAKFHH7q0Oqnt5BY-SuNxtHNS9KZDNTHUOILqYHL7wZ0bF7N3P318z06LZv3Vg",
  },
  {
    name: "Red",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCxQ0CRTaJUpL0B9JhDtzlvJB9iGpGw5FcSlkYogoZo6xwUH9XT5cXURritS6SLwJJx1BfU9JpPvRpCzhC3oAgB6jB6tLt2EjqhAA2QjNlgXELv_0w8id2uq7lcKw2LNCfLwvbB9q_qTAG6Of5bQBYTjEXvjGLH99U89f9me-V_thj4-Qj30nfTiSYtWSP1Bg8YbWeMMNtn1Z1_ARRKf6Xo5YNaYG9h-ECs1Czv0zrhmqVK1FnF2AaW2aJeisl4WqyxEVz04mCf1Q",
  },
  {
    name: "Gray",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-IpPBBfkoK__KSJlnWnZQwhM_qa9h4JQbP2pWvhASpgFypQyMUXaD8kyuVU_iT-h54HClZjPBLE4wzM7fVKlbNjPy_oQkfQMmydrz8-GHIutUGLr-V7X0nhnC5c6k4aBnkudqmDGwTkdexTA-LTXEqPm7TJYLW5quIz4PqHKBC7tgzryYu8kHfUHYE0ZLm0jtD9U8Z199p57mnLVh8-lPALxE429D6353Q5fDXY-n14CTiM5NntN9YkEPDWwuLQFotNxpq9fJkQ",
  },
  {
    name: "Beige",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCVoFh1d-pbx_GYuBxFMNvjctWbkwfHUm-6sGCZx5CaejtU9yA1jxt-XX3_YDjlQrPxkqzl8FKPw7Ch9CmQAKh1aaux7lJ6fsVhntzJxO7R5QWoqEuE0Fr_rnpfW7Z8cMEiUDy7kkZLEQ9tV_HtOSzP6HSTYiIw3MaDyX00T2T3XiCBDLvSNtt68YAYolCF11wB8WlM47bkfZYxTMr1A5OhRcAT1pshCsbDteX5FPvkPtK46fp71JjBEYAWOMeoZFDqi6eaPXCbqA",
  },
  { name: "Other", image: null },
];

const sizes: Size[] = [
  { value: "XS" },
  { value: "S" },
  { value: "M", disabled: true },
  { value: "L" },
  { value: "XL" },
  { value: "XXL" },
  { value: "3XL" },
];

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("Navy");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Product ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load product");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleAddToCart = () => {
    if (!product) return;

    console.log(product, selectedSize, selectedColor);
    addToCart(product, 1, selectedSize || undefined, selectedColor);
  };

  if (loading) {
    return (
      <div className="bg-background-light text-text-light min-h-screen">
        <Header />
        <main className="max-w-[1600px] mx-auto flex justify-center items-center py-20">
          <p className="text-gray-600">Loading product...</p>
        </main>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-background-light text-text-light min-h-screen">
        <Header />
        <main className="max-w-[1600px] mx-auto flex justify-center items-center py-20">
          <p className="text-red-600">Error: {error || "Product not found"}</p>
        </main>
      </div>
    );
  }

  // Convert product images if available
  const productImages: ProductImage[] = product.productImages
    ? product.productImages.map((img) => ({
        alt: img.alt || product.name,
        src: img.url || img.src || product.image || "",
      }))
    : product.image
    ? [{ alt: product.name, src: product.image }]
    : [];

  return (
    <div className="bg-background-light text-text-light">
      <div className="w-full bg-gray-100 text-center py-2 text-xs font-medium border-b border-gray-200">
        Refer A Friend To Earn ₦15,000 Off Your Next Purchase Of ₦75,000+ 👯
      </div>
      <Header />
      <main className="max-w-[1600px] mx-auto flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 flex flex-col">
          <ProductImageGallery images={productImages} />
        </div>
        <div className="w-full lg:w-1/3 p-6 lg:pl-10 lg:pt-10 sticky top-16 h-fit overflow-y-auto">
          <div className="mb-4">
            <h1 className="text-3xl font-bold mb-1 uppercase tracking-tight">
              {product.name}
            </h1>
            <p className="text-gray-600 text-sm mb-3">{product.fit}</p>
            <div className="text-xl font-medium">
              {formatNaira(product.price)}
            </div>
          </div>
          <div className="flex items-center space-x-4 mb-8">
            <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded text-xs font-medium">
              <span className="material-icons-outlined text-sm">star</span>
              <span>{product.rating}</span>
            </div>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
              <span className="material-icons-outlined text-sm">
                favorite_border
              </span>
            </button>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
              <span className="material-icons-outlined text-sm">ios_share</span>
            </button>
          </div>
          <ColorSelector
            colors={colors}
            selectedColor={selectedColor}
            onColorSelect={setSelectedColor}
          />
          <SizeSelector
            sizes={sizes}
            selectedSize={selectedSize}
            onSizeSelect={setSelectedSize}
          />

          <div className="fc gap-2 mb-4 ">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white font-bold py-4 rounded-full uppercase tracking-wide hover:opacity-90 transition active:scale-95"
            >
              Proceed to Checkout
            </button>

            <div className=" w-[20%] h-full py-4 rounded-full fcc bg-black text-white">
              <span className="material-symbols-outlined">
                add_shopping_cart
              </span>
            </div>
          </div>

          <div className="text-xs text-center text-gray-600 mb-6 mt-5">
            <div className="mb-2 text-xs">
              <span className="font-bold text-blue-600 text-sm">PayPal</span>
              <span>
                Pay in 4 interest-free payments on purchases of
                ₦45,000-₦2,250,000.
              </span>
              <a className="underline font-bold text-black" href="#">
                Learn more
              </a>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>Also available at checkout:</span>
              <span className="font-bold text-black">Klarna.</span>
              <span className="font-bold text-black">
                afterpay
                <span className="transform rotate-180 inline-block">7</span>
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <button
              onClick={() => toggleSection("description")}
              className="w-full flex justify-between items-center py-2 text-left font-medium"
            >
              <span>Description</span>
              <span className="material-icons-outlined">
                {expandedSections.description ? "remove" : "add"}
              </span>
            </button>
            {expandedSections.description && product.description && (
              <div
                className="py-2 text-sm text-gray-600"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}
          </div>
        </div>
      </main>
      <RelatedProducts />
    </div>
  );
}
