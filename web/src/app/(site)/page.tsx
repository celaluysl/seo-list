import HeroSection from '@/components/HeroSection'
import ServiceCategories from '@/components/ServiceCategories'
import FeaturedAgencies from '@/components/FeaturedAgencies'
import { Triangle, CircleDollarSign, PiggyBank, Briefcase, Plane } from 'lucide-react'

// Placeholder icons for the trusted companies section
// In a real app we would use SVG logos

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Trusted By Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-center text-sm font-bold text-gray-400 mb-8 uppercase tracking-widest">
            Sektör Liderlerinin Güvenilir Adresi
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 font-black text-2xl text-slate-800">
              <Triangle className="size-8" /> ACME CORP
            </div>
            <div className="flex items-center gap-2 font-black text-2xl text-slate-800">
              <CircleDollarSign className="size-8" /> BLOCKCHAIN
            </div>
            <div className="flex items-center gap-2 font-black text-2xl text-slate-800">
              <PiggyBank className="size-8" /> FINTECH
            </div>
            <div className="flex items-center gap-2 font-black text-2xl text-slate-800">
              <Briefcase className="size-8" /> MEDITECH
            </div>
            <div className="flex items-center gap-2 font-black text-2xl text-slate-800">
              <Plane className="size-8" /> TRAVELIO
            </div>
          </div>
        </div>
      </section>

      <ServiceCategories />
      <FeaturedAgencies />

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-primary to-slate-900 rounded-3xl p-10 md:p-16 relative overflow-hidden shadow-2xl shadow-primary/30">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#4ADE80 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Sıralamalarda Yükselmeye Hazır Mısınız?</h2>
              <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg">İşletmenizi büyütecek doğru SEO stratejisini ve ekibini bugün bulun. İlk adımı atmak için geç kalmayın.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="h-14 px-10 bg-accent-green hover:bg-accent-green-hover text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-105 cursor-pointer">
                  Ajans Bul
                </button>
                <button className="h-14 px-10 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold rounded-xl backdrop-blur-sm transition-all cursor-pointer">
                  Ajans Olarak Katıl
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
