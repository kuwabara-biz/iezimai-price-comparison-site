import * as cheerio from "cheerio";
import { readFileSync } from "node:fs";

const html = readFileSync("scripts/sample.html", "utf8");
const $ = cheerio.load(html);

const card = $("li.mod-partnerList").first();
console.log("=== card HTML ===");
console.log(card.html());
