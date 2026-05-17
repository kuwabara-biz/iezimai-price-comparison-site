import { SITE, COMPANY } from '@/lib/constants'
import Hero from '@/components/home/Hero'
import ProblemSection from '@/components/home/ProblemSection'
import FlowSection from '@/components/home/FlowSection'
import WhyUs from '@/components/home/WhyUs'
import ServiceSection from '@/components/home/ServiceSection'
import PricingSection from '@/components/home/PricingSection'
import CasesSection from '@/components/home/CasesSection'
import AreaSection from '@/components/home/AreaSection'
import FAQSection from '@/components/home/FAQSection'
import { HOME_FAQ_ITEMS } from '@/components/home/faq-data'
import BottomCTA from '@/components/home/BottomCTA'
import TableOfContents from '@/components/home/TableOfContents'

const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.name,
    legalName: COMPANY.name,
    url: SITE.url,
    description: SITE.description,
    areaServed: {
        '@type': 'AdministrativeArea',
        name: '埼玉県',
    },
    address: {
        '@type': 'PostalAddress',
        addressRegion: '埼玉県',
        addressLocality: '朝霞市',
        addressCountry: 'JP',
    },
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        url: `${SITE.url}/contact`,
        availableLanguage: ['ja'],
    },
}

const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQ_ITEMS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
        },
    })),
}

export default function HomePage() {
    return (
        <div className="min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            <Hero />
            <ProblemSection />
            <FlowSection />
            <WhyUs />
            <ServiceSection />
            <PricingSection />
            <CasesSection />
            <AreaSection />
            <FAQSection />
            <BottomCTA />
            <TableOfContents />
        </div>
    )
}
