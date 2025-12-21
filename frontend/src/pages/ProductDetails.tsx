import { useState } from "react";
import Header from "../components/Header";
import ProductImageGallery from "../components/ProductImageGallery";
import ColorSelector from "../components/ColorSelector";
import SizeSelector from "../components/SizeSelector";
import RelatedProducts from "../components/RelatedProducts";
import { ProductImage, Color, Size, Product } from "../types";

const productImages: ProductImage[] = [
  {
    alt: "Man wearing navy athletic shorts front view",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMbpZ2XMGHOI5w5rVLYBELjDjcroaXzZAsfI3vY1i1EFGARY4oH2WZNJS2CCpwCOaOiGDYtqFxv8Oa6EjcxYrOa7abvnc0W2viMEIJOqy2CW7Vp59q8mTEHXkqfgWi3EKLW1ddvFapY8pDrwvnKW4ezzTga0qUrqzwf_BiAlnHWNyZWWxHup-oHrdjxfjRekACx8fxIqHTrK9XX-z-ESIXIGkq9gAXMAXFUoF1Tr3jovh1MIUrgvQE2IfIiWuS_VY7RS3mlrCbww",
  },
  {
    alt: "Man wearing navy athletic shorts side view",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ1fHb_s-0fKa65neCCU6uD5EnMAJ3-I8EajzKMzaHVWCeWzUUwVr5V_D8CfNFEFdYtgxFD8RbchI4TJyqZbmlO4tZlU5swVKxHYCRdhwCqXk6U30YD8EglbrudHGtot6SYgV-J3PfEKHgNWUtVSSgwGbCHc2b6V_0ETdYuTbfOsunXaP9HDs5mVJ0-fvLV9D8X1ny8rBgXJvlHjgvH5Z1ALMXHu0ARLwcn43rOywTFcQswPEqDR1FZl2m5zlpvqBgxRON1hIoGw",
  },
  {
    alt: "Close up of athletic shorts fabric and texture",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2pgtCSK9l8kw1L2waT3VlCAUeBrgoCl8prPxLQIMDfuk0ODb-rIwXCfmXkF7H5XeJJb5HQ2f2GCrOGj0hOxnMhxAanFXFinEjE3txySE4cLexCPIXcSw3fxsiPBwkIP7KoMaPO3tEhLVVSG2e7S3xqcAxziZ76hLhMUC5OeXwV3fjvM5rl8sMKxLPlKTtrzz58gWROsqOKgJ98o4ASk1dZ4rlx55WV35tirquqDddZHBl3HopX4fpp1eJHZ3ZvMmPnjJQg1iQUg",
  },
  {
    alt: "Man stretching in athletic gear",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8AfqIcie5K5HDsNsuPO3oHRTpPqRNJ795RF1vHy0Z_nPDSGJOpqr2fj1JVNUY65UnybWIbXOATwbb1z2SN-ipv0alyx15nmcO8cTrNibJ-6AvdxocnuCyR8tw-bidqhGdOw-mH8GPBL0lhSVkmtApznb34Mx0q6eOnyzKSMdDz5N7XIcv2QsKKkSod0kY8D81rucJxr23vE3XB7eULASYwl50FDTcZlMJQ_WmZS4oYj-nG54KqzJYPFbPj9BalcOgOlbbWy8Nbw",
  },
];

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

