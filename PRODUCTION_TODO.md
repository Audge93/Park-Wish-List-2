# Production TODO

## 1. Native project setup
- Generate iOS/Android folders with React Native CLI.
- Install pods on macOS: `cd ios && pod install`.
- Configure `react-native-vector-icons` fonts.
- Configure Reanimated Babel plugin.

## 2. Supabase
- Create Supabase project.
- Run `supabase/schema.sql`.
- Add anon key and URL to `.env`.
- Upload park map images and attraction photos to Supabase Storage.
- Replace/augment seed data with real records.

## 3. Map assets
- Add 2048x2048 static map image per park.
- Replace placeholder map background in `src/screens/Map/MapScreen.js`.
- Verify every attraction has `mapX` and `mapY` in 0.0-1.0 coordinate space.

## 4. Legal/data sourcing
- Use your own curated data and imagery or licensed/allowed sources.
- Do not scrape or redistribute restricted Disney content without permission.

## 5. Notifications
- Choose Notifee or react-native-push-notification.
- Add native permission configuration.
- Implement deep links into My List and detail sheet.

## 6. Backup/sync
- Turn on `user_backups` table.
- Add row-level security policies.
- Enable opt-in anonymous backup.

## 7. Production polish
- Replace emoji icons with MaterialCommunityIcons throughout.
- Add real bottom sheet using Gorhom.
- Add gesture-based map pan/zoom with Reanimated.
- Add tests for list store and storage services.
