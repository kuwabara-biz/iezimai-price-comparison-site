-- ============================================
-- 家じまい.com シードデータ
-- エリアマスタ ＋ サンプル業者データ
-- ============================================

-- エリアマスタ：埼玉県主要都市
INSERT INTO public.areas (name, slug, parent_region, order_index) VALUES
  ('さいたま市', 'saitama-shi', 'saitama', 1),
  ('川口市', 'kawaguchi-shi', 'saitama', 2),
  ('川越市', 'kawagoe-shi', 'saitama', 3),
  ('所沢市', 'tokorozawa-shi', 'saitama', 4),
  ('越谷市', 'koshigaya-shi', 'saitama', 5),
  ('草加市', 'souka-shi', 'saitama', 6),
  ('春日部市', 'kasukabe-shi', 'saitama', 7),
  ('上尾市', 'ageo-shi', 'saitama', 8),
  ('熊谷市', 'kumagaya-shi', 'saitama', 9),
  ('新座市', 'niiza-shi', 'saitama', 10),
  ('狭山市', 'sayama-shi', 'saitama', 11),
  ('久喜市', 'kuki-shi', 'saitama', 12),
  ('入間市', 'iruma-shi', 'saitama', 13),
  ('深谷市', 'fukaya-shi', 'saitama', 14),
  ('三郷市', 'misato-shi', 'saitama', 15),
  ('朝霞市', 'asaka-shi', 'saitama', 16),
  ('富士見市', 'fujimi-shi', 'saitama', 17),
  ('蕨市', 'warabi-shi', 'saitama', 18),
  ('戸田市', 'toda-shi', 'saitama', 19),
  ('その他埼玉県', 'saitama-other', 'saitama', 99);

-- エリアマスタ：北関東3県
INSERT INTO public.areas (name, slug, parent_region, order_index) VALUES
  ('群馬県', 'gunma', 'north-kanto', 101),
  ('栃木県', 'tochigi', 'north-kanto', 102),
  ('茨城県', 'ibaraki', 'north-kanto', 103);

