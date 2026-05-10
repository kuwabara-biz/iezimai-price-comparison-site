import * as cheerio from "cheerio";
import { writeFileSync, mkdirSync } from "node:fs";

const BASE = "https://m-ihinseiri.jp";
const LIST_URL = (page) =>
  page === 1 ? `${BASE}/partners/pref-11/` : `${BASE}/partners/pref-11/?page=${page}`;
const PREF_NAME = "埼玉県";

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
  "Accept-Language": "ja,en;q=0.9",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchHtml(url) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`fetch failed ${res.status} ${url}`);
  return res.text();
}

function parseList(html) {
  const $ = cheerio.load(html);
  const items = [];
  $("li.mod-partnerList").each((_, el) => {
    const card = $(el);
    const linkEl = card.find("h2.companyName a, a.photo").first();
    const href = linkEl.attr("href") || "";
    const idMatch = href.match(/\/partners\/(\d+)\//);
    if (!idMatch) return;
    const externalId = idMatch[1];

    const name = card.find("h2.companyName a").text().trim();
    const catchphrase = card.find("p.catchphrase").text().trim() || null;
    const description = card.find("p.description").text().trim() || null;
    const address = card.find("dl.address dd").text().trim() || null;

    const ratingText = card.find(".mod-evaluationRate .point").first().text().trim();
    const rating = ratingText ? Number(ratingText) : null;
    const reviewCountText = card.find(".numberBox b.num").first().text().trim();
    const reviewCount = reviewCountText ? Number(reviewCountText.replace(/[^0-9]/g, "")) : 0;

    const imgSrc =
      card.find("picture img.js-thumbnail").attr("data-url") ||
      card.find("picture img.js-thumbnail").attr("src") ||
      null;

    const pricing = {};
    card.find("table.pricing tr.plan").each((_, tr) => {
      const floor = $(tr).find("th.floor").text().trim();
      const priceRaw = $(tr).find("td.price").text().trim();
      const priceNum = Number(priceRaw.replace(/[^0-9]/g, ""));
      if (floor && priceNum) pricing[floor] = priceNum;
    });

    const badges = [];
    card.find(".mod-badges .badge").each((_, b) => {
      const t = $(b).text().trim();
      if (t && t !== "•••") badges.push(t);
    });

    items.push({
      externalId,
      sourceUrl: `${BASE}${href}`,
      name,
      catchphrase,
      description,
      address,
      rating,
      reviewCount,
      imageUrl: imgSrc,
      pricing,
      badges,
      prefecture: PREF_NAME,
    });
  });

  // total count
  const totalText = $("body").text().match(/全(\d+)社中/);
  const total = totalText ? Number(totalText[1]) : null;

  return { items, total };
}

async function main() {
  mkdirSync("scripts/output", { recursive: true });

  const firstHtml = await fetchHtml(LIST_URL(1));
  const { items: firstItems, total } = parseList(firstHtml);
  const perPage = firstItems.length || 10;
  const totalPages = total ? Math.ceil(total / perPage) : 1;

  console.log(`総業者数: ${total}, ページ数: ${totalPages}, 1ページあたり: ${perPage}`);

  const all = [...firstItems];
  for (let page = 2; page <= totalPages; page++) {
    console.log(`Fetching page ${page}/${totalPages}...`);
    await sleep(1500); // rate limit (be polite)
    try {
      const html = await fetchHtml(LIST_URL(page));
      const { items } = parseList(html);
      console.log(`  -> ${items.length} vendors`);
      all.push(...items);
    } catch (e) {
      console.error(`  page ${page} failed:`, e.message);
    }
  }

  const out = {
    scrapedAt: new Date().toISOString(),
    source: LIST_URL(1),
    prefecture: PREF_NAME,
    total: all.length,
    vendors: all,
  };
  writeFileSync("scripts/output/vendors-saitama.json", JSON.stringify(out, null, 2));
  console.log(`\n✅ ${all.length}件を scripts/output/vendors-saitama.json に保存しました`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
