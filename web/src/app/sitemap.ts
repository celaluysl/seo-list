import { MetadataRoute } from 'next'
import { createClient } from '@/utils/supabase/server'

// Update with your actual domain
const BASE_URL = 'https://seodizini.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const supabase = await createClient()

    // Get dynamic pages
    const { data: services } = await supabase.from('services').select('slug, updated_at')
    const { data: posts } = await supabase.from('posts').select('slug, updated_at').eq('is_published', true)

    const serviceUrls = (services || []).map((service) => ({
        url: `${BASE_URL}/hizmetler/${service.slug}`,
        lastModified: new Date(service.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    const postUrls = (posts || []).map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/hizmetler`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        ...serviceUrls,
        ...postUrls,
    ]
}