const relatedProducts: Product[] = [
  {
    name: 'Arrival 5" Shorts',
    fit: "Slim Fit",
    color: "Core Olive",
    rating: 4.3,
    price: 26,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAzPMwnlrQ38tJ-0LXiuLdJ-4hLKKajmGTYISPjQ9EscZU9hPZUzKs3ytpaKRu4TOQPmGFM3RuUIPdbthyjCyoNd3UV71RAlbTm8Vq3DnabnAXjsRHpnjpuNXVzglSZmDYuanuQM23EAlwp82jwjVB91wneR2l4XYH3bcG2yoWglNXmYEVoHV4GkbcQoZWcNXi-aqw2sfJjrG0suL4-wTRoL6V7d53oZCTLn2G5btaoIVCsRkWeS2Zfa89qmLge-ztDBMdy4-KQ9Q",
  },
  {
    name: 'Arrival 5" Shorts',
    fit: "Slim Fit",
    color: "Navy",
    rating: 4.3,
    price: 26,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDo3OglIxF17M1mYwMsLIVw5GVPhCHLgeY4B8afY2zlidDhe1jk8FZFkubTnNQLTwaRz6E0Q-6Nqnr4e_GLVE3m6BiP6jsckeTiiBS7m6dwLl0UXr-qPkXOHbh06K2h16raRvquBWsyiZ1zTsYg_cxq5S8RW7avCf2b-SNJOEMV9pXkGF5I3lBV8sOKVyL4IG4cuYgcBa5yEj9AkwI8H97bNLly7jVd6xEkRS7fDanoR8fCNgiSNMBW3Gt43k26hPWGcTkjkYvbvw",
  },
  {
    name: 'Arrival 7" Shorts',
    fit: "Slim Fit",
    color: "Silhouette Grey",
    rating: 4.2,
    price: 26,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCecSA5cvwNVZGoMGdZQjep4XREM_JLIsmU7GcXXpc5WPJUBFegseRpZse6K1m_DUEGyDHjoODjCct87RG5warRwDm4p22TTCo4HN9lkzA3zXTESPuJVwuOHJnkurHPBI7-1ZlGlxOZ_t2HqIp-N0-f4mwEmB_A7hZCakrfckNI3ZZT3Yz2qg_h0UzZMVkCtfLycwlmy6I57yKt020I-oUFeAwJ5igkLehB5mPHjqlp60AMDEW1RDH0rYisRuLs91dKTI0W1319Pg",
  },
  {
    name: 'Arrival 7" Shorts',
    fit: "Slim Fit",
    color: "Core Olive",
    rating: 4.2,
    price: 26,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC7PpP4xDJ48l1al2TVUwSooJtyWdW0Tue77ByDu7cuaTR-EpKyQVbeKXJG5Z-_wACajgD2qYYzhS6CyAFIewPlIHbEKrVAj7s3OktWWLCkJmxyITWIaJlorOpf4099tZOLqdoV_SldAyCaUB9g0qHQMLoFrDFKzVdPcKegtT2FNJiEUUJ4bvomnnuFz9MWu2KMyArX3qTEv9ziGmKtcSMyzaAapL7WInakKmKetEHp_tP_WKEAf6Eb8R5d653NHYUKYHQmEbocwA",
  },
];

export default function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState<string>("Navy");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="bg-background-light text-text-light">
      <div className="w-full bg-gray-100 text-center py-2 text-xs font-medium border-b border-gray-200">
        Refer A Friend To Earn $10 Off Your Next Purchase Of $50+ 👯
      </div>
      <Header />
      <main className="max-w-[1600px] mx-auto flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 flex flex-col">
          <ProductImageGallery images={productImages} />
        </div>
        <div className="w-full lg:w-1/3 p-6 lg:pl-10 lg:pt-10 sticky top-16 h-fit overflow-y-auto">
          <div className="mb-4">
            <h1 className="text-3xl font-bold mb-1 uppercase tracking-tight">
              Arrival 5" Shorts
            </h1>
            <p className="text-gray-600 text-sm mb-3">Slim Fit</p>
            <div className="text-xl font-medium">$26</div>
          </div>
          <div className="flex items-center space-x-4 mb-8">
            <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded text-xs font-medium">
              <span className="material-icons-outlined text-sm">star</span>
              <span>4.3</span>
              <span className="underline text-gray-500 ml-1">(1123)</span>
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
          <button className="w-full bg-primary text-white font-bold py-4 rounded uppercase tracking-wide hover:opacity-90 transition mb-4">
            Add to bag
          </button>
          <div className="text-xs text-center text-gray-600 mb-6">
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="font-bold text-blue-600 text-sm">PayPal</span>
              <span>
                Pay in 4 interest-free payments on purchases of $30-$1,500.
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
            <button
              onClick={() => toggleSection("materials")}
              className="w-full flex justify-between items-center py-2 text-left font-medium"
            >
              <span>Materials & Care</span>
              <span className="material-icons-outlined">
                {expandedSections.materials ? "remove" : "add"}
              </span>
            </button>
          </div>
        </div>
      </main>
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}

