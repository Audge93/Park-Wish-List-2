# Production TODOs

## Required before real release

- Replace seed data with verified Supabase data.
- Add real park map images and replace placeholder map gradients.
- Add attraction/menu photos.
- Add real map coordinates for every attraction.
- Add Supabase read/cache service for parks, lands, attractions, and menu items.
- Add optional anonymous backup sync.
- Add notification scheduling if packaged as mobile app.
- Add Terms/Privacy if using cloud backup.
- Add Disney trademark/compliance review. This app should not imply official Disney affiliation.

## Current prototype behavior

This version is intentionally web-first so it deploys cleanly to Netlify. It uses localStorage rather than AsyncStorage and a CSS/HTML map rather than native React Native map components.
