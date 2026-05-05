import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  settings: '@wishlist/settings',
  onboardingComplete: '@wishlist/onboarding_complete',
  attractionsCache: '@wishlist/cache/attractions',
  uuid: '@wishlist/uuid',
};

export function listKey(parkSlug) {
  return `@wishlist/list/${parkSlug}`;
}

export async function getJson(key, fallback = null) {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn('AsyncStorage read failed', key, error);
    return fallback;
  }
}

export async function setJson(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('AsyncStorage write failed', key, error);
  }
}
