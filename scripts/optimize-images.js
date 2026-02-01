const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Simple optimizer: create webp and scaled versions for banner and app icons
const images = [
  "images/imageBG/bia1.png",
  "images/imageBG/bia2.png",
  "images/imageBG/bia3.png",
  "images/imageBG/bia4.png",
  "images/imageBG/bia5.png",
  "images/appstore.png",
  "images/chplay.png",
];

const outDir = "images/optimized";
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

(async () => {
  for (const img of images) {
    const inPath = path.join(process.cwd(), img);
    if (!fs.existsSync(inPath)) {
      console.warn("Missing", img);
      continue;
    }
    const base = path.basename(img, path.extname(img));
    const webpOut = path.join(outDir, base + ".webp");

    try {
      await sharp(inPath).resize({ width: 1200 }).webp({ quality: 80 }).toFile(webpOut);
      console.log("Optimized", img, "->", webpOut);
    } catch (err) {
      console.error("Failed", img, err.message);
    }
  }
})();
