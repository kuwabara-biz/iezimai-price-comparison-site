-- ============================================
-- 追加口コミデータ
-- 各業者に最低3件の口コミを追加
-- ============================================

-- 既存の口コミを削除して再投入する場合は、以下をコメント解除
-- DELETE FROM public.reviews;

-- 追加口コミデータ
INSERT INTO public.reviews (vendor_id, area_slug, nickname, rating, body, is_approved) VALUES
  -- さいたまクリーンサービス (既存2件 + 追加2件)
  ((SELECT id FROM public.vendors WHERE slug = 'saitama-clean-service'), 'ageo-shi', 'R.H.', 4, '見積もりが明確で安心してお願いできました。作業も丁寧で、思い出の品も大切に扱ってくださいました。', true),
  ((SELECT id FROM public.vendors WHERE slug = 'saitama-clean-service'), 'toda-shi', 'N.K.', 5, '急な依頼にも関わらず、翌日対応していただけました。スタッフの方々の対応も素晴らしかったです。', true),

  -- 川越遺品整理センター (既存1件 + 追加3件)
  ((SELECT id FROM public.vendors WHERE slug = 'kawagoe-ihin-center'), 'tokorozawa-shi', 'A.T.', 5, '不動産の売却まで一括でお願いできて本当に助かりました。地元の相場に詳しく、適正価格で売却できました。', true),
  ((SELECT id FROM public.vendors WHERE slug = 'kawagoe-ihin-center'), 'sayama-shi', 'K.M.', 4, '丁寧な作業と親切な対応に感謝しています。料金も良心的でした。', true),
  ((SELECT id FROM public.vendors WHERE slug = 'kawagoe-ihin-center'), 'fujimi-shi', 'S.Y.', 5, '遺品整理から解体工事まで全てお任せしました。スムーズに進めていただき感謝です。', true),

  -- 関東ライフサポート (既存1件 + 追加2件)
  ((SELECT id FROM public.vendors WHERE slug = 'kanto-life-support'), 'kawaguchi-shi', 'M.T.', 4, '広域対応で助かりました。複数の物件を同時に対応していただけました。', true),
  ((SELECT id FROM public.vendors WHERE slug = 'kanto-life-support'), 'gunma', 'H.S.', 4, '群馬の実家の整理をお願いしました。遠方でしたが、写真で進捗報告してくれて安心でした。', true),

  -- こころ遺品整理 (既存1件 + 追加2件)
  ((SELECT id FROM public.vendors WHERE slug = 'kokoro-ihin'), 'niiza-shi', 'T.M.', 5, '女性スタッフの方が対応してくださり、母も安心していました。細やかな配慮に感謝です。', true),
  ((SELECT id FROM public.vendors WHERE slug = 'kokoro-ihin'), 'asaka-shi', 'Y.K.', 5, '遺品供養もしていただき、心の整理もつきました。本当にありがとうございました。', true),

  -- 越谷片付けプロ (新規3件)
  ((SELECT id FROM public.vendors WHERE slug = 'koshigaya-kataduke-pro'), 'koshigaya-shi', 'K.I.', 4, '即日対応していただき助かりました。作業も迅速で丁寧でした。', true),
  ((SELECT id FROM public.vendors WHERE slug = 'koshigaya-kataduke-pro'), 'souka-shi', 'M.N.', 4, '料金が明確で安心してお願いできました。エアコンの取り外しもお願いできて便利でした。', true),
  ((SELECT id FROM public.vendors WHERE slug = 'koshigaya-kataduke-pro'), 'misato-shi', 'R.S.', 5, '地域密着で対応が早く、料金も適正でした。また機会があればお願いしたいです。', true),

  -- 北関東遺品サポート (既存1件 + 追加2件)
  ((SELECT id FROM public.vendors WHERE slug = 'kitakanto-ihin-support'), 'tochigi', 'N.T.', 4, '栃木の実家の整理をお願いしました。広い物件でしたが、しっかり対応していただけました。', true),
  ((SELECT id FROM public.vendors WHERE slug = 'kitakanto-ihin-support'), 'kumagaya-shi', 'H.K.', 4, '車両処分も一括でお願いできて助かりました。不動産の相談にも乗っていただけました。', true),

  -- ありがとう遺品整理 (新規3件)
  ((SELECT id FROM public.vendors WHERE slug = 'arigatou-ihin'), 'saitama-shi', 'S.K.', 5, '仏壇の魂抜きから処分まで丁寧に対応していただきました。心から感謝しています。', true),
  ((SELECT id FROM public.vendors WHERE slug = 'arigatou-ihin'), 'kawagoe-shi', 'T.Y.', 5, '「ありがとう」の気持ちを大切にという理念に共感しました。本当にありがとうございました。', true),
  ((SELECT id FROM public.vendors WHERE slug = 'arigatou-ihin'), 'ageo-shi', 'M.H.', 4, '女性スタッフの方が親身に対応してくださり、母も喜んでいました。', true),

  -- 春日部総合リサイクル (新規3件)
  ((SELECT id FROM public.vendors WHERE slug = 'kasukabe-recycle'), 'kasukabe-shi', 'K.S.', 4, '買取に力を入れているだけあって、思わぬ品物が高く売れました。整理費用が抑えられて助かりました。', true),
  ((SELECT id FROM public.vendors WHERE slug = 'kasukabe-recycle'), 'kuki-shi', 'Y.I.', 4, '即日対応で助かりました。買取査定も丁寧で納得できました。', true),
  ((SELECT id FROM public.vendors WHERE slug = 'kasukabe-recycle'), 'koshigaya-shi', 'N.M.', 4, 'リサイクル品の査定が早く、スムーズに作業が進みました。', true),

  -- 熊谷不動産＆遺品整理 (新規3件)
  ((SELECT id FROM public.vendors WHERE slug = 'kumagaya-fudosan-ihin'), 'kumagaya-shi', 'H.T.', 5, '不動産会社が母体なので、空き家の売却まで一気通貫で対応していただけました。', true),
  ((SELECT id FROM public.vendors WHERE slug = 'kumagaya-fudosan-ihin'), 'fukaya-shi', 'S.M.', 4, '解体工事まで一括でお願いできて助かりました。地元の相場に詳しく信頼できました。', true),
  ((SELECT id FROM public.vendors WHERE slug = 'kumagaya-fudosan-ihin'), 'ageo-shi', 'T.K.', 5, '空き家管理のアドバイスもいただき、売却までスムーズに進みました。', true),

  -- エコスマイル埼玉 (新規3件)
  ((SELECT id FROM public.vendors WHERE slug = 'eco-smile-saitama'), 'saitama-shi', 'M.Y.', 4, 'エコを意識した処分方法に共感しました。リサイクル率が高く環境にも優しいです。', true),
  ((SELECT id FROM public.vendors WHERE slug = 'eco-smile-saitama'), 'kawaguchi-shi', 'K.H.', 5, '女性スタッフの方が丁寧に対応してくださり、安心してお願いできました。', true),
  ((SELECT id FROM public.vendors WHERE slug = 'eco-smile-saitama'), 'toda-shi', 'R.N.', 4, '即日対応で助かりました。環境に配慮した処分方法が素晴らしいです。', true);

-- 確認用クエリ
-- SELECT v.name, COUNT(r.id) as review_count
-- FROM public.vendors v
-- LEFT JOIN public.reviews r ON v.id = r.vendor_id
-- GROUP BY v.id, v.name
-- ORDER BY v.name;
