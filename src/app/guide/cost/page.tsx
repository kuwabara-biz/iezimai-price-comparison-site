import type { Metadata } from "next";
import { findArticleBySlug, getRelatedArticles } from "@/lib/guide";
import ArticleHeader from "@/components/guide/ArticleHeader";
import ArticleContent from "@/components/guide/ArticleContent";
import TableOfContents, { type TocItem } from "@/components/guide/TableOfContents";
import Callout from "@/components/guide/Callout";
import CostSimulator from "@/components/guide/CostSimulator";
import BeforeAfterSlider from "@/components/guide/BeforeAfterSlider";
import InlineCTA from "@/components/guide/InlineCTA";
import FaqList from "@/components/guide/FaqList";
import RelatedArticles from "@/components/guide/RelatedArticles";

const article = findArticleBySlug("cost")!;

export const metadata: Metadata = {
    title: article.title,
    description: article.description,
};

const TOC: TocItem[] = [
    { id: "overview", title: "費用の総額目安" },
    { id: "simulator", title: "費用シミュレーター" },
    { id: "ihin", title: "①家財整理・不用品回収費" },
    { id: "demolish", title: "②解体費用" },
    { id: "sale", title: "③売却関連費" },
    { id: "registration", title: "④相続・登記関連費" },
    { id: "tax", title: "⑤税金と空き家特例" },
    { id: "case-study", title: "ケース別の手取り試算" },
    { id: "pitfalls", title: "費用が跳ね上がる5つの落とし穴" },
    { id: "savings", title: "費用を抑える4つの方法" },
    { id: "faq", title: "よくある質問" },
];

const FAQ_ITEMS = [
    {
        q: "30坪の実家じまいで、最低どれくらい予算を見ておけばいいですか？",
        a: "現況売却なら 50〜100万円、解体して土地売却なら 150〜400万円を目安にしてください。ただし、これは売却益から差し引かれる金額であり、自己資金として用意する必要があるわけではありません。",
    },
    {
        q: "家財整理を自分でやればタダですか？",
        a: "物理的にはタダですが、3LDK戸建てで 2〜6ヶ月の時間と労力がかかります。時給換算すると業者依頼の方が割安になることが多いです。",
    },
    {
        q: "解体費用は必ず先払いですか？",
        a: "業者により異なりますが、契約時に着手金 30〜50%、工事完了時に残金を支払う形が一般的です。一部、完工後一括払いに対応する業者もあります。",
    },
    {
        q: "譲渡所得税はいつ払いますか？",
        a: "売却した翌年の 2月16日〜3月15日 に確定申告で納付します。空き家特例の3,000万円控除を適用すれば、ほとんどのケースで税額はゼロになります。",
    },
    {
        q: "兄弟で相続した実家を売った場合、3,000万円控除は1人分？",
        a: "それぞれの相続人が 3,000万円控除を受けられます。ただし、譲渡対価が1人あたり1億円以下である必要があります。",
    },
    {
        q: "家じまい.comに相談すると、費用の概算を出してもらえますか？",
        a: "はい。物件情報を共有いただければ、家財整理費・解体費・売却見込み額・各種税金まで含めた総合シミュレーションを無料でお出ししています。",
    },
];

