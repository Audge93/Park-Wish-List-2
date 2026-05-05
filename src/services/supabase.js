import {createClient} from '@supabase/supabase-js';

// TODO: React Native does not load .env automatically. Wire your chosen env package
// such as react-native-config, then replace these placeholders.
const SUPABASE_URL = 'TODO_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'TODO_SUPABASE_ANON_KEY';

export const supabase =
  SUPABASE_URL.startsWith('http') && !SUPABASE_ANON_KEY.startsWith('TODO')
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

export async function fetchAttractionsFromSupabase() {
  if (!supabase) return null;
  const {data, error} = await supabase
    .from('attractions')
    .select('*, menu_items(*)')
    .eq('is_active', true)
    .order('tier', {ascending: true});
  if (error) throw error;
  return data;
}
