import Link from 'next/link'
import { TrendingUp, ShoppingBag, Gauge, Star, MapPin, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'

interface RichServiceTemplateProps {
    title: string;
    description: string;
    slug: string;
    heroImage?: string;
    tags?: string[]; // Tags to filter agencies by
    bottomContent?: string | null;
}

export default async function RichServiceTemplate({ title, description, slug, heroImage, tags, bottomContent }: RichServiceTemplateProps) {
    const supabase = await createClient()

    // Fetch agencies that have tags matching the service title or related keywords
    // Since we use array columns for tags in Supabase, we can use the 'cs' (contains) filter or text search
    // For simplicity, let's just fetch all verified agencies for now, or filter if we can.
    // Ideally: .contains('tags', [title]) 

    let query = supabase.from('agencies').select('*').order('rating', { ascending: false })

    // Simple keyword matching for demo
    const { data: agencies } = await query

    // Client-side filtering or exact match if needed, but for now show top agencies
    const filteredAgencies = agencies?.filter(a => {
        if (!tags) return true;
        // If agency has any of the tags relevant to this service
        return a.tags?.some((t: string) => tags.includes(t)) || true // Default true for demo to show content
    }) || []


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
                            <span className="text-gray-900 font-medium">{title}</span>
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
                                    🚀 İşletmenizi Büyütün
                                </span>
                                <h1 className="text-gray-900 text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                                    {title}
                                </h1>
                                <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
                                    {description}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <a className="flex items-center justify-center rounded-lg h-12 px-6 bg-primary hover:bg-slate-800 text-white text-base font-bold shadow-md transition-all hover:shadow-lg" href="#agencies">
                                    Uzman Ajansları İncele
                                </a>
                            </div>
                        </div>
                        {/* Image */}
                        <div className="lg:w-1/2 min-h-[300px] lg:min-h-full relative bg-gray-50">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url("${heroImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXY7dpwKZVtWRIzxxot9bVh4KyzWHKHpGiHWYPlo4nIivE8K80sV2B1b-VvcLC5V-KKQRZw7rCQVN_3N-60NydvwOjAU70-U0cUOsydY2F8veymL_EwXDsZ-T659zyLfE-d89TkwSEqngS-pcd9LvNzd-IjFbSyPrt5tnaEstPu_g9B1DOhPTgIvQeuSF3eOvhoht4-yWMDilQYKX4RqhwO2vf7dDnkGd565t6HNPO0CIo25Z0X6vb1hxXADRKA8FwPg5hhPflILI'}")` }}
                            ></div>
                        </div>
                    </div>
                </section>

                {/* Agencies Listing Section */}
                <section className="flex flex-col gap-6 pt-4" id="agencies">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                        <div>
                            <h2 className="text-gray-900 text-2xl font-bold tracking-tight">Bu Hizmeti Veren En İyi Ajanslar</h2>
                            <p className="text-gray-500 text-sm mt-1">{title} konusunda uzmanlaşmış seçkin ajanslar.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAgencies.length > 0 ? (
                            filteredAgencies.map((agency) => (
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
                                            <Link href={`/ajans/${agency.slug}`} className="block">
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">{agency.name}</h3>
                                            </Link>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="flex text-yellow-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`size-4 ${i < Math.floor(agency.rating) ? 'fill-current' : 'text-gray-300'}`} />
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
                                        <Link href={`/ajans/${agency.slug}`} className="flex-1">
                                            <button className="w-full h-10 rounded-lg bg-white border border-gray-200 text-gray-900 text-sm font-semibold hover:bg-gray-50 hover:text-primary hover:border-primary transition-colors">Profili İncele</button>
                                        </Link>
                                        <button className="flex-1 h-10 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors shadow-sm">Teklif Al</button>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-12 text-gray-500">
                                Bu alanda hizmet veren ajans bulunamadı.
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}
