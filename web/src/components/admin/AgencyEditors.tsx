'use client'

import { Plus, Trash2, GripVertical } from 'lucide-react'
import { useState, useEffect } from 'react'

// --- Types ---
interface Stats {
    years_exp?: number
    happy_clients?: number
    traffic_increase?: string
}

interface ContactInfo {
    address?: string
    phone?: string
    email?: string
    map_embed_url?: string
}

interface Service {
    icon: string
    title: string
    description: string
}

interface CaseStudy {
    title: string
    category: string
    image_url: string
    stats: { label: string, value: string, trend?: 'up' | 'down' }[]
}

interface Award {
    icon: string
    title: string
    organization: string
}

interface Review {
    author: string
    role: string
    rating: number
    text: string
    avatar_url?: string
    is_verified?: boolean
}

interface FAQ {
    question: string
    answer: string
}

// --- Editors ---

export function StatsEditor({ value, onChange }: { value: Stats, onChange: (val: Stats) => void }) {
    const handleChange = (field: keyof Stats, val: any) => {
        onChange({ ...value, [field]: val })
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-slate-50">
            <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Sektör Deneyimi (Yıl)</label>
                <input
                    type="number"
                    value={value?.years_exp || ''}
                    onChange={e => handleChange('years_exp', parseInt(e.target.value) || 0)}
                    className="w-full p-2 text-sm border rounded bg-white text-gray-900"
                />
            </div>
            <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Mutlu Müşteri</label>
                <input
                    type="number"
                    value={value?.happy_clients || ''}
                    onChange={e => handleChange('happy_clients', parseInt(e.target.value) || 0)}
                    className="w-full p-2 text-sm border rounded bg-white text-gray-900"
                />
            </div>
            <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Trafik Artışı (örn. %400)</label>
                <input
                    type="text"
                    value={value?.traffic_increase || ''}
                    onChange={e => handleChange('traffic_increase', e.target.value)}
                    className="w-full p-2 text-sm border rounded bg-white text-gray-900"
                />
            </div>
        </div>
    )
}

export function ContactEditor({ value, onChange }: { value: ContactInfo, onChange: (val: ContactInfo) => void }) {
    const handleChange = (field: keyof ContactInfo, val: string) => {
        onChange({ ...value, [field]: val })
    }

    return (
        <div className="grid grid-cols-1 gap-4 p-4 border rounded-lg bg-slate-50">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Telefon</label>
                    <input type="text" value={value?.phone || ''} onChange={e => handleChange('phone', e.target.value)} className="w-full p-2 text-sm border rounded bg-white text-gray-900" placeholder="+90 ..." />
                </div>
                <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">E-posta</label>
                    <input type="text" value={value?.email || ''} onChange={e => handleChange('email', e.target.value)} className="w-full p-2 text-sm border rounded bg-white text-gray-900" placeholder="info@..." />
                </div>
            </div>
            <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Adres</label>
                <input type="text" value={value?.address || ''} onChange={e => handleChange('address', e.target.value)} className="w-full p-2 text-sm border rounded bg-white text-gray-900" />
            </div>
            <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Google Haritalar Embed URL (iframe src)</label>
                <input type="text" value={value?.map_embed_url || ''} onChange={e => handleChange('map_embed_url', e.target.value)} className="w-full p-2 text-sm border rounded bg-white text-gray-900" placeholder="https://www.google.com/maps/embed?..." />
            </div>
        </div>
    )
}

import { SERVICE_CONFIG } from '@/config/services'

