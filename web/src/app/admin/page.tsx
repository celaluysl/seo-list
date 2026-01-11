import { createClient } from '@/utils/supabase/server'

export default async function AdminDashboard() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Hoş Geldiniz, {user?.email}</h1>
            <p className="text-gray-600">
                Buradan web sitenizin içeriğini yönetebilir, blog yazılarını düzenleyebilir ve hizmetlerinizi güncelleyebilirsiniz.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h3 className="tex-lg font-bold text-blue-900 mb-2">Blog İstatistikleri</h3>
                    <p className="text-3xl font-black text-blue-600">0</p>
                    <p className="text-sm text-blue-400">Toplam Yazı</p>
                </div>
                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                    <h3 className="tex-lg font-bold text-emerald-900 mb-2">Hizmetler</h3>
                    <p className="text-3xl font-black text-emerald-600">0</p>
                    <p className="text-sm text-emerald-400">Aktif Hizmet</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                    <h3 className="tex-lg font-bold text-purple-900 mb-2">Görüntülenme</h3>
                    <p className="text-3xl font-black text-purple-600">-</p>
                    <p className="text-sm text-purple-400">Son 30 Gün</p>
                </div>
            </div>
        </div>
    )
}
