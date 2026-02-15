// ============================================
// 家じまい.com TypeScript 型定義
// ============================================

export interface Area {
  id: string;
  name: string;
  slug: string;
  parent_region: string | null;
  order_index: number;
}

export interface Vendor {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  features: string[] | null;
  service_areas: string[] | null;
  rating: number;
  min_price: number | null;
  has_real_estate_partnership: boolean;
  phone: string | null;
  website_url: string | null;
  image_url: string | null;
  created_at: string;
}

export interface Lead {
  id: string;
  source: string;
  user_name: string | null;
  contact_info: string | null;
  prefecture: string | null;
  city: string | null;
  address_detail: string | null;
  property_type: string | null;
  status: string;
  image_urls: string[] | null;
  admin_memo: string | null;
  created_at: string;
}

export interface LineLog {
  id: string;
  line_user_id: string | null;
  message_type: string | null;
  content: string | null;
  is_from_user: boolean | null;
  created_at: string;
}

export interface Review {
  id: string;
  vendor_id: string | null;
  area_slug: string | null;
  nickname: string | null;
  rating: number | null;
  body: string | null;
  is_approved: boolean;
  created_at: string;
}

// ステータスの型
export type LeadStatus = 'new' | 'contacted' | 'in_progress' | 'completed' | 'cancelled';
export type PropertyType = '戸建て' | 'マンション' | 'その他';
export type ParentRegion = 'saitama' | 'north-kanto';
