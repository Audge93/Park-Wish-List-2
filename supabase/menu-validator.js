/**
 * Menu validator placeholder.
 * Deploy as Supabase Edge Function or Node cron later.
 * TODO:
 * 1. Fetch active menu_items joined to parent attraction restaurant URLs.
 * 2. Check approved source page for each item name.
 * 3. Update is_verified and last_verified_at.
 * 4. Send admin summary.
 */
export async function validateMenus() {
  return {verified: 0, flagged: 0, todo: true};
}
