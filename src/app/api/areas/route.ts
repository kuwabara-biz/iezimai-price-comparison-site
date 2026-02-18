import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/areas - 全エリア取得
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('areas')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
