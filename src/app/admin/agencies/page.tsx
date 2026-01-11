import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { Plus, Edit, Eye, CheckCircle2, XCircle } from 'lucide-react'
import DeleteAgencyButton from '@/components/admin/DeleteAgencyButton'

export default async function AdminAgenciesPage() {
    const supabase = await createClient()
    const { data: agencies } = await supabase.from('agencies').select('*').order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Ajanslar</h1>
                <Link href="/admin/agencies/new" className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-colors">
                    <Plus className="size-4" />
                    Ajans Ekle
                </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-600 font-medium">
                        <tr>
                            <th className="px-6 py-4">Ajans Adı</th>
                            <th className="px-6 py-4">Konum</th>
                            <th className="px-6 py-4">Puan</th>
                            <th className="px-6 py-4">Durum</th>
                            <th className="px-6 py-4 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {agencies?.map((agency) => (
                            <tr key={agency.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
                                        <img src={agency.logo_url} alt="" className="w-full h-full object-contain" />
                                    </div>
                                    {agency.name}
                                </td>
                                <td className="px-6 py-4 text-gray-500">{agency.location}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold">{agency.rating}</span>
                                        <span className="text-gray-400">({agency.review_count})</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {agency.is_verified ? (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                                            <CheckCircle2 className="size-3" /> Onaylı
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                            <XCircle className="size-3" /> Onaysız
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/ajans/${agency.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-primary transition-colors">
                                            <Eye className="size-4" />
                                        </Link>
                                        <Link href={`/admin/agencies/${agency.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                            <Edit className="size-4" />
                                        </Link>
                                        <DeleteAgencyButton id={agency.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {agencies?.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    Henüz kayıtlı ajans bulunmuyor.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
