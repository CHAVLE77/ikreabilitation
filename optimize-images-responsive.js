// generate-smaller-variants.js
// გაუშვი: node generate-smaller-variants.js
// წინასწარ დააინსტალირე: npm install sharp --save-dev
//
// წყარო: public-ში უკვე არსებული ოპტიმიზირებული .webp ფაილები
// (ორიგინალები წაშლილია, ამიტომ ვმუშაობთ იმით რაც გვაქვს —
// მხოლოდ დაპატარავება ხდება, გადიდება არ ხდება, ხარისხი არ იზარალებს).

import sharp from "sharp";
import fs from "fs";
import path from "path";

const publicDir = "./public";

// ფაილი (public-ში უკვე არსებული) -> დამატებითი პატარა სიგანეები
// (არსებული ფაილი თავად დარჩება, როგორც ყველაზე დიდი ვერსია srcset-ში)
const SMALLER_VARIANTS = {
  "bg1.webp": [480, 960],
  "bg2.webp": [480, 960],
  "bg3.webp": [480, 960],
  "bg4.webp": [480, 960],
  "serv1.webp": [410],
  "serv2.webp": [410],
  "serv3.webp": [410],
  "team1.webp": [470],
  "team2.webp": [470],
  "team3.webp": [470],
  "logo.webp": [50],
};



const WEBP_QUALITY = 82; // ოდნავ მაღალი, რადგან უკვე ერთხელ შეკუმშულია

console.log("გენერირდება პატარა ვერსიები არსებული ოპტიმიზირებული ფაილებიდან...\n");

for (const [filename, widths] of Object.entries(SMALLER_VARIANTS)) {
  const inputPath = path.join(publicDir, filename);

  if (!fs.existsSync(inputPath)) {
    console.warn(`⚠️  ვერ მოიძებნა: ${filename}, გამოტოვებულია`);
    continue;
  }

  const baseName = filename.replace(/\.webp$/i, "");

  for (const width of widths) {
    const outName = `${baseName}-${width}.webp`;
    const outputPath = path.join(publicDir, outName);

    try {
      const info = await sharp(inputPath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outputPath);

      console.log(`✓ ${outName} (${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KiB)`);
    } catch (err) {
      console.error(`✗ შეცდომა ${filename} (${width}w)-ზე:`, err.message);
    }
  }
}

console.log("\nდასრულდა.");