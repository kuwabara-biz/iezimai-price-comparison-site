-- ============================================
-- Supabase Storage: vendor-images バケット設定
-- Supabase ダッシュボードの SQL Editor で実行してください
-- ============================================

-- バケット作成（public = 認証なしで画像を読める）
INSERT INTO storage.buckets (id, name, public)
VALUES ('vendor-images', 'vendor-images', true)
ON CONFLICT (id) DO NOTHING;

-- 全員が画像を閲覧できる
CREATE POLICY "Public read vendor images"
ON storage.objects FOR SELECT
USING (bucket_id = 'vendor-images');

-- 管理者が画像をアップロードできる
CREATE POLICY "Admin upload vendor images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'vendor-images');

-- 管理者が画像を上書きできる
CREATE POLICY "Admin update vendor images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'vendor-images');

-- 管理者が画像を削除できる
CREATE POLICY "Admin delete vendor images"
ON storage.objects FOR DELETE
USING (bucket_id = 'vendor-images');
