import {create} from 'zustand';
import {getJson, setJson, STORAGE_KEYS} from '../services/storage';

const defaults = {
  backupEnabled: false,
  backupUUID: null,
  notificationsEnabled: false,
  morningReminderTime: '08:00',
  hasSeenOnboarding: false,
  hasSeenCoachMark: false,
  lastActivePark: 'magic-kingdom',
  tripDates: [],
};

export const useSettingsStore = create((set, get) => ({
  ...defaults,
  loadFromStorage: async () => {
    const stored = await getJson(STORAGE_KEYS.settings, defaults);
    const onboarding = await getJson(STORAGE_KEYS.onboardingComplete, false);
    set({...defaults, ...stored, hasSeenOnboarding: Boolean(onboarding || stored?.hasSeenOnboarding)});
  },
  persistToStorage: async () => setJson(STORAGE_KEYS.settings, get()),
  completeOnboarding: async () => {
    set({hasSeenOnboarding: true});
    await setJson(STORAGE_KEYS.onboardingComplete, true);
    await get().persistToStorage();
  },
  setLastActivePark: async (parkSlug) => { set({lastActivePark: parkSlug}); await get().persistToStorage(); },
  setTripDates: async (tripDates) => { set({tripDates}); await get().persistToStorage(); },
  setBackupEnabled: async (backupEnabled) => { set({backupEnabled}); await get().persistToStorage(); },
  setNotificationsEnabled: async (notificationsEnabled) => { set({notificationsEnabled}); await get().persistToStorage(); },
  dismissCoachMark: async () => { set({hasSeenCoachMark: true}); await get().persistToStorage(); },
}));
