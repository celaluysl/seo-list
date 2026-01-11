import Link from 'next/link'
import {
    ArrowRight,
    Store,
    ShoppingBag,
    Terminal,
    FileText,
    Link as LinkIcon,
    Globe,
    ChevronRight,
} from 'lucide-react'

const categories = [
    {
        title: 'Yerel SEO',
        slug: 'yerel-seo',
        description:
            'Bölgesel aramalarda öne çıkın, mağaza trafiğinizi ve yerel görünürlüğünüzü artırın.',
        icon: Store,
        colorClass: 'bg-blue-50 text-blue-600',
        count: '1,240+ Uzman',
    },
    {
        title: 'E-ticaret SEO',
        slug: 'e-ticaret-seo',
        description:
            'Ürün sayfalarınızı optimize edin, dönüşüm oranlarını artırın ve satışlarınızı katlayın.',
        icon: ShoppingBag,
        colorClass: 'bg-purple-50 text-purple-600',
        count: '850+ Uzman',
    },
    {
        title: 'Teknik SEO Denetimi',
        slug: 'teknik-seo',
        description:
            'Site hızı, tarama bütçesi ve yapısal sorunları tespit edip düzelten uzmanlar.',
        icon: Terminal,
        colorClass: 'bg-orange-50 text-orange-600',
        count: '420+ Uzman',
    },
    {
        title: 'İçerik Pazarlaması',
        slug: 'icerik-pazarlamasi',
        description:
            'Otorite oluşturan, trafik çeken ve okuyucuyu müşteriye dönüştüren stratejik içerikler.',
        icon: FileText,
        colorClass: 'bg-pink-50 text-pink-600',
        count: '1,100+ Uzman',
    },
    {
        title: 'Bağlantı Kurulumu',
        slug: 'baglanti-kurulumu',
        description:
            'Alan adı otoritenizi artıracak yüksek kaliteli backlink stratejileri ve PR çalışmaları.',
        icon: LinkIcon,
        colorClass: 'bg-teal-50 text-teal-600',
        count: '920+ Uzman',
    },
    {
        title: 'Uluslararası SEO',
        slug: 'uluslararasi-seo',
        description:
            'Küresel pazarlara açılın, çok dilli ve çok bölgeli stratejilerle dünyayı hedefleyin.',
        icon: Globe,
        colorClass: 'bg-indigo-50 text-indigo-600',
        count: '630+ Uzman',
    },
]

export default function ServiceCategories() {
    return (
        <section className="py-24 bg-background-offset">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
                            Uzmanlık Alanına Göre Keşfet
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl">
                            Projenizin ihtiyaçlarına özel, doğrulanmış yeteneklere sahip
                            ajansları kategorize ettik.
                        </p>
                    </div>
                    <Link
                        href="/hizmetler"
                        className="text-primary font-bold hover:text-accent-green transition-colors flex items-center gap-2 group border-b-2 border-transparent hover:border-accent-green pb-1"
                    >
                        Tüm Hizmetleri Gör
                        <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.title}
                            href={`/hizmetler/${category.slug}`}
                            className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-accent-green/30 hover:shadow-xl hover:shadow-green-900/5 transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                                <category.icon className="size-24 text-primary" />
                            </div>
                            <div className="relative z-10">
                                <div
                                    className={`size-14 rounded-2xl ${category.colorClass} flex items-center justify-center mb-6 group-hover:bg-accent-green group-hover:text-white transition-colors duration-300 shadow-sm`}
                                >
                                    <category.icon className="size-8" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-primary transition-colors">
                                    {category.title}
                                </h3>
                                <p className="text-gray-500 mb-6 line-clamp-2">
                                    {category.description}
                                </p>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                    <span className="text-sm font-semibold text-gray-400">
                                        {category.count}
                                    </span>
                                    <span className="size-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-accent-green/10 group-hover:text-accent-green transition-colors">
                                        <ChevronRight className="size-5" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
