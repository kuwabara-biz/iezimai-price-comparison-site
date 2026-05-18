import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function ArticleContent({ children }: Props) {
    return (
        <article
            className="
                article-prose
                max-w-none
                text-foreground
                [&_h2]:mt-14 [&_h2]:scroll-mt-24 [&_h2]:border-l-4 [&_h2]:border-accent [&_h2]:pl-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-snug md:[&_h2]:text-3xl
                [&_h3]:mt-10 [&_h3]:scroll-mt-24 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground md:[&_h3]:text-2xl
                [&_h4]:mt-8 [&_h4]:text-base [&_h4]:font-bold [&_h4]:text-foreground md:[&_h4]:text-lg
                [&_p]:mt-5 [&_p]:text-base [&_p]:leading-[1.9] [&_p]:text-foreground/90
                [&_ul]:my-5 [&_ul]:space-y-2 [&_ul]:pl-1
                [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6
                [&_strong]:font-bold [&_strong]:text-foreground
                [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:opacity-80
            "
        >
            {children}
        </article>
    );
}
