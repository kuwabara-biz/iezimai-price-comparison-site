import type { Metadata } from "next";
import { findArticleBySlug, getRelatedArticles } from "@/lib/guide";
import ArticleHeader from "@/components/guide/ArticleHeader";
import ArticleContent from "@/components/guide/ArticleContent";
import TableOfContents, { type TocItem } from "@/components/guide/TableOfContents";
import Callout from "@/components/guide/Callout";
import ProcessTimeline, {
    type TimelineStep,
} from "@/components/guide/ProcessTimeline";
import InlineCTA from "@/components/guide/InlineCTA";
import FaqList from "@/components/guide/FaqList";
import RelatedArticles from "@/components/guide/RelatedArticles";

const article = findArticleBySlug("subsidy")!;

export const metadata: Metadata = {
    title: article.title,
    description: article.description,
};

const TOC: TocItem[] = [
    { id: "overview", title: "埼玉県全体の補助金はない" },
    { id: "list", title: "主要市町村の補助金一覧" },
    { id: "south", title: "県南エリア（川口・越谷）" },
    { id: "north", title: "県北エリア（深谷・行田）" },
    { id: "west", title: "県西・山間エリア（秩父・狭山ほか）" },
    { id: "flow", title: "申請の基本フロー" },
    { id: "pitfalls", title: "申請でよくある5つの落とし穴" },
    { id: "alternatives", title: "対象外だった場合の選択肢" },
    { id: "faq", title: "よくある質問" },
];

const APPLICATION_STEPS: TimelineStep[] = [
    {
        id: "consult",
        label: "STEP 1 自治体窓口で要件確認",
        duration: "0〜1週間",
        description: "建築指導課・住宅政策課などへ電話",
        body:
            "お持ちの空き家が対象になるか、今年度の受付期間と予算枠の状況、事前診断が必要か、市内業者限定の条件があるかを必ず最初に確認します。市役所代表に「空き家解体補助金について」と伝えれば担当部署につないでもらえます。",
        icon: "clipboard-check",
        color: "from-rose-500 to-rose-400",
    },
    {
        id: "diagnose",
        label: "STEP 2 事前調査・書類準備",
        duration: "2〜6週間",
        description: "不良住宅判定 + 必要書類の収集",
        body:
            "多くの自治体で「不良住宅か」「危険か」の事前診断が必要。自治体指定の建築士が行い、結果書類が添付資料に。並行して、建物登記事項証明書・住民票・印鑑証明書・納税証明書・解体業者の見積書を揃えます。",
        icon: "search",
        color: "from-amber-500 to-amber-400",
    },
    {
        id: "submit",
        label: "STEP 3 申請書類提出",
        duration: "1日",
        description: "原則、窓口持参で確認",
        body:
            "郵送可の自治体もありますが、書類不備があると審査が止まるので、初回は窓口持参で内容確認を受けるのが安全。提出後、自治体側の審査に入ります。",
        icon: "send",
        color: "from-orange-500 to-orange-400",
    },
    {
        id: "decision",
        label: "STEP 4 交付決定通知の受領",
        duration: "1〜2ヶ月",
        description: "通知前の着工は厳禁",
        body:
            "審査を経て「交付決定通知書」が送付されます。ここまで申請から1〜2ヶ月。重要：通知を受け取るまで絶対に解体工事を始めないでください。これが補助金トラブルで一番多い失敗パターンです。",
        icon: "inbox",
        color: "from-emerald-500 to-emerald-400",
    },
    {
        id: "construction",
        label: "STEP 5 契約・着工",
        duration: "1〜3ヶ月",
        description: "業者と契約・解体工事",
        body:
            "交付決定通知を受けてから、業者と契約・着工。多くの自治体で「年度内に工事を完了させること」という期限があるため、秋に交付決定を受けた場合は急いで進める必要があります。",
        icon: "building",
        color: "from-teal-500 to-teal-400",
    },
    {
        id: "settle",
        label: "STEP 6 完了報告・補助金振込",
        duration: "1〜2ヶ月",
        description: "領収書・前後写真を提出",
        body:
            "工事完了後、完了報告書・領収書・工事前後の写真などを提出すると補助金が振り込まれます。着工から振込までおおむね2〜4ヶ月。総トータルで4〜6ヶ月程度かかると見込んでください。",
        icon: "coins",
        color: "from-sky-500 to-sky-400",
    },
];

