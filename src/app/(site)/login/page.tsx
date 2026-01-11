import { login } from './actions'

export const metadata = {
    title: 'Yönetim Paneli Giriş',
    description: 'SEO Dizini yönetim paneli girişi.',
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Yönetim Paneli Giriş
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Sadece yetkili personel içindir.
                    </p>
                </div>
                <form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email Adresi
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-accent-green focus:border-accent-green focus:z-10 sm:text-sm"
                                placeholder="Email Adresi"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Şifre
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-accent-green focus:border-accent-green focus:z-10 sm:text-sm"
                                placeholder="Şifre"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            formAction={login}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Giriş Yap
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
