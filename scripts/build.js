const fs = require("fs");
const path = require("path");

const partialsDir = path.join(__dirname, "..", "partials");
const rootDir = path.join(__dirname, "..");
const srcFiles = fs.readdirSync(rootDir).filter((f) => f.endsWith(".html"));
const outDir = path.join(rootDir, "dist");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const header = fs.readFileSync(path.join(partialsDir, "header.html"), "utf8");
const footer = fs.readFileSync(path.join(partialsDir, "footer.html"), "utf8");

// 1. Build HTML files (replace header/footer with partials)
for (const file of srcFiles) {
  const text = fs.readFileSync(path.join(rootDir, file), "utf8");
  const replaced = text
    .replace(/<header>[\s\S]*?<\/header>/, header)
    .replace(/<footer>[\s\S]*?<\/footer>/, footer);

  fs.writeFileSync(path.join(outDir, file), replaced, "utf8");
  console.log("Built", file);
}

// 2. Copy style.css
fs.copyFileSync(path.join(rootDir, "style.css"), path.join(outDir, "style.css"));
console.log("Copied style.css");

// 3. Copy main.js
fs.copyFileSync(path.join(rootDir, "main.js"), path.join(outDir, "main.js"));
console.log("Copied main.js");

// 4. Copy robots.txt & sitemap.xml
if (fs.existsSync(path.join(rootDir, "robots.txt"))) {
  fs.copyFileSync(path.join(rootDir, "robots.txt"), path.join(outDir, "robots.txt"));
  console.log("Copied robots.txt");
}
if (fs.existsSync(path.join(rootDir, "sitemap.xml"))) {
  fs.copyFileSync(path.join(rootDir, "sitemap.xml"), path.join(outDir, "sitemap.xml"));
  console.log("Copied sitemap.xml");
}
if (fs.existsSync(path.join(rootDir, "products.json"))) {
  fs.copyFileSync(path.join(rootDir, "products.json"), path.join(outDir, "products.json"));
  console.log("Copied products.json");
}

// 5. Copy images folder recursively
function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const imagesSrc = path.join(rootDir, "images");
const imagesDest = path.join(outDir, "images");
if (fs.existsSync(imagesSrc)) {
  copyDirRecursive(imagesSrc, imagesDest);
  console.log("Copied images/");
}

console.log("\nBuild complete! All files in dist/");
