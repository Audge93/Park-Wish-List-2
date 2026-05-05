import React from 'react';
import { categoryColor, categoryIcon, categoryLabel } from '../constants';
import { useAppStore } from '../store';

export default function AttractionCard({ attraction }) {
  const openDetail = useAppStore((s) => s.openDetail);
  const addAttraction = useAppStore((s) => s.addAttraction);
  const isOnList = useAppStore((s) => s.isOnList)(attraction.id, attraction.parkSlug);

  return (
    <article className="card" onClick={() => openDetail(attraction)}>
      <div className="card-art" style={{ background: `linear-gradient(135deg, ${categoryColor(attraction.category)}, #1A1814)` }}>
        <span>{categoryIcon(attraction.category)}</span>
      </div>
      <div className="card-body">
        <div className="badge" style={{ backgroundColor: categoryColor(attraction.category) }}>{categoryLabel(attraction.category)}</div>
        <h3>{attraction.name}</h3>
        <p>{attraction.landName}</p>
        <button className={isOnList ? 'mini-btn checked' : 'mini-btn'} onClick={(e) => { e.stopPropagation(); addAttraction(attraction); }}>
          {isOnList ? '✓ Added' : '+ Add'}
        </button>
      </div>
    </article>
  );
}
