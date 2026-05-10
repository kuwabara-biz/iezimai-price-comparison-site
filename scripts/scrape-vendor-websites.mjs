import * as cheerio from "cheerio";
import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, "")];
    })
);
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const args = new Set(process.argv.slice(2));
const DRY = args.has("--dry");
const FORCE = args.has("--force"); // 既にwebsite_url有りでも上書き
const LIMIT = (() => {
  const a = process.argv.find((x) => x.startsWith("--limit="));
  return a ? Number(a.split("=")[1]) : Infinity;
})();

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
  "Accept-Language": "ja,en;q=0.9",
};

// 確実に「業者公式サイト」ではないドメインのブラックリスト
const BLACKLIST = [
  "m-ihinseiri.jp", "ihinseiriguide.com", "ihinseiri-meister.jp",
  "ihinseiri-jonan.com", "ihinseirishi.org",
  "wikipedia.org", "ameblo.jp", "blog.fc2.com",
  "youtube.com", "facebook.com", "twitter.com", "x.com", "instagram.com",
  "tiktok.com", "linkedin.com", "line.me",
  "tabelog.com", "ekiten.jp", "navitime.co.jp", "mapion.co.jp",
  "google.com", "google.co.jp", "duckduckgo.com",
  "amazon.co.jp", "rakuten.co.jp", "yahoo.co.jp",
  "homes.co.jp", "lifull.com", "lifull-senior.com",
  "town-life.jp", "100life.jp",
  "indeed.com", "townwork.net", "baitoru.com",
  "i-tower.jp", "j-net21.smrj.go.jp", "houjin.jp",
];

function isBlacklisted(url) {
  const host = new URL(url).hostname.replace(/^www\./, "");
  return BLACKLIST.some((b) => host === b || host.endsWith("." + b));
}

// DuckDuckGo HTML 検索
async function searchDuckDuckGo(query) {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`ddg ${res.status}`);
  const html = await res.text();
  const $ = cheerio.load(html);
  const results = [];
  $(".result__a, a.result__url").each((_, el) => {
    let href = $(el).attr("href") || "";
    // DDG redirector
    const m = href.match(/uddg=([^&]+)/);
    if (m) href = decodeURIComponent(m[1]);
    if (!href.startsWith("http")) return;
    const title = $(el).text().trim();
    if (!results.find((r) => r.href === href)) results.push({ href, title });
  });
  return results;
}

// 候補スコアリング: 業者名のキーワードがホスト/タイトル/URLに含まれるかで判定
function score(result, vendor) {
  const url = result.href.toLowerCase();
  const title = result.title.toLowerCase();
  if (isBlacklisted(result.href)) return -1;

  let s = 0;

  // 株式会社/合同会社などを除いたキーワード
  const baseName = vendor.name
    .replace(/株式会社|有限会社|合同会社|一般社団法人|社団法人|NPO法人/g, "")
    .replace(/\s+/g, "")
    .toLowerCase();

  // 単純な漢字部分一致
  for (const ch of baseName) {
    if (title.includes(ch)) s += 0.3;
  }

  // 「遺品整理」「リサイクル」等のキーワード
  if (/遺品|整理|清掃|不用品|片付/.test(title)) s += 1;

  // 自社サイトっぽいパターン
  if (/^https?:\/\/(www\.)?[^/]+\/?$/.test(result.href)) s += 1; // ルートURL
  if (url.endsWith(".jp") || url.endsWith(".com") || url.endsWith(".co.jp")) s += 0.5;

  // 都市名一致
  if (vendor.address) {
    const m = vendor.address.match(/埼玉県(.+?[市町村区])/);
    if (m && (title.includes(m[1]) || url.includes(m[1]))) s += 0.5;
  }

  return s;
}

async function findWebsiteFor(vendor) {
  const cityMatch = vendor.address?.match(/埼玉県(.+?[市町村区])/);
  const city = cityMatch ? cityMatch[1] : "埼玉";
  const queries = [
    `"${vendor.name}" 遺品整理 ${city}`,
    `${vendor.name} 公式 遺品整理`,
  ];

  for (const q of queries) {
    let results;
    try {
      results = await searchDuckDuckGo(q);
    } catch (e) {
      console.error(`  search failed: ${e.message}`);
      continue;
    }

    const scored = results
      .map((r) => ({ ...r, score: score(r, vendor) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score);

    if (scored.length > 0 && scored[0].score >= 1.5) {
      // ルートドメインに寄せる
      try {
        const u = new URL(scored[0].href);
        return {
          url: `${u.protocol}//${u.host}/`,
          score: scored[0].score,
          title: scored[0].title,
          query: q,
        };
      } catch {
        return null;
      }
    }
    await sleep(2000);
  }

  return null;
}

async function fetchVendors() {
  const { data, error } = await supabase
    .from("vendors")
    .select("id, slug, name, address, website_url")
    .like("slug", "imported-%")
    .order("slug");
  if (error) throw error;
  return data;
}

async function main() {
  const vendors = await fetchVendors();
  console.log(`対象: ${vendors.length}件 (DRY=${DRY}, FORCE=${FORCE}, LIMIT=${LIMIT})`);

  let processed = 0;
  let found = 0;
  let skipped = 0;
  const results = [];

  for (const v of vendors) {
    if (processed >= LIMIT) break;
    if (v.website_url && !FORCE) {
      skipped++;
      continue;
    }
    processed++;

    process.stdout.write(`[${processed}] ${v.name}: `);
    const hit = await findWebsiteFor(v);
    if (hit) {
      console.log(`✓ ${hit.url} (score=${hit.score.toFixed(1)}, "${hit.title.slice(0, 40)}")`);
      found++;
      results.push({ slug: v.slug, name: v.name, url: hit.url, score: hit.score, title: hit.title });
      if (!DRY) {
        const { error: updErr } = await supabase
          .from("vendors")
          .update({ website_url: hit.url })
          .eq("id", v.id);
        if (updErr) console.error(`  update failed: ${updErr.message}`);
      }
    } else {
      console.log("× not found");
      results.push({ slug: v.slug, name: v.name, url: null });
    }

    await sleep(2500);
  }

  writeFileSync(
    "scripts/output/vendor-websites.json",
    JSON.stringify({ scrapedAt: new Date().toISOString(), processed, found, results }, null, 2)
  );
  console.log(`\n=== 結果 ===`);
  console.log(`処理: ${processed} / 発見: ${found} / スキップ: ${skipped}`);
  console.log(`scripts/output/vendor-websites.json に詳細保存`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
