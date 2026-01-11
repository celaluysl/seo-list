import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { updateAgency } from '../actions'
import AgencyForm from '@/components/admin/AgencyForm'

export default async function EditAgencyPage({ params }: { params: { id: string } }) {
    const { id } = await params
    const supabase = await createClient()
    const { data: agency } = await supabase.from('agencies').select('*').eq('id', id).single()

    if (!agency) {
        notFound()
    }

    const updateAgencyWithId = updateAgency.bind(null, id)

    const { data: services } = await supabase.from('services').select('title, slug, icon, short_description')

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/agencies" className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                    <ArrowLeft className="size-5" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Ajansı Düzenle: {agency.name}</h1>
            </div>

            <AgencyForm agency={agency} action={updateAgencyWithId} availableServices={services || []} />
        </div>
    )
}
