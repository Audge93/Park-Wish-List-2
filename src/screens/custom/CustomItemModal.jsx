import React, { useState } from 'react';
import { CATEGORIES, PARKS } from '../../constants';
import { useAppStore } from '../../store';

const landOptions = {
  'magic-kingdom': ['Adventureland', 'Fantasyland', 'Frontierland', 'Liberty Square', 'Main Street, U.S.A.', 'Tomorrowland'],
  epcot: ['World Celebration', 'World Discovery', 'World Nature', 'World Showcase'],
  'hollywood-studios': ['Hollywood Boulevard', 'Sunset Boulevard', 'Toy Story Land', 'Star Wars: Galaxy’s Edge', 'Animation Courtyard'],
  'animal-kingdom': ['Africa', 'Asia', 'Discovery Island', 'Pandora - The World of Avatar', 'DinoLand U.S.A.']
};

export default function CustomItemModal({ onClose }) {
  const activePark = useAppStore((s) => s.activePark);
  const addCustomItem = useAppStore((s) => s.addCustomItem);
  const [form, setForm] = useState({ name: '', category: 'experience', parkSlug: activePark, landName: landOptions[activePark][0], priority: 'nice_to_have', notes: '' });

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value, ...(key === 'parkSlug' ? { landName: landOptions[value][0] } : {}) }));
  const valid = form.name.trim().length >= 2 && form.landName;

  return (
    <div className="sheet-backdrop">
      <section className="modal-card">
        <header className="modal-header">
          <button onClick={onClose}>Cancel</button>
          <strong>Add Custom Item</strong>
          <button disabled={!valid} onClick={() => { addCustomItem(form); onClose(); }}>Save</button>
        </header>
        <label>Item Name</label>
        <input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="e.g. Get castle photos" />
        <label>Category</label>
        <select value={form.category} onChange={(e) => update('category', e.target.value)}>
          {CATEGORIES.filter((c) => c.key !== 'all').map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
        </select>
        <label>Park</label>
        <select value={form.parkSlug} onChange={(e) => update('parkSlug', e.target.value)}>
          {PARKS.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
        </select>
        <label>Land/Area</label>
        <select value={form.landName} onChange={(e) => update('landName', e.target.value)}>
          {landOptions[form.parkSlug].map((land) => <option key={land}>{land}</option>)}
        </select>
        <label>Priority</label>
        <select value={form.priority} onChange={(e) => update('priority', e.target.value)}>
          <option value="nice_to_have">Nice to Have</option>
          <option value="must_do">Must Do</option>
        </select>
        <label>Notes</label>
        <textarea value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Optional note" />
      </section>
    </div>
  );
}
