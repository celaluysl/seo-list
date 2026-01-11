-- Insert default services so they can be edited in Admin Panel
INSERT INTO public.services (title, slug, description, content)
VALUES 
('E-Ticaret SEO', 'e-ticaret-seo', 'E-ticaret siteleri için özel SEO çözümleri.', '<p>E-Ticaret SEO detaylı içerik alanı.</p>'),
('Yerel SEO', 'yerel-seo', 'Bölgesel işletmeler için harita ve arama optimizasyonu.', '<p>Yerel SEO hizmetimiz ile bölgenizdeki müşterilere ulaşın.</p>'),
('Teknik SEO', 'teknik-seo', 'Web sitenizin teknik altyapısını Google standartlarına getirin.', '<p>Site hızı, mobil uyumluluk ve tarama bütçesi.</p>'),
('İçerik Pazarlaması', 'icerik-pazarlamasi', 'Kullanıcı odaklı içerik stratejileri.', '<p>Blog yönetimi ve içerik üretimi.</p>'),
('Link İnşası', 'baglanti-kurulumu', 'Otoriter sitelerden kaliteli backlink alımı.', '<p>Güvenilir backlink kaynakları.</p>'),
('Uluslararası SEO', 'uluslararasi-seo', 'Global pazarlara açılmak için çok dilli SEO.', '<p>Yurtdışı satışlarınızı artırın.</p>')
ON CONFLICT (slug) DO NOTHING;
