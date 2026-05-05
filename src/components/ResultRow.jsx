import React from 'react';
import { categoryColor, categoryIcon } from '../constants';
import { useAppStore } from '../store';

export default function ResultRow({ attraction }) {
  const openDetail = useAppStore((s) => s.openDetail);
  const addAttraction = useAppStore((s) => s.addAttraction);
  const isOnList = useAppStore((s) => s.isOnList)(attraction.id, attraction.parkSlug);

  return (
    <div className="result-row">
      <button className="pin-dot" style={{ backgroundColor: categoryColor(attraction.category) }} onClick={() => openDetail(attraction)}>
        {categoryIcon(attraction.category)}
      </button>
      <div className="result-main" onClick={() => openDetail(attraction)}>
        <strong>{attraction.name}</strong>
        <span>{attraction.landName}{attraction.lightningLane ? ' • ⚡ Lightning Lane' : ''}</span>
      </div>
      <button className={isOnList ? 'add-btn added' : 'add-btn'} onClick={() => addAttraction(attraction)}>
        {isOnList ? '✓' : '+'}
      </button>
    </div>
  );
}
