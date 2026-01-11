-- 1. Ensure 'icon' column exists to store the Lucide icon name (e.g., 'map', 'code')
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS icon text;

-- 2. Upsert services from SERVICE_CONFIG to match the Left Menu exactly
INSERT INTO public.services (slug, title, description, icon, content)
VALUES
(
    'yerel-seo', 
    'Yerel SEO', 
    'Bölgesel aramalarda öne çıkın, mağaza trafiğinizi ve yerel görünürlüğünüzü artırın.', 
    'map', 
    '<p>Yerel aramalarda işletmenizin görünürlüğünü artırmak için kapsamlı stratejiler.</p>'
),
(
    'e-ticaret-seo', 
    'E-Ticaret SEO', 
    'E-ticaret sitenizi büyütmek için profesyonel SEO hizmetleri ve ajansları.', 
    'storefront', 
    '<p>Ürünlerinizin arama motorlarında üst sıralarda çıkması için e-ticaret odaklı SEO çalışmaları.</p>'
),
(
    'teknik-seo', 
    'Teknik SEO Denetimi', 
    'Web sitenizin teknik altyapısını güçlendirin. Hız optimizasyonu ve tarama bütçesi yönetimi.', 
    'code', 
    '<p>Site hızı, mobil uyumluluk ve indeksleme sorunlarını çözen teknik optimizasyonlar.</p>'
),
(
    'icerik-pazarlamasi', 
    'İçerik Pazarlaması', 
    'Hedef kitlenizi etkileyen, trafik çeken ve dönüşüm sağlayan stratejik içerik üretimi.', 
    'edit_note', 
    '<p>Markanızın sesini duyuran ve potansiyel müşterileri çeken SEO uyumlu içerik stratejileri.</p>'
),
(
    'baglanti-kurulumu', 
    'Bağlantı Kurulumu', 
    'Sitenizin otoritesini artırın. Yüksek kaliteli, alakalı ve güvenilir backlink edinimi.', 
    'link', 
    '<p>Otoriter sitelerden alınan referanslar ile domain gücünüzü artırın.</p>'
),
(
    'uluslararasi-seo', 
    'Uluslararası SEO', 
    'Sınırları aşın. Çok dilli ve çok bölgeli SEO stratejileri ile küresel pazarlara açılın.', 
    'language', 
    '<p>Farklı dillerde ve ülkelerde hedef kitlenize ulaşmak için global SEO çözümleri.</p>'
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon;
