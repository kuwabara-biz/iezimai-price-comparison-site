import { readFileSync, writeFileSync } from "node:fs";

const data = JSON.parse(readFileSync("scripts/output/vendors-saitama.json", "utf8"));
const vendors = data.vendors;

const esc = (s) =>
  s == null ? "NULL" : `'${String(s).replace(/'/g, "''").replace(/\\/g, "\\\\")}'`;
const arr = (xs) => {
  if (!xs || xs.length === 0) return "ARRAY[]::text[]";
  return `ARRAY[${xs.map(esc).join(", ")}]`;
};

// 住所から市区町村を抽出 ("埼玉県さいたま市大宮区..." → "さいたま市大宮区")
function extractCity(addr) {
  if (!addr) return null;
  // 政令指定都市の区まで含む
  const m1 = addr.match(/埼玉県([^\d\s]+?[市区町村郡][^\d\s]*?[区市町村])/);
  if (m1) return m1[1];
  const m2 = addr.match(/埼玉県([^\d\s]+?[市町村郡])/);
  if (m2) return m2[1];
  return null;
}

const lines = [];
lines.push("-- =================================================");
lines.push("-- 埼玉県の遺品整理業者データインポート");
lines.push(`-- ソース: ${data.source}`);
lines.push(`-- 取得日時: ${data.scrapedAt}`);
lines.push(`-- 件数: ${vendors.length}`);
lines.push("-- =================================================");
lines.push("");
lines.push("BEGIN;");
lines.push("");

for (const v of vendors) {
  const slug = `imported-${v.externalId}`;
  const minPrice = Object.values(v.pricing).filter(Boolean).sort((a, b) => a - b)[0] || null;
  const city = extractCity(v.address);
  const serviceAreas = city ? [city] : ["埼玉県"];

  // description は catchphrase + description を結合
  const desc = [v.catchphrase, v.description].filter(Boolean).join("\n\n") || null;

  lines.push(`-- ${v.name} (external:${v.externalId})`);
  lines.push(`INSERT INTO public.vendors (slug, name, description, features, service_areas, rating, min_price, phone, website_url, image_url, address)`);
  lines.push(`VALUES (`);
  lines.push(`  ${esc(slug)},`);
  lines.push(`  ${esc(v.name)},`);
  lines.push(`  ${esc(desc)},`);
  lines.push(`  ${arr(v.badges)},`);
  lines.push(`  ${arr(serviceAreas)},`);
  lines.push(`  ${v.rating ?? "NULL"},`);
  lines.push(`  ${minPrice ?? "NULL"},`);
  lines.push(`  NULL,`); // phone (取得不可)
  lines.push(`  NULL,`); // website_url (公式URLは取得不可)
  lines.push(`  ${esc(v.imageUrl)},`);
  lines.push(`  ${esc(v.address)}`);
  lines.push(`)`);
  lines.push(`ON CONFLICT (slug) DO UPDATE SET`);
  lines.push(`  name = EXCLUDED.name,`);
  lines.push(`  description = EXCLUDED.description,`);
  lines.push(`  features = EXCLUDED.features,`);
  lines.push(`  service_areas = EXCLUDED.service_areas,`);
  lines.push(`  rating = EXCLUDED.rating,`);
  lines.push(`  min_price = EXCLUDED.min_price,`);
  lines.push(`  image_url = EXCLUDED.image_url,`);
  lines.push(`  address = EXCLUDED.address;`);
  lines.push("");

  // 料金プランも追加
  const priceEntries = Object.entries(v.pricing);
  if (priceEntries.length > 0) {
    lines.push(`-- 料金プラン削除して再投入`);
    lines.push(`DELETE FROM public.vendor_price_plans WHERE vendor_id = (SELECT id FROM public.vendors WHERE slug = ${esc(slug)});`);
    priceEntries.forEach(([roomType, price], i) => {
      lines.push(`INSERT INTO public.vendor_price_plans (vendor_id, room_type, price_from, order_index)`);
      lines.push(`SELECT id, ${esc(roomType)}, ${price}, ${i + 1} FROM public.vendors WHERE slug = ${esc(slug)};`);
    });
    lines.push("");
  }
}

lines.push("COMMIT;");
lines.push("");

writeFileSync("scripts/output/import-vendors.sql", lines.join("\n"));
console.log(`✅ scripts/output/import-vendors.sql を生成しました (${vendors.length}件)`);
console.log(`\nSupabase Dashboard > SQL Editor で実行してください。`);
console.log(`または以下のコマンドで実行可能 (psql 経由):`);
console.log(`  psql "$SUPABASE_DB_URL" < scripts/output/import-vendors.sql`);
