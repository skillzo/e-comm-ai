import { useEffect, useState } from "react";
import TopBanner from "../components/TopBanner";
import Header from "../components/Header";
import CategoryBanner from "../components/CategoryBanner";
import HeroImages from "../components/HeroImages";
import ProductGrid from "../components/ProductGrid";
import LoadMore from "../components/LoadMore";
import { HeroImage, Product } from "../types";
import { productService } from "../services/productService";

const heroImages: HeroImage[] = [
  {
    alt: "Male runner sprinting in black tank top",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkU1rKhd_VHVL_aOsqdJf5vbVItlOYOQOc3dSvJlqwgQ8qxHuQGKgvz2jFBs6P4JJg33VkSPhq32IncvUFW0q7vK2tHYl8W6vDbv2chn58YKNsr8KwkY9qoReA3VIjcZqtqCtOXpieKHtby2wJnlUJkD4GbRfk8qAcPzoTXlEZom0RWFJpZFVQU7hzUsuL3oL30I3BSrpC0I-DMRp-cKrXoIRBJ0WpXoJOfynXMSEhiAJPJ7K7_mbGgqfu_byGgIjUC7DyLE50bg",
  },
  {
    alt: "Male runner stretching in long sleeve grey top",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_vmERVcVcJl3qPUP--uV-6w0kA10duzTtdOJD62ivJC4R90zoBn9f-mIqDssGAFosSPwRFKL2WQ0wgMhxhrK7hD_w-YG_AJXZUshulgFAtbIwSjLad_rq0ddlkOFq83KRiifuWikvK5V_cjiv9ECv4jQycPzoZDqkjaQpalcRybx9utBZ65gXPzEJiBMCLh8IJiJya_kY0qNFjFHVBkruWMNVO5Vha3hWBtiZhi9O0Q52102rPRgQoaPjseUTd43TnGZ_srsYKg",
  },
  {
    alt: "Male runner in motion wearing black long sleeve",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMqalQFwkREtul1xJMhHdKopt_DtowUkohSwiCw_kC-ZSwAsXMHNc4Q-HZtEXYIPDK39HcfK9S3xlXHc_b_glkMwkn6y8VclKP2Z1j6hwPPNJUCQSK8agrds1x823Tgu3nGcFKC598TeCD9F9ctud3KVlxp1WPA5f32OUKxbxpVHLWrv9ocqFS5q6IjgVupeQaE6MZTpvOVP_mEfe6ihdnVAB12pkxVBZJWRhuG_jWRJ2S_S6fwVlRKyM0CD1wc6q3zR2hhmdpbA",
  },
  {
    alt: "Male runner stretching leg in white shorts",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1JMOihMXPjuE_2DK0QjGUkNx6drICY8OmkDyxL8F0_qEEzZNzgLA2BLeF36SvfTRp8bwg0AjxFQ9EQ65AmhfiaSdirQqJJUJJrBU2Ccc9M2awpFsg57Pw69kvWN2tERQx2u0JpqiWSg-Z2EaFobRtNZoQ-KRgvAUiGn6FQO7tuwghW7M3IB38yQO-s1TMhTEY1duHX5Quas9j5ESGSqC9TY1XiuWjXlgqYScVoHi2Z77M1WgHct6OrxgB0lZP0NTSw7W7E0iBjA",
  },
];

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        setProducts(data);
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
      <div className="bg-background-light text-text-light min-h-screen">
        <TopBanner />
        <Header />
        <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-600">Loading products...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background-light text-text-light min-h-screen">
        <TopBanner />
        <Header />
        <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
          <div className="flex justify-center items-center py-20">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-background-light text-text-light">
      <TopBanner />
      <Header />
      <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
        <CategoryBanner
          category="Mens"
          productCount={products.length.toString()}
          description="Moisture-wicking, breathable and designed to enhance performance whilst providing maximum comfort. Our men's running clothes match functionality with on-trend aesthetics. Features such as discreet pockets allow you to run free and sweat-wicking materials will keep you at the optimal temperature so you can run without distraction. Headphones in, laces up, world out and let's go."
        />
        <HeroImages images={heroImages} />

        <ProductGrid products={products} />
        <LoadMore showing={products.length} total={products.length} />
      </main>
    </div>
  );
}
