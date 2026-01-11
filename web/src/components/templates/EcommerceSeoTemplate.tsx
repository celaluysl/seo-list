
import Link from 'next/link'
import { TrendingUp, ShoppingBag, Gauge, Star, MapPin, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'

export default async function EcommerceSeoTemplate({ content }: { content?: string | null }) {
    const supabase = await createClient()
    const { data: agencies } = await supabase.from('agencies').select('*').order('rating', { ascending: false })

    return (
        <div className="flex-grow flex flex-col items-center w-full bg-slate-50">
            <div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-8">

                {/* Breadcrumbs */}
                <nav aria-label="Breadcrumb" className="flex text-sm text-gray-500">
                    <ol className="inline-flex items-center space-x-2">
                        <li className="inline-flex items-center">
                            <Link href="/" className="hover:text-primary font-medium">Anasayfa</Link>
                        </li>
                        <li><span className="mx-1">/</span></li>
                        <li className="inline-flex items-center">
                            <Link href="/hizmetler" className="hover:text-primary font-medium">Hizmetler</Link>
                        </li>
                        <li><span className="mx-1">/</span></li>
                        <li aria-current="page">
                            <span className="text-gray-900 font-medium">E-Ticaret SEO</span>
                        </li>
                    </ol>
                </nav>

                {/* Hero Section */}
                <section className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm">
                    <div className="flex flex-col-reverse lg:flex-row">
                        {/* Content */}
                        <div className="flex-1 flex flex-col justify-center p-8 lg:p-12 gap-6">
                            <div className="flex flex-col gap-4">
                                <span className="inline-flex w-fit items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-inset ring-blue-700/10">
                                    🚀 Satışlarınızı Artırın
                                </span>
                                <h1 className="text-gray-900 text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                                    E-Ticaret Sitenizin Organik Trafiğini ve Satışlarını Maksimize Edin
                                </h1>
                                <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
                                    Rekabetin yoğun olduğu e-ticaret dünyasında ürünlerinizin Google'da ilk sayfada yer alması tesadüf değildir. Özel kurgulanmış SEO stratejileri ile görünürlüğünüzü ve dönüşüm oranlarınızı artırın.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <a className="flex items-center justify-center rounded-lg h-12 px-6 bg-primary hover:bg-slate-800 text-white text-base font-bold shadow-md transition-all hover:shadow-lg" href="#agencies">
                                    Uzman Ajansları İncele
                                </a>
                                <a className="flex items-center justify-center rounded-lg h-12 px-6 bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 text-base font-medium transition-colors" href="#details">
                                    Hizmet Detayları
                                </a>
                            </div>
                        </div>
                        {/* Image */}
                        <div className="lg:w-1/2 min-h-[300px] lg:min-h-full relative bg-gray-50">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBXY7dpwKZVtWRIzxxot9bVh4KyzWHKHpGiHWYPlo4nIivE8K80sV2B1b-VvcLC5V-KKQRZw7rCQVN_3N-60NydvwOjAU70-U0cUOsydY2F8veymL_EwXDsZ-T659zyLfE-d89TkwSEqngS-pcd3LvNzd-IjFbSyPrt5tnaEstPu_g9B1DOhPTgIvQeuSF3eOvhoht4-yWMDilQYKX4RqhwO2vf7dDnkGd565t6HNPO0CIo25Z0X6vb1hxXADRKA8FwPg5hhPflILI")' }}
                            ></div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-6" id="details">
                    <div className="flex flex-col gap-3 mb-10">
                        <h2 className="text-gray-900 text-3xl font-bold tracking-tight">Neden E-Ticaret SEO?</h2>
                        <p className="text-gray-500 text-lg max-w-3xl">Ücretli reklamlara bağımlı kalmadan, sürdürülebilir ve kalıcı bir büyüme modeli oluşturun.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <TrendingUp className="size-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Artan Organik Ciro</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Satın alma niyeti yüksek anahtar kelimelerde üst sıralarda yer alarak, reklam maliyeti olmadan dönüşüm sağlayan trafik elde edin.
                            </p>
                        </div>
                        <div className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <ShoppingBag className="size-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Optimize Kategori Yapısı</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Kullanıcı deneyimini ve tarama bütçesini optimize eden hiyerarşik yapı ile binlerce ürünün arama motorları tarafından doğru anlaşılmasını sağlayın.
                            </p>
                        </div>
                        <div className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Gauge className="size-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Teknik Mükemmellik</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Site hızı, mobil uyumluluk ve yapılandırılmış veri işaretlemeleri ile e-ticaret sitenizin teknik altyapısını Google standartlarına taşıyın.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Agencies Listing Section */}
                <section className="flex flex-col gap-6 pt-4" id="agencies">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                        <div>
                            <h2 className="text-gray-900 text-2xl font-bold tracking-tight">Bu Hizmeti Veren En İyi Ajanslar</h2>
                            <p className="text-gray-500 text-sm mt-1">E-Ticaret SEO konusunda uzmanlaşmış seçkin ajanslar.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {agencies?.map((agency) => (
                            <article key={agency.id} className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/40 transition-all duration-300 group">
                                <div className="p-5 flex flex-col gap-4 flex-1">
                                    <div className="flex justify-between items-start">
                                        <div className="w-16 h-16 rounded-lg bg-gray-50 border border-gray-200 p-2 flex items-center justify-center overflow-hidden">
                                            <img src={agency.logo_url} alt={agency.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex flex-col items-end">
                                            {agency.is_verified && (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                                                    <CheckCircle2 className="size-3" /> Onaylı
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">{agency.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`size - 4 ${i < Math.floor(agency.rating) ? 'fill-current' : 'text-gray-300'} `} />
                                                ))}
                                            </div>
                                            <span className="text-sm font-semibold text-gray-900">{agency.rating}</span>
                                            <span className="text-xs text-gray-500">({agency.review_count} Yorum)</span>
                                        </div>
                                        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                                            <MapPin className="size-3" />
                                            {agency.location}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 line-clamp-3">
                                        {agency.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-auto pt-2">
                                        {agency.tags?.slice(0, 3).map((tag: string) => (
                                            <span key={tag} className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded border border-gray-200">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-4 border-t border-gray-200 bg-gray-50/50 flex gap-3">
                                    <button className="flex-1 h-10 rounded-lg bg-white border border-gray-200 text-gray-900 text-sm font-semibold hover:bg-gray-50 hover:text-primary hover:border-primary transition-colors">Profili İncele</button>
                                    <button className="flex-1 h-10 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors shadow-sm">Teklif Al</button>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Dynamic Bottom Content */}
                {content && (
                    <section className="py-8">
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 prose prose-lg prose-headings:font-bold prose-headings:text-primary prose-a:text-accent-green hover:prose-a:text-emerald-700 max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}

