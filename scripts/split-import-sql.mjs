import { readFileSync, writeFileSync } from "node:fs";

const sql = readFileSync("scripts/output/import-vendors.sql", "utf8");

// 各業者ブロックは "-- {name} (external:{id})" コメントで始まる
const blocks = sql.split(/(?=-- [^=\n]+ \(external:\d+\))/);
// 先頭はヘッダ部分なので除く
const header = blocks.shift();
console.log(`vendor blocks: ${blocks.length}`);

const chunkSize = 60;
const chunks = [];
for (let i = 0; i < blocks.length; i += chunkSize) {
  chunks.push(blocks.slice(i, i + chunkSize));
}
console.log(`chunks: ${chunks.length}`);

chunks.forEach((chunk, idx) => {
  const body = chunk.join("");
  // BEGIN/COMMIT を各チャンクで包む
  const out = `BEGIN;\n\n${body}\nCOMMIT;\n`;
  const path = `scripts/output/import-vendors-part${idx + 1}.sql`;
  writeFileSync(path, out);
  console.log(`  ${path}: ${chunk.length} vendors, ${out.length} bytes`);
});
