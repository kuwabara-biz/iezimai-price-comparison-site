-- ============================================
-- 業者詳細情報の拡張マイグレーション
-- 実行方法: Supabase Dashboard > SQL Editor で実行
-- ============================================

-- vendors テーブルに詳細カラムを追加
ALTER TABLE public.vendors
  ADD COLUMN IF NOT EXISTS address TEXT,
  ADD COLUMN IF NOT EXISTS representative_name TEXT,
  ADD COLUMN IF NOT EXISTS business_hours TEXT,
  ADD COLUMN IF NOT EXISTS established_year INTEGER,
  ADD COLUMN IF NOT EXISTS employee_count TEXT,
  ADD COLUMN IF NOT EXISTS certifications TEXT[],
  ADD COLUMN IF NOT EXISTS staff_message TEXT;

-- 料金プランテーブル（間取り別料金）
CREATE TABLE IF NOT EXISTS public.vendor_price_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE,
  room_type TEXT NOT NULL,        -- '1K・1R', '1DK', '1LDK', '2LDK', '3LDK', '4LDK以上' など
  price_from INTEGER,             -- 最低料金（円）
  price_to INTEGER,               -- 最高料金（円）
  duration_hours TEXT,            -- 作業時間目安（例: '2〜3時間'）
  staff_count TEXT,               -- スタッフ人数目安（例: '2名'）
  order_index INTEGER DEFAULT 0
);

-- FAQテーブル（よくある質問）
CREATE TABLE IF NOT EXISTS public.vendor_faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INTEGER DEFAULT 0
);

-- RLS設定（読み取りは全員可）
ALTER TABLE public.vendor_price_plans ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'vendor_price_plans'
    AND policyname = 'Public vendor_price_plans are viewable by everyone.'
  ) THEN
    CREATE POLICY "Public vendor_price_plans are viewable by everyone."
      ON public.vendor_price_plans FOR SELECT USING (true);
  END IF;
END $$;

ALTER TABLE public.vendor_faqs ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'vendor_faqs'
    AND policyname = 'Public vendor_faqs are viewable by everyone.'
  ) THEN
    CREATE POLICY "Public vendor_faqs are viewable by everyone."
      ON public.vendor_faqs FOR SELECT USING (true);
  END IF;
END $$;

-- ============================================
-- サンプルデータ（任意）
-- saitama-clean-service に詳細情報を追加する例
-- ============================================
/*
UPDATE public.vendors SET
  address = '埼玉県さいたま市大宮区1-1-1',
  representative_name = '田中 太郎',
  business_hours = '8:00〜20:00（年中無休）',
  established_year = 2004,
  employee_count = '15名',
  certifications = ARRAY['遺品整理士認定（第12345号）', '一般廃棄物収集運搬業許可', '古物商許可'],
  staff_message = '大切なご家族の遺品を、心を込めてお取り扱いいたします。どんな小さな疑問でもお気軽にご相談ください。'
WHERE slug = 'saitama-clean-service';

INSERT INTO public.vendor_price_plans (vendor_id, room_type, price_from, price_to, duration_hours, staff_count, order_index)
SELECT id, '1K・1R', 35000, 60000, '2〜4時間', '2名', 1 FROM public.vendors WHERE slug = 'saitama-clean-service';
INSERT INTO public.vendor_price_plans (vendor_id, room_type, price_from, price_to, duration_hours, staff_count, order_index)
SELECT id, '1DK', 50000, 90000, '3〜5時間', '2名', 2 FROM public.vendors WHERE slug = 'saitama-clean-service';
INSERT INTO public.vendor_price_plans (vendor_id, room_type, price_from, price_to, duration_hours, staff_count, order_index)
SELECT id, '1LDK', 70000, 120000, '4〜6時間', '3名', 3 FROM public.vendors WHERE slug = 'saitama-clean-service';
INSERT INTO public.vendor_price_plans (vendor_id, room_type, price_from, price_to, duration_hours, staff_count, order_index)
SELECT id, '2LDK', 100000, 180000, '5〜8時間', '3〜4名', 4 FROM public.vendors WHERE slug = 'saitama-clean-service';
INSERT INTO public.vendor_price_plans (vendor_id, room_type, price_from, price_to, duration_hours, staff_count, order_index)
SELECT id, '3LDK', 150000, 250000, '1〜2日', '4〜5名', 5 FROM public.vendors WHERE slug = 'saitama-clean-service';
INSERT INTO public.vendor_price_plans (vendor_id, room_type, price_from, price_to, duration_hours, staff_count, order_index)
SELECT id, '4LDK以上', 200000, NULL, 'お見積もり', '5名〜', 6 FROM public.vendors WHERE slug = 'saitama-clean-service';

INSERT INTO public.vendor_faqs (vendor_id, question, answer, order_index)
SELECT id, '作業当日に追加料金が発生することはありますか？', '見積もり時に確認した内容の範囲では追加料金は発生しません。ただし、見積もり時に確認できなかった荷物がある場合は、作業前にご説明し、ご了承いただいてから追加費用をいただく場合があります。', 1 FROM public.vendors WHERE slug = 'saitama-clean-service';
INSERT INTO public.vendor_faqs (vendor_id, question, answer, order_index)
SELECT id, '遺品の買取はできますか？', 'はい、価値のある品物は買取が可能です。買取金額は整理費用から差し引きますので、費用を抑えることができます。骨董品・ブランド品・貴金属などもお気軽にご相談ください。', 2 FROM public.vendors WHERE slug = 'saitama-clean-service';
INSERT INTO public.vendor_faqs (vendor_id, question, answer, order_index)
SELECT id, '遠方に住んでいて立ち会いが難しいのですが？', '鍵をお預かりしての作業も承っております。作業前・作業中・作業後に写真でご報告しますので、遠方の方でも安心してお任せいただけます。', 3 FROM public.vendors WHERE slug = 'saitama-clean-service';
*/
