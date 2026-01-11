import Link from 'next/link'
import { Star, MapPin, CheckCircle2, ArrowRight } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'

export default async function FeaturedAgencies() {
    const supabase = await createClient()
    const { data: agencies } = await supabase
        .from('agencies')
        .select('*')
        .eq('is_verified', true) // Only show verified/featured agencies
        .order('rating', { ascending: false })
        .limit(3) // Show top 3

    if (!agencies || agencies.length === 0) {
        return null;
    }

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
                            Öne Çıkan Ajanslar
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl">
                            Başarıları kanıtlanmış, müşteri memnuniyeti yüksek ve sektörde öncü
                            dijital pazarlama ajansları.
                        </p>
                    </div>
                    <Link
                        href="/hizmetler"
                        className="group flex items-center font-bold text-primary hover:text-accent-green transition-colors"
                    >
                        Tüm Ajansları Gör
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {agencies.map((agency) => (
                        <article
                            key={agency.id}
                            className="flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 hover:border-primary/20 transition-all duration-300 group"
                        >
                            <div className="p-6 flex flex-col gap-6 flex-1">
                                <div className="flex justify-between items-start">
                                    <div className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 p-2 flex items-center justify-center overflow-hidden">
                                        <img src={agency.logo_url} alt={agency.name} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        {/* Dynamic Badge if we had it, or just Verified */}
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700">
                                            <CheckCircle2 className="size-3.5" />
                                            Onaylı
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <Link href={`/ajans/${agency.slug}`} className="block">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                                            {agency.name}
                                        </h3>
                                    </Link>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`size-5 ${i < Math.floor(agency.rating) ? 'fill-current' : 'text-gray-300'}`} />
                                            ))}
                                        </div>
                                        <span className="font-bold text-gray-900">{agency.rating}</span>
                                        <span className="text-sm text-gray-500">({agency.review_count} Yorum)</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                                        <MapPin className="size-4 text-gray-400" />
                                        {agency.location}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {agency.tags?.slice(0, 3).map((tag: string) => (
                                        <span key={tag} className="px-3 py-1.5 bg-background-offset text-gray-600 text-xs font-medium rounded-lg">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex gap-4">
                                <Link href={`/ajans/${agency.slug}`} className="flex-1">
                                    <button className="w-full h-12 rounded-xl bg-white border border-gray-200 text-gray-900 font-bold hover:border-primary hover:text-primary transition-colors">
                                        İncele
                                    </button>
                                </Link>
                                <button className="flex-1 h-12 rounded-xl bg-primary text-white font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-primary/20">
                                    Teklif Al
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
