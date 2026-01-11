import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import {
    Building2, MapPin, Calendar, Users, Share2, Mail, Link as LinkIcon,
    Code, Edit3, Link2, ShoppingBag, Map, BarChart3, TrendingUp, Trophy,
    HelpCircle, Star, CheckCircle2, ChevronDown, ChevronUp, Globe
} from 'lucide-react'

// Icon mapping helper
const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
        code: <Code className="size-6" />,
        edit_note: <Edit3 className="size-6" />,
        link: <Link2 className="size-6" />,
        storefront: <ShoppingBag className="size-6" />,
        map: <Map className="size-6" />,
        analytics: <BarChart3 className="size-6" />,
        trophy: <Trophy className="size-8 text-yellow-500" />,
        military_tech: <Trophy className="size-8 text-blue-500" />,
        workspace_premium: <Trophy className="size-8 text-slate-500" />,
        stars: <Trophy className="size-8 text-purple-500" />
    }
    return icons[iconName] || <Code className="size-6" />
}

const getServiceColor = (iconName: string) => {
    const colors: Record<string, string> = {
        code: 'bg-blue-100 text-blue-700 group-hover:bg-blue-600',
        edit_note: 'bg-purple-100 text-purple-700 group-hover:bg-purple-600',
        link: 'bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600',
        storefront: 'bg-orange-100 text-orange-700 group-hover:bg-orange-600',
        map: 'bg-rose-100 text-rose-700 group-hover:bg-rose-600',
        analytics: 'bg-cyan-100 text-cyan-700 group-hover:bg-cyan-600'
    }
    return colors[iconName] || 'bg-gray-100 text-gray-700 group-hover:bg-gray-600'
}

