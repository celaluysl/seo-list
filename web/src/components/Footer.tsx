import Link from 'next/link'
import { Search, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-background-dark pt-20 pb-10 border-t border-gray-800 text-gray-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="size-8 rounded bg-gradient-to-br from-accent-green to-emerald-600 flex items-center justify-center text-white">
                                <Search className="size-4" />
                            </div>
                            <span className="text-white text-xl font-bold tracking-tight">
                                SEO Dizini
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm mb-8 max-w-sm leading-relaxed">
                            Türkiye'nin en kapsamlı ve güvenilir SEO ajansı dizini. İşletmeleri,
                            büyümelerini hızlandıracak doğru uzmanlarla buluşturuyoruz.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                href="#"
                                className="text-gray-500 hover:text-white transition-colors p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
                            >
                                <span className="sr-only">Twitter</span>
                                <Twitter className="size-5" />
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-500 hover:text-white transition-colors p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
                            >
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="size-5" />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-6">Keşfet</h3>
                        <ul className="space-y-4">
                            {['Tüm Ajanslar', 'En İyi Puan Alanlar', 'Yeni Eklenenler', 'Lokasyonlar'].map(
                                (item) => (
                                    <li key={item}>
                                        <Link
                                            href="#"
                                            className="text-gray-500 hover:text-accent-green text-sm transition-colors"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-6">Hizmetler</h3>
                        <ul className="space-y-4">
                            {['Yerel SEO', 'E-ticaret SEO', 'Teknik SEO', 'Link İnşası'].map(
                                (item) => (
                                    <li key={item}>
                                        <Link
                                            href="#"
                                            className="text-gray-500 hover:text-accent-green text-sm transition-colors"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-6">Kurumsal</h3>
                        <ul className="space-y-4">
                            {['Hakkımızda', 'Ajans Kaydı', 'Gizlilik', 'İletişim'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href="#"
                                        className="text-gray-500 hover:text-accent-green text-sm transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-600 text-sm">
                        © 2024 SEO Ajansı Dizini. Tüm hakları saklıdır.
                    </p>
                </div>
            </div>
        </footer>
    )
}
