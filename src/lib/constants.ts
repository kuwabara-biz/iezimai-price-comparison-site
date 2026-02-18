export const LEAD_STATUS_CONFIG = [
    { value: 'new', label: '未対応', color: 'bg-red-100 text-red-700' },
    { value: 'contacted', label: '連絡済み', color: 'bg-blue-100 text-blue-700' },
    { value: 'in_progress', label: '対応中', color: 'bg-green-100 text-green-700' },
    { value: 'completed', label: '完了', color: 'bg-gray-100 text-gray-600' },
    { value: 'cancelled', label: 'キャンセル', color: 'bg-gray-100 text-gray-400' },
] as const

export const LEAD_STATUS_MAP: Record<string, { value: string; label: string; color: string }> =
    Object.fromEntries(LEAD_STATUS_CONFIG.map((s) => [s.value, s]))
