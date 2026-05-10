import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

// .env.local を簡易パース
const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, "")];
    })
);

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) throw new Error("Supabase URL/KEY not found in .env.local");

const supabase = createClient(url, key);
const data = JSON.parse(readFileSync("scripts/output/vendors-saitama.json", "utf8"));
const vendors = data.vendors;

function extractCity(addr) {
  if (!addr) return null;
  const m1 = addr.match(/埼玉県([^\d\s]+?[市区町村郡][^\d\s]*?[区市町村])/);
  if (m1) return m1[1];
  const m2 = addr.match(/埼玉県([^\d\s]+?[市町村郡])/);
  if (m2) return m2[1];
  return null;
}

let okCount = 0;
let errCount = 0;
const errors = [];

for (const v of vendors) {
  const slug = `imported-${v.externalId}`;
  const minPrice = Object.values(v.pricing).filter(Boolean).sort((a, b) => a - b)[0] || null;
  const city = extractCity(v.address);
  const desc = [v.catchphrase, v.description].filter(Boolean).join("\n\n") || null;

  const row = {
    slug,
    name: v.name,
    description: desc,
    features: v.badges,
    service_areas: city ? [city] : ["埼玉県"],
    rating: v.rating,
    min_price: minPrice,
    phone: null,
    website_url: null,
    image_url: v.imageUrl,
    address: v.address,
  };

  // upsert vendor
  const { data: upserted, error } = await supabase
    .from("vendors")
    .upsert(row, { onConflict: "slug" })
    .select("id")
    .single();

  if (error) {
    errCount++;
    errors.push({ name: v.name, error: error.message });
    continue;
  }

  const vendorId = upserted.id;

  // refresh price plans
  await supabase.from("vendor_price_plans").delete().eq("vendor_id", vendorId);
  const planRows = Object.entries(v.pricing).map(([roomType, price], i) => ({
    vendor_id: vendorId,
    room_type: roomType,
    price_from: price,
    order_index: i + 1,
  }));
  if (planRows.length > 0) {
    const { error: planErr } = await supabase.from("vendor_price_plans").insert(planRows);
    if (planErr) {
      errors.push({ name: v.name, error: `price_plans: ${planErr.message}` });
    }
  }

  okCount++;
  if (okCount % 20 === 0) console.log(`  ${okCount}/${vendors.length} done`);
}

console.log(`\n=== 完了 ===`);
console.log(`成功: ${okCount}件 / 失敗: ${errCount}件`);
if (errors.length > 0) {
  console.log(`\n=== エラー詳細 ===`);
  errors.slice(0, 10).forEach((e) => console.log(`  ${e.name}: ${e.error}`));
  if (errors.length > 10) console.log(`  ...他${errors.length - 10}件`);
}
