import React from 'react';
import { CATEGORIES } from '../constants';

export default function CategoryChips({ value, onChange }) {
  return (
    <div className="chip-row">
      {CATEGORIES.map((cat) => (
        <button key={cat.key} className={`chip ${value === cat.key ? 'active' : ''}`} onClick={() => onChange(cat.key)}>
          {cat.icon} {cat.label}
        </button>
      ))}
    </div>
  );
}