-- サンプル業者データ（10社）
INSERT INTO public.vendors (name, slug, description, features, service_areas, rating, min_price, has_real_estate_partnership) VALUES
  (
    'さいたまクリーンサービス',
    'saitama-clean-service',
    'さいたま市を中心に20年以上の実績。丁寧な仕分けと迅速な対応が強みです。遺品の供養も承ります。',
    ARRAY['即日対応', '女性スタッフ', '遺品供養対応', '見積無料'],
    ARRAY['saitama-shi', 'kawaguchi-shi', 'ageo-shi', 'toda-shi', 'warabi-shi'],
    4.5, 35000, false
  ),
  (
    '川越遺品整理センター',
    'kawagoe-ihin-center',
    '川越・所沢エリアNo.1の口コミ評価。ご遺族の気持ちに寄り添った丁寧な作業をお約束します。',
    ARRAY['即日対応', '不動産買取可', '解体工事対応', '見積無料'],
    ARRAY['kawagoe-shi', 'tokorozawa-shi', 'sayama-shi', 'iruma-shi', 'fujimi-shi'],
    4.7, 30000, true
  ),
  (
    '関東ライフサポート',
    'kanto-life-support',
    '埼玉全域＋北関東をカバーする広域対応業者。大型案件にも対応可能です。',
    ARRAY['即日対応', '不動産買取可', 'さいたま市粗大ゴミ搬出対応', '見積無料'],
    ARRAY['saitama-shi', 'kawaguchi-shi', 'koshigaya-shi', 'souka-shi', 'kasukabe-shi', 'gunma', 'tochigi'],
    4.2, 25000, true
  ),
  (
    'こころ遺品整理',
    'kokoro-ihin',
    '女性スタッフ中心の遺品整理専門業者。繊細な対応が必要なケースもお任せください。',
    ARRAY['女性スタッフ', '遺品供養対応', '生前整理対応', '見積無料'],
    ARRAY['saitama-shi', 'niiza-shi', 'asaka-shi', 'toda-shi', 'warabi-shi'],
    4.8, 40000, false
  ),
  (
    '越谷片付けプロ',
    'koshigaya-kataduke-pro',
    '越谷・草加・三郷エリアの地域密着型業者。スピーディーな対応と適正価格が評判です。',
    ARRAY['即日対応', 'エアコン取り外し対応', '見積無料'],
    ARRAY['koshigaya-shi', 'souka-shi', 'misato-shi', 'kasukabe-shi'],
    4.3, 28000, false
  ),
  (
    '北関東遺品サポート',
    'kitakanto-ihin-support',
    '群馬・栃木・茨城の北関東3県をカバー。地方ならではの広い物件にも対応。',
    ARRAY['即日対応', '不動産買取可', '解体工事対応', '車両処分対応'],
    ARRAY['gunma', 'tochigi', 'ibaraki', 'kumagaya-shi', 'fukaya-shi'],
    4.1, 20000, true
  ),
  (
    'ありがとう遺品整理',
    'arigatou-ihin',
    '「ありがとう」の気持ちを大切に。仏壇・神棚の魂抜きから不用品回収まで一括対応。',
    ARRAY['遺品供養対応', '仏壇処分対応', '女性スタッフ', '見積無料'],
    ARRAY['saitama-shi', 'kawagoe-shi', 'tokorozawa-shi', 'ageo-shi', 'kumagaya-shi'],
    4.6, 35000, false
  ),
  (
    '春日部総合リサイクル',
    'kasukabe-recycle',
    '買取に強い！遺品の中から価値ある品を見つけ、整理費用を抑えます。',
    ARRAY['買取強化', '即日対応', 'さいたま市粗大ゴミ搬出対応', '見積無料'],
    ARRAY['kasukabe-shi', 'kuki-shi', 'koshigaya-shi', 'souka-shi'],
    4.0, 22000, false
  ),
  (
    '熊谷不動産＆遺品整理',
    'kumagaya-fudosan-ihin',
    '不動産会社が母体の遺品整理業者。空き家の売却・解体まで一気通貫で対応。',
    ARRAY['不動産買取可', '解体工事対応', '空き家管理', '見積無料'],
    ARRAY['kumagaya-shi', 'fukaya-shi', 'ageo-shi', 'gunma'],
    4.4, 30000, true
  ),
  (
    'エコスマイル埼玉',
    'eco-smile-saitama',
    'エコを意識したリサイクル率90%以上の遺品整理。環境にやさしい処分を実現します。',
    ARRAY['エコ対応', '即日対応', '女性スタッフ', '見積無料'],
    ARRAY['saitama-shi', 'kawaguchi-shi', 'toda-shi', 'warabi-shi', 'niiza-shi', 'asaka-shi'],
    4.3, 32000, false
  );

-- サンプル口コミ
INSERT INTO public.reviews (vendor_id, area_slug, nickname, rating, body, is_approved) VALUES
  ((SELECT id FROM public.vendors WHERE slug = 'saitama-clean-service'), 'saitama-shi', 'T.K.', 5, '母の遺品整理をお願いしました。丁寧に一つ一つ確認してくださり、大切な写真も見つけていただけました。', true),
  ((SELECT id FROM public.vendors WHERE slug = 'saitama-clean-service'), 'kawaguchi-shi', 'M.S.', 4, '見積もりから作業完了まで迅速でした。料金も適正だと思います。', true),
  ((SELECT id FROM public.vendors WHERE slug = 'kawagoe-ihin-center'), 'kawagoe-shi', 'H.N.', 5, '実家の片付けと不動産売却を一括でお願いできて助かりました。川越の相場にも詳しく信頼できました。', true),
  ((SELECT id FROM public.vendors WHERE slug = 'kokoro-ihin'), 'saitama-shi', 'Y.A.', 5, '女性スタッフの方が対応してくれて、母も安心していました。遺品の供養もしていただき感謝です。', true),
  ((SELECT id FROM public.vendors WHERE slug = 'kanto-life-support'), 'koshigaya-shi', 'K.T.', 4, '広い一軒家でしたが、チームで手早く対応してくれました。不動産の相談にも乗ってもらえました。', true),
  ((SELECT id FROM public.vendors WHERE slug = 'kitakanto-ihin-support'), 'gunma', 'S.M.', 4, '群馬の実家の整理をお願いしました。遠方からの依頼でしたが、写真で進捗報告してくれて安心でした。', true);
