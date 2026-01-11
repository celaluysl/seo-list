import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FileText, Settings, LogOut, LayoutDashboard, Briefcase } from 'lucide-react'
import { signOut } from './actions'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex-shrink-0">
                <div className="h-16 flex items-center justify-center font-bold text-xl border-b border-gray-700">
                    Admin Panel
                </div>
                <nav className="p-4 space-y-2">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                    >
                        <LayoutDashboard className="size-5" />
                        Genel Bakış
                    </Link>
                    <Link
                        href="/admin/blogs"
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                    >
                        <FileText className="size-5" />
                        Blog Yazıları
                    </Link>
                    <Link
                        href="/admin/services"
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                    >
                        <Briefcase className="size-5" />
                        Hizmetler
                    </Link>
                    <Link
                        href="/admin/agencies"
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                    >
                        <Briefcase className="size-5" />
                        Ajanslar
                    </Link>
                    <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                    >
                        <Settings className="size-5" />
                        Ayarlar
                    </Link>
                </nav>
                <div className="absolute bottom-4 left-0 w-full px-4">
                    <form action={signOut}>
                        <button className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 hover:text-red-300 rounded-lg transition-colors w-full text-left">
                            <LogOut className="size-5" />
                            Çıkış Yap
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-8">
                {children}
            </main>
        </div>
    )
}
