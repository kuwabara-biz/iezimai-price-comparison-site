import { NextResponse } from 'next/server'
import { createLead } from '@/lib/supabase-helpers'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { user_name, phone, email, prefecture, city, property_type, notes } = body

    // 簡易バリデーション
    if (!user_name || !phone || !prefecture || !city || !property_type) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      )
    }

    // リードデータ作成
    // DBスキーマに合わせてデータを整形
    const contactInfo = `電話: ${phone}\nメール: ${email || 'なし'}`
    const adminMemo = notes ? `【ユーザー相談内容】\n${notes}` : null

    const leadData = {
      user_name,
      contact_info: contactInfo,
      prefecture,
      city,
      address_detail: null, // 番地等は今回は取得しない
      property_type,
      admin_memo: adminMemo,
      source: 'web_form',
      status: 'new',
    }
    
    // createLeadは成功時にデータを返し、失敗時にthrowする
    const data = await createLead(leadData as any)

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    )
  }
}