export function ServicesEditor({ value, onChange, availableServices = [] }: { value: Service[], onChange: (val: Service[]) => void, availableServices?: any[] }) {
    const [selectedServiceSlug, setSelectedServiceSlug] = useState('')

    // Merge DB services with Config services to ensure we have the full list
    // Priority: Config (since it powers the menu) -> DB
    const systemServices = [
        ...Object.entries(SERVICE_CONFIG).map(([slug, data]) => ({
            slug,
            title: data.title,
            description: data.description,
            icon: data.icon || 'code',
            // Config doesn't have seo_description usually, but description serves well
            short_description: data.description
        })),
        ...availableServices.filter(s => !Object.keys(SERVICE_CONFIG).includes(s.slug))
    ]

    const addService = (serviceData?: Service) => {
        if (serviceData) {
            // Add selected system service
            onChange([...value, serviceData])
            setSelectedServiceSlug('') // Reset selection
        } else {
            // Add blank custom service
            onChange([...value, { icon: 'code', title: '', description: '' }])
        }
    }

    const handleAddSystemService = () => {
        if (!selectedServiceSlug) return
        const service = systemServices.find(s => s.slug === selectedServiceSlug)
        if (service) {
            addService({
                icon: service.icon || 'code',
                title: service.title,
                description: service.short_description || service.description || ''
            })
        }
    }

    const removeService = (idx: number) => onChange(value.filter((_, i) => i !== idx))

    const updateService = (idx: number, field: keyof Service, val: string) => {
        const newValue = [...value]
        newValue[idx] = { ...newValue[idx], [field]: val }
        onChange(newValue)
    }

    return (
        <div className="space-y-4">
            {/* Toolbar for Adding Services */}
            <div className="flex gap-2 items-center bg-gray-50 p-3 rounded-lg border border-dashed border-gray-300">
                <select
                    value={selectedServiceSlug}
                    onChange={e => setSelectedServiceSlug(e.target.value)}
                    className="flex-1 p-2 text-sm border rounded bg-white text-gray-900"
                >
                    <option value="">Sistemden Hizmet Seç...</option>
                    {systemServices.map((s) => (
                        <option key={s.slug} value={s.slug}>{s.title}</option>
                    ))}
                </select>
                <button
                    type="button"
                    onClick={handleAddSystemService}
                    disabled={!selectedServiceSlug}
                    className="bg-primary text-white px-3 py-2 rounded text-sm font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Ekle
                </button>
                <div className="w-px h-6 bg-gray-300 mx-2"></div>
                <button
                    type="button"
                    onClick={() => addService()}
                    className="text-primary text-sm font-medium hover:bg-white px-3 py-2 rounded transition-colors"
                >
                    + Özel Hizmet
                </button>
            </div>

            {/* List of Added Services */}
            <div className="space-y-3">
                {value.map((service, idx) => (
                    <div key={idx} className="flex gap-3 p-3 bg-white border rounded-lg items-start relative group shadow-sm">
                        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button type="button" onClick={() => removeService(idx)} className="text-red-400 hover:text-red-600"><Trash2 className="size-4" /></button>
                        </div>
                        <div className="space-y-2 flex-1">
                            <div className="flex gap-2">
                                <select value={service.icon} onChange={e => updateService(idx, 'icon', e.target.value)} className="p-2 text-sm border rounded bg-gray-50 text-gray-900 w-32">
                                    <option value="code">Code (Mavi)</option>
                                    <option value="edit_note">Edit (Mor)</option>
                                    <option value="link">Link (Yeşil)</option>
                                    <option value="storefront">Store (Turuncu)</option>
                                    <option value="map">Map (Kırmızı)</option>
                                    <option value="analytics">Analytics (Turkuaz)</option>
                                    <option value="search">Search (Yeşil)</option>
                                    <option value="settings">Settings (Gri)</option>
                                </select>
                                <input
                                    type="text"
                                    value={service.title}
                                    onChange={e => updateService(idx, 'title', e.target.value)}
                                    className="flex-1 p-2 text-sm border rounded bg-gray-50 text-gray-900 font-medium"
                                    placeholder="Hizmet Başlığı"
                                />
                            </div>
                            <input
                                type="text"
                                value={service.description}
                                onChange={e => updateService(idx, 'description', e.target.value)}
                                className="w-full p-2 text-sm border rounded bg-gray-50 text-gray-900"
                                placeholder="Kısa Açıklama"
                            />
                        </div>
                    </div>
                ))}
            </div>
            {value.length === 0 && (
                <div className="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-lg">
                    Henüz hizmet eklenmedi. Yukarıdan seçerek ekleyebilirsiniz.
                </div>
            )}
        </div>
    )
}

