// ============================================
// 家じまい.com モックデータ
// Supabase接続前の開発用ダミーデータ
// ============================================

import { Area, Vendor, Review } from "./database.types";

// エリアデータ
export const mockAreas: Area[] = [
  // 埼玉県主要都市
  { id: "a1", name: "さいたま市", slug: "saitama-shi", parent_region: "saitama", order_index: 1 },
  { id: "a2", name: "川口市", slug: "kawaguchi-shi", parent_region: "saitama", order_index: 2 },
  { id: "a3", name: "川越市", slug: "kawagoe-shi", parent_region: "saitama", order_index: 3 },
  { id: "a4", name: "所沢市", slug: "tokorozawa-shi", parent_region: "saitama", order_index: 4 },
  { id: "a5", name: "越谷市", slug: "koshigaya-shi", parent_region: "saitama", order_index: 5 },
  { id: "a6", name: "草加市", slug: "souka-shi", parent_region: "saitama", order_index: 6 },
  { id: "a7", name: "春日部市", slug: "kasukabe-shi", parent_region: "saitama", order_index: 7 },
  { id: "a8", name: "上尾市", slug: "ageo-shi", parent_region: "saitama", order_index: 8 },
  { id: "a9", name: "熊谷市", slug: "kumagaya-shi", parent_region: "saitama", order_index: 9 },
  { id: "a10", name: "新座市", slug: "niiza-shi", parent_region: "saitama", order_index: 10 },
  { id: "a11", name: "狭山市", slug: "sayama-shi", parent_region: "saitama", order_index: 11 },
  { id: "a12", name: "久喜市", slug: "kuki-shi", parent_region: "saitama", order_index: 12 },
  { id: "a13", name: "入間市", slug: "iruma-shi", parent_region: "saitama", order_index: 13 },
  { id: "a14", name: "深谷市", slug: "fukaya-shi", parent_region: "saitama", order_index: 14 },
  { id: "a15", name: "三郷市", slug: "misato-shi", parent_region: "saitama", order_index: 15 },
  { id: "a16", name: "朝霞市", slug: "asaka-shi", parent_region: "saitama", order_index: 16 },
  { id: "a17", name: "富士見市", slug: "fujimi-shi", parent_region: "saitama", order_index: 17 },
  { id: "a18", name: "蕨市", slug: "warabi-shi", parent_region: "saitama", order_index: 18 },
  { id: "a19", name: "戸田市", slug: "toda-shi", parent_region: "saitama", order_index: 19 },
  { id: "a20", name: "その他埼玉県", slug: "saitama-other", parent_region: "saitama", order_index: 99 },
  // 北関東
  { id: "a21", name: "群馬県", slug: "gunma", parent_region: "north-kanto", order_index: 101 },
  { id: "a22", name: "栃木県", slug: "tochigi", parent_region: "north-kanto", order_index: 102 },
  { id: "a23", name: "茨城県", slug: "ibaraki", parent_region: "north-kanto", order_index: 103 },
];