export default function CostPage() {
    const related = getRelatedArticles("cost");
    return (
        <div className="bg-background">
            <ArticleHeader
                article={article}
                lead="「実家じまいって、結局いくらかかるの？」——最も多い質問にお答えします。埼玉県内の30坪木造戸建てを例に、家財整理から解体・仲介手数料・税金まで、すべての費用を内訳ごとに整理。最後はシミュレーターで「手取り額」が即座に分かります。"
                updatedAt="2026年5月"
            />

            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_280px]">
                    <main className="min-w-0">
                        <ArticleContent>
                            {/* リード */}
                            <Callout variant="info" title="結論ファースト">
                                <p>
                                    埼玉県内・30坪木造戸建ての場合、
                                    <strong>現況売却で 50〜100万円、解体して土地売却で 150〜400万円</strong>
                                    が総額の目安です。これらは
                                    <strong>自己資金ではなく、売却益から差し引かれる金額</strong>
                                    ですので、必ず「手取り」で比較してください。
                                </p>
                            </Callout>

                            <h2 id="overview">費用の総額目安｜30坪木造戸建てのモデルケース</h2>
                            <p>
                                まず全体像を掴むため、よくあるケース別の総額目安をご紹介します。
                            </p>

                            <CostTable />

                            <p>
                                注意していただきたいのは、これらは
                                <strong>「自己負担ゼロ」の数字ではなく、最終的に売却益から差し引かれる金額</strong>
                                だということです。たとえば実家が 2,000万円 で売れる立地なら、現況売却で手取り 1,900万円前後、解体しての土地売却で手取り 1,600万円前後といった具合に、
                                <strong>最終的に手元に残る金額で比較する</strong>
                                のが正しい判断方法です。
                            </p>

                            {/* シミュレーター */}
                            <h2 id="simulator">費用シミュレーター｜まずは数字を動かして体感する</h2>
                            <p>
                                文字で読むより、数字を触る方が早く理解できます。下のシミュレーターで間取り・売却方法・補助金の有無を変えてみてください。手取り額がリアルタイムで動きます。
                            </p>
                            <CostSimulator />

                            <h2 id="ihin">①家財整理・不用品回収費（15〜80万円）</h2>
                            <p>
                                家財整理は、実家じまいで
                                <strong>最も時間と労力がかかる工程</strong>
                                であり、業者依頼が前提なら 15〜80万円程度かかります。
                            </p>

                            <h3>業者依頼の費用相場</h3>
                            <IhinTable />

                            <p>
                                埼玉県内の戸建てで一般的な 3LDK〜4LDK だと、
                                <strong>25〜80万円が業者依頼の相場</strong>となります。
                            </p>

                            <h3>自分でやる vs 業者依頼の判断軸</h3>
                            <p>
                                「自分で片付ければタダ」と考える方も多いですが、実際にはこれが大きな落とし穴になります。
                            </p>

                            <CompareTable
                                left={{
                                    head: "自分でやる",
                                    rows: [
                                        "家財が少ない／自治体ごみで処分できる",
                                        "平日に動ける時間がある",
                                        "形見分けに時間をかけたい",
                                        "体力に自信がある",
                                    ],
                                }}
                                right={{
                                    head: "業者依頼",
                                    rows: [
                                        "家財が多い／粗大ごみが大量",
                                        "遠方居住・通えない",
                                        "早く処分したい",
                                        "高齢・体力的に厳しい",
                                    ],
                                }}
                            />

                            <BeforeAfterSlider
                                before="/placeholder-before.jpg"
                                after="/placeholder-after.jpg"
                                caption="3LDK 浦和区の家財整理事例。着手前は床が見えない状態でしたが、2日間の作業で買取査定・供養・搬出まで完了。"
                                placeholder={{
                                    before: "物が溢れた居室。家具・家電・衣類が床まで積み上がった状態。",
                                    after: "搬出後の同じ部屋。床が見え、買取査定で 8万円分を回収。",
                                }}
                            />

                            <Callout variant="warning" title="現場あるある">
                                さいたま市の体験談で「衣類だけで2ヶ月、家具搬出に1ヶ月、3割処分するのに1年」かかったケースがあります。
                                <strong>「自分でやればタダ」と思っていても、時間と労力を時給換算するとマイナスになる</strong>
                                ことが多いのが実情です。
                            </Callout>

                            <h2 id="demolish">②解体費用（90〜400万円）</h2>
                            <p>
                                解体費用は、構造と立地で大きく変動します。
                                <strong>実家じまいで最も金額のブレが大きい項目</strong>です。
                            </p>

                            <h3>構造別の坪単価相場（2025年データ）</h3>
                            <DemolishTable />

                            <Callout variant="danger" title="2025年は値上げトレンド">
                                2025年の解体費用相場は、2020年と比べて
                                <strong>約11%上昇</strong>
                                しています。労務単価と廃材処分費の値上がりが主因で、今後も上昇傾向が続く見込み。「数年前に親戚が払った金額」を基準にせず、現時点での見積もりを取ってください。
                            </Callout>

                            <h3>坪単価以外に発生する付帯工事費</h3>
                            <p>
                                坪単価 × 坪数だけで終わらないのが解体費用の落とし穴です。以下の費用が<strong>別途加算</strong>されます。
                            </p>

                            <ExtraCostTable />

                            <h3>解体費用が跳ね上がる3つの要因</h3>
                            <PitfallList
                                items={[
                                    {
                                        title: "アスベスト含有建材",
                                        body: "昭和56年以前に建てられた家は、屋根・外壁にアスベストが含まれることも。調査・除去は別途 5万円〜数百万円。2023年10月以降は事前調査と報告が法的義務。",
                                    },
                                    {
                                        title: "狭小地・密集地での手壊し作業",
                                        body: "重機が入れない現場では人の手で解体。通常の解体費用の 2〜3割増しになります。川越・浦和・川口の密集地などで多発。",
                                    },
                                    {
                                        title: "残置物の大量放置",
                                        body: "丸ごと解体は産業廃棄物処分費が跳ね上がります。家財整理だけ事前に済ませると 10〜30万円抑えられるケースも。",
                                    },
                                ]}
                            />

                            <InlineCTA
                                title="アスベスト調査込みで、解体費用を無料でお見積もりします"
                                description="解体だけのご相談も歓迎。事前調査の段取りから補助金の対象判定まで、自社スタッフが無料でご案内します。"
                            />

                            <h2 id="sale">③売却関連費</h2>

                            <h3>仲介手数料</h3>
                            <p>
                                仲介売却を選んだ場合、不動産会社に支払う成功報酬です。法律で上限が決まっています。
                            </p>
                            <FormulaBlock>
                                {"仲介手数料 = (売却価格 × 3% + 6万円) + 消費税"}
                            </FormulaBlock>

                            <FeeTable />

                            <Callout variant="tip" title="2024年7月の法改正で 800万円以下は最大33万円に">
                                2024年7月以降、
                                <strong>売買価格 800万円以下の空き家</strong>
                                では仲介手数料の上限が 33万円（税込）まで引き上げられました。これは買主・売主それぞれから受け取れる金額で、価格が安い物件にも不動産会社が動きやすくなる狙いがあります。
                            </Callout>

                            <h3>測量費（35〜80万円）</h3>
                            <p>
                                境界が未確定の場合、土地家屋調査士に依頼して測量・境界確定を行います。
                                <strong>築古の実家では境界標が失われているケースが多い</strong>
                                ので、買主の要求次第で発生します。
                            </p>

                            <h2 id="registration">④相続・登記関連費</h2>
                            <p>
                                2024年4月の相続登記義務化により、
                                <strong>避けて通れない費用</strong>
                                となりました。司法書士に一式依頼すると合計 10〜20万円が相場です。
                            </p>

                            <FormulaBlock>
                                {"登録免許税 = 固定資産税評価額 × 0.4%"}
                            </FormulaBlock>

                            <h2 id="tax">⑤税金（譲渡所得税）と空き家特例</h2>
                            <p>
                                売却益が出た場合の税金です。
                                <strong>特例を使えるかどうかで税額が数百万円変わる</strong>
                                ため、必ず売却前に確認してください。
                            </p>

                            <FormulaBlock>
                                {
                                    "譲渡所得 = 売却価格 - 取得費 - 譲渡費用 - 特別控除（空き家特例で最大3,000万円）"
                                }
                            </FormulaBlock>

                            <h3>譲渡所得税の税率（2026年5月時点）</h3>
                            <TaxRateTable />

                            <Callout variant="success" title="空き家3,000万円特別控除の主な要件">
                                <ul className="mt-2 list-disc space-y-1 pl-5">
                                    <li>昭和56年5月31日以前に建築された家屋であること</li>
                                    <li>区分所有建物（マンション等）でないこと</li>
                                    <li>相続開始の直前に被相続人が一人で住んでいたこと</li>
                                    <li>相続から譲渡までの間、事業・貸付・居住の用に供されていないこと</li>
                                    <li>譲渡価額が1億円以下、相続開始から3年以内の譲渡</li>
                                    <li>譲渡時に耐震基準を満たすか、解体して更地で売却すること</li>
                                </ul>
                                <p className="mt-3 text-xs">
                                    <strong>適用期限：令和9年（2027年）12月31日まで</strong>
                                    の譲渡。確定申告での申告と、市区町村発行の「被相続人居住用家屋等確認書」が必要です。
                                </p>
                            </Callout>

                            <h2 id="case-study">ケース別の手取り試算｜30坪木造戸建てを2,000万円で売却</h2>
                            <CaseStudyTable />

                            <Callout variant="info" title="3つの示唆">
                                <p>
                                    <strong>① 解体は手取りを125万円減らすが、売却スピードは速い</strong>{" "}
                                    — 更地化で買主が早く付き、売却期間が 3〜6ヶ月 短縮できる。
                                </p>
                                <p>
                                    <strong>② 補助金で30万円の差</strong>{" "}
                                    — 手続きの手間と引き換えに 30万円。申請する価値あり。
                                </p>
                                <p>
                                    <strong>③ 買取は仲介より400万円安いが、手間ゼロ</strong>{" "}
                                    — 家財整理・解体・契約まで業者が一括対応。時間と労力を金で買う選択肢。
                                </p>
                            </Callout>

                            <h2 id="pitfalls">費用が跳ね上がる5つの落とし穴</h2>
                            <PitfallList
                                items={[
                                    {
                                        title: "遠方居住で立会いができない",
                                        body: "業者作業の現場確認ができないと、見積もりの 1.5倍以上に膨らむことも。写真・動画レポートで進捗共有してくれる業者を選ぶ。",
                                    },
                                    {
                                        title: "境界が不明",
                                        body: "測量に 35〜80万円が想定外に追加されるケース。隣地交渉が難航すると 3〜6ヶ月売却が遅れる。",
                                    },
                                    {
                                        title: "残置物が想定以上",
                                        body: "押入れ・屋根裏・倉庫の中身まで確認せず見積もりを取ると、現地調査時に追加見積もりに。",
                                    },
                                    {
                                        title: "アスベストが見つかった",
                                        body: "事前調査でアスベスト含有が判明すると、解体費用が 数十万円〜数百万円跳ね上がる。",
                                    },
                                    {
                                        title: "再建築不可・接道なし・市街化調整区域",
                                        body: "建築基準法上の制限がある物件は、売却価格が想定の半分以下になることも。解体前に必ず査定を取る。",
                                    },
                                ]}
                            />

                            <h2 id="savings">費用を抑える4つの方法</h2>
                            <ol className="my-5 list-decimal space-y-3 pl-6">
                                <li>
                                    <strong>補助金を活用する</strong> — 埼玉県内の市町村別解体補助金で 30〜100万円の負担軽減。
                                </li>
                                <li>
                                    <strong>相見積もりを取る</strong> — 業者によって 30〜50% の差が出るのが普通。最低3社、できれば5社。
                                </li>
                                <li>
                                    <strong>買取可能な家財をリサイクル</strong> — 桐箪笥・茶道具・骨董品・カメラなど、数万〜数十万円になることも。
                                </li>
                                <li>
                                    <strong>ワンストップ業者を活用する</strong> — 個別手配より総額で 10〜20% 安くなるケースが多い。
                                </li>
                            </ol>

                            <h2 id="faq">よくある質問</h2>
                            <FaqList items={FAQ_ITEMS} />

                            <Callout variant="success" title="まとめ｜「総額」ではなく「手取り」で考える">
                                費用 50万円でも、売却益 2,000万円なら手取り 1,950万円。金額の大小ではなく、
                                <strong>最終的に手元に残る額で判断</strong>
                                してください。空き家特例の 3,000万円控除は 2027年12月31日 まで。期限を意識して計画を。
                            </Callout>

                            <InlineCTA
                                title="物件情報をいただければ、手取り額シミュレーションを無料で作成"
                                description="家財整理費・解体費・売却見込み額・税金まで含めた総合シミュレーションをお出しします。「うちの場合いくらか」を具体的に知りたい段階のご相談こそ歓迎です。"
                            />
                        </ArticleContent>
                    </main>

                    <div className="order-first lg:order-last">
                        <TableOfContents items={TOC} />
                    </div>
                </div>
            </div>

            <RelatedArticles articles={related} />
        </div>
    );
}

