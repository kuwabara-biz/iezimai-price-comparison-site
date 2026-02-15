-- ============================================
-- 家じまい.com データベーススキーマ
-- 埼玉・北関東特化 遺品整理・空き家買取プラットフォーム
-- ============================================

-- 1. エリアマスタ (埼玉は市町村単位、北関東は県単位で管理)
create table public.areas (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  parent_region text,
  order_index integer default 0
);

-- 2. 業者データ
create table public.vendors (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique,
  description text,
  features text[],
  service_areas text[],
  rating numeric(2, 1) default 0,
  min_price integer,
  has_real_estate_partnership boolean default false,
  phone text,
  website_url text,
  image_url text,
  created_at timestamp with time zone default now()
);

-- 3. 一括査定リード
create table public.leads (
  id uuid default gen_random_uuid() primary key,
  source text default 'web',
  user_name text,
  contact_info text,
  prefecture text,
  city text,
  address_detail text,
  property_type text,
  status text default 'new',
  image_urls text[],
  admin_memo text,
  created_at timestamp with time zone default now()
);

-- 4. LINE連携ログ
create table public.line_logs (
  id uuid default gen_random_uuid() primary key,
  line_user_id text,
  message_type text,
  content text,
  is_from_user boolean,
  created_at timestamp with time zone default now()
);

-- 5. 口コミ
create table public.reviews (
  id uuid default gen_random_uuid() primary key,
  vendor_id uuid references public.vendors(id),
  area_slug text,
  nickname text,
  rating integer,
  body text,
  is_approved boolean default false,
  created_at timestamp with time zone default now()
);
