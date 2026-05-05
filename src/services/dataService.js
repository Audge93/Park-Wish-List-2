import { attractions, menuItems } from '../data/seedData';
import { supabase } from './supabase';

export async function loadAttractions() {
  // Prototype default: local seed data.
  // TODO: When Supabase is ready, uncomment/finalize this path.
  if (supabase) {
    try {
      const { data, error } = await supabase.from('attractions').select('*').eq('is_active', true);
      if (!error && data?.length) {
        return data.map((row) => ({
          id: row.id,
          parkSlug: row.park_slug || row.parkSlug,
          landName: row.land_name || row.landName,
          name: row.name,
          category: row.category,
          tier: row.tier,
          description: row.description,
          heightRequirement: row.height_requirement,
          lightningLane: row.lightning_lane,
          diningType: row.dining_type,
          mapX: row.map_x,
          mapY: row.map_y
        }));
      }
    } catch (e) {
      console.warn('Supabase attraction fetch failed; using seed data.', e);
    }
  }
  return attractions;
}

export async function loadMenuItems() {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('menu_items').select('*').eq('is_active', true);
      if (!error && data?.length) {
        return data.map((row) => ({
          id: row.id,
          attractionId: row.attraction_id,
          name: row.name,
          description: row.description,
          isIconic: row.is_iconic
        }));
      }
    } catch (e) {
      console.warn('Supabase menu fetch failed; using seed data.', e);
    }
  }
  return menuItems;
}