export function CaseStudiesEditor({ value, onChange }: { value: CaseStudy[], onChange: (val: CaseStudy[]) => void }) {
    const add = () => onChange([...value, { title: '', category: '', image_url: '', stats: [] }])
    const remove = (idx: number) => onChange(value.filter((_, i) => i !== idx))
    const update = (idx: number, field: keyof CaseStudy, val: any) => {
        const newValue = [...value]
        newValue[idx] = { ...newValue[idx], [field]: val }
        onChange(newValue)
    }

    // Simplified stats edit for now: just comma separated label:value
    const getStatsString = (stats: any[]) => stats?.map(s => `${s.label}:${s.value}`).join(', ') || ''
    const setStatsFromString = (idx: number, str: string) => {
        const newStats = str.split(',').map(s => {
            const [label, val] = s.split(':')
            return { label: label?.trim(), value: val?.trim(), trend: 'up' }
        }).filter(s => s.label && s.value)
        update(idx, 'stats', newStats)
    }

    return (
        <div className="space-y-4">
            {value.map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border rounded-lg relative group space-y-3">
                    <button type="button" onClick={() => remove(idx)} className="absolute right-2 top-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="size-4" /></button>
                    <div className="grid grid-cols-2 gap-3">
                        <input type="text" value={item.title} onChange={e => update(idx, 'title', e.target.value)} className="p-2 text-sm border rounded bg-white text-gray-900" placeholder="Başlık" />
                        <input type="text" value={item.category} onChange={e => update(idx, 'category', e.target.value)} className="p-2 text-sm border rounded bg-white text-gray-900" placeholder="Kategori (örn. SaaS)" />
                    </div>
                    <input type="text" value={item.image_url} onChange={e => update(idx, 'image_url', e.target.value)} className="w-full p-2 text-sm border rounded bg-white text-gray-900" placeholder="Resim URL" />
                    <div>
                        <input
                            type="text"
                            defaultValue={getStatsString(item.stats)}
                            onBlur={e => setStatsFromString(idx, e.target.value)}
                            className="w-full p-2 text-sm border rounded bg-white text-gray-900"
                            placeholder="İstatistikler (örn. Trafik:+%200, Lead:5x)"
                        />
                        <p className="text-[10px] text-gray-400 mt-1">Format: Etiket:Değer, Etiket2:Değer2</p>
                    </div>
                </div>
            ))}
            <button type="button" onClick={add} className="text-xs flex items-center gap-1 text-primary font-medium hover:underline p-1">
                <Plus className="size-3" /> Vaka Analizi Ekle
            </button>
        </div>
    )
}

export function SimpleListEditor({ value, onChange, type }: { value: any[], onChange: (val: any[]) => void, type: 'awards' | 'reviews' | 'faq' }) {
    const add = () => {
        if (type === 'awards') onChange([...value, { icon: 'trophy', title: '', organization: '' }])
        if (type === 'reviews') onChange([...value, { author: '', role: '', rating: 5, text: '', is_verified: true }])
        if (type === 'faq') onChange([...value, { question: '', answer: '' }])
    }
    const remove = (idx: number) => onChange(value.filter((_, i) => i !== idx))
    const update = (idx: number, field: string, val: any) => {
        const newValue = [...value]
        newValue[idx] = { ...newValue[idx], [field]: val }
        onChange(newValue)
    }

    return (
        <div className="space-y-3">
            {value.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border rounded-lg relative group space-y-2">
                    <button type="button" onClick={() => remove(idx)} className="absolute right-2 top-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="size-4" /></button>

                    {type === 'awards' && (
                        <>
                            <input type="text" value={item.title} onChange={e => update(idx, 'title', e.target.value)} className="w-full p-2 text-sm border rounded bg-white text-gray-900" placeholder="Ödül Başlığı" />
                            <input type="text" value={item.organization} onChange={e => update(idx, 'organization', e.target.value)} className="w-full p-2 text-sm border rounded bg-white text-gray-900" placeholder="Veren Kurum" />
                        </>
                    )}

                    {type === 'reviews' && (
                        <>
                            <div className="grid grid-cols-2 gap-2">
                                <input type="text" value={item.author} onChange={e => update(idx, 'author', e.target.value)} className="p-2 text-sm border rounded bg-white text-gray-900" placeholder="İsim" />
                                <input type="text" value={item.role} onChange={e => update(idx, 'role', e.target.value)} className="p-2 text-sm border rounded bg-white text-gray-900" placeholder="Unvan" />
                            </div>
                            <textarea value={item.text} onChange={e => update(idx, 'text', e.target.value)} className="w-full p-2 text-sm border rounded bg-white text-gray-900" placeholder="Yorum metni" rows={2}></textarea>
                            <div className="flex items-center gap-2 text-xs">
                                <input type="number" value={item.rating} max={5} min={1} onChange={e => update(idx, 'rating', parseInt(e.target.value))} className="w-12 p-1 border rounded bg-white text-gray-900" />
                                <span>Puan</span>
                            </div>
                        </>
                    )}

                    {type === 'faq' && (
                        <>
                            <input type="text" value={item.question} onChange={e => update(idx, 'question', e.target.value)} className="w-full p-2 text-sm border rounded bg-white text-gray-900 font-medium" placeholder="Soru" />
                            <textarea value={item.answer} onChange={e => update(idx, 'answer', e.target.value)} className="w-full p-2 text-sm border rounded bg-white text-gray-900" placeholder="Cevap" rows={2}></textarea>
                        </>
                    )}
                </div>
            ))}
            <button type="button" onClick={add} className="text-xs flex items-center gap-1 text-primary font-medium hover:underline p-1">
                <Plus className="size-3" /> Ekle
            </button>
        </div>
    )
}
