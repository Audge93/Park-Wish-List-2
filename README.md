# Wish List: Disney Park Planner

React Native Bare CLI prototype scaffold for a Disney World park wishlist/reminder app.

## Prototype status

This package is as close to phone-drop prototype ready as possible without native project generation, real Supabase credentials, real Disney data licensing, or real park map art.

Implemented:

- JavaScript React Native source scaffold
- Bottom tab navigation: Home, Search, My List, Map
- One-time onboarding flow
- Zustand state stores
- AsyncStorage local-first persistence
- Seed attraction/menu data for all 4 Disney World parks
- Search and discovery browsing
- Add/remove/complete wishlist items
- Priority toggle and notes
- Dining sub-item checklist
- Custom item modal
- Placeholder tappable map with pins and filters
- Settings screen shell
- Supabase schema and service placeholders
- Notification/sync/validator service placeholders

Not yet production-complete:

- Native `ios/` and `android/` folders are not included. Generate those with React Native CLI.
- Supabase URL/key are placeholders.
- Real park map images and attraction photos are placeholders.
- Actual Disney menu/attraction data must be loaded into Supabase or expanded in seed files.
- Notifications require native setup.
- Cloud backup requires Supabase table policies and environment values.

## How to use

1. Create or clone your repo.
2. Copy these files into the repo root.
3. From a computer later, run:

```bash
npm install
npx react-native start
npx react-native run-ios
# or
npx react-native run-android
```

If starting from an empty repository, you can generate a bare RN project first and then merge this `src/`, `App.js`, and config files into it:

```bash
npx react-native@latest init ParkWishList2 --version 0.75.4
```

## Environment setup

Copy `.env.example` to `.env` and fill in your Supabase project values when ready.

## Files to replace before real beta

- `src/data/seedAttractions.js` — replace/expand with verified data or Supabase records.
- `src/assets/README.md` — add real park maps and images.
- `src/services/supabase.js` — wire your real env loader.
- `src/services/notifications.js` — finish Notifee or push-notification native implementation.
