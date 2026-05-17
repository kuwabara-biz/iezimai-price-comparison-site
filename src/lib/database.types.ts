// ============================================
// 家じまい.com TypeScript 型定義
// リード管理のみSupabaseを利用するため、最小限の型のみ定義
// ============================================

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

export type LeadStatus = 'new' | 'contacted' | 'in_progress' | 'completed' | 'cancelled';
