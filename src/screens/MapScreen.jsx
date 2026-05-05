import React from 'react';
import { useAppStore } from '../store';
import { PARKS, categoryColor, categoryIcon } from '../constants';
import ParkSwitcher from '../components/ParkSwitcher';
import CategoryChips from '../components/CategoryChips';

export default function MapScreen({ myListOnly = false }) {
  const activePark = useAppStore((s) => s.activePark);
  const attractions = useAppStore((s) => s.attractions);
  const lists = useAppStore((s) => s.lists);
  const filter = useAppStore((s) => s.searchFilter);
  const setFilter = useAppStore((s) => s.setSearchFilter);
  const openDetail = useAppStore((s) => s.openDetail);
  const park = PARKS.find((p) => p.slug === activePark);
  const listItems = lists[activePark] || [];
  const listIds = new Set(listItems.map((i) => i.attractionId));
  const pinItems = attractions
    .filter((a) => a.parkSlug === activePark)
    .filter((a) => filter === 'all' || a.category === filter)
    .filter((a) => !myListOnly || listIds.has(a.id));

  return (
    <div>
      {!myListOnly && <h1>Map</h1>}
      <ParkSwitcher />
      <CategoryChips value={filter} onChange={setFilter} />
      {listItems.length === 0 && <div className="map-banner">Add items to your list to highlight them on the map</div>}
      <div className="map-frame" style={{ background: `radial-gradient(circle at 50% 50%, ${park?.theme}, #F2F0EB 55%, #FAFAF8)` }}>
        <div className="map-title">{park?.icon}<br />{park?.name}<small>Placeholder map image</small></div>
        {pinItems.map((a) => {
          const active = listIds.has(a.id);
          return (
            <button
              key={a.id}
              className={`map-pin ${active ? 'active' : ''}`}
              style={{ left: `${a.mapX * 100}%`, top: `${a.mapY * 100}%`, backgroundColor: active ? categoryColor(a.category) : '#C4C0B8' }}
              onClick={() => openDetail(active ? listItems.find((i) => i.attractionId === a.id) : a)}
              title={a.name}
            >
              {categoryIcon(a.category)}
            </button>
          );
        })}
      </div>
      <p className="warning">Prototype note: replace this placeholder with real park map artwork and verified coordinates.</p>
    </div>
  );
}
