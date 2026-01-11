import Link from 'next/link'
import { Search, ChevronDown, Map, ShoppingBag, Code, Edit3, Link2, Globe, ArrowRight } from 'lucide-react'
import { SERVICE_CONFIG } from '@/config/services'

// Icon mapping
const getIcon = (iconName?: string) => {
    switch (iconName) {
        case 'map': return <Map className="size-5 text-rose-600" />
        case 'storefront': return <ShoppingBag className="size-5 text-orange-600" />
        case 'code': return <Code className="size-5 text-blue-600" />
        case 'edit_note': return <Edit3 className="size-5 text-purple-600" />
        case 'link': return <Link2 className="size-5 text-emerald-600" />
        case 'language': return <Globe className="size-5 text-cyan-600" />
        default: return <Code className="size-5 text-gray-600" />
    }
}

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-slate-900/95 backdrop-blur-sm border-b border-white/10 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="size-10 rounded-xl bg-gradient-to-br from-accent-green to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-green-900/40 group-hover:shadow-green-900/60 transition-all">
                            <Search className="size-5" />
                        </div>
                        <span className="text-white text-xl font-bold tracking-tight">
                            SEO<span className="text-accent-green">Dizini</span>
                        </span>
                    </Link>

                    <nav className="hidden md:flex gap-8 items-center h-full">
                        {/* Services Mega Menu */}
                        <div className="relative group h-full flex items-center">
                            <button className="flex items-center gap-1.5 text-gray-300 hover:text-white text-sm font-medium transition-colors focus:outline-none py-2">
                                Hizmetler
                                <ChevronDown className="size-4 transition-transform group-hover:rotate-180 text-gray-500 group-hover:text-white" />
                            </button>

                            {/* Dropdown Content */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-[600px] z-50">
                                <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden ring-1 ring-black/5 p-6">
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                        <div className="col-span-2 pb-4 border-b border-gray-100 mb-2">
                                            <h3 className="text-gray-900 font-bold text-sm uppercase tracking-wider mb-1">Popüler Hizmetler</h3>
                                            <p className="text-gray-500 text-xs">İşletmenizi büyütmek için en çok tercih edilen SEO çözümleri.</p>
                                        </div>
                                        {Object.entries(SERVICE_CONFIG).map(([slug, service]) => (
                                            <Link key={slug} href={`/hizmetler/${slug}`} className="flex items-start gap-4 group/item hover:bg-slate-50 p-2 -m-2 rounded-lg transition-colors">
                                                <div className="mt-1 bg-slate-100 p-2 rounded-lg group-hover/item:bg-white border border-transparent group-hover/item:border-slate-200 transition-colors shadow-sm">
                                                    {getIcon(service.icon)}
                                                </div>
                                                <div>
                                                    <h4 className="text-gray-900 font-bold text-sm group-hover/item:text-primary transition-colors flex items-center gap-1">
                                                        {service.title}
                                                        <ArrowRight className="size-3 opacity-0 group-hover/item:opacity-100 transition-opacity -translate-x-2 group-hover/item:translate-x-0" />
                                                    </h4>
                                                    <p className="text-gray-500 text-xs mt-1 line-clamp-2 md:line-clamp-none leading-relaxed">
                                                        {service.description.substring(0, 60)}...
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-gray-100 bg-slate-50 -mx-6 -mb-6 px-6 py-4 flex justify-between items-center">
                                        <Link href="/hizmetler" className="text-sm font-semibold text-primary hover:text-blue-700 flex items-center gap-1">
                                            Tüm Hizmetleri Görüntüle <ArrowRight className="size-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/hizmetler"
                            className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
                        >
                            Ajans Bul
                        </Link>
                        <Link
                            href="/blog"
                            className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
                        >
                            Blog
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin"
                            className="hidden md:flex items-center justify-center h-10 px-5 text-sm font-medium text-white hover:text-gray-200 transition-colors"
                        >
                            Giriş Yap
                        </Link>
                        <button className="flex items-center justify-center h-10 px-5 bg-accent-green hover:bg-emerald-500 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-emerald-900/20">
                            Ajansımı Ekle
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
