import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

// .env.local 読み込み
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
const BUCKET = "vendor-images";

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has("--dry");
const FORCE = args.has("--force"); // 既に Supabase URL でも再アップロード
const LIMIT = (() => {
  const a = process.argv.find((x) => x.startsWith("--limit="));
  return a ? Number(a.split("=")[1]) : Infinity;
})();

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function extFromUrl(url) {
  const m = url.match(/\.(jpe?g|png|webp|gif)(?:\?|$)/i);
  return (m ? m[1] : "jpg").toLowerCase().replace("jpeg", "jpg");
}
function contentTypeFor(ext) {
  return { jpg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif" }[ext] || "image/jpeg";
}

const supabaseHost = new URL(env.NEXT_PUBLIC_SUPABASE_URL).host;

async function fetchVendors() {
  const { data, error } = await supabase
    .from("vendors")
    .select("id, slug, name, image_url")
    .like("slug", "imported-%")
    .order("slug");
  if (error) throw error;
  return data;
}

async function downloadImage(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
      Referer: "https://m-ihinseiri.jp/",
    },
  });
  if (!res.ok) throw new Error(`download failed ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return buf;
}

async function main() {
  const vendors = await fetchVendors();
  console.log(`対象業者: ${vendors.length}件 (DRY_RUN=${DRY_RUN}, FORCE=${FORCE}, LIMIT=${LIMIT})`);

  let ok = 0;
  let skipped = 0;
  let failed = 0;
  const errors = [];

  for (const v of vendors) {
    if (ok + skipped + failed >= LIMIT) break;

    if (!v.image_url) {
      skipped++;
      continue;
    }
    const isAlreadyOnSupabase = v.image_url.includes(supabaseHost);
    if (isAlreadyOnSupabase && !FORCE) {
      skipped++;
      continue;
    }

    const externalId = v.slug.replace(/^imported-/, "");
    const ext = extFromUrl(v.image_url);
    const fileName = `imported-${externalId}.${ext}`;

    try {
      console.log(`[${ok + failed + 1}] ${v.name} → ${fileName}`);
      if (DRY_RUN) {
        ok++;
        continue;
      }

      const buf = await downloadImage(v.image_url);
      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, buf, {
          upsert: true,
          contentType: contentTypeFor(ext),
        });
      if (upErr) throw new Error(`upload: ${upErr.message}`);

      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
      const newUrl = urlData.publicUrl;

      const { error: updErr } = await supabase
        .from("vendors")
        .update({ image_url: newUrl })
        .eq("id", v.id);
      if (updErr) throw new Error(`update: ${updErr.message}`);

      ok++;
      await sleep(500); // 元サイトへの配慮
    } catch (e) {
      failed++;
      errors.push({ name: v.name, slug: v.slug, error: e.message });
      console.error(`  ✗ ${e.message}`);
    }
  }

  console.log(`\n=== 結果 ===`);
  console.log(`成功: ${ok} / スキップ: ${skipped} / 失敗: ${failed}`);
  if (errors.length > 0) {
    console.log("\n=== エラー ===");
    errors.slice(0, 20).forEach((e) => console.log(`  ${e.slug} (${e.name}): ${e.error}`));
    if (errors.length > 20) console.log(`  ...他${errors.length - 20}件`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
