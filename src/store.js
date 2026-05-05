import { create } from 'zustand';
import { PARKS } from './constants';
import { loadJSON, saveJSON } from './services/storage';
import { loadAttractions, loadMenuItems } from './services/dataService';

const initialSettings = loadJSON('settings', {
  hasSeenOnboarding: false,
  activePark: 'magic-kingdom',
  backupEnabled: false,
  notificationsEnabled: false,
  morningReminderTime: '08:00',
  tripDates: []
});

const initialLists = loadJSON('lists', {
  'magic-kingdom': [],
  epcot: [],
  'hollywood-studios': [],
  'animal-kingdom': []
});

const uid = () => crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;

export const useAppStore = create((set, get) => ({
  parks: PARKS,
  attractions: [],
  menuItems: [],
  lists: initialLists,
  settings: initialSettings,
  activePark: initialSettings.activePark || 'magic-kingdom',
  currentTab: initialSettings.hasSeenOnboarding ? 'home' : 'onboarding',
  onboardingStep: 0,
  searchQuery: '',
  searchFilter: 'all',
  browseMode: 'search',
  listGrouping: 'category',
  selectedItem: null,
  detailMode: 'detail',
  toast: '',

  init: async () => {
    const [attractions, menuItems] = await Promise.all([loadAttractions(), loadMenuItems()]);
    set({ attractions, menuItems });
  },

  setActivePark: (parkSlug) => {
    const settings = { ...get().settings, activePark: parkSlug };
    saveJSON('settings', settings);
    set({ activePark: parkSlug, settings });
  },

  setCurrentTab: (tab) => set({ currentTab: tab, selectedItem: null }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSearchFilter: (searchFilter) => set({ searchFilter }),
  setBrowseMode: (browseMode) => set({ browseMode }),
  setListGrouping: (listGrouping) => set({ listGrouping }),

  completeOnboarding: () => {
    const settings = { ...get().settings, hasSeenOnboarding: true };
    saveJSON('settings', settings);
    set({ settings, currentTab: 'home' });
  },

  nextOnboarding: () => set({ onboardingStep: Math.min(get().onboardingStep + 1, 2) }),

  openDetail: (item, mode = 'detail') => set({ selectedItem: item, detailMode: mode }),
  closeDetail: () => set({ selectedItem: null, detailMode: 'detail' }),

  showToast: (toast) => {
    set({ toast });
    setTimeout(() => {
      if (get().toast === toast) set({ toast: '' });
    }, 2200);
  },

  isOnList: (attractionId, parkSlug = get().activePark) => {
    return get().lists[parkSlug]?.some((item) => item.attractionId === attractionId);
  },

  addAttraction: (attraction, openDining = true) => {
    const { lists } = get();
    const parkSlug = attraction.parkSlug;
    const existing = lists[parkSlug]?.find((item) => item.attractionId === attraction.id);
    if (existing) {
      if (attraction.category === 'dining') get().openDetail(existing, 'sub-items');
      get().showToast('Already on your list!');
      return existing;
    }
    const item = {
      id: uid(),
      attractionId: attraction.id,
      isCustom: false,
      name: attraction.name,
      category: attraction.category,
      parkSlug,
      landName: attraction.landName,
      priority: 'nice_to_have',
      notes: '',
      isCompleted: false,
      completedAt: null,
      addedAt: new Date().toISOString(),
      subItems: []
    };
    const next = { ...lists, [parkSlug]: [...(lists[parkSlug] || []), item] };
    saveJSON('lists', next);
    set({ lists: next });
    get().showToast('Added to My List ✨');
    if (attraction.category === 'dining' && openDining) get().openDetail(item, 'sub-items');
    return item;
  },

  addCustomItem: (payload) => {
    const { lists } = get();
    const item = {
      id: uid(),
      attractionId: null,
      isCustom: true,
      name: payload.name,
      category: payload.category,
      parkSlug: payload.parkSlug,
      landName: payload.landName,
      priority: payload.priority,
      notes: payload.notes || '',
      isCompleted: false,
      completedAt: null,
      addedAt: new Date().toISOString(),
      subItems: []
    };
    const next = { ...lists, [item.parkSlug]: [...(lists[item.parkSlug] || []), item] };
    saveJSON('lists', next);
    set({ lists: next });
    get().showToast('Custom item added ✨');
  },

  removeItem: (itemId) => {
    const lists = { ...get().lists };
    Object.keys(lists).forEach((park) => {
      lists[park] = lists[park].filter((item) => item.id !== itemId);
    });
    saveJSON('lists', lists);
    set({ lists, selectedItem: null });
    get().showToast('Removed from your list');
  },

  toggleComplete: (itemId) => {
    const lists = { ...get().lists };
    Object.keys(lists).forEach((park) => {
      lists[park] = lists[park].map((item) =>
        item.id === itemId
          ? { ...item, isCompleted: !item.isCompleted, completedAt: !item.isCompleted ? new Date().toISOString() : null }
          : item
      );
    });
    saveJSON('lists', lists);
    set({ lists });
  },

  updateItem: (itemId, updates) => {
    const lists = { ...get().lists };
    Object.keys(lists).forEach((park) => {
      lists[park] = lists[park].map((item) => item.id === itemId ? { ...item, ...updates } : item);
    });
    saveJSON('lists', lists);
    set({ lists });
  },

  addSubItem: (itemId, subItem) => {
    const lists = { ...get().lists };
    Object.keys(lists).forEach((park) => {
      lists[park] = lists[park].map((item) => item.id === itemId ? {
        ...item,
        subItems: [...(item.subItems || []), { id: uid(), menuItemId: subItem.menuItemId || null, name: subItem.name, note: subItem.note || '', isCompleted: false }]
      } : item);
    });
    saveJSON('lists', lists);
    set({ lists });
  },

  toggleSubItem: (itemId, subItemId) => {
    const lists = { ...get().lists };
    Object.keys(lists).forEach((park) => {
      lists[park] = lists[park].map((item) => item.id === itemId ? {
        ...item,
        subItems: item.subItems.map((s) => s.id === subItemId ? { ...s, isCompleted: !s.isCompleted } : s)
      } : item);
    });
    saveJSON('lists', lists);
    set({ lists });
  }
}));
