import { createClient } from '@/utils/supabase/server'
import type { Metadata } from 'next'
import RichServiceTemplate from '@/components/templates/RichServiceTemplate'
import EcommerceSeoTemplate from '@/components/templates/EcommerceSeoTemplate'

import { SERVICE_CONFIG } from '@/config/services'

// Generate Metadata dynamically
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = await params

    // Check config first
    if (SERVICE_CONFIG[slug]) {
        return {
            title: `${SERVICE_CONFIG[slug].title} Hizmetleri - En İyi Ajanslar`,
            description: SERVICE_CONFIG[slug].description
        }
    }

    if (slug === 'e-ticaret-seo') {
        return {
            title: 'E-Ticaret SEO Hizmetleri - Satışlarınızı Artırın',
            description: 'E-ticaret sitenizi büyütmek için profesyonel SEO hizmetleri ve ajansları.'
        }
    }

    // Fallback to DB
    const supabase = await createClient()
    const { data: service } = await supabase.from('services').select('seo_title, seo_description, title').eq('slug', slug).single()

    if (!service) return { title: 'Hizmet Bulunamadı' }

    return {
        title: service.seo_title || `${service.title} - SEO Hizmetleri`,
        description: service.seo_description || `${service.title} hizmeti hakkında detaylı bilgi.`,
    }
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = await params
    const supabase = await createClient()

    // Always fetch service data to get the dynamic content
    const { data: service } = await supabase
        .from('services')
        .select('*')
        .eq('slug', slug)
        .single()

    // 1. E-Commerce Special Design
    if (slug === 'e-ticaret-seo') {
        return <EcommerceSeoTemplate content={service?.content} />
    }

    // 2. Generic Rich Design for Configured Slugs
    if (SERVICE_CONFIG[slug]) {
        const config = SERVICE_CONFIG[slug]
        return <RichServiceTemplate
            slug={slug}
            title={config.title}
            description={config.description}
            tags={config.tags}
            bottomContent={service?.content}
        />
    }

    // 3. Fallback for Unknown Slugs (Try DB or 404)
    if (service) {
        // Even DB services can use the Rich Template if we map the data correctly
        return <RichServiceTemplate
            slug={slug}
            title={service.title}
            description={service.description || ''}
            tags={[service.title]}
            bottomContent={service.content}
        />
    }

    // 4. Default Not Found (or let RichTemplate handle empty)
    // For now, return generic template with slug as title to prevent 404 on demo
    return <RichServiceTemplate
        slug={slug}
        title={slug.replace(/-/g, ' ').toUpperCase()}
        description="Bu hizmet için detaylı bilgi hazırlanıyor."
        tags={[]}
    />
}
