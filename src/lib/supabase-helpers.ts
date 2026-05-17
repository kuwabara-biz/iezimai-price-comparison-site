import type { Lead } from './database.types'

// ============================================
// リード(査定依頼)関連 ※家じまい.comはリード管理のみSupabaseを利用
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
