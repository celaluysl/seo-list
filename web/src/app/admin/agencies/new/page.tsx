import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createAgency } from '../actions'
import AgencyForm from '@/components/admin/AgencyForm'

import { createClient } from '@/utils/supabase/server'

export default async function NewAgencyPage() {
    const supabase = await createClient()
    const { data: services } = await supabase.from('services').select('title, slug, icon, short_description')

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/agencies" className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                    <ArrowLeft className="size-5" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Yeni Ajans Ekle</h1>
            </div>

            <AgencyForm action={createAgency} availableServices={services || []} />
        </div>
    )
}
