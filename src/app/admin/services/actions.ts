'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateService(id: string, formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const description = formData.get('description') as string
    const seo_title = formData.get('seo_title') as string
    const seo_description = formData.get('seo_description') as string

    const { error } = await supabase
        .from('services')
        .update({
            title,
            content,
            description,
            seo_title,
            seo_description,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)

    if (error) {
        console.error('Error updating service:', error)
        // For now we don't return the error to the client to keep it simple for generic form action
        return
    }

    // Find slug to revalidate
    const { data: service } = await supabase.from('services').select('slug').eq('id', id).single()

    if (service) {
        revalidatePath(`/hizmetler/${service.slug}`)
    }
    revalidatePath('/admin/services')
    redirect('/admin/services')
}
