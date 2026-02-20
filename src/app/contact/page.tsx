import Link from 'next/link'
import { Phone, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ContactForm from '@/components/ContactForm'
import { COMPANY } from '@/lib/constants'
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
                    {/* 電話でも相談できる案内 */}
                    <div className="mb-8 overflow-hidden rounded-xl border border-border bg-white shadow-sm">
                        <div className="bg-primary px-5 py-3">
                            <p className="text-sm font-medium text-white/80">
                                お急ぎの方はお電話でもご相談いただけます
                            </p>
                        </div>
                        <div className="flex flex-col items-start gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                    <Phone className="h-5 w-5 text-green-700" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold tracking-wide text-foreground">
                                        {COMPANY.phone}
                                    </p>
                                    <p className="text-sm text-muted-foreground">{COMPANY.businessHours}</p>
                                </div>
                            </div>
                            <a href={`tel:${COMPANY.phone.replace(/-/g, '')}`}>
                                <Button size="lg" className="h-12 gap-2">
                                    <Phone className="h-4 w-4" />
                                    電話で相談する
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* フォーム */}
                    <ContactForm />
                </div>
            </div>
        </div>
    )
}
