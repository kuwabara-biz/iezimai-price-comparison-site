// Server / Client 双方から import される共有定数
// （ConsultationForm が "use client" のため、page.tsx 側から直接 import すると
//   RSC boundary を越えて値がプロキシ化され、配列メソッドが使えなくなる）

export const TYPE_OPTIONS = [
    { value: "ihinseiri", label: "遺品整理について" },
    { value: "real-estate", label: "相続不動産の処分・買取について" },
    { value: "both", label: "遺品整理 + 不動産処分の両方" },
    { value: "other", label: "その他（終活など）" },
] as const;

export type TypeValue = (typeof TYPE_OPTIONS)[number]["value"];
