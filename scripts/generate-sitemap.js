const fs = require("fs");

const baseUrl = "https://chaudan0304.github.io/tieuluan_web/";
const files = fs.readdirSync(process.cwd()).filter((f) => f.endsWith(".html"));

const urls = files.map((f) => ({ loc: baseUrl + f, lastmod: new Date().toISOString() }));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`).join("\n")}\n</urlset>`;

fs.writeFileSync("sitemap.xml", sitemap, "utf8");
console.log("sitemap.xml written with", urls.length, "entries");
