'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Helper to parse form data
const parseAgencyFormData = (formData: FormData) => {
    let stats, contact_info, services_offered, case_studies, awards, reviews_data, faq
    try {
        stats = JSON.parse(formData.get('stats') as string || '{}')
        contact_info = JSON.parse(formData.get('contact_info') as string || '{}')
        services_offered = JSON.parse(formData.get('services_offered') as string || '[]')
        case_studies = JSON.parse(formData.get('case_studies') as string || '[]')
        awards = JSON.parse(formData.get('awards') as string || '[]')
        reviews_data = JSON.parse(formData.get('reviews_data') as string || '[]')
        faq = JSON.parse(formData.get('faq') as string || '[]')
    } catch (e) {
        console.error('JSON Parse Error', e)
        throw new Error('Invalid JSON format')
    }

    return {
        name: formData.get('name') as string,
        slug: formData.get('slug') as string,
        description: formData.get('description') as string,
        location: formData.get('location') as string,
        logo_url: formData.get('logo_url') as string,
        cover_image_url: formData.get('cover_image_url') as string,
        website_url: formData.get('website_url') as string,
        employee_count: formData.get('employee_count') as string,
        min_budget: formData.get('min_budget') as string,
        founded_year: formData.get('founded_year') ? parseInt(formData.get('founded_year') as string) : null,
        is_verified: formData.get('is_verified') === 'on',
        stats,
        contact_info,
        services_offered,
        case_studies,
        awards,
        reviews_data,
        faq
    }
}

export async function createAgency(formData: FormData) {
    const supabase = await createClient()

    try {
        const agencyData = parseAgencyFormData(formData)
        const { error } = await supabase.from('agencies').insert(agencyData)
        if (error) {
            console.error('Error creating agency:', error)
            return
        }
    } catch (e) {
        console.error('Error in create action:', e)
        return
    }

    revalidatePath('/admin/agencies')
    redirect('/admin/agencies')
}


export async function updateAgency(id: string, formData: FormData) {
    const supabase = await createClient()

    try {
        const agencyData = parseAgencyFormData(formData)
        const { error } = await supabase
            .from('agencies')
            .update({
                ...agencyData,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)

        if (error) {
            console.error('Error updating agency:', error)
            return
        }
    } catch (e) {
        console.error('Error in update action:', e)
        return
    }

    revalidatePath(`/ajans/${formData.get('slug')}`)
    revalidatePath('/admin/agencies')
    redirect('/admin/agencies')
}

export async function deleteAgency(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('agencies').delete().eq('id', id)

    if (error) {
        console.error('Error deleting agency:', error)
        return
    }

    revalidatePath('/admin/agencies')
}
