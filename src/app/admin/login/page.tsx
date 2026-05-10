'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getSupabaseBrowser } from '@/lib/supabase-browser'

export default function AdminLoginPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState('')
    const searchParams = useSearchParams()
    const next = searchParams.get('next') || '/admin'
    const errorParam = searchParams.get('error')
    const errorMessage = errorParam === 'unauthorized'
        ? 'このメールアドレスは管理画面へのアクセスが許可されていません。'
        : errorParam === 'auth_failed'
        ? 'ログインに失敗しました。再度お試しください。'
        : errorParam === 'missing_code'
        ? 'リンクが無効です。再度メールを送信してください。'
        : ''

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const supabase = getSupabaseBrowser()
            const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: { emailRedirectTo: redirectTo },
            })
            if (error) throw error
            setSent(true)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'ログインメールの送信に失敗しました')
        } finally {
            setLoading(false)
        }
    }

    if (sent) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-secondary px-4">
                <div className="w-full max-w-md rounded-xl border border-border bg-white p-8 shadow-sm">
                    <h1 className="mb-4 text-xl font-bold">メールを確認してください</h1>
                    <p className="text-sm text-muted-foreground">
                        <strong>{email}</strong> 宛にログインリンクを送信しました。
                        メール内のリンクをクリックしてログインしてください。
                    </p>
                    <p className="mt-4 text-xs text-muted-foreground">
                        ※ 許可されていないメールアドレスではログインできません。
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-secondary px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-xl border border-border bg-white p-8 shadow-sm"
            >
                <h1 className="mb-2 text-xl font-bold">管理画面ログイン</h1>
                <p className="mb-6 text-sm text-muted-foreground">
                    登録済みのメールアドレスを入力してください。
                    ログイン用のリンクが届きます。
                </p>
                <div className="space-y-2">
                    <Label htmlFor="email">メールアドレス</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@example.com"
                        autoComplete="email"
                    />
                </div>
                {(error || errorMessage) && (
                    <p className="mt-3 text-sm text-red-600">{error || errorMessage}</p>
                )}
                <Button type="submit" className="mt-6 w-full" disabled={loading || !email}>
                    {loading ? '送信中...' : 'ログインリンクを送信'}
                </Button>
            </form>
        </div>
    )
}
