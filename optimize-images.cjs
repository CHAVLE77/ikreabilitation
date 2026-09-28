// optimize-images.cjs
// გაშვება: node optimize-images.cjs
// წინაპირობა: npm install sharp --save-dev
//
// წყარო (ორიგინალები):  ./src/assets/raw
// შედეგი (გამოსაყენებელი ფაილები): ./public
//   - ორიგინალის ასლი (bg1.webp, bg2.webp, ...)  <- საჭიროა <img src="/bg1.webp">-სთვის
//   - -480 / -960 / -1440 ვარიანტები              <- საჭიროა srcSet-ისთვის
//
// რატომ public და არა src/assets:
// Hero.jsx-ში სურათები მოხმობილია აბსოლუტური root-გზით (მაგ. "/bg1.webp"),
// არა import-ით. Vite ასეთ სტრიქონებს src/assets-ში ვერ პოულობს — მხოლოდ
// public/-ში მდებარე ფაილები ემსახურება ზუსტად ისეთი გზით, როგორც კოდშია.

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_DIR = './src/assets/raw'; // ორიგინალი სურათები
const OUTPUT_DIR = './public';          // საბოლოო, გამოსაქვეყნებელი ფაილები

const WIDTHS = [480, 960, 1440];
const SUPPORTED_EXT = ['.webp', '.jpg', '.jpeg', '.png'];

async function run() {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`შეცდომა: წყარო საქაღალდე ვერ მოიძებნა: ${SOURCE_DIR}`);
    process.exit(1);
  }
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = fs
    .readdirSync(SOURCE_DIR)
    .filter((f) => SUPPORTED_EXT.includes(path.extname(f).toLowerCase()));

  if (files.length === 0) {
    console.log(`ვერცერთი მხარდაჭერილი სურათი ვერ მოიძებნა საქაღალდეში: ${SOURCE_DIR}`);
    return;
  }

  for (const file of files) {
    const ext = path.extname(file);
    const baseName = path.basename(file, ext);

    // გამოვტოვოთ ისეთი ფაილები, რომლებიც უკვე გენერირებულს ჰგავს
    // (მაგ. თუ ვინმემ შეცდომით raw-ში ჩააგდო bg1-1440.webp)
    if (WIDTHS.some((w) => baseName.endsWith(`-${w}`))) continue;

    const inputPath = path.join(SOURCE_DIR, file);
    const meta = await sharp(inputPath).metadata();
    console.log(`\n${file} ორიგინალი ზომაა: ${meta.width}x${meta.height}`);

    // 1) ორიგინალის ასლი public/-ში (bg1.webp და ა.შ.) — ეს გამოიყენება
    //    როგორც <img src>-ის საბაზისო მნიშვნელობა და 1920w fallback srcSet-ში.
    const originalOutPath = path.join(OUTPUT_DIR, `${baseName}.webp`);
    await sharp(inputPath).webp({ quality: 82 }).toFile(originalOutPath);
    console.log(`✔ copied original -> ${originalOutPath}`);

    // 2) რეზაისებული ვარიანტები
    for (const w of WIDTHS) {
      const h = Math.round((meta.height / meta.width) * w);
      const outputPath = path.join(OUTPUT_DIR, `${baseName}-${w}.webp`);

      await sharp(inputPath)
        .resize(w, h, {
          fit: 'cover',
          withoutEnlargement: true,
        })
        .webp({ quality: w <= 480 ? 82 : w <= 960 ? 80 : 78 })
        .toFile(outputPath);

      console.log(`✔ generated ${outputPath} (მოთხოვნილი ${w}x${h})`);
    }
  }

  console.log('\nდასრულდა! ყველა ფაილი public/-შია და მზადაა Hero.jsx-ის /bgN.webp მისამართებისთვის.');
}

run().catch((err) => {
  console.error('შეცდომა:', err);
  process.exit(1);
});
