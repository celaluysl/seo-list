import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { updateService } from '../actions'

export default async function EditServicePage({ params }: { params: { id: string } }) {
    const { id } = await params
    const supabase = await createClient()
    const { data: service } = await supabase.from('services').select('*').eq('id', id).single()

    if (!service) {
        notFound()
    }

    const updateServiceWithId = updateService.bind(null, id)

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/services" className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                    <ArrowLeft className="size-5" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Hizmeti Düzenle: {service.title}</h1>
            </div>

            <form action={updateServiceWithId} className="space-y-8 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Hizmet Başlığı</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            defaultValue={service.title}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Kısa Açıklama (Kartlar için)</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            defaultValue={service.description || ''}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Sayfa İçeriği (HTML / Rich Text)
                        <span className="ml-2 text-xs text-gray-500 font-normal">Sayfanın en altında görünecek alan. HTML etiketleri kullanabilirsiniz.</span>
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        defaultValue={service.content || ''}
                        rows={15}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-mono text-sm"
                        placeholder="<p>Buraya detaylı içerik girebilirsiniz...</p>"
                    ></textarea>
                </div>

                <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Ayarları</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="seo_title" className="block text-sm font-medium text-gray-700">SEO Başlığı (Title)</label>
                            <input
                                type="text"
                                id="seo_title"
                                name="seo_title"
                                defaultValue={service.seo_title || ''}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="seo_description" className="block text-sm font-medium text-gray-700">SEO Açıklaması (Description)</label>
                            <input
                                type="text"
                                id="seo_description"
                                name="seo_description"
                                defaultValue={service.seo_description || ''}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button type="submit" className="flex items-center gap-2 bg-primary hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
                        <Save className="size-4" />
                        Değişiklikleri Kaydet
                    </button>
                </div>
            </form>
        </div>
    )
}
