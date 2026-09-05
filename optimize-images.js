// optimize-images.js
// გაუშვი: node optimize-images.js
// წინასწარ დააინსტალირე: npm install sharp --save-dev
//
// ეს ვერსია ავტომატურად წაიკითხავს ყველა სურათს src/assets/raw-დან
// და დაარესაიზებს მაქსიმუმ 1920px სიგანემდე (თუ საწყისი უფრო დიდია),
// ხოლო თუ ცალკეული ფაილისთვის გინდა კონკრეტული ზომა, ჩაწერე OVERRIDES-ში.

import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = "./src/assets/raw";
const outputDir = "./public";

// სურათებისთვის, სადაც ზუსტად იცი საჭირო ზომა (CSS-ში გამოსახული ზომის ~2x)
// ნებისმიერი ფაილი რაც აქ არ არის ჩამოთვლილი, მაინც დამუშავდება,
// უბრალოდ default მაქსიმალური სიგანით (იხ. DEFAULT_MAX_WIDTH)
const OVERRIDES = {
  "serv1.jpg": { width: 820, height: 544 },
  "serv2.jpg": { width: 820, height: 544 },
  "serv3.jpg": { width: 820, height: 544 },
  "team1.jpg": { width: 940, height: 1120 },
  "team2.jpg": { width: 940, height: 1120 },
  "team3.jpg": { width: 940, height: 1120 },
  "logo.webp": { width: 100, height: 100 },
};

const DEFAULT_MAX_WIDTH = 1920; // hero/bg სურათებისთვის და დანარჩენი ყველასთვის
const WEBP_QUALITY = 78;

fs.mkdirSync(outputDir, { recursive: true });

const files = fs.readdirSync(inputDir).filter((f) =>
  /\.(jpe?g|png|webp)$/i.test(f)
);

if (files.length === 0) {
  console.warn(`⚠️  ვერცერთი სურათი ვერ მოიძებნა: ${path.resolve(inputDir)}`);
}

console.log(`ნაპოვნია ${files.length} სურათი. მუშავდება...\n`);

for (const filename of files) {
  const inputPath = path.join(inputDir, filename);
  const outName = filename.replace(/\.(jpe?g|png|webp)$/i, ".webp");
  const outputPath = path.join(outputDir, outName);

  const override = OVERRIDES[filename];

  let pipeline = sharp(inputPath);

  if (override) {
    pipeline = pipeline.resize(override.width, override.height, {
      fit: "cover",
    });
  } else {
    // საწყისზე დიდი არ გახდეს, მაგრამ თუ დიდია — შემცირდეს
    pipeline = pipeline.resize({
      width: DEFAULT_MAX_WIDTH,
      withoutEnlargement: true,
    });
  }

  try {
    const info = await pipeline.webp({ quality: WEBP_QUALITY }).toFile(outputPath);
    console.log(`✓ ${filename} → ${outName} (${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KiB)`);
  } catch (err) {
    console.error(`✗ შეცდომა ${filename}-ზე:`, err.message);
  }
}

console.log(`\nდასრულდა. შედეგები: ${path.resolve(outputDir)}`);