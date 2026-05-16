import { getAreas, getVendors } from '@/lib/supabase-helpers'
import { SITE, COMPANY } from '@/lib/constants'
import Hero from '@/components/home/Hero'
import ConsultationEntry from '@/components/home/ConsultationEntry'
import WhyUs from '@/components/home/WhyUs'
import AboutIejimai from '@/components/home/AboutIejimai'
import AreaList from '@/components/home/AreaList'
import BottomCTA from '@/components/home/BottomCTA'
import VendorListWithTabs from '@/components/VendorListWithTabs'

const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
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

export default async function HomePage() {
    const [areas, vendors] = await Promise.all([getAreas(), getVendors()])

    return (
        <div className="min-h-screen">
            {/* JSON-LD: Organization 構造化データ */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
            />

            <Hero />
            <ConsultationEntry />
            <WhyUs />
            <AboutIejimai />
            <VendorListWithTabs vendors={vendors} areas={areas} />
            <AreaList areas={areas} vendors={vendors} />
            <BottomCTA />
        </div>
    )
}
