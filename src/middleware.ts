import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const ADMIN_PREFIX = '/admin'
const LOGIN_PATH = '/admin/login'

function isAdminEmail(email: string | null | undefined): boolean {
    if (!email) return false
    const allowlist = (process.env.ADMIN_ALLOWED_EMAILS || '')
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean)
    return allowlist.includes(email.toLowerCase())
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // /admin 配下以外は素通り（ただしauth callback経由でcookieを更新）
    let response = NextResponse.next({ request })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    response = NextResponse.next({ request })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // セッション更新（必要ならトークン再取得）
    const {
        data: { user },
    } = await supabase.auth.getUser()

    // 管理画面の保護
    if (pathname.startsWith(ADMIN_PREFIX) && pathname !== LOGIN_PATH) {
        if (!user || !isAdminEmail(user.email)) {
            const url = request.nextUrl.clone()
            url.pathname = LOGIN_PATH
            url.searchParams.set('next', pathname)
            return NextResponse.redirect(url)
        }
    }

    // ログイン済みでログイン画面に来たらadmin topへ
    if (pathname === LOGIN_PATH && user && isAdminEmail(user.email)) {
        const url = request.nextUrl.clone()
        url.pathname = '/admin'
        url.searchParams.delete('next')
        return NextResponse.redirect(url)
    }

    return response
}

export const config = {
    matcher: ['/admin/:path*', '/auth/callback'],
}
