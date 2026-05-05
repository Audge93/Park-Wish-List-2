// TODO production: serialize list/settings and upsert into Supabase user_backups.
export async function syncBackupIfEnabled() { return {ok: false, reason: 'backup_not_configured'}; }
export async function restoreBackup() { return null; }
