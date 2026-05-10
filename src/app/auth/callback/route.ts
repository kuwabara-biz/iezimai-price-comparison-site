import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServer, isAdminEmail } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')
    const next = url.searchParams.get('next') || '/admin'

    if (!code) {
        return NextResponse.redirect(new URL('/admin/login?error=missing_code', request.url))
    }

    const supabase = await getSupabaseServer()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error || !data.user) {
        return NextResponse.redirect(new URL('/admin/login?error=auth_failed', request.url))
    }

    // 許可リスト外のメールはサインアウトしてログイン画面へ
    if (!isAdminEmail(data.user.email)) {
        await supabase.auth.signOut()
        return NextResponse.redirect(new URL('/admin/login?error=unauthorized', request.url))
    }

    return NextResponse.redirect(new URL(next, request.url))
}
