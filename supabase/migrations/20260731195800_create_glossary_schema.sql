begin;

-- =========================================================
-- Categories
-- =========================================================

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null,
  color text not null,

  constraint categories_name_not_blank
    check (btrim(name) <> ''),

  constraint categories_slug_not_blank
    check (btrim(slug) <> ''),

  constraint categories_slug_format
    check (
      slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
    ),

  constraint categories_color_format
    check (
      color ~ '^#[0-9A-Fa-f]{6}$'
    ),

  constraint categories_slug_unique
    unique (slug)
);

create unique index categories_name_unique_ci
  on public.categories (lower(btrim(name)));

-- =========================================================
-- Subcategories
-- =========================================================

create table public.subcategories (
  id uuid primary key default gen_random_uuid(),

  category_id uuid not null
    references public.categories(id)
    on delete restrict,

  name text not null,
  slug text not null,

  constraint subcategories_name_not_blank
    check (btrim(name) <> ''),

  constraint subcategories_slug_not_blank
    check (btrim(slug) <> ''),

  constraint subcategories_slug_format
    check (
      slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
    ),

  constraint subcategories_slug_unique_per_category
    unique (category_id, slug)
);

create unique index subcategories_name_unique_ci
  on public.subcategories (
    category_id,
    lower(btrim(name))
  );

create index subcategories_category_id_idx
  on public.subcategories (category_id);

-- =========================================================
-- Terms
-- =========================================================

create table public.terms (
  id uuid primary key default gen_random_uuid(),

  subcategory_id uuid not null
    references public.subcategories(id)
    on delete restrict,

  name text not null,
  slug text not null,

  name_variations text[] not null
    default '{}'::text[],

  short_description text not null,
  full_description text not null,
  analogy text,

  constraint terms_name_not_blank
    check (btrim(name) <> ''),

  constraint terms_slug_not_blank
    check (btrim(slug) <> ''),

  constraint terms_slug_format
    check (
      slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
    ),

  constraint terms_short_description_not_blank
    check (btrim(short_description) <> ''),

  constraint terms_full_description_not_blank
    check (btrim(full_description) <> ''),

  constraint terms_analogy_not_blank
    check (
      analogy is null
      or btrim(analogy) <> ''
    ),

  constraint terms_variations_without_null
    check (
      array_position(name_variations, null) is null
    ),

  constraint terms_slug_unique
    unique (slug)
);

create unique index terms_name_unique_ci
  on public.terms (
    subcategory_id,
    lower(btrim(name))
  );

create index terms_subcategory_id_idx
  on public.terms (subcategory_id);

-- =========================================================
-- Term relations
-- =========================================================

create table public.term_relations (
  term_a_id uuid not null
    references public.terms(id)
    on delete cascade,

  term_b_id uuid not null
    references public.terms(id)
    on delete cascade,

  constraint term_relations_primary_key
    primary key (term_a_id, term_b_id),

  constraint term_relations_different_terms
    check (term_a_id <> term_b_id)
);

create unique index term_relations_unique_pair
  on public.term_relations (
    least(term_a_id, term_b_id),
    greatest(term_a_id, term_b_id)
  );

create index term_relations_term_b_id_idx
  on public.term_relations (term_b_id);

-- =========================================================
-- Row Level Security
-- =========================================================

alter table public.categories
  enable row level security;

alter table public.subcategories
  enable row level security;

alter table public.terms
  enable row level security;

alter table public.term_relations
  enable row level security;

-- Remove permissões anteriores dos papéis públicos.

revoke all
  on public.categories
  from anon, authenticated;

revoke all
  on public.subcategories
  from anon, authenticated;

revoke all
  on public.terms
  from anon, authenticated;

revoke all
  on public.term_relations
  from anon, authenticated;

-- O site público poderá somente consultar os dados.

grant select
  on public.categories
  to anon, authenticated;

grant select
  on public.subcategories
  to anon, authenticated;

grant select
  on public.terms
  to anon, authenticated;

grant select
  on public.term_relations
  to anon, authenticated;

-- Políticas públicas de leitura.

create policy "Public can read categories"
  on public.categories
  for select
  to anon, authenticated
  using (true);

create policy "Public can read subcategories"
  on public.subcategories
  for select
  to anon, authenticated
  using (true);

create policy "Public can read terms"
  on public.terms
  for select
  to anon, authenticated
  using (true);

create policy "Public can read term relations"
  on public.term_relations
  for select
  to anon, authenticated
  using (true);

commit;