const FAQ_ITEMS = [
    {
        q: "解体費用全額が補助されることはありますか？",
        a: "ありません。埼玉県内のどの市町村でも、補助率は解体費用の3分の1〜5分の4が上限で、上限金額も30〜100万円程度。100〜300万円かかる解体費用のうち、一部を補助してもらえると考えてください。",
    },
    {
        q: "補助金を申請してから振り込まれるまでどれくらいかかりますか？",
        a: "申請から交付決定まで 1〜2ヶ月、交付決定後の工事着工から完了報告まで 1〜2ヶ月、完了報告から振込まで 1〜2ヶ月、合計で 4〜6ヶ月程度を見込んでください。",
    },
    {
        q: "相続した実家でも補助金は使えますか？",
        a: "使えます。ただし、相続登記が完了していることが条件になる自治体がほとんどです。亡くなった親の名義のままだと申請できないので、まず相続登記を済ませてから申請手続きに入ってください。",
    },
    {
        q: "補助金と他の支援制度は併用できますか？",
        a: "多くの自治体で、他の同種補助金との併用は不可としています。例えば、解体補助金と耐震建替え助成金を同時に受けることはできません。複数の制度に該当する場合は、どれが最も有利かを窓口で相談してください。",
    },
    {
        q: "解体業者は自治体が紹介してくれますか？",
        a: "ほとんどの自治体で業者の紹介は行っていません。市内業者一覧を案内してくれる自治体もありますが、業者選定と契約は申請者自身が行います。書類サポートに慣れた「補助金対応実績のある業者」を選ぶと申請ミスのリスクが減ります。",
    },
    {
        q: "自治体に制度がない場合、県や国の制度は使えませんか？",
        a: "埼玉県や国に、個人向けの直接的な解体補助金は基本的にありません。お住まいの市町村に制度がない場合は、不動産買取・空き家バンク・隣地交渉・古家付き土地としての売却など、別の選択肢を検討してください。",
    },
];

