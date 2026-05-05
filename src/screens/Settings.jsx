import React from 'react';
import { useAppStore } from '../store';

export default function Settings() {
  const setCurrentTab = useAppStore((s) => s.setCurrentTab);
  const settings = useAppStore((s) => s.settings);

  return (
    <div>
      <header className="topbar">
        <button onClick={() => setCurrentTab('home')}>‹ Back</button>
        <h1>Settings</h1>
        <span />
      </header>

      <section className="settings-card">
        <h2>Backup & Sync</h2>
        <p>Placeholder: Supabase backup is not enabled yet.</p>
        <p className="muted">Current setting: {settings.backupEnabled ? 'Enabled' : 'Off'}</p>
      </section>

      <section className="settings-card">
        <h2>Trip Dates</h2>
        <p>Placeholder: add/edit trip dates here later. These will power morning reminders.</p>
      </section>

      <section className="settings-card">
        <h2>Notifications</h2>
        <p>Placeholder: local notifications require mobile packaging or browser notification implementation.</p>
      </section>

      <section className="settings-card">
        <h2>Data</h2>
        <button className="danger" onClick={() => { if (confirm('Clear all local app data?')) { localStorage.clear(); location.reload(); }}}>Clear all local data</button>
      </section>

      <section className="settings-card">
        <h2>About</h2>
        <p>Wish List: Disney Park Planner prototype.</p>
        <p className="muted">Not affiliated with Disney. Replace placeholder content before release.</p>
      </section>
    </div>
  );
}
