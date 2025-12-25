/// <reference types="node" />
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    name: 'Arrival 5" Shorts',
    fit: "Slim Fit",
    color: "Navy",
    rating: 4.3,
    price: 39000, // 26 * 1500,
    alt: "navy slim fit 5 inch workout shorts for men lightweight running training gym wear",
    aiDescription:
      'Navy slim‑fit 5" men’s performance shorts. Lightweight polyester, sweat‑wicking, adjustable waistband, designed for running, training, cardio and gym sessions. Useful keywords: navy gym shorts, athletic shorts, lightweight running shorts, men’s workout essentials.',
    description:
      '<h1>REDEFINING YOUR POTENTIAL</h1><p>Train freely and purposefully in the Arrival 5" Shorts. With a short 5-inch inseam alongside a lightweight, sweat-wicking material and supportive adjustable waistband, you can trust that these shorts will allow you to move in every direction with ease and confidence, rep after rep or step after step.</p><ul><li>Slim fit</li><li>Woven short</li><li>5" in-seam</li><li>Lightweight material</li><li>Sweat-wicking</li><li>Elasticated drawcord waistband</li><li>Open side pockets</li><li>Heat-sealed Gymshark logo to thigh</li><li>100% Polyester</li><li>Model is 5\'11" and wears size M</li><li>SKU: A2A1M-UBCY</li></ul>',
    image:
      "https://cdn.shopify.com/s/files/1/0156/6146/files/Arrival5ShortsNavyA2A1M-UBCY-1902_3840x.jpg?v=1747817865",
    stock: 50,
    productImages: [
      {
        alt: "Man wearing navy athletic shorts front view",
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/Arrival5ShortsNavyA2A1M-UBCY-4050_A_3840x.jpg?v=1747817865",
      },
      {
        alt: "Man wearing navy athletic shorts side view",
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/Arrival5ShortsNavyA2A1M-UBCY-1902_3840x.jpg?v=1747817865",
      },
      {
        alt: "Close up of athletic shorts fabric and texture",
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/Arrival5ShortsNavyA2A1M-UBCY-1924_3840x.jpg?v=1747817865",
      },
      {
        alt: "Man wearing navy athletic shorts back view",
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/Arrival5ShortsNavyA2A1M-UBCY-1921_3840x.jpg?v=1747817865",
      },
      {
        alt: "Man wearing navy athletic shorts close up video",
        url: "https://us.checkout.gymshark.com/cdn/shop/videos/c/vp/63b8dde8c14d4c88b253f545e31109a7/63b8dde8c14d4c88b253f545e31109a7.HD-720p-4.5Mbps-54738256.mp4",
      },
    ],
  },
  {
    name: "Running T-Shirt",
    fit: "Slim Fit",
    color: "Black",
    rating: 4.3,
    price: 33000, // 22 * 1500
    alt: "black slim fit breathable running t-shirt reflective gym top for men",
    aiDescription:
      "Black slim‑fit running tee for men with reflective details, sweat‑wicking fabric and physique‑enhancing seams. Built for road running, treadmill, outdoor cardio and everyday training. Useful keywords: black gym shirt, men’s running tee, breathable workout top.",

    description:
      "<h1>LIGHTWEIGHT, REFLECTIVE RUNNING LAYERS</h1><p>So good, they'll (almost) make you want to do cardio. Whether you're just ticking off your daily miles or training for a marathon, our running collection keeps you going with breathable, sweat-wicking fabrics, soft brushed linings and reflective details to keep you safe.</p><ul><li>Physique-enhancing seams</li><li>Side splits for more freedom of movement</li><li>Reflective logos for increased visibility in the dark</li><li>Sweat-wicking tech keeps you cool &amp; dry &amp; focused on the road (or treadmill) ahead</li><li>So lightweight it'll knock at least 5 seconds off your time</li></ul><h2>SIZE &amp; FIT</h2><ul><li>Slim fit</li><li>Model is 6'0\" and wears size M</li></ul><h2>MATERIALS &amp; CARE</h2><p>91% Recycled Polyester, 9% Elastane</p><p><strong>SKU:</strong> A3C2S-BB2J</p>",
    image:
      "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ANNOTATED_PDP_23926318_3840x.jpg?v=1756243777",
    stock: 75,
    productImages: [
      {
        alt: "Man wearing black running t-shirt front view",
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-SpeedReplacementT_ShirtGSBlackA3C2S_BB2J_0088_3840x.jpg?v=1756243777",
      },
      {
        alt: "Man wearing black running t-shirt side view",
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ANNOTATED_PDP_23926318_3840x.jpg?v=1756243777",
      },
      {
        alt: "Man wearing black running t-shirt back view",
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-SpeedReplacementT_ShirtGSBlackA3C2S_BB2J_0102_3840x.jpg?v=1756243777",
      },
      {
        alt: "Man wearing black running t-shirt close up",
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-SpeedReplacementT_ShirtGSBlackA3C2S_BB2J_0098_3840x.jpg?v=1756243777",
      },
    ],
  },
  {
    name: "Element Tank Top",
    fit: "Slim Fit",
    color: "White",
    rating: 4.2,
    price: 33000, // 22 * 1500
    alt: "white compression athletic tank top for training gym running sleeveless muscle fit",
    aiDescription:
      "White sleeveless compression tank with muscle‑enhancing fit and stretch mesh panels. Built for lifting, gym training, running and physique aesthetics. Useful keywords: compression tank, white gym tank, sleeveless workout top, training vest.",

    description:
      "<h1>PHYSIQUE FIRST</h1><p>Whether you're layering up or down, these physique-enhancing fits are the one.</p><ul><li>Ultra-tight compression fit top</li><li>Additional mesh panels to the seams for extra stretch</li><li>Sleeveless design for agility</li><li>Stay cool &amp; dry with sweat-wicking tech</li></ul><h2>SIZE &amp; FIT</h2><ul><li>Compressive fit: ultra-tight fit, like a second skin</li><li>Regular length</li><li>Model is 5'9\" and wears a size L</li></ul><h2>MATERIALS &amp; CARE</h2><p>84% Polyester, 16% Elastane</p><p><strong>SKU:</strong> A2C4U-WB57</p>",
    image:
      "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ElementTankGSWhiteA2C4U_WB57_0185_1920x.jpg?v=1747310780",
    stock: 60,
    productImages: [
      {
        alt: "Man wearing white element tank top front view",
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ElementTankGSWhiteA2C4U_WB57_0182_1920x.jpg?v=1747310780",
      },
      {
        alt: "Man wearing white element tank top side view",
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ElementTankGSWhiteA2C4U_WB57_0185_1920x.jpg?v=1747310780",
      },
      {
        alt: "Man wearing white element tank top back view",
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ElementTankGSWhiteA2C4U_WB57_0203_1920x.jpg?v=1747310780",
      },
      {
        alt: "Man wearing white element tank top close up",
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ElementTankGSWhiteA2C4U_WB57_0205_1920x.jpg?v=1747310780",
      },
    ],
  },
  {
    name: 'Sport 5" Shorts',
    fit: "Slim Fit",
    color: "White",
    rating: 4.2,
    price: 33000, // 22 * 1500
    alt: "white slim fit 5 inch sport shorts with zip pockets running hiit training",
    aiDescription:
      'White 5" slim‑fit training shorts with drawcord waist and zip pockets. Breathable build for HIIT, running, gym sessions and cardio. Useful keywords: white gym shorts, zip pocket running shorts, HIIT shorts men, 5" sport shorts.',

    description:
      '<h1>WORK FOR THE REWARD</h1><p>Sport is here to support you through every set, step &amp; HIIT session, so you can focus on what matters most. Working for that reward.</p><ul><li>Breathable design to keep you cool</li><li>Reflective logos for increased visibility</li><li>Drawcord waist for adjustability</li><li>Zipped pockets to store your stuff</li></ul><h2>SIZE &amp; FIT</h2><ul><li>Slim fit</li><li>5" inseam based on a size M</li><li>Model is 6\'1" and wears a size M</li></ul><h2>MATERIALS &amp; CARE</h2><p>100% Polyester</p><p><strong>SKU:</strong> A1B3M-UCY1</p>',
    image:
      "https://cdn.shopify.com/s/files/1/0156/6146/files/Sport5-ShortGSHeavyBlue-GSIronBlueA1B3M-UCY1-1608-0180_1920x.jpg?v=1742825782",
    stock: 45,
    productImages: [
      {
        alt: 'Man wearing white sport 5" shorts front view',
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/Sport5-ShortGSHeavyBlue-GSIronBlueA1B3M-UCY1-1608-0180_1920x.jpg?v=1742825782",
      },
      {
        alt: 'Man wearing white sport 5" shorts side view with full fit style',
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/Sport5-ShortGSHeavyBlue-GSIronBlueA1B3M-UCY1-1602-0179_1920x.jpg?v=1742825782",
      },
      {
        alt: 'Man wearing white sport 5" shorts back view',
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/Sport5-ShortGSHeavyBlue-GSIronBlueA1B3M-UCY1-1623-0182_1920x.jpg?v=1742825782",
      },
      {
        alt: 'Man wearing white sport 5" shorts close up',
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/Sport5-ShortGSHeavyBlue-GSIronBlueA1B3M-UCY1-1630-0184_1920x.jpg?v=1742825782",
      },
    ],
  },
  {
    name: 'Arrival Block 6" Shorts',
    fit: "Slim Fit",
    color: "Cement Brown",
    rating: 4.5,
    price: 45000, // 30 * 1500
    alt: "cement brown slim fit 6 inch training shorts lightweight running gym wear",
    aiDescription:
      'Cement brown 6" slim‑fit athletic shorts with contrast details. Lightweight, sweat‑resistant and built for movement — running, conditioning and everyday training. Useful keywords: brown gym shorts, 6 inch workout shorts, running shorts men, athletic lightweight shorts.',
    description:
      "<h1>PROGRESS MADE DAILY</h1><p>Made with essential performance technology, Arrival is built to make progress in, whether it's advancing your conditioning or pushing for that extra mile.</p><ul><li>Sweat-wicking tech to keep you cool &amp; dry when you're on the move</li><li>Crafted from comfortable lightweight materials</li><li>Contrast panels &amp; piping</li><li>Internal drawcord waist to get the right fit</li></ul><h2>SIZE &amp; FIT</h2><ul><li>Slim fit</li><li>Model is 6'0\" and wears size M</li></ul><h2>MATERIALS &amp; CARE</h2><p>100% Recycled Polyester</p><p><strong>SKU:</strong> A3B9Y-NBZD</p>",
    image:
      "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ArrivalGoodLevelNewnessshortGSCementBrownA3B9Y_NBZD_0771_V2_1920x.jpg?v=1761667498",
    stock: 40,
    productImages: [
      {
        alt: 'Man wearing cement brown arrival block 6" shorts front view',
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ArrivalGoodLevelNewnessshortGSCementBrownA3B9Y_NBZD_0771_V2_1920x.jpg?v=1761667498",
      },
      {
        alt: 'Man wearing cement brown arrival block 6" shorts side view',
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ArrivalGoodLevelNewnessshortGSCementBrownA3B9Y_NBZD_0776_V2_1920x.jpg?v=1761667498",
      },
      {
        alt: 'Man wearing cement brown arrival block 6" shorts back view',
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ArrivalGoodLevelNewnessshortGSCementBrownA3B9Y_NBZD_0793_V1a_1920x.jpg?v=1761667498",
      },
      {
        alt: 'Man wearing cement brown arrival block 6" shorts close up',
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ArrivalGoodLevelNewnessshortGSCementBrownA3B9Y_NBZD_0760_V1a_1920x.jpg?v=1761667498",
      },
    ],
  },
  {
    name: "Crew Socks 3pk",
    fit: "Fit",
    color: "Black",
    rating: 4.1,
    price: 24000, // 16 * 1500
    alt: "black crew socks 3 pack gym training cushioned athletic socks",
    aiDescription:
      "Three‑pack of black crew training socks with ribbed support and cushioned heel/toe design. Everyday wear for lifting, cardio or casual streetwear. Useful keywords: black crew socks, athletic socks 3 pack, gym socks men.",
    description:
      "<h1>EASY WEAR; EASY PERFORMANCE.</h1><p>Step with support and style in our Crew Socks, from treadmill to sidewalk.</p><ul><li>Terry knit to heel and toe for cushioning and comfort</li><li>Flattering fit to the calf</li><li>Rib from mid-foot to calf</li><li>3 pairs per pack</li></ul><h2>SIZE &amp; FIT</h2><ul><li>High crew sock fit</li><li>Men's: Small (4-6), Medium (7-9), Large (10-13)</li><li>Women's: Small (6-8), Medium (8-10), Large (11-13)</li></ul><h2>MATERIALS &amp; CARE</h2><p>69% Cotton, 28% Nylon, 3% Elastane</p><p><strong>SKU:</strong> I3A3P-BB2J</p>",
    image:
      "https://cdn.shopify.com/s/files/1/0156/6146/files/CrewSocks3pk-GSBlack-I3A3P-BB2J-0164copy_9f2c5279-f865-4772-8392-225c32d24180_1920x.jpg?v=1689185931",
    stock: 100,
    productImages: [
      {
        alt: "Crew Socks 3pk close up view",
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/CrewSocks3pk-GSBlack-I3A3P-BB2J-0165_5034db25-edac-4e9e-9751-84ac19025ad3_1920x.jpg?v=1689185931",
      },
      {
        alt: "Socks main view",
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/CrewSocks3pk-GSBlack-I3A3P-BB2J-0164copy_9f2c5279-f865-4772-8392-225c32d24180_1920x.jpg?v=1689185931",
      },
    ],
  },
  {
    name: "Running 1/4 Zip",
    fit: "Slim Fit",
    color: "Iron Blue",
    rating: 3.7,
    price: 75000, // 50 * 1500
    alt: "iron blue slim fit running quarter zip long sleeve top reflective performance layer",
    aiDescription:
      "Iron blue slim‑fit quarter zip designed for running and outdoor training. Sweat‑wicking, lightweight, reflective trims for night runs and cold‑weather cardio. Useful keywords: 1/4 zip running top, long sleeve performance tee, reflective running layer.",
    description:
      "<h1>LIGHTWEIGHT, REFLECTIVE RUNNING LAYERS</h1><p>Whether you're just ticking off your daily miles or training for a marathon, our running collection keeps you going with breathable, sweat-wicking fabrics, soft brushed linings and reflective details to keep you safe.</p><ul><li>Soft, brushed fabric inside keeps you warm</li><li>Physique-enhancing seams</li><li>Reflective trims &amp; logos for increased visibility in the dark</li><li>Sweat-wicking tech keeps you cool &amp; dry &amp; focused on the road (or treadmill) ahead</li><li>So lightweight it'll knock at least 5 seconds off your time</li></ul><h2>SIZE &amp; FIT</h2><ul><li>Slim fit</li><li>Model is 6'0\" and wears size M</li></ul><h2>MATERIALS &amp; CARE</h2><p>100% Recycled Polyester</p><p><strong>SKU:</strong> A3C1O-UCTM</p>",
    image:
      "https://cdn.shopify.com/s/files/1/0156/6146/files/images-SpeedReplacement14ZipGSIronBlueA3C1O_UCTM_0156_1920x.jpg?v=1756243652",
    stock: 35,
    productImages: [
      {
        alt: "Man wearing black running t-shirt front view",
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-SpeedReplacement14ZipGSIronBlueA3C1O_UCTM_0156_1920x.jpg?v=1756243652",
      },
      {
        alt: "Man wearing black running t-shirt side view",
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ANNOTATED_PDP_23924158_1920x.jpg?v=1756243652",
      },
      {
        alt: "Man wearing black running t-shirt back view",
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-SpeedReplacement14ZipGSIronBlueA3C1O_UCTM_0170_1920x.jpg?v=1756243652",
      },
      {
        alt: "Man wearing black running t-shirt close up",
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-SpeedReplacement14ZipGSIronBlueA3C1O_UCTM_0164_1920x.jpg?v=1756243652",
      },
    ],
  },
  {
    name: 'Sport 7" Shorts',
    fit: "Slim Fit",
    color: "Amry Grey",
    rating: 4.4,
    price: 57000, // 38 * 1500
    alt: "army grey slim fit 7 inch workout shorts running training breathable",
    aiDescription:
      'Army grey 7" slim‑fit sport shorts with breathable fabric, drawcord waist and zip pockets. Built for cardio, HIIT, weight training and everyday gym use. Useful keywords: grey training shorts, 7 inch workout shorts, breathable running shorts men.',
    description:
      '<h1>WORK FOR THE REWARD</h1><p>Sport is here to support you through every set, step &amp; HIIT session, so you can focus on what matters most. Working for that reward.</p><ul><li>Breathable design to keep you cool</li><li>Reflective logos for increased visibility</li><li>Drawcord waist for adjustability</li><li>Zipped pockets to store your stuff</li></ul><h2>SIZE &amp; FIT</h2><ul><li>Slim fit</li><li>7" inseam based on a size M</li><li>Model is 6\'1" and wears a size M</li></ul><h2>MATERIALS &amp; CARE</h2><p>100% Polyester</p><p><strong>SKU:</strong> A1B3L-GDN4</p>',
    image:
      "https://cdn.shopify.com/s/files/1/0156/6146/files/images-Sport7ShortREP_M_A0085GSMetalGreyGSBlackA1B3L_GDN4_1385_1920x.jpg?v=1753718652",
    stock: 55,
    productImages: [
      {
        alt: "Man wearing black running t-shirt front view",
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-Sport7ShortREP_M_A0085GSMetalGreyGSBlackA1B3L_GDN4_1383_1920x.jpg?v=1753718652",
      },
      {
        alt: "Man wearing black running t-shirt side view",
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-Sport7ShortREP_M_A0085GSMetalGreyGSBlackA1B3L_GDN4_1385_1920x.jpg?v=1753718652",
      },
      {
        alt: "Man wearing black running t-shirt back view",
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-ANNOTATED_PDP_23626216_1920x.jpg?v=1753718652",
      },
      {
        alt: "Man wearing black running t-shirt close up",
        url: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-Sport7ShortREP_M_A0085GSMetalGreyGSBlackA1B3L_GDN4_1389_1920x.jpg?v=1753718652",
      },
    ],
  },
];

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();

  // Create products with images
  for (const productData of products) {
    const { productImages, ...productFields } = productData;

    const product = await prisma.product.create({
      data: {
        ...productFields,
        productImages: {
          create: productImages.map((img) => ({
            url: img.url,
            alt: img.alt,
          })),
        },
      },
      include: {
        productImages: true,
      },
    });

    console.log(
      `✅ Created product: ${product.name} with ${product.productImages.length} images`
    );
  }

  console.log("✨ Seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
