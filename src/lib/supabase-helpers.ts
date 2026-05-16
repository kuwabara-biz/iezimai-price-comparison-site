import { supabase } from './supabase'
import { COMPANY } from './constants'
import type { Area, Vendor, Lead, Review, VendorPricePlan, VendorFaq } from './database.types'

// ============================================
// エリア関連
// ============================================

/**
 * 全エリアを取得（北関東は非表示）
 * リニューアル方針：埼玉県のみのサイトとするため parent_region='north-kanto' を除外
 */
export async function getAreas() {
  const { data, error } = await supabase
    .from('areas')
    .select('*')
    .neq('parent_region', 'north-kanto')
    .order('order_index', { ascending: true })

  if (error) throw error
  return data as Area[]
}

/**
 * スラッグでエリアを取得（北関東 slug の場合は notFound）
 */
export async function getAreaBySlug(slug: string) {
  const { data, error } = await supabase
    .from('areas')
    .select('*')
    .eq('slug', slug)
    .neq('parent_region', 'north-kanto')
    .single()

  if (error) throw error
  return data as Area
}

// ============================================
// 業者関連
// ============================================

/**
 * 北関東エリアの slug 一覧を取得（業者フィルタ用キャッシュ）
 */
async function getNorthKantoSlugs(): Promise<Set<string>> {
  const { data } = await supabase
    .from('areas')
    .select('slug')
    .eq('parent_region', 'north-kanto')
  return new Set((data ?? []).map((a) => a.slug as string))
}

const NORTH_KANTO_PREFECTURE_NAMES = ['群馬県', '栃木県', '茨城県'] as const

/**
 * 北関東の業者か判定（住所 or service_areas で判定）
 * - address に「群馬県/栃木県/茨城県」を含む → 除外
 * - service_areas が全て北関東 slug → 除外
 * - それ以外（埼玉サービスエリア含む / 不明）→ 表示
 */
function isNorthKantoVendor(v: Vendor, northKantoSlugs: Set<string>): boolean {
  if (v.address && NORTH_KANTO_PREFECTURE_NAMES.some((p) => v.address!.includes(p))) {
    return true
  }
  if (v.service_areas && v.service_areas.length > 0) {
    return v.service_areas.every((slug) => northKantoSlugs.has(slug))
  }
  return false
}

/**
 * 全業者を取得
 * - 自社「みんなのいえ株式会社」を除外
 * - 北関東の業者を除外（address ベース + service_areas が全て北関東のケース）
 */
export async function getVendors() {
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .order('rating', { ascending: false })

  if (error) throw error

  const northKantoSlugs = await getNorthKantoSlugs()

  return (data ?? [])
    .filter((v) => v.name !== COMPANY.name)
    .filter((v) => !isNorthKantoVendor(v as Vendor, northKantoSlugs)) as Vendor[]
}

/**
 * エリアで業者を絞り込み
 * - 自社・北関東業者を除外
 */
export async function getVendorsByArea(areaSlug: string) {
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .contains('service_areas', [areaSlug])
    .order('rating', { ascending: false })

  if (error) throw error

  const northKantoSlugs = await getNorthKantoSlugs()

  return (data ?? [])
    .filter((v) => v.name !== COMPANY.name)
    .filter((v) => !isNorthKantoVendor(v as Vendor, northKantoSlugs)) as Vendor[]
}

/**
 * スラッグで業者を取得
 */
export async function getVendorBySlug(slug: string) {
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data as Vendor
}

// ============================================
// 料金プラン関連
// ============================================

/**
 * 業者の料金プラン（間取り別）を取得
 */
export async function getVendorPricePlans(vendorId: string) {
  const { data, error } = await supabase
    .from('vendor_price_plans')
    .select('*')
    .eq('vendor_id', vendorId)
    .order('order_index', { ascending: true })

  if (error) {
    // テーブルが存在しない場合は空配列を返す
    console.warn('vendor_price_plans fetch error:', error.message)
    return [] as VendorPricePlan[]
  }
  return (data ?? []) as VendorPricePlan[]
}

// ============================================
// FAQ関連
// ============================================

/**
 * 業者のよくある質問を取得
 */
export async function getVendorFaqs(vendorId: string) {
  const { data, error } = await supabase
    .from('vendor_faqs')
    .select('*')
    .eq('vendor_id', vendorId)
    .order('order_index', { ascending: true })

  if (error) {
    // テーブルが存在しない場合は空配列を返す
    console.warn('vendor_faqs fetch error:', error.message)
    return [] as VendorFaq[]
  }
  return (data ?? []) as VendorFaq[]
}

// ============================================
// リード(査定依頼)関連
// ============================================

/**
 * 新規リードを作成（service_role 必須・APIルート専用）
 */
export async function createLead(leadData: Omit<Lead, 'id' | 'created_at' | 'status'>) {
  const { supabaseAdmin } = await import('./supabase-admin')
  const { data, error } = await supabaseAdmin
    .from('leads')
    .insert([{ ...leadData, status: 'new' }])
    .select()
    .single()

  if (error) throw error
  return data as Lead
}

/**
 * 全リードを取得（service_role 必須・APIルート専用）
 */
export async function getLeads() {
  const { supabaseAdmin } = await import('./supabase-admin')
  const { data, error } = await supabaseAdmin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Lead[]
}

// ============================================
// 口コミ関連
// ============================================

/**
 * 承認済み口コミを取得
 */
export async function getApprovedReviews(vendorId?: string) {
  let query = supabase
    .from('reviews')
    .select('*')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })

  if (vendorId) {
    query = query.eq('vendor_id', vendorId)
  }

  const { data, error } = await query

  if (error) throw error
  return data as Review[]
}

/**
 * 新規口コミを作成
 */
export async function createReview(reviewData: Omit<Review, 'id' | 'created_at' | 'is_approved'>) {
  const { data, error } = await supabase
    .from('reviews')
    .insert([{ ...reviewData, is_approved: false }])
    .select()
    .single()

  if (error) throw error
  return data as Review
}
