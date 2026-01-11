-- Drop existing table to rebuild schema
DROP TABLE IF EXISTS public.agencies;

CREATE TABLE public.agencies (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    slug text NOT NULL UNIQUE,
    logo_url text,
    cover_image_url text, -- New: Background image for hero/card
    description text, -- Main overview text
    location text, -- Short location e.g. "İstanbul, TR"
    founded_year integer, -- New
    employee_count text, -- New: e.g. "50-200"
    is_verified boolean DEFAULT false,
    rating numeric(2, 1) DEFAULT 0,
    review_count integer DEFAULT 0,
    min_budget text, -- e.g. "₺50.000+"
    website_url text,
    
    -- Arrays and JSONB for Rich Content
    tags text[], -- Capabilities tags
    client_references text[], -- List of client names for the marquee
    
    -- Structured Data in JSONB
    stats jsonb DEFAULT '{}'::jsonb, 
    -- Structure: { "years_exp": 12, "happy_clients": 350, "traffic_increase": "%400" }
    
    contact_info jsonb DEFAULT '{}'::jsonb,
    -- Structure: { "address": "...", "phone": "...", "email": "...", "map_embed_url": "..." }
    
    services_offered jsonb DEFAULT '[]'::jsonb,
    -- Structure: [{ "icon": "code", "title": "Teknik SEO", "description": "..." }, ...]
    
    case_studies jsonb DEFAULT '[]'::jsonb,
    -- Structure: [{ "title": "...", "category": "SaaS", "image_url": "...", "stats": [{ "label": "Trafik", "value": "+200%", "trend": "up" }] }]
    
    awards jsonb DEFAULT '[]'::jsonb,
    -- Structure: [{ "icon": "trophy", "title": "Ödül Adı", "organization": "Veren Kurum" }]
    
    reviews_data jsonb DEFAULT '[]'::jsonb,
    -- Structure: [{ "author": "Ad Soyad", "role": "Unvan", "rating": 5, "text": "...", "avatar_url": "...", "is_verified": true }]

    faq jsonb DEFAULT '[]'::jsonb,
     -- Structure: [{ "question": "...", "answer": "..." }]

    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS
ALTER TABLE public.agencies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public agencies are viewable by everyone." ON public.agencies FOR SELECT USING (true);
CREATE POLICY "Authenticated users can modify agencies." ON public.agencies FOR ALL USING (auth.role() = 'authenticated');

-- SEED DATA (10 Sample Agencies)

INSERT INTO public.agencies (
    name, slug, logo_url, cover_image_url, description, location, founded_year, employee_count, is_verified, rating, review_count, min_budget, website_url, tags, client_references, stats, contact_info, services_offered, case_studies, awards, reviews_data, faq
) VALUES 
(
    'Zeo Agency', 
    'zeo-agency', 
    'https://ui-avatars.com/api/?name=ZA&background=0f1729&color=fff&size=256',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
    'Zeo, dijital pazarlama dünyasında veri odaklı stratejilerle büyümeyi hedefleyen markalar için ödüllü bir SEO ve dijital pazarlama ajansıdır.',
    'İstanbul, TR',
    2012,
    '50-200',
    true,
    4.9,
    128,
    '₺100.000+',
    'https://zeo.org',
    ARRAY['SEO', 'Content Marketing', 'Data Analytics'],
    ARRAY['Amazon', 'Hepsiburada', 'Trendyol', 'Getir', 'Yemeksepeti', 'Pegasus', 'Koçtaş'],
    '{"years_exp": 12, "happy_clients": 500, "traffic_increase": "%350"}',
    '{"address": "Kolektif House, Levent, İstanbul", "phone": "+90 (212) 123 45 67", "email": "hello@zeo.org", "map_embed_url": "https://www.google.com/maps/embed?pb=..."}',
    '[
        {"icon": "code", "title": "Teknik SEO", "description": "Site mimarisi ve hız optimizasyonu."},
        {"icon": "edit_note", "title": "İçerik Pazarlama", "description": "Dönüşüm odaklı içerik stratejileri."}
    ]',
    '[
        {"title": "E-Ticaret Devinde %200 Trafik Artışı", "category": "E-Ticaret", "image_url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80", "stats": [{"label": "Trafik", "value": "+%200", "trend": "up"}]},
        {"title": "SaaS Girişimi İçin Organik Büyüme", "category": "SaaS", "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80", "stats": [{"label": "Lead", "value": "+%150", "trend": "up"}]}
    ]',
    '[{"icon": "trophy", "title": "En İyi SEO Ajansı", "organization": "Global Search Awards"}, {"icon": "military_tech", "title": "En İyi B2B Kampanyası", "organization": "MENA Search Awards"}]',
    '[{"author": "Ahmet Y.", "role": "CMO, TechStart", "rating": 5, "text": "Zeo ile çalışmak işimizi bir üst seviyeye taşıdı.", "avatar_url": "https://i.pravatar.cc/150?u=1", "is_verified": true}]',
    '[{"question": "Sözleşme süreniz nedir?", "answer": "Minimum 6 aylık sözleşmeler ile çalışıyoruz."}]'
),
(
    'SEO Art', 
    'seo-art', 
    'https://ui-avatars.com/api/?name=SA&background=10b981&color=fff&size=256',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80',
    'SEO Art, butik hizmet anlayışıyla markanıza özel çözümler sunar. E-ticaret ve yerel SEO konusunda uzmanlaşmış ekibimizle tanışın.',
    'Ankara, TR',
    2015,
    '10-50',
    true,
    4.7,
    85,
    '₺40.000+',
    'https://seoart.com',
    ARRAY['E-Ticaret SEO', 'Yerel SEO'],
    ARRAY['LC Waikiki', 'Defacto', 'Mavi'],
    '{"years_exp": 9, "happy_clients": 200, "traffic_increase": "%250"}',
    '{"address": "Çankaya, Ankara", "phone": "+90 (312) 987 65 43", "email": "info@seoart.com", "map_embed_url": "..."}',
    '[
        {"icon": "storefront", "title": "E-Ticaret SEO", "description": "Ürün ve kategori sayfası optimizasyonu."},
        {"icon": "map", "title": "Yerel SEO", "description": "Google Haritalar ve yerel sıralama."}
    ]',
    '[{"title": "Moda Markası Ciro Rekoru", "category": "Moda", "image_url": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80", "stats": [{"label": "ROAS", "value": "12x", "trend": "up"}]}]',
    '[{"icon": "stars", "title": "Yükselen Yıldız", "organization": "Ankara Digital"}]',
    '[{"author": "Ayşe K.", "role": "Pazarlama Müdürü", "rating": 5, "text": "Yerel SEO sonuçlarımız harika.", "avatar_url": "https://i.pravatar.cc/150?u=2", "is_verified": true}]',
    '[{"question": "Raporlama sıklığı?", "answer": "Aylık detaylı raporlar sunuyoruz."}]'
),
(
    'BoostRoas', 
    'boost-roas', 
    'https://ui-avatars.com/api/?name=BR&background=f59e0b&color=fff&size=256',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
    'Performans odaklı dijital pazarlama ajansı. SEO ve SEM entegrasyonu ile maksimum dönüşüm hedefliyoruz.',
    'İzmir, TR',
    2018,
    '10-50',
    true,
    4.8,
    92,
    '₺75.000+',
    'https://boostroas.com',
    ARRAY['Performance Marketing', 'SEO', 'SEM'],
    ARRAY['Vestel', 'Arçelik', 'Beko'],
    '{"years_exp": 6, "happy_clients": 150, "traffic_increase": "%500"}',
    '{"address": "Alsancak, İzmir", "phone": "+90 (232) 111 22 33", "email": "hi@boostroas.com", "map_embed_url": "..."}',
    '[{"icon": "analytics", "title": "Veri Analitiği", "description": "GA4 ve özel raporlama çözümleri."}]',
    '[{"title": "Beyaz Eşya Devine Destek", "category": "Perakende", "image_url": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80", "stats": [{"label": "Satış", "value": "+%80", "trend": "up"}]}]',
    '[]',
    '[]',
    '[]'
),
(
    'Digital Panacea', 'digital-panacea', 'https://ui-avatars.com/api/?name=DP&background=8b5cf6&color=fff&size=256', 'https://images.unsplash.com/photo-1504384308090-c54be3855463?auto=format&fit=crop&q=80', 'Her derde deva dijital çözümler.', 'Bursa, TR', 2016, '10-50', false, 4.5, 40, '₺30.000+', 'https://panacea.com', ARRAY['Content', 'SEO'], ARRAY['Tofaş', 'Renault'], '{"years_exp": 8, "happy_clients": 100, "traffic_increase": "%200"}', '{}', '[]', '[]', '[]', '[]', '[]'
),
(
    'Webtures', 'webtures', 'https://ui-avatars.com/api/?name=WT&background=ef4444&color=fff&size=256', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80', 'Girişimler için büyüme ortağı.', 'İstanbul, TR', 2010, '50-200', true, 4.9, 310, '₺80.000+', 'https://webtures.com', ARRAY['SEO', 'UX'], ARRAY['Migros', 'Carrefour'], '{"years_exp": 14, "happy_clients": 1000, "traffic_increase": "%600"}', '{}', '[]', '[]', '[]', '[]', '[]'
),
(
    'Sempeak', 'sempeak', 'https://ui-avatars.com/api/?name=SP&background=3b82f6&color=fff&size=256', 'https://images.unsplash.com/photo-1486406140926-c627a92ad1ab?auto=format&fit=crop&q=80', 'Google Premier Partner ajansı olarak global standartlarda hizmet.', 'İstanbul, TR', 2011, '50-200', true, 4.8, 150, '₺90.000+', 'https://sempeak.com', ARRAY['SEM', 'SEO'], ARRAY['Akbank', 'Garanti'], '{"years_exp": 13, "happy_clients": 450, "traffic_increase": "%300"}', '{}', '[]', '[]', '[]', '[]', '[]'
),
(
    'Kubix Digital', 'kubix-digital', 'https://ui-avatars.com/api/?name=KD&background=ec4899&color=fff&size=256', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80', 'Yaratıcı ve performans odaklı dijital ajans.', 'İstanbul, TR', 2014, '10-50', true, 4.7, 75, '₺60.000+', 'https://kubix.com', ARRAY['Creative', 'SEO'], ARRAY['Nike', 'Adidas'], '{"years_exp": 10, "happy_clients": 120, "traffic_increase": "%220"}', '{}', '[]', '[]', '[]', '[]', '[]'
),
(
    'Analytica', 'analytica', 'https://ui-avatars.com/api/?name=AN&background=14b8a6&color=fff&size=256', 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80', 'Veri analitiği ve teknik SEO üzerine özelleşmiş butik ajans.', 'Ankara, TR', 2019, '1-10', false, 4.6, 30, '₺25.000+', 'https://analytica.com', ARRAY['Data', 'Technical SEO'], ARRAY['Aselsan', 'Roketsan'], '{"years_exp": 5, "happy_clients": 50, "traffic_increase": "%150"}', '{}', '[]', '[]', '[]', '[]', '[]'
),
(
    'Contentus', 'contentus', 'https://ui-avatars.com/api/?name=CN&background=f97316&color=fff&size=256', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80', 'İçerik pazarlaması fabrikası.', 'İzmir, TR', 2017, '10-50', true, 4.5, 60, '₺20.000+', 'https://contentus.com', ARRAY['Content'], ARRAY['Bloggers', 'News Sites'], '{"years_exp": 7, "happy_clients": 300, "traffic_increase": "%400"}', '{}', '[]', '[]', '[]', '[]', '[]'
),
(
    'Growth Hacking Studio', 'growth-hacking-studio', 'https://ui-avatars.com/api/?name=GH&background=6366f1&color=fff&size=256', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80', 'Startuplar için hızlı büyüme laboratuvarı.', 'İstanbul, TR', 2020, '1-10', true, 5.0, 45, '₺50.000+', 'https://ghs.com', ARRAY['Growth', 'SEO'], ARRAY['Insider', 'Peak'], '{"years_exp": 4, "happy_clients": 80, "traffic_increase": "%1000"}', '{}', '[]', '[]', '[]', '[]', '[]'
);
