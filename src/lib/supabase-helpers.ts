import { supabase } from './supabase'
import type { Area, Vendor, Lead, Review, VendorPricePlan, VendorFaq } from './database.types'

// ============================================
// エリア関連
// ============================================

/**
 * 全エリアを取得
 */
export async function getAreas() {
  const { data, error } = await supabase
    .from('areas')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) throw error
  return data as Area[]
}

/**
 * スラッグでエリアを取得
 */
export async function getAreaBySlug(slug: string) {
  const { data, error } = await supabase
    .from('areas')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data as Area
}

// ============================================
// 業者関連
// ============================================

/**
 * 全業者を取得
 */
export async function getVendors() {
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .order('rating', { ascending: false })

  if (error) throw error
  return data as Vendor[]
}

/**
 * エリアで業者を絞り込み
 */
export async function getVendorsByArea(areaSlug: string) {
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .contains('service_areas', [areaSlug])
    .order('rating', { ascending: false })

  if (error) throw error
  return data as Vendor[]
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
 * 新規リードを作成
 */
export async function createLead(leadData: Omit<Lead, 'id' | 'created_at' | 'status'>) {
  const { data, error } = await supabase
    .from('leads')
    .insert([{ ...leadData, status: 'new' }])
    .select()
    .single()

  if (error) throw error
  return data as Lead
}

/**
 * 全リードを取得
 */
export async function getLeads() {
  const { data, error } = await supabase
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
