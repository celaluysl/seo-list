import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { ArrowRight, Box } from 'lucide-react'

export const metadata = {
    title: 'SEO Hizmetleri - En İyi Ajansları Keşfedin',
    description: 'İşletmeniz için en uygun SEO hizmetlerini ve uzman ajansları bulun. Yerel SEO, E-ticaret SEO ve daha fazlası.',
}

export default async function ServicesPage() {
    const supabase = await createClient()
    const { data: services } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })

    // Fallback if no services in DB yet (for dev preview)
    const displayServices = services?.length
        ? services
        : [
            {
                id: '1',
                title: 'Yerel SEO',
                slug: 'yerel-seo',
                description: 'Bölgesel aramalarda öne çıkın, mağaza trafiğinizi ve yerel görünürlüğünüzü artırın.',
                icon_url: null,
            },
            {
                id: '2',
                title: 'E-ticaret SEO',
                slug: 'e-ticaret-seo',
                description: 'Ürün sayfalarınızı optimize edin, dönüşüm oranlarını artırın ve satışlarınızı katlayın.',
                icon_url: null,
            },
            {
                id: '3',
                title: 'Teknik SEO',
                slug: 'teknik-seo',
                description: 'Site hızı, tarama bütçesi ve yapısal sorunları tespit edip düzelten uzmanlar.',
                icon_url: null,
            },
        ]

    return (
        <div className="bg-background-offset min-h-screen py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-primary mb-6">
                        Profesyonel SEO Hizmetleri
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Markanızın dijital büyümesi için ihtiyacınız olan tüm uzmanlık alanları tek bir platformda.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayServices.map((service) => (
                        <Link
                            key={service.id}
                            href={`/hizmetler/${service.slug}`}
                            className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-accent-green/50 hover:shadow-xl hover:shadow-green-900/5 transition-all duration-300 flex flex-col h-full"
                        >
                            <div className="size-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:bg-accent-green group-hover:text-white transition-colors duration-300">
                                {/* Dynamically load icon if possible, or use generic */}
                                <Box className="size-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                                {service.title}
                            </h2>
                            <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                                {service.description}
                            </p>
                            <div className="flex items-center text-primary font-bold group-hover:text-accent-green transition-colors mt-auto">
                                Detayları İncele
                                <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
