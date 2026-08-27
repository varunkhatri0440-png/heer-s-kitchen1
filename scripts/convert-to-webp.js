const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rootDir = path.join(__dirname, '..');
const folders = ['f1', 'f2', 'f3'];

async function convertFolder(folderName) {
  const folderPath = path.join(rootDir, folderName);
  if (!fs.existsSync(folderPath)) {
    console.log(`Folder ${folderName} does not exist, skipping.`);
    return;
  }

  const files = fs.readdirSync(folderPath).filter((f) => f.endsWith('.png'));
  console.log(`Converting ${files.length} frames in ${folderName} to WebP...`);

  let completed = 0;
  // Process in concurrent batches of 8
  const concurrency = 8;
  for (let i = 0; i < files.length; i += concurrency) {
    const chunk = files.slice(i, i + concurrency);
    await Promise.all(
      chunk.map(async (file) => {
        const pngPath = path.join(folderPath, file);
        const webpPath = path.join(folderPath, file.replace('.png', '.webp'));

        await sharp(pngPath)
          .webp({ quality: 90, effort: 4 })
          .toFile(webpPath);

        // Remove the original PNG
        fs.unlinkSync(pngPath);
        completed++;
      })
    );
    process.stdout.write(`\r[${folderName}] Converted ${completed}/${files.length} frames`);
  }
  console.log(`\nCompleted ${folderName} WebP conversion.`);
}

async function main() {
  console.log('Starting batch PNG to WebP conversion...');
  const startTime = Date.now();

  for (const folder of folders) {
    await convertFolder(folder);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\nAll frames converted to WebP successfully in ${duration}s!`);
}

main().catch((err) => {
  console.error('Conversion error:', err);
  process.exit(1);
});
