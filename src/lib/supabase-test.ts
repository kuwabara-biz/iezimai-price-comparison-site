import { supabase } from './supabase'

/**
 * Supabase接続テスト
 * データベースに接続できるかを確認します
 */
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('areas')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('Supabase接続エラー:', error)
      return false
    }
    
    console.log('✅ Supabase接続成功!')
    return true
  } catch (err) {
    console.error('予期しないエラー:', err)
    return false
  }
}
