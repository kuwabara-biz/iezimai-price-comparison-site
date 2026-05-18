export const SITE = {
    name: '家じまい.com',
    fullName: '家じまい.com｜埼玉県の実家じまい・遺品整理・不動産買取',
    tagline: '埼玉県の実家じまい総合窓口',
    url: 'https://iezimai.com',
    titleDefault: '埼玉県の実家じまい・遺品整理・不動産買取｜家じまい.com',
    description:
        '埼玉県で実家じまいなら、家じまい.com。遺品整理から相続不動産の買取まで自社ワンストップ対応。朝霞市拠点、県内全域対応。ご相談・お見積もり無料、しつこい営業なし。',
} as const

export const COMPANY = {
    name: 'みんなのいえ株式会社',
    address: '埼玉県朝霞市',
} as const

export const HOME_SECTIONS = [
    { id: 'problem', label: 'こんなお悩み', short: '悩み' },
    { id: 'flow', label: '解決の流れ', short: '流れ' },
    { id: 'why', label: '選ばれる理由', short: '理由' },
    { id: 'service', label: 'サービス', short: 'サービス' },
    { id: 'pricing', label: '料金の目安', short: '料金' },
    { id: 'cases', label: '事例', short: '事例' },
    { id: 'area', label: '対応エリア', short: 'エリア' },
    { id: 'guide', label: 'ガイド・コラム', short: 'ガイド' },
    { id: 'faq', label: 'よくある質問', short: 'FAQ' },
] as const

export const LEAD_STATUS_CONFIG = [
    { value: 'new', label: '未対応', color: 'bg-red-100 text-red-700' },
    { value: 'contacted', label: '連絡済み', color: 'bg-blue-100 text-blue-700' },
    { value: 'in_progress', label: '対応中', color: 'bg-green-100 text-green-700' },
    { value: 'completed', label: '完了', color: 'bg-gray-100 text-gray-600' },
    { value: 'cancelled', label: 'キャンセル', color: 'bg-gray-100 text-gray-400' },
] as const

export const LEAD_STATUS_MAP: Record<string, { value: string; label: string; color: string }> =
    Object.fromEntries(LEAD_STATUS_CONFIG.map((s) => [s.value, s]))
