-- Wish List: Disney Park Planner Supabase schema starter
create extension if not exists "pgcrypto";

create table if not exists parks (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  short_name text not null,
  map_image_url text,
  theme_color text,
  icon_name text
);

create table if not exists lands (
  id uuid primary key default gen_random_uuid(),
  park_id uuid references parks(id) on delete cascade,
  name text not null,
  map_center_x float,
  map_center_y float,
  zoom_level float default 1.0
);

create table if not exists attractions (
  id uuid primary key default gen_random_uuid(),
  park_id uuid references parks(id) on delete cascade,
  land_id uuid references lands(id) on delete set null,
  name text not null,
  category text not null check (category in ('ride','dining','show','meet_greet','experience')),
  description text,
  height_requirement text,
  lightning_lane boolean default false,
  dining_type text,
  photo_url text,
  map_x float,
  map_y float,
  is_active boolean default true,
  is_verified boolean default true,
  tier integer default 2,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists menu_items (
  id uuid primary key default gen_random_uuid(),
  attraction_id uuid references attractions(id) on delete cascade,
  name text not null,
  description text,
  is_iconic boolean default false,
  is_active boolean default true,
  is_verified boolean default true,
  is_seasonal boolean default false,
  last_verified_at timestamptz,
  flagged_count integer default 0
);

create table if not exists user_backups (
  id uuid primary key,
  list_data jsonb not null default '{}'::jsonb,
  settings_data jsonb not null default '{}'::jsonb,
  last_synced_at timestamptz default now(),
  created_at timestamptz default now()
);

-- TODO: Add Row Level Security policies before production.
