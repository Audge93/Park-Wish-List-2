# Wish List: Disney Park Planner

Netlify-ready full web prototype for a Disney World park wishlist planner.

## What works now

- Netlify/Vite web deployment
- Onboarding
- Park switching for all 4 Walt Disney World parks
- Seeded local attraction/menu data
- Search and category filtering
- Discovery rows
- Add/remove wishlist items
- Mark items done
- Priority and notes
- Dining sub-items
- Add custom item modal
- Web-friendly map with placeholder park background and positioned pins
- Local persistence using `localStorage`
- Supabase placeholders and schema

## Netlify settings

Build command:

```bash
npm run build
```

Publish directory:

```bash
dist
```

## Supabase

The app currently runs fully from local seed data. To connect Supabase later:

1. Create a Supabase project.
2. Run `supabase/schema.sql`.
3. Add data to `parks`, `lands`, `attractions`, and `menu_items`.
4. Copy `.env.example` to `.env`.
5. Fill in:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Replace the seed-first loader in `src/services/dataService.js` with the Supabase fetch path.

## Production placeholders

See `PRODUCTION_TODO.md`.