// 業者データ
export const mockVendors: Vendor[] = [
  {
    id: "v1",
    name: "さいたまクリーンサービス",
    slug: "saitama-clean-service",
    description: "さいたま市を中心に20年以上の実績。丁寧な仕分けと迅速な対応が強みです。遺品の供養も承ります。",
    features: ["即日対応", "女性スタッフ", "遺品供養対応", "見積無料"],
    service_areas: ["saitama-shi", "kawaguchi-shi", "ageo-shi", "toda-shi", "warabi-shi"],
    rating: 4.5,
    min_price: 35000,
    has_real_estate_partnership: false,
    phone: "048-000-0001",
    website_url: null,
    image_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "v2",
    name: "川越遺品整理センター",
    slug: "kawagoe-ihin-center",
    description: "川越・所沢エリアNo.1の口コミ評価。ご遺族の気持ちに寄り添った丁寧な作業をお約束します。",
    features: ["即日対応", "不動産買取可", "解体工事対応", "見積無料"],
    service_areas: ["kawagoe-shi", "tokorozawa-shi", "sayama-shi", "iruma-shi", "fujimi-shi"],
    rating: 4.7,
    min_price: 30000,
    has_real_estate_partnership: true,
    phone: "049-000-0002",
    website_url: null,
    image_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "v3",
    name: "関東ライフサポート",
    slug: "kanto-life-support",
    description: "埼玉全域＋北関東をカバーする広域対応業者。大型案件にも対応可能です。",
    features: ["即日対応", "不動産買取可", "さいたま市粗大ゴミ搬出対応", "見積無料"],
    service_areas: ["saitama-shi", "kawaguchi-shi", "koshigaya-shi", "souka-shi", "kasukabe-shi", "gunma", "tochigi"],
    rating: 4.2,
    min_price: 25000,
    has_real_estate_partnership: true,
    phone: "048-000-0003",
    website_url: null,
    image_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "v4",
    name: "こころ遺品整理",
    slug: "kokoro-ihin",
    description: "女性スタッフ中心の遺品整理専門業者。繊細な対応が必要なケースもお任せください。",
    features: ["女性スタッフ", "遺品供養対応", "生前整理対応", "見積無料"],
    service_areas: ["saitama-shi", "niiza-shi", "asaka-shi", "toda-shi", "warabi-shi"],
    rating: 4.8,
    min_price: 40000,
    has_real_estate_partnership: false,
    phone: "048-000-0004",
    website_url: null,
    image_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "v5",
    name: "越谷片付けプロ",
    slug: "koshigaya-kataduke-pro",
    description: "越谷・草加・三郷エリアの地域密着型業者。スピーディーな対応と適正価格が評判です。",
    features: ["即日対応", "エアコン取り外し対応", "見積無料"],
    service_areas: ["koshigaya-shi", "souka-shi", "misato-shi", "kasukabe-shi"],
    rating: 4.3,
    min_price: 28000,
    has_real_estate_partnership: false,
    phone: "048-000-0005",
    website_url: null,
    image_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "v6",
    name: "北関東遺品サポート",
    slug: "kitakanto-ihin-support",
    description: "群馬・栃木・茨城の北関東3県をカバー。地方ならではの広い物件にも対応。",
    features: ["即日対応", "不動産買取可", "解体工事対応", "車両処分対応"],
    service_areas: ["gunma", "tochigi", "ibaraki", "kumagaya-shi", "fukaya-shi"],
    rating: 4.1,
    min_price: 20000,
    has_real_estate_partnership: true,
    phone: "027-000-0006",
    website_url: null,
    image_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "v7",
    name: "ありがとう遺品整理",
    slug: "arigatou-ihin",
    description: "「ありがとう」の気持ちを大切に。仏壇・神棚の魂抜きから不用品回収まで一括対応。",
    features: ["遺品供養対応", "仏壇処分対応", "女性スタッフ", "見積無料"],
    service_areas: ["saitama-shi", "kawagoe-shi", "tokorozawa-shi", "ageo-shi", "kumagaya-shi"],
    rating: 4.6,
    min_price: 35000,
    has_real_estate_partnership: false,
    phone: "048-000-0007",
    website_url: null,
    image_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "v8",
    name: "春日部総合リサイクル",
    slug: "kasukabe-recycle",
    description: "買取に強い！遺品の中から価値ある品を見つけ、整理費用を抑えます。",
    features: ["買取強化", "即日対応", "さいたま市粗大ゴミ搬出対応", "見積無料"],
    service_areas: ["kasukabe-shi", "kuki-shi", "koshigaya-shi", "souka-shi"],
    rating: 4.0,
    min_price: 22000,
    has_real_estate_partnership: false,
    phone: "048-000-0008",
    website_url: null,
    image_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "v9",
    name: "熊谷不動産＆遺品整理",
    slug: "kumagaya-fudosan-ihin",
    description: "不動産会社が母体の遺品整理業者。空き家の売却・解体まで一気通貫で対応。",
    features: ["不動産買取可", "解体工事対応", "空き家管理", "見積無料"],
    service_areas: ["kumagaya-shi", "fukaya-shi", "ageo-shi", "gunma"],
    rating: 4.4,
    min_price: 30000,
    has_real_estate_partnership: true,
    phone: "048-000-0009",
    website_url: null,
    image_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "v10",
    name: "エコスマイル埼玉",
    slug: "eco-smile-saitama",
    description: "エコを意識したリサイクル率90%以上の遺品整理。環境にやさしい処分を実現します。",
    features: ["エコ対応", "即日対応", "女性スタッフ", "見積無料"],
    service_areas: ["saitama-shi", "kawaguchi-shi", "toda-shi", "warabi-shi", "niiza-shi", "asaka-shi"],
    rating: 4.3,
    min_price: 32000,
    has_real_estate_partnership: false,
    phone: "048-000-0010",
    website_url: null,
    image_url: null,
    created_at: new Date().toISOString(),
  },
];

