import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;

const svgOverlay = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1B2A4A"/>
      <stop offset="100%" stop-color="#2B4A8A"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <circle cx="1050" cy="80" r="220" fill="#2885ef" opacity="0.12"/>
  <circle cx="120" cy="560" r="180" fill="#2885ef" opacity="0.08"/>

  <text x="600" y="470" font-family="Arial, sans-serif" font-size="46" font-weight="900"
        fill="#F5F0E8" text-anchor="middle">ირმა ხვიჩიას რეაბილიტაციის ცენტრი</text>
  <text x="600" y="520" font-family="Arial, sans-serif" font-size="24" font-weight="500"
        fill="#FBBF24" text-anchor="middle">პროფესიონალური რეაბილიტაცია</text>
</svg>
`;

async function run() {
  // ლოგო — ცენტრში, ზედა ნაწილში
  const logo = await sharp("./public/ikr.webp")
    .resize(180, 180, { fit: "contain" })
    .toBuffer();

  await sharp(Buffer.from(svgOverlay))
    .composite([
      { input: logo, top: 110, left: 510 }, // ცენტრში, ტექსტის ზემოთ
    ])
    .jpeg({ quality: 90 })
    .toFile("./public/og-image.jpg");

  console.log("✓ og-image.jpg შეიქმნა public-ში");
}

run();