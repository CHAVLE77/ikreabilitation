// resize-images.js
// გაშვება: node resize-images.js
// წინაპირობა: npm install sharp --save-dev
//
// რატომ შეიცვალა: ორიგინალი team1/2/3 სურათები მხოლოდ ~717-720px განიერია.
// წინა ვერსია ცდილობდა 936w ვარიანტის გენერირებას, რაც სინამდვილეში
// ან ვერ ასქეილდა, ან უბრალოდ ორიგინალის ასლი დარჩა — ორივე შემთხვევაში
// Lighthouse-მა სწორად დაიჭირა, რომ ფაილი "717x1116"-ზეა, არა 936-ზე.
//
// ახლა ვაგენერირებთ მხოლოდ ორ რეალურ ვარიანტს:
//   468w  -> პატარა ეკრანი/ჩვეულებრივი density
//   720w  -> native ზომასთან ახლოს (withoutEnlargement: true იცავს
//            ხელოვნური ზემოთ-დასქეილებისგან), მაგრამ დაკომპრესირებული
//            ხარისხობრივად უფრო მაღალი webp compression-ით

const sharp = require('sharp');
const path = require('path');

const SOURCE_DIR = './public'; // <-- შეცვალე შენი ორიგინალი სურათების გზაზე
const OUTPUT_DIR = './public'; // <-- სად უნდა შენახოს გენერირებული ვერსიები

const images = [
  { name: 'team1', displayWidth: 468, displayHeight: 558 },
  { name: 'team2', displayWidth: 468, displayHeight: 558 },
  { name: 'team3', displayWidth: 468, displayHeight: 558 },
];

const widths = [468, 720]; // აღარ ვცდილობთ 936w-ს (source-ზე მეტს)

async function run() {
  for (const img of images) {
    const inputPath = path.join(SOURCE_DIR, `${img.name}.webp`);
    const meta = await sharp(inputPath).metadata();
    console.log(`\n${img.name}.webp ორიგინალი ზომაა: ${meta.width}x${meta.height}`);

    for (const w of widths) {
      const h = Math.round((img.displayHeight / img.displayWidth) * w);
      const outputPath = path.join(OUTPUT_DIR, `${img.name}-${w}.webp`);

      await sharp(inputPath)
        .resize(w, h, {
          fit: 'cover',
          withoutEnlargement: true, // არასდროს გაზარდოს ორიგინალზე მეტად
        })
        .webp({ quality: w <= 468 ? 82 : 78 })
        .toFile(outputPath);

      console.log(`✔ generated ${outputPath} (მოთხოვნილი ${w}x${h})`);
    }
  }
  console.log('\nდასრულდა! შეამოწმე ტერმინალის ლოგში ნამდვილად რა ზომა გამოვიდა -720 ვარიანტებზე —');
  console.log('თუ ორიგინალი წყარო 717-720px-ზე ნაკლებია, withoutEnlargement დატოვებს ორიგინალ სიგანეს, ეს ნორმალურია.');
}

run().catch((err) => {
  console.error('შეცდომა:', err);
  process.exit(1);
});