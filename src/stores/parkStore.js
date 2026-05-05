import {create} from 'zustand';
import {PARKS} from '../constants/parks';
import {getJson, STORAGE_KEYS} from '../services/storage';
import {seedAttractions} from '../data/seedAttractions';

export const useParkStore = create((set, get) => ({
  activePark: 'magic-kingdom',
  parks: PARKS,
  attractions: [],
  isLoaded: false,
  setActivePark: (parkSlug) => set({activePark: parkSlug}),
  loadData: async () => {
    const cached = await getJson(STORAGE_KEYS.attractionsCache, null);
    const settings = await getJson(STORAGE_KEYS.settings, null);
    set({
      attractions: cached?.data?.length ? cached.data : seedAttractions,
      activePark: settings?.lastActivePark || 'magic-kingdom',
      isLoaded: true,
    });
  },
  getAttractionById: (id) => get().attractions.find((a) => a.id === id),
  getAttractionsForPark: (parkSlug) => get().attractions.filter((a) => a.parkSlug === parkSlug && a.isActive !== false),
}));
