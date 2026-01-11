import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { Plus, Edit, Eye } from 'lucide-react'

export default async function AdminServicesPage() {
    const supabase = await createClient()
    const { data: services } = await supabase.from('services').select('*').order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Hizmetler</h1>
                {/* We can implement Add Service later or now. For now, just listing for editing existing ones */}
                <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-colors opacity-50 cursor-not-allowed" title="Henüz aktif değil">
                    <Plus className="size-4" />
                    Hizmet Ekle
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-600 font-medium">
                        <tr>
                            <th className="px-6 py-4">Başlık</th>
                            <th className="px-6 py-4">Slug (URL)</th>
                            <th className="px-6 py-4">Durum</th>
                            <th className="px-6 py-4 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {services?.map((service) => (
                            <tr key={service.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{service.title}</td>
                                <td className="px-6 py-4 text-gray-500">{service.slug}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${service.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {service.is_active ? 'Aktif' : 'Pasif'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/hizmetler/${service.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-primary transition-colors">
                                            <Eye className="size-4" />
                                        </Link>
                                        <Link href={`/admin/services/${service.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                            <Edit className="size-4" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {services?.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                    Henüz kayıtlı hizmet bulunmuyor.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