export default function SubsidyPage() {
    const related = getRelatedArticles("subsidy");
    return (
        <div className="bg-background">
            <ArticleHeader
                article={article}
                lead="「埼玉県の解体補助金」は、実は県全体ではなく市町村単位の制度です。川口市の最大100万円、秩父市の抽選制、深谷市の非課税世帯加算など、市町村別の制度と申請手順、ありがちな落とし穴まで整理しました。"
                updatedAt="2026年5月"
            />

            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_280px]">
                    <main className="min-w-0">
                        <ArticleContent>
                            <Callout variant="danger" title="先に知っておくべき大前提">
                                <p>
                                    <strong>埼玉県という単位での解体補助金制度は存在しません。</strong>{" "}
                                    解体に対する直接的な補助は、各市町村が独自に運用しています。「埼玉県の補助金を調べる」のではなく、
                                    <strong>「お持ちの実家がある市町村の制度を調べる」</strong>
                                    という発想で動いていきましょう。
                                </p>
                            </Callout>

                            <h2 id="overview">埼玉県には「県全体の解体補助金」はない</h2>
                            <p>
                                県の役割は、空き家バンクなどの利活用支援が中心です。お持ちの実家が
                                <strong>「どの市町村にあるか」で受けられる支援がまったく変わる</strong>
                                ということです。さいたま市と川口市は隣接していますが、制度の内容も金額も対象条件もまったく違います。
                            </p>

                            <h3>県内の空き家事情</h3>
                            <p>
                                埼玉県の空き家率は<strong>全国一低い 9.3%</strong>です。ただし、市町村別に見ると差は大きく、秩父市
                                20.2%、寄居町 14.9%、熊谷市 14.6% と、
                                <strong>県北西部の山間・郊外エリアでは空き家率が大きく上昇</strong>
                                。こうしたエリアの自治体ほど、解体補助金制度を整備している傾向があります。
                            </p>

                            <h2 id="list">埼玉県内で解体補助金が使える主要市町村一覧</h2>
                            <SubsidyMatrix />

                            <Callout variant="warning" title="さいたま市・川越市には単純な解体補助はない">
                                さいたま市の「既存建築物耐震補強等助成事業」は、
                                <strong>自分が住む家の建て替え用</strong>
                                の制度で、売却目的の解体には使えません。「都市部だから補助金が手厚いだろう」と期待すると肩透かしを食らいます。
                                <strong>人口減少が進む郊外・山間エリアの自治体ほど、解体補助金が手厚い</strong>
                                という傾向は頭に入れておいてください。
                            </Callout>

                            {/* 県南 */}
                            <h2 id="south">県南エリア｜川口市・越谷市</h2>

                            <h3>川口市｜空家除却補助金（上限100万円・対象限定）</h3>
                            <CityCard
                                tag="埼玉県内トップクラスの上限額"
                                tagColor="bg-rose-100 text-rose-700"
                                items={[
                                    ["特徴", "対象がかなり限定的。一般的な老朽空き家ではなく、接道なし等の特殊物件向け"],
                                    ["補助額", "解体工事費の 5分の4、または床面積 1㎡あたり 2.5万円のうち低い額（上限100万円）"],
                                    [
                                        "主な要件",
                                        "事前診断で不良住宅判定／接道なし・狭小無接道地で隣接地所有者が10年以上管理／1年以上居住なし／市内業者施工",
                                    ],
                                    ["受付期間", "年度ごとに変動（令和7年度は8月1日〜11月28日）"],
                                ]}
                            />

                            <h3>越谷市｜空家等対策推進事業費補助金（上限30〜50万円）</h3>
                            <CityCard
                                tag="改修も補助対象"
                                tagColor="bg-emerald-100 text-emerald-700"
                                items={[
                                    ["特徴", "特定空家等に認定された物件が対象。改修（リフォーム）も補助対象"],
                                    ["補助額", "解体費用の一部（上限 30〜50万円目安）"],
                                    ["主な要件", "特定空家等認定／昭和56年5月以前の旧耐震基準／市税滞納なし"],
                                ]}
                            />

                            {/* 県北 */}
                            <h2 id="north">県北エリア｜深谷市・行田市</h2>

                            <h3>深谷市｜危険空家等除却補助金（住民税非課税で 80万円）</h3>
                            <CityCard
                                tag="非課税世帯加算あり"
                                tagColor="bg-amber-100 text-amber-700"
                                items={[
                                    ["特徴", "制度設計が非常にきめ細かく、住民税非課税世帯への加算がある"],
                                    [
                                        "補助額",
                                        "通常：上限 30万円／住民税非課税世帯：上限 80万円。補助対象費用の5分の4 または 床面積×2万円/㎡ のいずれか低い額",
                                    ],
                                    [
                                        "主な要件",
                                        "昭和56年5月31日以前建築／市が定める「不良住宅」判定／交付決定通知後に着工／市税滞納なし",
                                    ],
                                    ["注意", "事前に「不良住宅判定」を受ける必要。スケジュールには余裕を"],
                                ]}
                            />

                            <h3>行田市｜老朽空き家等解体補助制度</h3>
                            <p>
                                市内の危険な空き家解体を対象とする制度で、年度ごとに予算枠が設定されています。令和7年度はキャンセル発生時の追加受付なども行われました。詳細な金額・条件は年度により変動するため、
                                <strong>必ず事前に行田市の建築開発課（空き家対策担当）に問い合わせ</strong>
                                てください。
                            </p>

                            <InlineCTA
                                title="お住まいの市町村で補助金が使えるか、無料で確認します"
                                description="物件のある市町村と築年数をお伺いし、適用可能な補助金・申請スケジュール・市内業者条件まで無料で整理してご提示します。"
                            />

                            {/* 県西 */}
                            <h2 id="west">県西・山間エリア｜秩父市・狭山市・富士見市ほか</h2>

                            <h3>秩父市｜空き家解体補助金（抽選制・要早期準備）</h3>
                            <CityCard
                                tag="抽選制・短期受付"
                                tagColor="bg-violet-100 text-violet-700"
                                items={[
                                    ["特徴", "市内業者と市外業者で補助額に差。地元業者育成の狙い"],
                                    [
                                        "補助額",
                                        "市内業者：解体費の 1/3、上限 30万円／市外業者：解体費の 1/3、上限 20万円",
                                    ],
                                    [
                                        "主な要件",
                                        "昭和56年5月31日以前建築の一戸建て／1年以上空き家／個人所有（不動産業者の営利目的所有は対象外）／市税滞納なし／5年以内に同補助金を受けていない",
                                    ],
                                    ["受付期間", "例年6月頃の約4週間（令和7年度は6月2日〜6月27日）"],
                                    [
                                        "ポイント",
                                        "先着順ではなく抽選制。予算超過なら抽選、外れたら次年度の優先補助対象に。前年度から準備を",
                                    ],
                                ]}
                            />

                            <h3>狭山市・富士見市・本庄市・横瀬町</h3>
                            <ul className="my-4 space-y-2 text-sm">
                                <li>
                                    <strong>狭山市</strong>{" "}
                                    — 受付開始は例年4月中旬。予算枠が小さく、開始から数週間で予算満了になる年も。3月に書類準備を。
                                </li>
                                <li>
                                    <strong>富士見市</strong>{" "}
                                    — 市内に本社・支店がある業者に解体を依頼することが厳格に求められます。業者選定の段階で必ず市の窓口確認を。
                                </li>
                                <li>
                                    <strong>本庄市</strong> — 事前調査必須。老朽危険空き家が対象。
                                </li>
                                <li>
                                    <strong>横瀬町・小川町・東秩父村</strong>{" "}
                                    — 町村単位の制度は予算規模が小さく、毎年実施されるとは限らないため、必ず年度ごとに役場へ確認。
                                </li>
                            </ul>

                            {/* フロー */}
                            <h2 id="flow">補助金申請の基本フロー</h2>
                            <p>
                                どの市町村でも、申請から補助金受取までの基本的な流れは共通しています。
                                <strong>この流れを守らないと補助金が受け取れない</strong>
                                ので、必ず理解してから動いてください。下のタイムラインで各STEPをクリックすると詳細が表示されます。
                            </p>
                            <ProcessTimeline steps={APPLICATION_STEPS} />

                            <Callout variant="danger" title="交付決定通知 → 着工 の順を絶対に守る">
                                通知を受け取るまでに解体工事を始めると、その時点で
                                <strong>補助金対象外</strong>
                                になります。これが補助金トラブルで一番多い失敗パターンです。
                            </Callout>

                            {/* 落とし穴 */}
                            <h2 id="pitfalls">申請でよくある5つの落とし穴</h2>
                            <ol className="my-6 space-y-3">
                                {[
                                    {
                                        title: "交付決定前に着工してしまう",
                                        body: "「契約してしまえば工事を始められる」と思い込み、申請と並行して業者に工事を依頼してしまうケース。多くの自治体で、交付決定通知を受け取る前に着工するとその時点で補助金対象外に。",
                                    },
                                    {
                                        title: "市内業者限定の条件を見落とす",
                                        body: "秩父市・富士見市など、市内に本社・支店がある業者に依頼することが条件の自治体が複数。「県外の大手解体業者の方が安かったから」と契約してから申請に行くと、対象外と言われて愕然とすることに。",
                                    },
                                    {
                                        title: "予算枠の早期終了",
                                        body: "狭山市や秩父市のように予算規模が小さい自治体では、4月の年度開始から数週間で受付終了になる年も。来年度に申請するなら3月から書類準備を。",
                                    },
                                    {
                                        title: "申請書類の不備",
                                        body: "書類が1枚足りない、印鑑が違う、税の滞納がある、というだけで審査が止まったり却下されたり。特に相続が絡む場合は戸籍謄本や相続関係を示す書類が必要。",
                                    },
                                    {
                                        title: "工事完了期限の超過",
                                        body: "補助金の交付決定には「年度内に工事を完了させること」という期限がついていることがほとんど。冬場は工事が遅れがちなので、秋に交付決定を受けた場合は急いで進める必要がある。",
                                    },
                                ].map((item, i) => (
                                    <li
                                        key={item.title}
                                        className="flex gap-3 rounded-xl border border-border bg-white p-4 shadow-sm"
                                    >
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">
                                            {i + 1}
                                        </span>
                                        <div>
                                            <p className="font-bold text-foreground">
                                                {item.title}
                                            </p>
                                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                                {item.body}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ol>

                            {/* 対象外の選択肢 */}
                            <h2 id="alternatives">補助金が使えない／対象外だった場合の選択肢</h2>
                            <p>
                                「うちの市町村には制度がない」「対象外だった」と落胆されている方も、
                                <strong>補助金がなくても解体費用の負担を減らす方法</strong>
                                は複数あります。
                            </p>

                            <div className="my-6 grid gap-3 md:grid-cols-2">
                                {[
                                    {
                                        title: "選択肢1：不動産買取で解体不要にする",
                                        body: "現況のまま不動産買取業者に売却すれば、解体費用は買主負担。仲介より2〜3割安くなるが、解体費 100〜300万円の自己負担がゼロに。",
                                        accent: "bg-emerald-50/60 border-emerald-200",
                                    },
                                    {
                                        title: "選択肢2：隣地所有者への売却交渉",
                                        body: "接道なし・狭小地でも、隣の家が「土地を広げたい」と思っているケースは多い。市場価格より高く買い取ってもらえることも。",
                                        accent: "bg-sky-50/60 border-sky-200",
                                    },
                                    {
                                        title: "選択肢3：空き家バンクの活用",
                                        body: "県内の多くの市町村が運営。利活用希望者とのマッチングサービスで、特に山間エリアでは現実的な選択肢に。",
                                        accent: "bg-amber-50/60 border-amber-200",
                                    },
                                    {
                                        title: "選択肢4：古家付き土地として売却",
                                        body: "県南・東部の住宅需要が強いエリアでは、買主側が解体・建て替えを前提に古家付きで購入するケースも珍しくない。",
                                        accent: "bg-violet-50/60 border-violet-200",
                                    },
                                ].map((opt) => (
                                    <div
                                        key={opt.title}
                                        className={`rounded-2xl border ${opt.accent} p-5`}
                                    >
                                        <p className="font-bold text-foreground">{opt.title}</p>
                                        <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                                            {opt.body}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <Callout variant="warning" title="選択肢5：相続放棄（負債がある場合）">
                                実家に固定資産税の滞納や住宅ローンの残債があり、解体費用も賄えない状況であれば相続放棄も選択肢。ただし、相続を知ってから3ヶ月以内という期限があり、他の財産も同時に放棄することになるので、
                                <strong>必ず弁護士・司法書士に相談してから決断</strong>してください。
                            </Callout>

                            <h2 id="faq">よくある質問</h2>
                            <FaqList items={FAQ_ITEMS} />

                            <Callout variant="success" title="まとめ｜まずは市町村窓口に確認、それから動く">
                                <p>
                                    <strong>① 埼玉県全体の補助金はない</strong>、市町村単位で確認。
                                </p>
                                <p>
                                    <strong>② 上限金額は 30〜100万円</strong>、解体費全額は補助されない。
                                </p>
                                <p>
                                    <strong>③ 交付決定前の着工は絶対NG</strong>。最大の失敗パターン。
                                </p>
                                <p>
                                    <strong>④ 市内業者限定・予算枠早期終了</strong>に注意。年度開始4月に動ける準備を。
                                </p>
                                <p>
                                    <strong>⑤ 補助金が使えない場合は「不動産買取」が最有力</strong>。
                                </p>
                            </Callout>

                            <InlineCTA
                                title="補助金が使えるか、最短即日でお調べします"
                                description="物件所在地と築年数だけで、適用可能な補助金・申請期限・必要書類まで無料でご案内。補助金が使えない場合の代替戦略もご提案します。"
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

function SubsidyMatrix() {
    const rows = [
        ["川口市", "空家除却補助金", "100万円", "接道なし等の特殊な空き家"],
        ["秩父市", "空き家解体補助金", "30万円（抽選制）", "昭和56年5月以前築・1年以上空き家"],
        ["越谷市", "空家等対策推進事業費補助金", "30〜50万円", "特定空家等に認定された空き家"],
        ["深谷市", "危険空家等除却補助金", "30万円（非課税80万円）", "不良住宅と判定された空き家"],
        ["行田市", "老朽空き家等解体補助制度", "自治体要綱に準ずる", "老朽危険空き家"],
        ["狭山市", "空家等除却補助金", "解体費の一部", "1年以上使用されていない空き家"],
        ["富士見市", "空家除却補助金", "解体費の一部", "市内業者限定"],
        ["本庄市", "空き家除却補助金", "事前調査必須", "老朽危険空き家"],
        ["白岡市", "空家等除却補助金", "解体費の一部", "令和10年度終了予定"],
        ["蕨市", "老朽空き家等解体補助金", "解体費の一部", "全部解体が条件"],
        ["横瀬町", "老朽空き家等除却補助事業", "解体費の一部", "事前申請必須"],
        ["美里町", "危険老朽空き家除去補助制度", "調査費も補助", "事前調査必須"],
    ];
    return (
        <div className="my-6 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
                <thead className="bg-secondary text-xs">
                    <tr>
                        <th className="px-4 py-3 text-left font-bold">市町村</th>
                        <th className="hidden px-4 py-3 text-left font-bold md:table-cell">
                            制度名
                        </th>
                        <th className="px-4 py-3 text-left font-bold">補助上限（目安）</th>
                        <th className="hidden px-4 py-3 text-left font-bold lg:table-cell">
                            主な対象
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border bg-white">
                    {rows.map(([city, name, amount, target]) => (
                        <tr key={city} className="hover:bg-secondary/30">
                            <td className="px-4 py-3 font-semibold">{city}</td>
                            <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                                {name}
                            </td>
                            <td className="px-4 py-3 font-bold text-accent">{amount}</td>
                            <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">
                                {target}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="border-t border-border bg-secondary/30 px-4 py-3 text-[11px] leading-relaxed text-muted-foreground">
                ※ 上記は2026年5月時点の調査情報です。各制度は毎年度受付期間・予算枠が決まっており、年度途中で終了する可能性があります。実際の申請前に、必ず各市町村の建築指導課または都市整備課にご確認ください。
            </p>
        </div>
    );
}

function CityCard({
    tag,
    tagColor,
    items,
}: {
    tag: string;
    tagColor: string;
    items: [string, string][];
}) {
    return (
        <div className="my-5 overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <div className="border-b border-border bg-secondary/40 px-5 py-3">
                <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider ${tagColor}`}
                >
                    {tag}
                </span>
            </div>
            <dl className="divide-y divide-border">
                {items.map(([k, v]) => (
                    <div
                        key={k}
                        className="grid grid-cols-1 gap-1 px-5 py-3 sm:grid-cols-[120px_1fr] sm:gap-4"
                    >
                        <dt className="text-xs font-bold tracking-wider text-muted-foreground">
                            {k}
                        </dt>
                        <dd className="text-sm leading-relaxed text-foreground/90">{v}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}
