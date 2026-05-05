import {create} from 'zustand';
import {PARKS} from '../constants/parks';
import {createId} from '../utils/ids';
import {getJson, setJson, listKey} from '../services/storage';

function toListItem(attraction, overrides = {}) {
  return {
    id: createId('list'),
    attractionId: attraction.id || null,
    isCustom: Boolean(overrides.isCustom),
    name: attraction.name,
    category: attraction.category,
    parkSlug: attraction.parkSlug,
    landName: attraction.landName,
    priority: overrides.priority || 'nice_to_have',
    notes: overrides.notes || '',
    isCompleted: false,
    completedAt: null,
    addedAt: new Date().toISOString(),
    subItems: overrides.subItems || [],
  };
}

export const useListStore = create((set, get) => ({
  lists: {},
  loadFromStorage: async () => {
    const entries = await Promise.all(PARKS.map(async (park) => [park.slug, (await getJson(listKey(park.slug), {items: []})).items || []]));
    set({lists: Object.fromEntries(entries)});
  },
  persistPark: async (parkSlug) => setJson(listKey(parkSlug), {items: get().lists[parkSlug] || []}),
  getListForPark: (parkSlug) => get().lists[parkSlug] || [],
  isOnList: (attractionId, parkSlug) => (get().lists[parkSlug] || []).some((i) => i.attractionId === attractionId),
  addItem: async (attraction, overrides = {}) => {
    const parkSlug = attraction.parkSlug;
    if (attraction.id && get().isOnList(attraction.id, parkSlug)) return get().lists[parkSlug].find((i) => i.attractionId === attraction.id);
    const item = toListItem(attraction, overrides);
    set((state) => ({lists: {...state.lists, [parkSlug]: [...(state.lists[parkSlug] || []), item]}}));
    await get().persistPark(parkSlug);
    return item;
  },
  addCustomItem: async (data) => get().addItem({id: null, ...data}, {isCustom: true, priority: data.priority || 'nice_to_have', notes: data.notes || ''}),
  removeItem: async (itemId) => {
    const parkSlug = Object.keys(get().lists).find((p) => (get().lists[p] || []).some((i) => i.id === itemId));
    if (!parkSlug) return;
    set((state) => ({lists: {...state.lists, [parkSlug]: state.lists[parkSlug].filter((i) => i.id !== itemId)}}));
    await get().persistPark(parkSlug);
  },
  completeItem: async (itemId, completed = true) => {
    let changedPark = null;
    set((state) => {
      const lists = {...state.lists};
      Object.keys(lists).forEach((park) => {
        lists[park] = lists[park].map((i) => {
          if (i.id !== itemId) return i;
          changedPark = park;
          return {...i, isCompleted: completed, completedAt: completed ? new Date().toISOString() : null};
        });
      });
      return {lists};
    });
    if (changedPark) await get().persistPark(changedPark);
  },
  updatePriority: async (itemId, priority) => get().updateItem(itemId, {priority}),
  updateNotes: async (itemId, notes) => get().updateItem(itemId, {notes}),
  updateItem: async (itemId, patch) => {
    let changedPark = null;
    set((state) => {
      const lists = {...state.lists};
      Object.keys(lists).forEach((park) => {
        lists[park] = lists[park].map((i) => i.id === itemId ? (changedPark = park, {...i, ...patch}) : i);
      });
      return {lists};
    });
    if (changedPark) await get().persistPark(changedPark);
  },
  addSubItem: async (itemId, subItem) => {
    let changedPark = null;
    const newSub = {id: createId('sub'), menuItemId: subItem.menuItemId || null, name: subItem.name, note: subItem.note || '', isCompleted: false};
    set((state) => {
      const lists = {...state.lists};
      Object.keys(lists).forEach((park) => {
        lists[park] = lists[park].map((i) => {
          if (i.id !== itemId) return i;
          changedPark = park;
          if (i.subItems.some((s) => s.name === newSub.name)) return i;
          return {...i, subItems: [...i.subItems, newSub]};
        });
      });
      return {lists};
    });
    if (changedPark) await get().persistPark(changedPark);
  },
  completeSubItem: async (itemId, subItemId) => {
    let changedPark = null;
    set((state) => {
      const lists = {...state.lists};
      Object.keys(lists).forEach((park) => {
        lists[park] = lists[park].map((i) => {
          if (i.id !== itemId) return i;
          changedPark = park;
          return {...i, subItems: i.subItems.map((s) => s.id === subItemId ? {...s, isCompleted: !s.isCompleted} : s)};
        });
      });
      return {lists};
    });
    if (changedPark) await get().persistPark(changedPark);
  },
}));
