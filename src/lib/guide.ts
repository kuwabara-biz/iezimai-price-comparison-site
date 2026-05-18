export type GuideCategory = '読者の状況別' | '深掘り情報' | '問題解決'

export type GuideIconKey =
    | 'book'
    | 'calculator'
    | 'coins'
    | 'home'
    | 'house-plus'
    | 'map'
    | 'users'

export interface GuideArticle {
    slug: string
    href: string
    title: string
    shortTitle: string
    category: GuideCategory
    description: string
    badge: string
    badgeColor: string
    iconKey: GuideIconKey
    readingMinutes: number
    available: boolean
}

export const GUIDE_HUB: GuideArticle = {
    slug: 'jikkajimai',
    href: '/guide',
    title: '実家じまい完全ガイド｜埼玉県版・全工程と費用の地図',
    shortTitle: '実家じまい完全ガイド',
    category: '深掘り情報',
    description:
        '相続発生から売却・登記までの全工程を1枚の地図に。「今どこにいるか」「次に何をすべきか」が一目で分かります。',
    badge: 'HUB',
    badgeColor: 'bg-primary text-primary-foreground',
    iconKey: 'book',
    readingMinutes: 15,
    available: true,
}

export const GUIDE_ARTICLES: GuideArticle[] = [
    {
        slug: 'parent-alive',
        href: '/guide/parent-alive',
        title: '親存命型の実家じまい｜認知リスク回避と生前対策',
        shortTitle: '親存命型の進め方',
        category: '読者の状況別',
        description: 'まだ親が元気なうちにできる準備。施設入居・認知症リスクへの備え方。',
        badge: 'CASE 01',
        badgeColor: 'bg-rose-100 text-rose-700',
        iconKey: 'users',
        readingMinutes: 12,
        available: false,
    },
    {
        slug: 'inherited',
        href: '/guide/inherited',
        title: '相続後型の実家じまい｜3年特例を逃さない時間カレンダー',
        shortTitle: '相続後型の進め方',
        category: '読者の状況別',
        description: '相続発生後の手続きを時系列で整理。3,000万円特例の期限と動き方。',
        badge: 'CASE 02',
        badgeColor: 'bg-amber-100 text-amber-700',
        iconKey: 'house-plus',
        readingMinutes: 14,
        available: false,
    },
    {
        slug: 'cost',
        href: '/guide/cost',
        title: '実家じまいの費用相場完全ガイド｜30坪木造のシミュレーション',
        shortTitle: '費用相場 完全版',
        category: '深掘り情報',
        description:
            '遺品整理・解体・仲介手数料・税金まで、すべての費用を一画面で。シミュレーターで「手取り額」が分かります。',
        badge: 'COST',
        badgeColor: 'bg-emerald-100 text-emerald-700',
        iconKey: 'calculator',
        readingMinutes: 18,
        available: true,
    },
    {
        slug: 'subsidy',
        href: '/guide/subsidy',
        title: '埼玉県の空き家・実家解体補助金一覧｜市町村別ガイド',
        shortTitle: '埼玉県の補助金',
        category: '深掘り情報',
        description:
            '川口市・秩父市・深谷市など主要市町村の制度・上限額・落とし穴まで。最大100万円の負担軽減を狙うコツ。',
        badge: 'SUBSIDY',
        badgeColor: 'bg-sky-100 text-sky-700',
        iconKey: 'coins',
        readingMinutes: 16,
        available: true,
    },
    {
        slug: 'unsellable',
        href: '/guide/unsellable',
        title: '売れない実家の対処法｜再建築不可・接道なし・境界未確定',
        shortTitle: '売れない実家の対処法',
        category: '問題解決',
        description: '「価格を下げても売れない」物件の打開策。買取・隣地交渉・空き家バンク。',
        badge: 'CASE 03',
        badgeColor: 'bg-violet-100 text-violet-700',
        iconKey: 'home',
        readingMinutes: 11,
        available: false,
    },
    {
        slug: 'distant',
        href: '/guide/distant',
        title: '遠方居住者の実家じまい｜現地に行けない人の進め方',
        shortTitle: '遠方居住者の実家じまい',
        category: '問題解決',
        description: '埼玉に行けない遠方相続人向け。ワンストップ業者活用と立ち会い不要のコツ。',
        badge: 'CASE 04',
        badgeColor: 'bg-teal-100 text-teal-700',
        iconKey: 'map',
        readingMinutes: 10,
        available: false,
    },
]

export const ALL_GUIDE_ARTICLES = [GUIDE_HUB, ...GUIDE_ARTICLES]

export function findArticleBySlug(slug: string): GuideArticle | undefined {
    return ALL_GUIDE_ARTICLES.find((a) => a.slug === slug)
}

export function getRelatedArticles(currentSlug: string, limit = 3): GuideArticle[] {
    return GUIDE_ARTICLES.filter((a) => a.slug !== currentSlug).slice(0, limit)
}
