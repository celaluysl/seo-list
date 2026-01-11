import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
    return (
        <section className="relative bg-primary pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">

                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-green/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 -left-24 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"></div>
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-5xl mb-8">
                    Markanızın{' '}
                    <span className="relative inline-block text-accent-green">
                        <span className="relative z-10">Dijital Potansiyelini</span>
                        <span className="absolute bottom-2 left-0 w-full h-3 bg-accent-green/20 -rotate-1 skew-x-12 z-0"></span>
                    </span>{' '}
                    Açığa Çıkarın
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mb-12 leading-relaxed font-light">
                    Binlerce doğrulanmış SEO ajansı arasından bütçenize, sektörünüze ve
                    hedeflerine en uygun iş ortağını veri odaklı algoritmamızla bulun.
                </p>

            </div>
        </section>
    )
}
