'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { getSupabaseBrowser } from '@/lib/supabase-browser'

export default function AdminHeader({ email }: { email: string }) {
    const router = useRouter()

    const handleLogout = async () => {
        const supabase = getSupabaseBrowser()
        await supabase.auth.signOut()
        router.push('/admin/login')
        router.refresh()
    }

    return (
        <div className="border-b border-border bg-white">
            <div className="container mx-auto flex items-center justify-end gap-3 px-4 py-2 text-sm">
                <span className="text-muted-foreground">{email}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="mr-1 h-4 w-4" />
                    ログアウト
                </Button>
            </div>
        </div>
    )
}
