import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { Calendar, User, ArrowRight, Image as ImageIcon } from 'lucide-react'

export const metadata = {
    title: 'Blog - SEO ve Dijital Pazarlama İçgörüleri',
    description: 'En güncel SEO stratejileri, algoritma güncellemeleri ve dijital pazarlama trendleri hakkında uzman makaleleri.',
}

export default async function BlogPage() {
    const supabase = await createClient()
    const { data: posts } = await supabase
        .from('posts')
        .select('*, author:profiles(full_name, avatar_url)')
        .eq('is_published', true)
        .order('published_at', { ascending: false })

    // Fallback for demo
    const displayPosts = posts?.length
        ? posts
        : [
            {
                id: '1',
                title: '2025 SEO Trendleri: Neler Değişiyor?',
                slug: '2025-seo-trendleri',
                excerpt: 'Yapay zeka arama sonuçları (SGE), kullanıcı deneyimi sinyalleri ve video SEO\'nun yükselişi hakkında kapsamlı bir rehber.',
                published_at: '2024-01-15T10:00:00Z',
                image_url: null,
                author: { full_name: 'Ahmet Yılmaz' }
            },
            {
                id: '2',
                title: 'E-ticaret Siteleri İçin Teknik SEO Checklist',
                slug: 'e-ticaret-teknik-seo',
                excerpt: 'Tarama bütçesi optimizasyonu, faceted navigation sorunları ve schema markup kullanımı ile satışlarınızı artırın.',
                published_at: '2024-01-10T14:30:00Z',
                image_url: null,
                author: { full_name: 'Zeynep Demir' }
            },
            {
                id: '3',
                title: 'Yerel SEO ile Mağaza Trafiğini Artırma',
                slug: 'yerel-seo-rehberi',
                excerpt: 'Google Business Profile optimizasyonu ve yerel alıntılarla (citations) bölgenizdeki müşterilere ulaşın.',
                published_at: '2024-01-05T09:15:00Z',
                image_url: null,
                author: { full_name: 'Mehmet Kaya' }
            },
        ]

    return (
        <div className="bg-background-offset min-h-screen py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-primary mb-6">
                        SEO Dünyasından Haberler
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Uzman ekibimiz ve partner ajanslarımızdan en güncel stratejiler ve analizler.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayPosts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group bg-white rounded-2xl border border-gray-200 hover:border-accent-green/50 hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-300 overflow-hidden flex flex-col h-full"
                        >
                            <div className="aspect-video bg-gray-100 relative overflow-hidden flex items-center justify-center">
                                {post.image_url ? (
                                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="flex flex-col items-center text-gray-300">
                                        <ImageIcon className="size-12 mb-2" />
                                        <span className="text-sm">Görsel Yok</span>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                                    BLOG
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-medium">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="size-3.5" />
                                        {new Date(post.published_at!).toLocaleDateString('tr-TR')}
                                    </span>
                                    {post.author && (
                                        <span className="flex items-center gap-1">
                                            <User className="size-3.5" />
                                            {post.author.full_name}
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h2>
                                <p className="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto flex items-center text-accent-green font-bold text-sm">
                                    Devamını Oku
                                    <ArrowRight className="ml-1 size-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
