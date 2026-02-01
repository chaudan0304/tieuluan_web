const fs = require("fs");
const path = require("path");

const files = fs.readdirSync(process.cwd()).filter((f) => f.endsWith(".html"));

for (const file of files) {
  let text = fs.readFileSync(file, "utf8");

  const regex =
    /(<div class="category-right-content-item">[\s\S]*?)<img\s+([^>]*?)src="([^"]+)"([^>]*?)>([\s\S]*?)<h1>([\s\S]*?)<\/h1>/g;

  let replaced = text.replace(regex, (m, beforeImg, preAttrs, src, postAttrs, between, title) => {
    const t = title.trim().replace(/\s+/g, " ");
    // check if alt already exists
    if (/\balt=/.test(preAttrs + postAttrs)) {
      // ensure loading attribute
      if (/\bloading=/.test(preAttrs + postAttrs)) {
        return m; // leave as is
      } else {
        return `${beforeImg}<img ${preAttrs}src="${src}" ${postAttrs} loading="lazy">${between}<h1>${t}</h1>`;
      }
    } else {
      return `${beforeImg}<img ${preAttrs}src="${src}" ${postAttrs} alt="${t}" loading="lazy">${between}<h1>${t}</h1>`;
    }
  });

  // Insert Open Graph if missing
  if (!/property="og:title"/.test(replaced)) {
    const og = `\n    <meta property="og:title" content="DCShop - Cửa hàng công nghệ">\n    <meta property="og:description" content="Cửa hàng DCShop - điện thoại, laptop, PC và phụ kiện chính hãng">\n    <meta property="og:image" content="images/dcshoplogo.png">\n    <meta name="twitter:card" content="summary_large_image">`;
    replaced = replaced.replace(/(<meta name="description" content="[^"]+">)/, `$1${og}`);
  }

  if (replaced !== text) {
    fs.writeFileSync(file, replaced, "utf8");
    console.log("Updated", file);
  }
}
console.log("Done");
