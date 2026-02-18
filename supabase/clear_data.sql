-- ============================================
-- データクリア用SQL
-- seed.sqlで重複エラーが出た場合に実行
-- ============================================

-- 外部キー制約があるため、逆順で削除
DELETE FROM public.reviews;
DELETE FROM public.leads;
DELETE FROM public.vendors;
DELETE FROM public.areas;

-- 確認用クエリ(オプション)
-- SELECT COUNT(*) FROM public.areas;
-- SELECT COUNT(*) FROM public.vendors;
-- SELECT COUNT(*) FROM public.reviews;
-- SELECT COUNT(*) FROM public.leads;
