import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'SEO Ajansı Dizini - Doğrulanmış SEO Uzmanlarını Bulun',
  description: 'Türkiye\'nin en kapsamlı ve güvenilir SEO ajansı dizini. İşletmeleri, büyümelerini hızlandıracak doğru uzmanlarla buluşturuyoruz.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="font-sans antialiased bg-background-light text-slate-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
