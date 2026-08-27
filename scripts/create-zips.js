const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.join(__dirname, '..');

// 1. Cloudflare Pages Direct Upload ZIP
console.log('📦 Step 1: Building cloudflare-pages-deploy.zip from out/...');
const cfZip = path.join(rootDir, 'cloudflare-pages-deploy.zip');
if (fs.existsSync(cfZip)) fs.unlinkSync(cfZip);

execSync(`powershell -NoProfile -Command "Compress-Archive -Path '${path.join(rootDir, 'out', '*')}' -DestinationPath '${cfZip}' -CompressionLevel Optimal"`, {
  stdio: 'inherit',
});

// 2. Full Source Code ZIP (without node_modules, .next, .git, out)
console.log('📦 Step 2: Building heer-kitchenware-source.zip...');
const srcZip = path.join(rootDir, 'heer-kitchenware-source.zip');
if (fs.existsSync(srcZip)) fs.unlinkSync(srcZip);

const exclude = new Set(['node_modules', '.next', '.git', 'out', 'cloudflare-pages-deploy.zip', 'heer-kitchenware-source.zip']);
const items = fs.readdirSync(rootDir)
  .filter(f => !exclude.has(f))
  .map(f => `'${path.join(rootDir, f)}'`)
  .join(',');

execSync(`powershell -NoProfile -Command "Compress-Archive -Path ${items} -DestinationPath '${srcZip}' -CompressionLevel Optimal"`, {
  stdio: 'inherit',
});

console.log('\n✅ All deployment packages generated successfully:');
[cfZip, srcZip].forEach(file => {
  const stat = fs.statSync(file);
  console.log(`- ${path.basename(file)}: ${(stat.size / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`  Location: ${file}`);
});
