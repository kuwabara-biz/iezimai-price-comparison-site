import { readFileSync, writeFileSync } from "node:fs";

const data = JSON.parse(readFileSync("scripts/output/vendors-saitama.json", "utf8"));
const esc = (s) => `'${String(s).replace(/'/g, "''")}'`;

const lines = ["BEGIN;"];

// 既存の imported-* の price plans を一括削除
lines.push(`DELETE FROM public.vendor_price_plans WHERE vendor_id IN (SELECT id FROM public.vendors WHERE slug LIKE 'imported-%');`);
lines.push("");

const rows = [];
for (const v of data.vendors) {
  const slug = `imported-${v.externalId}`;
  Object.entries(v.pricing).forEach(([roomType, price], i) => {
    rows.push(`((SELECT id FROM public.vendors WHERE slug = ${esc(slug)}), ${esc(roomType)}, ${price}, ${i + 1})`);
  });
}

if (rows.length > 0) {
  lines.push(`INSERT INTO public.vendor_price_plans (vendor_id, room_type, price_from, order_index) VALUES`);
  lines.push(rows.join(",\n") + ";");
}

lines.push("COMMIT;");

const sql = lines.join("\n");
writeFileSync("scripts/output/import-price-plans.sql", sql);
console.log(`生成: ${rows.length} rows, ${sql.length} bytes`);
