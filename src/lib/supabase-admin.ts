import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// 遅延初期化：モジュールロード時にはチェックしない
// （SUPABASE_SERVICE_ROLE_KEY が無い環境でもビルドは通るようにする）
let cachedClient: SupabaseClient | null = null

function getClient(): SupabaseClient {
    if (cachedClient) return cachedClient
    const apiKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!apiKey) {
        throw new Error(
            'SUPABASE_SERVICE_ROLE_KEY is not set. Required for admin operations.'
        )
    }
    cachedClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, apiKey, {
        auth: { persistSession: false, autoRefreshToken: false },
    })
    return cachedClient
}

// Proxy で既存の `supabaseAdmin.from(...)` 形式の呼び出しをそのまま使えるようにする
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
    get(_, prop) {
        const client = getClient() as unknown as Record<string | symbol, unknown>
        const value = client[prop]
        return typeof value === 'function' ? value.bind(client) : value
    },
})
