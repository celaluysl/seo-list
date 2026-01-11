-- Enable Row Level Security
alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;

-- PROFILES (Managed by Supabase Auth, but extended here)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone
);

alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- SERVICES (Hizmetler)
create table public.services (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  description text, -- Short description for cards
  content text, -- HTML/Rich text content
  icon_url text,
  image_url text,
  is_active boolean default true,
  display_order integer default 0,
  seo_title text,
  seo_description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.services enable row level security;
create policy "Services are viewable by everyone." on public.services for select using (true);
create policy "Only authenticated users can insert services." on public.services for insert with check (auth.role() = 'authenticated');
create policy "Only authenticated users can update services." on public.services for update using (auth.role() = 'authenticated');
create policy "Only authenticated users can delete services." on public.services for delete using (auth.role() = 'authenticated');

-- BLOG POSTS (Haberler/Blog)
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  excerpt text, -- Short summary
  content text, -- HTML/Rich text
  image_url text,
  author_id uuid references public.profiles(id),
  is_published boolean default false,
  published_at timestamp with time zone,
  seo_title text,
  seo_description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.posts enable row level security;
create policy "Published posts are viewable by everyone." on public.posts for select using (is_published = true);
create policy "Authenticated users can see all posts." on public.posts for select using (auth.role() = 'authenticated');
create policy "Only authenticated users can insert posts." on public.posts for insert with check (auth.role() = 'authenticated');
create policy "Only authenticated users can update posts." on public.posts for update using (auth.role() = 'authenticated');
create policy "Only authenticated users can delete posts." on public.posts for delete using (auth.role() = 'authenticated');

-- SETTINGS (Site wide settings)
create table public.settings (
  id integer primary key generated always as identity,
  site_title text,
  site_description text,
  contact_email text,
  phone_number text,
  address text,
  social_facebook text,
  social_twitter text,
  social_instagram text,
  social_linkedin text,
  logo_url text,
  favicon_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.settings enable row level security;
create policy "Settings are viewable by everyone." on public.settings for select using (true);
create policy "Only authenticated users can update settings." on public.settings for update using (auth.role() = 'authenticated');
create policy "Only authenticated users can insert settings." on public.settings for insert with check (auth.role() = 'authenticated');

-- Trigger to handle user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- STORAGE BUCKETS
-- You will need to create 'images' bucket in Supabase Dashboard manually or via API if possible.
-- This SQL assumes buckets exist or policies are set on them.
