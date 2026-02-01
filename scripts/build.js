const fs = require("fs");
const path = require("path");

const partialsDir = path.join(__dirname, "..", "partials");
const srcFiles = fs.readdirSync(process.cwd()).filter((f) => f.endsWith(".html"));
const outDir = path.join(process.cwd(), "dist");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const header = fs.readFileSync(path.join(partialsDir, "header.html"), "utf8");
const footer = fs.readFileSync(path.join(partialsDir, "footer.html"), "utf8");

for (const file of srcFiles) {
  const text = fs.readFileSync(file, "utf8");
  // Replace first <header>...</header> with header partial
  const replaced = text.replace(/<header>[\s\S]*?<\/header>/, header).replace(/<footer>[\s\S]*?<\/footer>/, footer);

  fs.writeFileSync(path.join(outDir, file), replaced, "utf8");
  console.log("Built", file);
}

console.log("Build complete. Files in dist/");
