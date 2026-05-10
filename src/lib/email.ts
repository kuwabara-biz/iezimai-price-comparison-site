import { Resend } from 'resend'

const apiKey = process.env.RESEND_API_KEY
const fromAddress = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
const notifyTo = process.env.LEAD_NOTIFY_EMAIL || 'kuwabara.biz.jp@gmail.com'

const resend = apiKey ? new Resend(apiKey) : null

type LeadPayload = {
    user_name?: string | null
    contact_info?: string | null
    prefecture?: string | null
    city?: string | null
    address_detail?: string | null
    property_type?: string | null
    source?: string | null
    admin_memo?: string | null
}

const PROPERTY_TYPE_MAP: Record<string, string> = {
    detached: '一戸建て',
    apartment: 'マンション・アパート',
    other: 'その他',
}

export async function sendLeadNotification(lead: LeadPayload, leadId?: string) {
    if (!resend) {
        console.warn('[email] RESEND_API_KEY not set — skipping notification')
        return { skipped: true as const }
    }

    const propertyLabel = lead.property_type
        ? PROPERTY_TYPE_MAP[lead.property_type] || lead.property_type
        : '未指定'

    const subject = `【家じまい.com】新規お問い合わせ：${lead.user_name || '匿名'}様（${lead.prefecture ?? ''}${lead.city ?? ''}）`

    const lines = [
        '家じまい.com の相談フォームに新しいお問い合わせが届きました。',
        '',
        `■ お名前：${lead.user_name || '（未入力）'}`,
        `■ 連絡先：${lead.contact_info || '（未入力）'}`,
        `■ 都道府県：${lead.prefecture || '（未入力）'}`,
        `■ 市区町村：${lead.city || '（未入力）'}`,
        `■ 物件種別：${propertyLabel}`,
        `■ ご相談内容：`,
        lead.address_detail || '（未入力）',
        '',
        lead.admin_memo ? `■ 補足：\n${lead.admin_memo}` : '',
        '',
        '----',
        `流入経路：${lead.source || 'WEB'}`,
        leadId ? `リードID：${leadId}` : '',
        '管理画面：https://iezimai.com/admin/leads',
    ].filter(Boolean)

    try {
        const { data, error } = await resend.emails.send({
            from: fromAddress,
            to: notifyTo,
            subject,
            text: lines.join('\n'),
        })
        if (error) {
            console.error('[email] resend error:', error)
            return { error: error.message }
        }
        return { id: data?.id }
    } catch (e) {
        console.error('[email] unexpected error:', e)
        return { error: e instanceof Error ? e.message : String(e) }
    }
}
