const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

['f1', 'f2', 'f3'].forEach((folder) => {
  const src = path.join(rootDir, folder);
  const dest = path.join(publicDir, folder);

  if (fs.existsSync(src) && !fs.existsSync(dest)) {
    try {
      fs.symlinkSync(src, dest, 'junction');
      console.log(`Linked ${folder} -> public/${folder}`);
    } catch {
      try {
        fs.cpSync(src, dest, { recursive: true });
        console.log(`Copied ${folder} -> public/${folder}`);
      } catch (err) {
        console.warn(`Warning: Could not link ${folder}: ${err.message}`);
      }
    }
  }
});