// 口コミデータ
export const mockReviews: Review[] = [
  { id: "r1", vendor_id: "v1", area_slug: "saitama-shi", nickname: "T.K.", rating: 5, body: "母の遺品整理をお願いしました。丁寧に一つ一つ確認してくださり、大切な写真も見つけていただけました。", is_approved: true, created_at: "2025-12-01T00:00:00Z" },
  { id: "r2", vendor_id: "v1", area_slug: "kawaguchi-shi", nickname: "M.S.", rating: 4, body: "見積もりから作業完了まで迅速でした。料金も適正だと思います。", is_approved: true, created_at: "2025-11-15T00:00:00Z" },
  { id: "r3", vendor_id: "v2", area_slug: "kawagoe-shi", nickname: "H.N.", rating: 5, body: "実家の片付けと不動産売却を一括でお願いできて助かりました。川越の相場にも詳しく信頼できました。", is_approved: true, created_at: "2025-10-20T00:00:00Z" },
  { id: "r4", vendor_id: "v4", area_slug: "saitama-shi", nickname: "Y.A.", rating: 5, body: "女性スタッフの方が対応してくれて、母も安心していました。遺品の供養もしていただき感謝です。", is_approved: true, created_at: "2025-12-10T00:00:00Z" },
  { id: "r5", vendor_id: "v3", area_slug: "koshigaya-shi", nickname: "K.T.", rating: 4, body: "広い一軒家でしたが、チームで手早く対応してくれました。不動産の相談にも乗ってもらえました。", is_approved: true, created_at: "2025-11-01T00:00:00Z" },
  { id: "r6", vendor_id: "v6", area_slug: "gunma", nickname: "S.M.", rating: 4, body: "群馬の実家の整理をお願いしました。遠方からの依頼でしたが、写真で進捗報告してくれて安心でした。", is_approved: true, created_at: "2025-09-05T00:00:00Z" },
  { id: "r7", vendor_id: "v7", area_slug: "kawagoe-shi", nickname: "R.I.", rating: 5, body: "仏壇の魂抜きもお坊さんを手配してくださり、全てお任せできました。", is_approved: true, created_at: "2025-11-20T00:00:00Z" },
  { id: "r8", vendor_id: "v9", area_slug: "kumagaya-shi", nickname: "A.O.", rating: 4, body: "空き家になった実家を整理から売却まで一括で対応してもらいました。地元の不動産相場に詳しいのが心強かったです。", is_approved: true, created_at: "2025-10-15T00:00:00Z" },
];

// ヘルパー関数
export function getAreasByRegion(region: string): Area[] {
  return mockAreas.filter((a) => a.parent_region === region).sort((a, b) => a.order_index - b.order_index);
}

export function getAreaBySlug(slug: string): Area | undefined {
  return mockAreas.find((a) => a.slug === slug);
}

export function getVendorsByArea(areaSlug: string): Vendor[] {
  return mockVendors.filter((v) => v.service_areas?.includes(areaSlug));
}

export function getVendorBySlug(slug: string): Vendor | undefined {
  return mockVendors.find((v) => v.slug === slug);
}

export function getReviewsByVendor(vendorId: string): Review[] {
  return mockReviews.filter((r) => r.vendor_id === vendorId && r.is_approved);
}
