import {seedAttractions} from '../data/seedAttractions';
import {fetchAttractionsFromSupabase} from './supabase';
import {getJson, setJson, STORAGE_KEYS} from './storage';

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export async function bootstrapAppData() {
  const cached = await getJson(STORAGE_KEYS.attractionsCache, null);
  const stale = !cached?.cachedAt || Date.now() - new Date(cached.cachedAt).getTime() > WEEK_MS;

  if (!cached || stale) {
    try {
      const supabaseData = await fetchAttractionsFromSupabase();
      if (supabaseData?.length) {
        await setJson(STORAGE_KEYS.attractionsCache, {data: supabaseData, cachedAt: new Date().toISOString(), source: 'supabase'});
        return;
      }
    } catch (error) {
      console.warn('Supabase fetch failed, using seed data', error?.message);
    }
    await setJson(STORAGE_KEYS.attractionsCache, {data: seedAttractions, cachedAt: new Date().toISOString(), source: 'seed'});
  }
}
