import * as cheerio from "cheerio";
import { writeFileSync } from "node:fs";

const URL = "https://m-ihinseiri.jp/partners/176/";
const res = await fetch(URL, {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
  },
});
const html = await res.text();
writeFileSync("scripts/sample-detail.html", html);

const $ = cheerio.load(html);

// look for any URL field
console.log("=== <a> with external href ===");
const seen = new Set();
$("a[href^='http']").each((_, el) => {
  const href = $(el).attr("href") || "";
  // skip same domain & known social
  if (
    href.includes("m-ihinseiri.jp") ||
    href.includes("twitter.com") ||
    href.includes("facebook.com") ||
    href.includes("instagram.com") ||
    href.includes("googletagmanager") ||
    href.includes("cloudfront.net") ||
    href.includes("youtube.com") ||
    href.includes("line.me")
  ) return;
  if (seen.has(href)) return;
  seen.add(href);
  const text = $(el).text().trim().slice(0, 60);
  console.log(`  ${href}  ← "${text}"`);
});

// also inspect body for hints
console.log("\n=== body 中の HP / 公式 / website 周辺 ===");
const body = $("body").html() || "";
["公式", "ホームページ", "ウェブサイト", "URL", "https?://"].forEach((kw) => {
  const re = new RegExp(`.{0,80}${kw}.{0,200}`, "g");
  const ms = body.match(re);
  if (ms) ms.slice(0, 3).forEach((m) => console.log(`  [${kw}] ${m.replace(/<[^>]+>/g, "").slice(0, 250)}`));
});
