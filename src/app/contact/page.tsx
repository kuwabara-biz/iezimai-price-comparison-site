import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ContactForm from '@/components/ContactForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: '無料相談・お問い合わせ | 家じまい.com',
    description: '遺品整理・空き家の売却に関するご相談はこちら。みんなの家株式会社が対応します。',
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-secondary">
            {/* ヘッダー */}
            <div className="border-b border-border bg-white">
                <div className="container mx-auto flex items-center gap-4 px-4 py-4">
                    <Link href="/">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-1 h-4 w-4" />
                            トップへ戻る
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold text-foreground">無料相談・お問い合わせ</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10 md:py-14">
                <div className="mx-auto max-w-2xl">
                    {/* フォーム */}
                    <ContactForm />
                </div>
            </div>
        </div>
    )
}
