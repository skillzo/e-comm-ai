import TopBanner from "../components/TopBanner";
import Header from "../components/Header";
import CategoryBanner from "../components/CategoryBanner";
import HeroImages from "../components/HeroImages";
import ProductGrid from "../components/ProductGrid";
import LoadMore from "../components/LoadMore";

const heroImages = [
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

const products = [
  {
    name: 'Arrival 5" Shorts',
    fit: "Slim Fit",
    color: "Navy",
    rating: 4.3,
    price: 26,
    description:
      "<h1>REDEFINING YOUR POTENTIAL</h1><p>Train freely and purposefully in the Arrival 5” Shorts. With a short 5-inch inseam alongside a lightweight, sweat-wicking material and supportive adjustable waistband, you can trust that these shorts will allow you to move in every direction with ease and confidence, rep after rep or step after step.</p><ul><li>Slim fit</li><li>Woven short</li><li>5” in-seam</li><li>Lightweight material</li><li>Sweat-wicking</li><li>Elasticated drawcord waistband</li><li>Open side pockets</li><li>Heat-sealed Gymshark logo to thigh</li><li>100% Polyester</li><li>Model is 5'11\" and wears size M</li><li>SKU: A2A1M-UBCY</li></ul>",
    image:
      "https://cdn.shopify.com/s/files/1/0156/6146/files/Arrival5ShortsNavyA2A1M-UBCY-1902_3840x.jpg?v=1747817865",

    productImages: [
      {
        alt: "Man wearing navy athletic shorts front view",
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/Arrival5ShortsNavyA2A1M-UBCY-4050_A_3840x.jpg?v=1747817865",
      },
      {
        alt: "Man wearing navy athletic shorts side view",
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/Arrival5ShortsNavyA2A1M-UBCY-1902_3840x.jpg?v=1747817865",
      },
      {
        alt: "Close up of athletic shorts fabric and texture",
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/Arrival5ShortsNavyA2A1M-UBCY-1924_3840x.jpg?v=1747817865",
      },
      {
        alt: "Man wearing navy athletic shorts back view",
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/Arrival5ShortsNavyA2A1M-UBCY-1921_3840x.jpg?v=1747817865",
      },
      {
        alt: "Man wearing navy athletic shorts close up video",
        src: "https://us.checkout.gymshark.com/cdn/shop/videos/c/vp/63b8dde8c14d4c88b253f545e31109a7/63b8dde8c14d4c88b253f545e31109a7.HD-720p-4.5Mbps-54738256.mp4",
      },
    ],
  },
  {
    name: "Running T-Shirt",
    fit: "Slim Fit",
    color: "Black",
    rating: 4.3,
    price: 22,
    description:
      "<h1>LIGHTWEIGHT, REFLECTIVE RUNNING LAYERS</h1><p>So good, they’ll (almost) make you want to do cardio. Whether you’re just ticking off your daily miles or training for a marathon, our running collection keeps you going with breathable, sweat-wicking fabrics, soft brushed linings and reflective details to keep you safe.</p><ul><li>Physique-enhancing seams</li><li>Side splits for more freedom of movement</li><li>Reflective logos for increased visibility in the dark</li><li>Sweat-wicking tech keeps you cool &amp; dry &amp; focused on the road (or treadmill) ahead</li><li>So lightweight it’ll knock at least 5 seconds off your time</li></ul><h2>SIZE &amp; FIT</h2><ul><li>Slim fit</li><li>Model is 6'0\" and wears size M</li></ul><h2>MATERIALS &amp; CARE</h2><p>91% Recycled Polyester, 9% Elastane</p><p><strong>SKU:</strong> A3C2S-BB2J</p>",
    image:
      "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ANNOTATED_PDP_23926318_3840x.jpg?v=1756243777",
    productImages: [
      {
        alt: "Man wearing black running t-shirt front view",
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-SpeedReplacementT_ShirtGSBlackA3C2S_BB2J_0088_3840x.jpg?v=1756243777",
      },
      {
        alt: "Man wearing black running t-shirt side view",
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ANNOTATED_PDP_23926318_3840x.jpg?v=1756243777",
      },
      {
        alt: "Man wearing black running t-shirt back view",
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-SpeedReplacementT_ShirtGSBlackA3C2S_BB2J_0102_3840x.jpg?v=1756243777",
      },
      {
        alt: "Man wearing black running t-shirt close up",
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-SpeedReplacementT_ShirtGSBlackA3C2S_BB2J_0098_3840x.jpg?v=1756243777",
      },
    ],
  },
  {
    name: "Element Tank Top",
    fit: "Slim Fit",
    color: "White",
    rating: 4.2,
    price: 22,
    description:
      "<h1>PHYSIQUE FIRST</h1><p>Whether you’re layering up or down, these physique-enhancing fits are the one.</p><ul><li>Ultra-tight compression fit top</li><li>Additional mesh panels to the seams for extra stretch</li><li>Sleeveless design for agility</li><li>Stay cool &amp; dry with sweat-wicking tech</li></ul><h2>SIZE &amp; FIT</h2><ul><li>Compressive fit: ultra-tight fit, like a second skin</li><li>Regular length</li><li>Model is 5'9\" and wears a size L</li></ul><h2>MATERIALS &amp; CARE</h2><p>84% Polyester, 16% Elastane</p><p><strong>SKU:</strong> A2C4U-WB57</p>",
    image:
      "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ElementTankGSWhiteA2C4U_WB57_0185_1920x.jpg?v=1747310780",
    productImages: [
      {
        alt: "Man wearing white element tank top front view",
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ElementTankGSWhiteA2C4U_WB57_0182_1920x.jpg?v=1747310780",
      },
      {
        alt: "Man wearing white element tank top side view",
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ElementTankGSWhiteA2C4U_WB57_0185_1920x.jpg?v=1747310780",
      },
      {
        alt: "Man wearing white element tank top back view",
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ElementTankGSWhiteA2C4U_WB57_0203_1920x.jpg?v=1747310780",
      },
      {
        alt: "Man wearing white element tank top close up",
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ElementTankGSWhiteA2C4U_WB57_0205_1920x.jpg?v=1747310780",
      },
    ],
  },
  {
    name: 'Sport 5" Shorts',
    fit: "Slim Fit",
    color: "White",
    rating: 4.2,
    price: 22,
    description:
      "<h1>WORK FOR THE REWARD</h1><p>Sport is here to support you through every set, step &amp; HIIT session, so you can focus on what matters most. Working for that reward.</p><ul><li>Breathable design to keep you cool</li><li>Reflective logos for increased visibility</li><li>Drawcord waist for adjustability</li><li>Zipped pockets to store your stuff</li></ul><h2>SIZE &amp; FIT</h2><ul><li>Slim fit</li><li>5” inseam based on a size M</li><li>Model is 6'1\" and wears a size M</li></ul><h2>MATERIALS &amp; CARE</h2><p>100% Polyester</p><p><strong>SKU:</strong> A1B3M-UCY1</p>",
    image:
      "https://cdn.shopify.com/s/files/1/0156/6146/files/Sport5-ShortGSHeavyBlue-GSIronBlueA1B3M-UCY1-1608-0180_1920x.jpg?v=1742825782",
    productImages: [
      {
        alt: 'Man wearing white sport 5" shorts front view',
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/Sport5-ShortGSHeavyBlue-GSIronBlueA1B3M-UCY1-1608-0180_1920x.jpg?v=1742825782",
      },
      {
        alt: 'Man wearing white sport 5" shorts side view with full fit style',
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/Sport5-ShortGSHeavyBlue-GSIronBlueA1B3M-UCY1-1602-0179_1920x.jpg?v=1742825782",
      },
      {
        alt: 'Man wearing white sport 5" shorts back view',
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/Sport5-ShortGSHeavyBlue-GSIronBlueA1B3M-UCY1-1623-0182_1920x.jpg?v=1742825782",
      },
      {
        alt: 'Man wearing white sport 5" shorts close up',
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/Sport5-ShortGSHeavyBlue-GSIronBlueA1B3M-UCY1-1630-0184_1920x.jpg?v=1742825782",
      },
    ],
  },
  {
    name: 'Arrival Block 6" Shorts',
    fit: "Slim Fit",
    color: "Cement Brown",
    rating: 4.5,
    price: 30,
    description:
      "<h1>PROGRESS MADE DAILY</h1><p>Made with essential performance technology, Arrival is built to make progress in, whether it’s advancing your conditioning or pushing for that extra mile.</p><ul><li>Sweat-wicking tech to keep you cool &amp; dry when you’re on the move</li><li>Crafted from comfortable lightweight materials</li><li>Contrast panels &amp; piping</li><li>Internal drawcord waist to get the right fit</li></ul><h2>SIZE &amp; FIT</h2><ul><li>Slim fit</li><li>Model is 6'0\" and wears size M</li></ul><h2>MATERIALS &amp; CARE</h2><p>100% Recycled Polyester</p><p><strong>SKU:</strong> A3B9Y-NBZD</p>",
    image:
      "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ArrivalGoodLevelNewnessshortGSCementBrownA3B9Y_NBZD_0771_V2_1920x.jpg?v=1761667498",
    productImages: [
      {
        alt: 'Man wearing cement brown arrival block 6" shorts front view',
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ArrivalGoodLevelNewnessshortGSCementBrownA3B9Y_NBZD_0771_V2_1920x.jpg?v=1761667498",
      },
      {
        alt: 'Man wearing cement brown arrival block 6" shorts side view',
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ArrivalGoodLevelNewnessshortGSCementBrownA3B9Y_NBZD_0776_V2_1920x.jpg?v=1761667498",
      },
      {
        alt: 'Man wearing cement brown arrival block 6" shorts back view',
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ArrivalGoodLevelNewnessshortGSCementBrownA3B9Y_NBZD_0793_V1a_1920x.jpg?v=1761667498",
      },
      {
        alt: 'Man wearing cement brown arrival block 6" shorts close up',
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ArrivalGoodLevelNewnessshortGSCementBrownA3B9Y_NBZD_0760_V1a_1920x.jpg?v=1761667498",
      },
    ],
  },
  {
    name: "Crew Socks 3pk",
    fit: "Fit",
    color: "Black",
    rating: 4.1,
    price: 16,
    description:
      "<h1>EASY WEAR; EASY PERFORMANCE.</h1><p>Step with support and style in our Crew Socks, from treadmill to sidewalk.</p><ul><li>Terry knit to heel and toe for cushioning and comfort</li><li>Flattering fit to the calf</li><li>Rib from mid-foot to calf</li><li>3 pairs per pack</li></ul><h2>SIZE &amp; FIT</h2><ul><li>High crew sock fit</li><li>Men’s: Small (4-6), Medium (7-9), Large (10-13)</li><li>Women’s: Small (6-8), Medium (8-10), Large (11-13)</li></ul><h2>MATERIALS &amp; CARE</h2><p>69% Cotton, 28% Nylon, 3% Elastane</p><p><strong>SKU:</strong> I3A3P-BB2J</p>",
    image:
      "https://cdn.shopify.com/s/files/1/0156/6146/files/CrewSocks3pk-GSBlack-I3A3P-BB2J-0164copy_9f2c5279-f865-4772-8392-225c32d24180_1920x.jpg?v=1689185931",
    productImages: [
      {
        alt: "Crew Socks 3pk close up view",
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/CrewSocks3pk-GSBlack-I3A3P-BB2J-0165_5034db25-edac-4e9e-9751-84ac19025ad3_1920x.jpg?v=1689185931",
      },
      {
        alt: "Socks main view",
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/CrewSocks3pk-GSBlack-I3A3P-BB2J-0164copy_9f2c5279-f865-4772-8392-225c32d24180_1920x.jpg?v=1689185931",
      },
    ],
  },
  {
    name: "Running 1/4 Zip",
    fit: "Slim Fit",
    color: "Iron Blue",
    rating: 3.7,
    price: 50,
    description:
      "<h1>LIGHTWEIGHT, REFLECTIVE RUNNING LAYERS</h1><p>Whether you’re just ticking off your daily miles or training for a marathon, our running collection keeps you going with breathable, sweat-wicking fabrics, soft brushed linings and reflective details to keep you safe.</p><ul><li>Soft, brushed fabric inside keeps you warm</li><li>Physique-enhancing seams</li><li>Reflective trims &amp; logos for increased visibility in the dark</li><li>Sweat-wicking tech keeps you cool &amp; dry &amp; focused on the road (or treadmill) ahead</li><li>So lightweight it’ll knock at least 5 seconds off your time</li></ul><h2>SIZE &amp; FIT</h2><ul><li>Slim fit</li><li>Model is 6'0\" and wears size M</li></ul><h2>MATERIALS &amp; CARE</h2><p>100% Recycled Polyester</p><p><strong>SKU:</strong> A3C1O-UCTM</p>",
    image:
      "https://cdn.shopify.com/s/files/1/0156/6146/files/images-SpeedReplacement14ZipGSIronBlueA3C1O_UCTM_0156_1920x.jpg?v=1756243652",
    productImages: [
      {
        alt: "Man wearing black running t-shirt front view",
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-SpeedReplacement14ZipGSIronBlueA3C1O_UCTM_0156_1920x.jpg?v=1756243652",
      },
      {
        alt: "Man wearing black running t-shirt side view",
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ANNOTATED_PDP_23924158_1920x.jpg?v=1756243652",
      },
      {
        alt: "Man wearing black running t-shirt back view",
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-SpeedReplacement14ZipGSIronBlueA3C1O_UCTM_0170_1920x.jpg?v=1756243652",
      },
      {
        alt: "Man wearing black running t-shirt close up",
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-SpeedReplacement14ZipGSIronBlueA3C1O_UCTM_0164_1920x.jpg?v=1756243652",
      },
    ],
  },
  {
    name: 'Sport 7" Shorts',
    fit: "Slim Fit",
    color: "Amry Grey",
    rating: 4.4,
    price: 38,
    description:
      "<h1>WORK FOR THE REWARD</h1><p>Sport is here to support you through every set, step &amp; HIIT session, so you can focus on what matters most. Working for that reward.</p><ul><li>Breathable design to keep you cool</li><li>Reflective logos for increased visibility</li><li>Drawcord waist for adjustability</li><li>Zipped pockets to store your stuff</li></ul><h2>SIZE &amp; FIT</h2><ul><li>Slim fit</li><li>7” inseam based on a size M</li><li>Model is 6'1\" and wears a size M</li></ul><h2>MATERIALS &amp; CARE</h2><p>100% Polyester</p><p><strong>SKU:</strong> A1B3L-GDN4</p>",
    image:
      "https://cdn.shopify.com/s/files/1/0156/6146/files/images-Sport7ShortREP_M_A0085GSMetalGreyGSBlackA1B3L_GDN4_1385_1920x.jpg?v=1753718652",
    productImages: [
      {
        alt: "Man wearing black running t-shirt front view",
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-Sport7ShortREP_M_A0085GSMetalGreyGSBlackA1B3L_GDN4_1383_1920x.jpg?v=1753718652",
      },
      {
        alt: "Man wearing black running t-shirt side view",
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-Sport7ShortREP_M_A0085GSMetalGreyGSBlackA1B3L_GDN4_1385_1920x.jpg?v=1753718652",
      },
      {
        alt: "Man wearing black running t-shirt back view",
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ANNOTATED_PDP_23626216_1920x.jpg?v=1753718652",
      },
      {
        alt: "Man wearing black running t-shirt close up",
        src: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-Sport7ShortREP_M_A0085GSMetalGreyGSBlackA1B3L_GDN4_1389_1920x.jpg?v=1753718652",
      },
    ],
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
          description="Moisture-wicking, breathable and designed to enhance performance whilst providing maximum comfort. Our men's running clothes match functionality with on-trend aesthetics. Features such as discreet pockets allow you to run free and sweat-wicking materials will keep you at the optimal temperature so you can run without distraction. Headphones in, laces up, world out and let’s go."
        />
        <HeroImages images={heroImages} />

        <ProductGrid products={products} />
        <LoadMore showing={8} total={209} />
      </main>
    </div>
  );
}
