// Server / Client 双方から import される共有定数
// （ConsultationForm が "use client" のため、page.tsx 側から直接 import すると
//   RSC boundary を越えて値がプロキシ化され、配列メソッドが使えなくなる）

export const TYPE_OPTIONS = [
    { value: "ihinseiri", label: "遺品整理について" },
    { value: "real-estate", label: "相続不動産の処分について" },
    { value: "shukatsu", label: "終活・死後事務について" },
    { value: "other", label: "その他" },
] as const;

export type TypeValue = (typeof TYPE_OPTIONS)[number]["value"];
