'use client'

import { Info, Save } from 'lucide-react'
import { useState } from 'react'
import { StatsEditor, ContactEditor, ServicesEditor, CaseStudiesEditor, SimpleListEditor } from './AgencyEditors'

interface AgencyFormProps {
    agency?: any
    action: (formData: FormData) => Promise<void>
    availableServices?: any[]
}

export default function AgencyForm({ agency, action, availableServices = [] }: AgencyFormProps) {
    // Local state for complex JSON fields
    const [stats, setStats] = useState(agency?.stats || {})
    const [contactInfo, setContactInfo] = useState(agency?.contact_info || {})
    const [services, setServices] = useState(agency?.services_offered || [])
    const [caseStudies, setCaseStudies] = useState(agency?.case_studies || [])
    const [awards, setAwards] = useState(agency?.awards || [])
    const [reviews, setReviews] = useState(agency?.reviews_data || [])
    const [faq, setFaq] = useState(agency?.faq || [])

    return (
        <form action={action} className="space-y-8">
            {/* Hidden inputs to pass JSON data to Server Action */}
            <input type="hidden" name="stats" value={JSON.stringify(stats)} />
            <input type="hidden" name="contact_info" value={JSON.stringify(contactInfo)} />
            <input type="hidden" name="services_offered" value={JSON.stringify(services)} />
            <input type="hidden" name="case_studies" value={JSON.stringify(caseStudies)} />
            <input type="hidden" name="awards" value={JSON.stringify(awards)} />
            <input type="hidden" name="reviews_data" value={JSON.stringify(reviews)} />
            <input type="hidden" name="faq" value={JSON.stringify(faq)} />

            {/* Basic Info */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Temel Bilgiler</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Ajans Adı</label>
                        <input type="text" name="name" defaultValue={agency?.name} required className="input-field text-gray-900" />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Slug (URL)</label>
                        <input type="text" name="slug" defaultValue={agency?.slug} required className="input-field text-gray-900" />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Logo URL</label>
                        <input type="text" name="logo_url" defaultValue={agency?.logo_url} className="input-field text-gray-900" />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Kapak Resmi URL</label>
                        <input type="text" name="cover_image_url" defaultValue={agency?.cover_image_url} className="input-field text-gray-900" />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Web Sitesi</label>
                        <input type="text" name="website_url" defaultValue={agency?.website_url} className="input-field text-gray-900" />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Konum</label>
                        <input type="text" name="location" defaultValue={agency?.location} className="input-field text-gray-900" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Hakkında (Açıklama)</label>
                    <textarea name="description" rows={4} defaultValue={agency?.description} className="input-field text-gray-900"></textarea>
                </div>
            </div>

            {/* Details */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Detaylar & Filtreler</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Kuruluş Yılı</label>
                        <input type="number" name="founded_year" defaultValue={agency?.founded_year} className="input-field text-gray-900" />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Çalışan Sayısı</label>
                        <input type="text" name="employee_count" defaultValue={agency?.employee_count} placeholder="örn. 10-50" className="input-field text-gray-900" />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Min. Bütçe</label>
                        <input type="text" name="min_budget" defaultValue={agency?.min_budget} placeholder="örn. ₺50.000+" className="input-field text-gray-900" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" name="is_verified" id="is_verified" defaultChecked={agency?.is_verified} className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" />
                    <label htmlFor="is_verified" className="text-sm font-medium text-gray-700">Onaylı Ajans (Verified)</label>
                </div>
            </div>

            {/* Rich Data Editors */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                        <h2 className="text-lg font-semibold text-gray-900">İstatistikler & İletişim</h2>
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">İstatistikler</label>
                            <StatsEditor value={stats} onChange={setStats} />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">İletişim Bilgileri</label>
                            <ContactEditor value={contactInfo} onChange={setContactInfo} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Hizmetler</h2>
                        <Info className="size-4 text-gray-400" title="Ajansın sunduğu hizmetler ve açıklamaları" />
                    </div>
                    <ServicesEditor value={services} onChange={setServices} availableServices={availableServices} />
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6 lg:col-span-2">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Vaka Analizleri (Case Studies)</h2>
                    </div>
                    <CaseStudiesEditor value={caseStudies} onChange={setCaseStudies} />
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Ödüller</h2>
                    </div>
                    <SimpleListEditor type="awards" value={awards} onChange={setAwards} />
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Müşteri Yorumları</h2>
                    </div>
                    <SimpleListEditor type="reviews" value={reviews} onChange={setReviews} />
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6 lg:col-span-2">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Sıkça Sorulan Sorular (SSS)</h2>
                    </div>
                    <SimpleListEditor type="faq" value={faq} onChange={setFaq} />
                </div>
            </div>

            <div className="flex justify-end pt-4 sticky bottom-4 z-20">
                <button type="submit" className="flex items-center gap-2 bg-primary hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-primary/20">
                    <Save className="size-5" />
                    {agency ? 'Değişiklikleri Kaydet' : 'Ajansı Oluştur'}
                </button>
            </div>

            <style jsx global>{`
                .input-field {
                    width: 100%;
                    padding: 0.5rem 1rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.5rem;
                    outline: none;
                    transition: all 0.2s;
                    background-color: white;
                }
                .input-field:focus {
                    border-color: #0f1729;
                    box-shadow: 0 0 0 2px rgba(15, 23, 41, 0.1);
                }
            `}</style>
        </form>
    )
}