export default async function AgencyDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = await params
    const supabase = await createClient()

    const { data: agency } = await supabase
        .from('agencies')
        .select('*')
        .eq('slug', slug)
        .single()

    if (!agency) {
        notFound()
    }

    // Helper types for JSONB data
    const stats = agency.stats || {}
    const contact = agency.contact_info || {}
    const services = agency.services_offered || []
    const caseStudies = agency.case_studies || []
    const awards = agency.awards || []
    const reviews = agency.reviews_data || []
    const faqs = agency.faq || []

    return (
        <div className="bg-slate-50 min-h-screen pb-12">
            {/* Header logic is handled by global layout */}

            <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero Section */}
                <div className="relative mt-8 mb-8">
                    <div className="h-64 w-full rounded-xl overflow-hidden bg-slate-200 relative group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                        <img
                            src={agency.cover_image_url || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80'}
                            alt={agency.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {agency.is_verified && (
                            <div className="absolute bottom-4 left-4 sm:left-44 z-20 text-white flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4">
                                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs font-medium border border-white/10">
                                    <CheckCircle2 className="size-3.5" />
                                    Onaylı Ajans
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start px-4 -mt-12 sm:-mt-16 relative z-30 gap-6">
                        <div className="bg-white p-2 rounded-xl shadow-lg border border-slate-100 shrink-0">
                            <div className="w-28 h-28 sm:w-36 sm:h-36 bg-primary rounded-lg flex items-center justify-center overflow-hidden border border-gray-100">
                                <img src={agency.logo_url} alt={agency.name} className="w-full h-full object-contain" />
                            </div>
                        </div>

                        <div className="flex-1 pt-2 sm:pt-16 pb-2">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{agency.name}</h1>
                                    <div className="flex flex-wrap items-center gap-4 mt-2 text-slate-500 text-sm">
                                        {agency.location && (
                                            <span className="flex items-center gap-1">
                                                <MapPin className="size-4" />
                                                {agency.location}
                                            </span>
                                        )}
                                        {agency.founded_year && (
                                            <span className="flex items-center gap-1">
                                                <Calendar className="size-4" />
                                                Kuruluş: {agency.founded_year}
                                            </span>
                                        )}
                                        {agency.employee_count && (
                                            <span className="flex items-center gap-1">
                                                <Users className="size-4" />
                                                {agency.employee_count} Çalışan
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                                        <Share2 className="size-4" />
                                        Paylaş
                                    </button>
                                    <button className="bg-accent-green hover:bg-emerald-600 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-sm shadow-emerald-200 transition-colors flex items-center gap-2">
                                        <Mail className="size-4" />
                                        Ajansla İletişime Geç
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">

                    {/* Sidebar */}
                    <aside className="lg:col-span-3">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="p-4 border-b border-slate-100">
                                    <h2 className="font-semibold text-slate-900">Menü</h2>
                                </div>
                                <nav className="flex flex-col p-2 space-y-1">
                                    <a href="#overview" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-50 text-primary font-medium hover:bg-slate-100 transition-colors">
                                        <Building2 className="size-5" />
                                        Genel Bakış
                                    </a>
                                    <a href="#location" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors">
                                        <MapPin className="size-5" />
                                        Konum ve İletişim
                                    </a>
                                    {services.length > 0 && (
                                        <details className="group" open>
                                            <summary className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                                                <div className="flex items-center gap-3">
                                                    <LinkIcon className="size-5" />
                                                    <span className="font-medium">Hizmet Alanları</span>
                                                </div>
                                                <ChevronDown className="size-4 text-slate-400 transition-transform duration-300 group-open:rotate-180" />
                                            </summary>
                                            <div className="ml-9 border-l border-slate-200 pl-4 my-1 space-y-2 pb-2 mt-2">
                                                {services.map((s: any, i: number) => (
                                                    <a key={i} href="#services" className="block text-sm text-slate-500 hover:text-primary transition-colors hover:translate-x-1 duration-200">
                                                        {s.title}
                                                    </a>
                                                ))}
                                            </div>
                                        </details>
                                    )}
                                    <a href="#portfolio" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors">
                                        <Building2 className="size-5" />
                                        Portföy
                                    </a>
                                    <a href="#awards" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors">
                                        <Trophy className="size-5" />
                                        Ödüller
                                    </a>
                                    <a href="#reviews" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors">
                                        <Star className="size-5" />
                                        Değerlendirmeler
                                    </a>
                                    <a href="#faq" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors">
                                        <HelpCircle className="size-5" />
                                        SSS
                                    </a>
                                </nav>
                            </div>

                            <div className="bg-primary rounded-xl shadow-lg p-6 text-white text-center">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="text-white size-6" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Büyümeye hazır mısınız?</h3>
                                <p className="text-slate-300 text-sm mb-6">İşletmenize özel SEO teklifinizi 24 saat içinde alın.</p>
                                <button className="w-full bg-accent-green hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                                    Teklif İste
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="lg:col-span-9 space-y-10">

                        {/* Overview Section */}
                        <section id="overview" className="scroll-mt-28">
                            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm mb-6">
                                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Building2 className="size-6 text-primary" />
                                    {agency.name} Hakkında
                                </h2>
                                <p className="text-slate-600 leading-relaxed text-base">
                                    {agency.description}
                                </p>

                                {stats && Object.keys(stats).length > 0 && (
                                    <div className="mt-6 flex flex-wrap gap-4 pt-4 border-t border-slate-100">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Sektör Deneyimi</span>
                                            <span className="text-lg font-bold text-slate-900">{stats.years_exp}+ Yıl</span>
                                        </div>
                                        <div className="w-px bg-slate-200"></div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Mutlu Müşteri</span>
                                            <span className="text-lg font-bold text-slate-900">{stats.happy_clients}+</span>
                                        </div>
                                        <div className="w-px bg-slate-200"></div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Toplam Trafik Artışı</span>
                                            <span className="text-lg font-bold text-slate-900">{stats.traffic_increase} Ort.</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Location Section */}
                        <section id="location" className="scroll-mt-28">
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="p-6 sm:p-8">
                                    <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center justify-center gap-2">Konum</h2>
                                    <p className="text-center text-slate-600 text-sm mb-8 max-w-2xl mx-auto">
                                        Ajansımızın konumunu keşfedin ve bizimle kolayca iletişime geçin.
                                    </p>

                                    {contact.map_embed_url && (
                                        <div className="w-full h-80 bg-slate-100 rounded-xl overflow-hidden mb-8 border border-slate-200 relative group">
                                            <iframe
                                                className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                                                src={contact.map_embed_url}
                                                loading="lazy"
                                                style={{ border: 0 }}
                                            ></iframe>
                                        </div>
                                    )}

                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className="md:w-1/3 space-y-6 border-r border-slate-100 pr-0 md:pr-6">
                                            {contact.address && (
                                                <div className="flex gap-4">
                                                    <MapPin className="size-5 text-slate-400 mt-1" />
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 text-sm">Adres</h4>
                                                        <p className="text-slate-600 text-sm mt-1">{contact.address}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {contact.phone && (
                                                <div className="flex gap-4">
                                                    <Mail className="size-5 text-slate-400 mt-1" />
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 text-sm">Telefon</h4>
                                                        <p className="text-blue-600 font-medium text-sm mt-1">{contact.phone}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="md:w-2/3 pl-0 md:pl-6">
                                            <h3 className="text-lg font-bold text-blue-600 mb-2 uppercase tracking-wide">{agency.name}</h3>
                                            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                                                {agency.description}
                                            </p>
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
                                                    Ajansla İletişime Geç
                                                </button>
                                                {agency.website_url && (
                                                    <a href={agency.website_url} target="_blank" className="flex items-center justify-center gap-2 border border-slate-200 hover:border-blue-300 text-slate-600 hover:text-blue-600 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors bg-white">
                                                        <Globe className="size-4" />
                                                        Website
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Services Section */}
                        {services.length > 0 && (
                            <section id="services" className="scroll-mt-28">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <LinkIcon className="size-6 text-primary" />
                                    Hizmet Alanları ve Uzmanlıklar
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {services.map((service: any, idx: number) => (
                                        <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 hover:border-primary/40 hover:shadow-md transition-all group cursor-default">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${getServiceColor(service.icon)}`}>
                                                {getIcon(service.icon)}
                                            </div>
                                            <h3 className="font-bold text-slate-900 mb-1">{service.title}</h3>
                                            <p className="text-sm text-slate-600">{service.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Portfolio Section */}
                        {caseStudies.length > 0 && (
                            <section id="portfolio" className="scroll-mt-28">
                                <div className="flex justify-between items-end mb-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">Portföy ve Vaka Analizleri</h2>
                                        <p className="text-slate-500 text-sm mt-1">Son müşteri kampanyalarından gerçek sonuçlar</p>
                                    </div>
                                    <a href="#" className="text-primary text-sm font-medium hover:underline">Tümünü gör</a>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {caseStudies.map((item: any, idx: number) => (
                                        <article key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
                                            <div className="h-48 bg-slate-100 relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-transparent z-10"></div>
                                                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                <div className="absolute bottom-4 left-4 z-20">
                                                    <span className="bg-accent-green text-white text-xs font-bold px-2 py-1 rounded">{item.category}</span>
                                                    <h3 className="text-white font-bold text-lg mt-1">{item.title}</h3>
                                                </div>
                                            </div>
                                            <div className="p-5">
                                                <div className="flex gap-4 mb-4">
                                                    {item.stats?.map((stat: any, sIdx: number) => (
                                                        <div key={sIdx} className="flex-1">
                                                            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{stat.label}</p>
                                                            <div className={`flex items-end gap-1 font-bold text-lg ${sIdx === 0 ? 'text-accent-green' : 'text-primary'}`}>
                                                                {stat.value}
                                                                <TrendingUp className="size-4 mb-1" />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <button className="mt-4 text-primary text-sm font-medium hover:text-blue-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                                                    Vaka Analizini Oku <Share2 className="size-4 transform rotate-180" />
                                                </button>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Awards Section */}
                        {awards.length > 0 && (
                            <section id="awards" className="scroll-mt-28">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Trophy className="size-6 text-primary" />
                                    Ödüller ve Başarılar
                                </h2>
                                <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                                    <div className="flex flex-wrap items-center justify-around gap-8">
                                        {awards.map((award: any, idx: number) => (
                                            <div key={idx} className="flex flex-col items-center text-center">
                                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 border border-slate-200">
                                                    {getIcon(award.icon)}
                                                </div>
                                                <h4 className="font-bold text-slate-900 text-sm">{award.title}</h4>
                                                <p className="text-xs text-slate-500">{award.organization}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* References Section */}
                        {agency.client_references && agency.client_references.length > 0 && (
                            <section id="references" className="scroll-mt-28">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Users className="size-6 text-primary" />
                                    Referanslar
                                </h2>
                                <div className="bg-white rounded-xl border border-slate-200 p-8">
                                    <p className="text-center text-slate-500 text-sm mb-6">Dünya çapında birçok markanın güvendiği iş ortağı</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                                        {agency.client_references.map((client: string, idx: number) => (
                                            <div key={idx} className="text-center font-bold text-xl text-slate-400 font-display">{client}</div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Reviews Section */}
                        {reviews.length > 0 && (
                            <section id="reviews" className="scroll-mt-28">
                                <h2 className="text-xl font-bold text-slate-900 mb-6">Müşteri Değerlendirmeleri</h2>
                                <div className="space-y-4">
                                    {reviews.map((review: any, idx: number) => (
                                        <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={review.avatar_url || `https://ui-avatars.com/api/?name=${review.author}`} alt={review.author} className="w-12 h-12 rounded-full object-cover border border-slate-100" />
                                                    <div>
                                                        <p className="font-bold text-slate-900 text-sm">{review.author}</p>
                                                        <p className="text-xs text-slate-500">{review.role}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <div className="flex text-yellow-400">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className={`size-5 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                                                        ))}
                                                    </div>
                                                    {review.is_verified && (
                                                        <div className="flex items-center gap-1 text-[#0077b5] mt-1 bg-blue-50 px-2 py-0.5 rounded text-[10px] font-bold">
                                                            <CheckCircle2 className="size-3" />
                                                            LinkedIn Onaylı
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-slate-600 text-sm italic">"{review.text}"</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* FAQ Section */}
                        {faqs.length > 0 && (
                            <section id="faq" className="scroll-mt-28">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <HelpCircle className="size-6 text-primary" />
                                    Sıkça Sorulan Sorular
                                </h2>
                                <div className="space-y-4">
                                    {faqs.map((faq: any, idx: number) => (
                                        <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                                            <details className="group p-4 [&_summary::-webkit-details-marker]:hidden">
                                                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-slate-900">
                                                    <h3 className="font-medium text-sm">{faq.question}</h3>
                                                    <ChevronDown className="size-5 shrink-0 transition duration-300 group-open:rotate-180" />
                                                </summary>
                                                <p className="mt-4 leading-relaxed text-slate-600 text-sm border-t border-slate-100 pt-4">
                                                    {faq.answer}
                                                </p>
                                            </details>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                    </div>
                </div>
            </main>
        </div>
    )
}