// ============== Table partials ==============

function CostTable() {
    const rows = [
        {
            label: "現況売却（家財整理＋仲介手数料）",
            total: "50〜100万円",
            breakdown: "家財整理 25万＋仲介手数料 50万＋登記関連",
        },
        {
            label: "解体して土地売却",
            total: "150〜400万円",
            breakdown: "家財整理 25万＋解体 120万＋仲介 50万＋諸経費",
            highlight: true,
        },
        {
            label: "賃貸活用（リフォーム＋管理委託初期費用）",
            total: "300〜800万円",
            breakdown: "リフォーム 200万＋管理委託＋諸経費",
        },
    ];
    return (
        <div className="my-6 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
                <thead className="bg-secondary text-xs text-foreground">
                    <tr>
                        <th className="px-4 py-3 text-left font-bold">ケース</th>
                        <th className="px-4 py-3 text-left font-bold">費用総額</th>
                        <th className="hidden px-4 py-3 text-left font-bold md:table-cell">
                            主な内訳
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border bg-white">
                    {rows.map((r) => (
                        <tr key={r.label} className={r.highlight ? "bg-amber-50/50" : ""}>
                            <td className="px-4 py-3 font-semibold">{r.label}</td>
                            <td className="px-4 py-3 font-bold text-accent">{r.total}</td>
                            <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                                {r.breakdown}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function IhinTable() {
    const rows = [
        ["1K・1DK", "5〜12万円", "半日〜1日"],
        ["2DK", "15〜25万円", "1〜2日"],
        ["3LDK", "25〜45万円", "2〜3日"],
        ["4LDK以上", "45〜80万円", "3〜5日"],
    ];
    return (
        <div className="my-6 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
                <thead className="bg-secondary text-xs">
                    <tr>
                        <th className="px-4 py-3 text-left font-bold">間取り</th>
                        <th className="px-4 py-3 text-left font-bold">費用相場</th>
                        <th className="px-4 py-3 text-left font-bold">作業時間</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border bg-white">
                    {rows.map(([l, p, t]) => (
                        <tr key={l}>
                            <td className="px-4 py-3 font-semibold">{l}</td>
                            <td className="px-4 py-3 font-bold text-accent">{p}</td>
                            <td className="px-4 py-3 text-muted-foreground">{t}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function DemolishTable() {
    const rows = [
        ["木造", "3〜5万円", "90〜150万円", "150〜250万円"],
        ["鉄骨造", "4〜7万円", "120〜210万円", "200〜350万円"],
        ["RC造（鉄筋コンクリート）", "6〜8万円", "180〜240万円", "300〜400万円"],
    ];
    return (
        <div className="my-6 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
                <thead className="bg-secondary text-xs">
                    <tr>
                        <th className="px-4 py-3 text-left font-bold">構造</th>
                        <th className="px-4 py-3 text-left font-bold">坪単価</th>
                        <th className="px-4 py-3 text-left font-bold">30坪</th>
                        <th className="hidden px-4 py-3 text-left font-bold sm:table-cell">
                            50坪
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border bg-white">
                    {rows.map(([s, t, a, b]) => (
                        <tr key={s}>
                            <td className="px-4 py-3 font-semibold">{s}</td>
                            <td className="px-4 py-3 text-muted-foreground">{t}</td>
                            <td className="px-4 py-3 font-bold text-accent">{a}</td>
                            <td className="hidden px-4 py-3 font-bold text-accent sm:table-cell">
                                {b}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function ExtraCostTable() {
    const rows = [
        ["庭木伐採・抜根", "1本 5,000〜30,000円"],
        ["ブロック塀撤去", "1m 5,000〜10,000円"],
        ["カーポート撤去", "30,000〜100,000円"],
        ["物置撤去", "20,000〜50,000円"],
        ["浄化槽撤去", "50,000〜100,000円"],
        ["井戸の埋め戻し", "50,000〜150,000円"],
        ["地中障害物の撤去", "50,000円〜数十万円"],
    ];
    return (
        <div className="my-6 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
                <thead className="bg-secondary text-xs">
                    <tr>
                        <th className="px-4 py-3 text-left font-bold">付帯工事項目</th>
                        <th className="px-4 py-3 text-left font-bold">費用目安</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border bg-white">
                    {rows.map(([l, p]) => (
                        <tr key={l}>
                            <td className="px-4 py-3 font-semibold">{l}</td>
                            <td className="px-4 py-3 text-muted-foreground">{p}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function FeeTable() {
    const rows = [
        ["1,000万円", "39.6万円"],
        ["1,500万円", "56.1万円"],
        ["2,000万円", "72.6万円"],
        ["3,000万円", "105.6万円"],
        ["5,000万円", "171.6万円"],
    ];
    return (
        <div className="my-6 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
                <thead className="bg-secondary text-xs">
                    <tr>
                        <th className="px-4 py-3 text-left font-bold">売却価格</th>
                        <th className="px-4 py-3 text-left font-bold">仲介手数料の上限（税込）</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border bg-white">
                    {rows.map(([p, f]) => (
                        <tr key={p}>
                            <td className="px-4 py-3 font-semibold">{p}</td>
                            <td className="px-4 py-3 font-bold text-accent">{f}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function TaxRateTable() {
    return (
        <div className="my-6 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
                <thead className="bg-secondary text-xs">
                    <tr>
                        <th className="px-4 py-3 text-left font-bold">所有期間</th>
                        <th className="px-4 py-3 text-left font-bold">所得税</th>
                        <th className="px-4 py-3 text-left font-bold">住民税</th>
                        <th className="hidden px-4 py-3 text-left font-bold sm:table-cell">復興特別</th>
                        <th className="px-4 py-3 text-left font-bold">合計税率</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border bg-white">
                    <tr className="bg-rose-50/40">
                        <td className="px-4 py-3 font-semibold">5年以下（短期）</td>
                        <td className="px-4 py-3 text-muted-foreground">30%</td>
                        <td className="px-4 py-3 text-muted-foreground">9%</td>
                        <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">0.63%</td>
                        <td className="px-4 py-3 font-bold text-rose-600">39.63%</td>
                    </tr>
                    <tr className="bg-emerald-50/40">
                        <td className="px-4 py-3 font-semibold">5年超（長期）</td>
                        <td className="px-4 py-3 text-muted-foreground">15%</td>
                        <td className="px-4 py-3 text-muted-foreground">5%</td>
                        <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">0.315%</td>
                        <td className="px-4 py-3 font-bold text-emerald-700">20.315%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function CaseStudyTable() {
    const cases = [
        {
            label: "ケースA：現況売却（家財整理＋仲介）",
            rows: [
                ["売却価格", "+ 2,000万円"],
                ["家財整理費", "- 30万円"],
                ["仲介手数料", "- 72.6万円"],
                ["印紙税", "- 1万円"],
                ["相続登記費用", "- 15万円"],
                ["譲渡所得税（空き家特例適用）", "0円"],
            ],
            total: "約 1,881万円",
            highlight: true,
        },
        {
            label: "ケースB：解体して土地売却（補助金なし）",
            rows: [
                ["売却価格", "+ 2,000万円"],
                ["家財整理費", "- 25万円"],
                ["解体費", "- 130万円"],
                ["仲介手数料", "- 72.6万円"],
                ["印紙税・登記", "- 16万円"],
                ["譲渡所得税（空き家特例適用）", "0円"],
            ],
            total: "約 1,756万円",
        },
        {
            label: "ケースC：解体して土地売却（補助金活用）",
            rows: [
                ["売却価格", "+ 2,000万円"],
                ["家財整理費", "- 25万円"],
                ["解体費", "- 130万円"],
                ["解体補助金", "+ 30万円"],
                ["仲介・諸経費", "- 88.6万円"],
            ],
            total: "約 1,786万円",
        },
        {
            label: "ケースD：不動産買取（現況のまま）",
            rows: [
                ["売却価格（買取は2〜3割安）", "+ 1,500万円"],
                ["家財整理費", "0円（業者対応）"],
                ["仲介手数料", "0円"],
                ["印紙税・登記", "- 16万円"],
            ],
            total: "約 1,484万円",
        },
    ];
    return (
        <div className="my-6 grid gap-4 md:grid-cols-2">
            {cases.map((c) => (
                <div
                    key={c.label}
                    className={`overflow-hidden rounded-2xl border ${
                        c.highlight ? "border-accent ring-2 ring-accent/20" : "border-border"
                    } bg-white`}
                >
                    <div
                        className={`px-4 py-3 text-xs font-bold ${
                            c.highlight ? "bg-accent/15 text-accent" : "bg-secondary text-foreground"
                        }`}
                    >
                        {c.label}
                    </div>
                    <table className="w-full text-sm">
                        <tbody className="divide-y divide-border">
                            {c.rows.map(([l, v]) => (
                                <tr key={l}>
                                    <td className="px-4 py-2 text-foreground/85">{l}</td>
                                    <td className="px-4 py-2 text-right font-semibold text-foreground">
                                        {v}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex items-baseline justify-between border-t border-border bg-primary px-4 py-3 text-white">
                        <span className="text-xs font-bold tracking-widest">手取り</span>
                        <span className="text-xl font-bold text-accent">{c.total}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

function CompareTable({
    left,
    right,
}: {
    left: { head: string; rows: string[] };
    right: { head: string; rows: string[] };
}) {
    return (
        <div className="my-6 grid gap-3 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-border bg-white">
                <div className="bg-secondary px-4 py-2.5 text-sm font-bold text-foreground">
                    {left.head}
                </div>
                <ul className="divide-y divide-border text-sm">
                    {left.rows.map((r) => (
                        <li key={r} className="px-4 py-3 text-foreground/85">
                            {r}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="overflow-hidden rounded-2xl border border-accent/40 bg-accent/5">
                <div className="bg-accent/15 px-4 py-2.5 text-sm font-bold text-accent">
                    {right.head}
                </div>
                <ul className="divide-y divide-border text-sm">
                    {right.rows.map((r) => (
                        <li key={r} className="px-4 py-3 text-foreground/85">
                            {r}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function PitfallList({ items }: { items: { title: string; body: string }[] }) {
    return (
        <ol className="my-6 space-y-3">
            {items.map((item, i) => (
                <li
                    key={item.title}
                    className="flex gap-3 rounded-xl border border-border bg-white p-4 shadow-sm"
                >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">
                        {i + 1}
                    </span>
                    <div>
                        <p className="font-bold text-foreground">{item.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {item.body}
                        </p>
                    </div>
                </li>
            ))}
        </ol>
    );
}

function FormulaBlock({ children }: { children: React.ReactNode }) {
    return (
        <div className="my-5 rounded-xl border border-dashed border-accent/40 bg-amber-50/40 p-4 font-mono text-sm text-foreground">
            {children}
        </div>
    );
}
