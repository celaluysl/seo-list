import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = await params
    const supabase = await createClient()

    const { data: post } = await supabase
        .from('posts')
        .select('seo_title, seo_description, title')
        .eq('slug', slug)
        .single()

    if (!post) {
        return {
            title: 'İçerik Bulunamadı',
        }
    }

    return {
        title: post.seo_title || `${post.title} - SEO Dizini Blog`,
        description: post.seo_description || `${post.title} başlıklı yazımızı inceleyin.`,
    }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const { slug } = await params
    const supabase = await createClient()
    const { data: post } = await supabase
        .from('posts')
        .select('*, author:profiles(full_name, avatar_url)')
        .eq('slug', slug)
        .single()

    const displayPost = post || {
        title: 'Örnek Blog Yazısı Başlığı',
        published_at: new Date().toISOString(),
        author: { full_name: 'Editör', avatar_url: null },
        image_url: null,
        content: `
        <p>Lütfen veritabanına gerçek içerik ekleyin veya Supabase bağlantısını kontrol edin.</p>
        <p>Bu alan <strong>zengin metin editörü</strong> ile oluşturulan içeriği gösterecek.</p>
        <h2>Alt Başlık Örneği</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      `
    }

    if (!post && !['2025-seo-trendleri', 'e-ticaret-teknik-seo', 'yerel-seo-rehberi'].includes(slug)) {
        // notFound()
    }

    return (
        <div className="bg-white min-h-screen pb-24">
            {/* Banner / Header */}
            <div className="bg-primary/5 border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <Link href="/blog" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-primary mb-8 transition-colors">
                        <ArrowLeft className="size-4 mr-2" />
                        Blog'a Dön
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-black text-primary mb-8 leading-tight">{displayPost.title}</h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-t border-gray-200 pt-8">
                        <div className="flex items-center gap-2">
                            <div className="size-10 rounded-full bg-gray-200 overflow-hidden">
                                {displayPost.author?.avatar_url ? (
                                    <img src={displayPost.author.avatar_url} alt={displayPost.author.full_name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-primary text-white font-bold">
                                        {displayPost.author?.full_name?.charAt(0) || 'E'}
                                    </div>
                                )}
                            </div>
                            <span className="font-bold text-gray-900">{displayPost.author?.full_name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="size-4" />
                            {new Date(displayPost.published_at!).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <button className="ml-auto flex items-center gap-1.5 text-accent-green font-bold hover:text-accent-green-hover transition-colors">
                            <Share2 className="size-4" />
                            Paylaş
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {displayPost.image_url && (
                    <div className="rounded-2xl overflow-hidden mb-12 shadow-xl">
                        <img src={displayPost.image_url} alt={displayPost.title} className="w-full h-auto" />
                    </div>
                )}

                <article className="prose prose-lg prose-headings:font-bold prose-headings:text-primary prose-p:text-gray-600 prose-a:text-accent-green hover:prose-a:text-emerald-700 max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: displayPost.content || '' }} />
                </article>
            </div>
        </div>
    )
}
