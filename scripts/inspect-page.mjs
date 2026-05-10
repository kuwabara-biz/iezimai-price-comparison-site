import * as cheerio from "cheerio";
import { writeFileSync } from "node:fs";

const URL = "https://m-ihinseiri.jp/partners/pref-11/";

const res = await fetch(URL, {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
  },
});
const html = await res.text();
writeFileSync("scripts/sample.html", html);

const $ = cheerio.load(html);

console.log("=== title ===");
console.log($("title").text());
console.log("=== first 2000 chars of body ===");
console.log($("body").text().slice(0, 2000));
console.log("=== candidate card classes (h2/h3 with 業者 names) ===");
$("h2, h3, h4").slice(0, 20).each((i, el) => {
  console.log(i, $(el).attr("class") || "(no class)", "->", $(el).text().trim().slice(0, 60));
});
console.log("=== anchors to /partners/<id>/ ===");
const seen = new Set();
$("a[href*='/partners/']").each((_, el) => {
  const href = $(el).attr("href") || "";
  const m = href.match(/\/partners\/(\d+)\//);
  if (m) seen.add(m[1]);
});
console.log("found partner ids:", [...seen]);
