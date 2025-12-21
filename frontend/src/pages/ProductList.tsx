import TopBanner from "../components/TopBanner";
import Header from "../components/Header";
import CategoryBanner from "../components/CategoryBanner";
import HeroImages from "../components/HeroImages";
import ProductGrid from "../components/ProductGrid";
import LoadMore from "../components/LoadMore";
import { HeroImage, Product } from "../types";

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

const products: Product[] = [
  {
    name: 'Arrival 5" Shorts',
    fit: "Slim Fit",
    color: "Navy",
    rating: 4.3,
    price: 26,
    image:
      "https://cdn.shopify.com/s/files/1/0156/6146/files/Arrival5ShortsNavyA2A1M-UBCY-1902_3840x.jpg?v=1747817865",
  },
  {
    name: "Running T-Shirt",
    fit: "Slim Fit",
    color: "Black",
    rating: 4.3,
    price: 22,
    image:
      "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ANNOTATED_PDP_23926318_3840x.jpg?v=1756243777",
  },
  {
    name: "Element Tank Top",
    fit: "Slim Fit",
    color: "White",
    rating: 4.2,
    price: 22,
    image:
      "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ElementTankGSWhiteA2C4U_WB57_0185_1920x.jpg?v=1747310780",
  },
  {
    name: 'Sport 5" Shorts',
    fit: "Slim Fit",
    color: "White",
    rating: 4.2,
    price: 22,
    image:
      "https://cdn.shopify.com/s/files/1/0156/6146/files/Sport5-ShortGSHeavyBlue-GSIronBlueA1B3M-UCY1-1608-0180_1920x.jpg?v=1742825782",
  },
  {
    name: 'Arrival Block 6" Shorts',
    fit: "Slim Fit",
    color: "Cement Brown",
    rating: 4.5,
    price: 30,
    image:
      "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ArrivalGoodLevelNewnessshortGSCementBrownA3B9Y_NBZD_0771_V2_1920x.jpg?v=1761667498",
  },
  {
    name: "Crew Socks 3pk",
    fit: "Fit",
    color: "Black",
    rating: 4.1,
    price: 16,
    image:
      "https://cdn.shopify.com/s/files/1/0156/6146/files/CrewSocks3pk-GSBlack-I3A3P-BB2J-0164copy_9f2c5279-f865-4772-8392-225c32d24180_1920x.jpg?v=1689185931",
  },
  {
    name: "Running 1/4 Zip",
    fit: "Slim Fit",
    color: "Iron Blue",
    rating: 3.7,
    price: 50,
    image:
      "https://cdn.shopify.com/s/files/1/0156/6146/files/images-SpeedReplacement14ZipGSIronBlueA3C1O_UCTM_0156_1920x.jpg?v=1756243652",
  },
  {
    name: 'Sport 7" Shorts',
    fit: "Slim Fit",
    color: "Amry Grey",
    rating: 4.4,
    price: 38,
    image:
      "https://cdn.shopify.com/s/files/1/0156/6146/files/images-Sport7ShortREP_M_A0085GSMetalGreyGSBlackA1B3L_GDN4_1385_1920x.jpg?v=1753718652",
  },
];

export default function ProductList() {
  return (
    <div className="bg-background-light text-text-light">
      <TopBanner />
      <Header />
      <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
        <CategoryBanner
          category="Mens"
          productCount="209"
          description="Moisture-wicking, breathable and designed to enhance performance whilst providing maximum comfort. Our men's running clothes match functionality with on-trend aesthetics. Features such as discreet pockets allow you to run free and sweat-wicking materials will keep you at the optimal temperature so you can run without distraction. Headphones in, laces up, world out and let's go."
        />
        <HeroImages images={heroImages} />

        <ProductGrid products={products} />
        <LoadMore showing={8} total={209} />
      </main>
    </div>
  );
}

