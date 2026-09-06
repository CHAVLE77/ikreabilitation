// resize-images.js
// გაშვება: node resize-images.js
// წინაპირობა: npm install sharp --save-dev
//
// ეს სკრიპტი აგენერირებს team2/team3-ის სწორი ზომის ვერსიებს.
// დისფლეი ზომაა 468x558 (CSS px), ამიტომ ვამზადებთ 1x და 2x (retina) ვარიანტებს:
//   468w  -> ჩვეულებრივი ეკრანი
//   936w  -> retina/მაღალი DPI ეკრანი
//
// საწყისი ფაილები უნდა იდოს public/ ან src/assets/ საქაღალდეში (მიუთითე ქვემოთ სწორი გზა).

const sharp = require('sharp');
const path = require('path');

const SOURCE_DIR = './public'; // <-- შეცვალე შენი ორიგინალი სურათების გზაზე
const OUTPUT_DIR = './public'; // <-- სად უნდა შენახოს გენერირებული ვერსიები

const images = [
  { name: 'team1', displayWidth: 468, displayHeight: 558 },
  { name: 'team2', displayWidth: 468, displayHeight: 558 },
  { name: 'team3', displayWidth: 468, displayHeight: 558 },
];

const widths = [468, 936]; // 1x და 2x

async function run() {
  for (const img of images) {
    const inputPath = path.join(SOURCE_DIR, `${img.name}.webp`);

    for (const w of widths) {
      const h = Math.round((img.displayHeight / img.displayWidth) * w);
      const outputPath = path.join(OUTPUT_DIR, `${img.name}-${w}.webp`);

      await sharp(inputPath)
        .resize(w, h, { fit: 'cover' })
        .webp({ quality: 82 })
        .toFile(outputPath);

      console.log(`✔ generated ${outputPath} (${w}x${h})`);
    }
  }
  console.log('\nდასრულდა! ახლა Team.jsx-ში გამოიყენე ეს ფაილები srcset-ში.');
}

run().catch((err) => {
  console.error('შეცდომა:', err);
  process.exit(1);
});