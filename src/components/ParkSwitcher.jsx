import React from 'react';
import { PARKS } from '../constants';
import { useAppStore } from '../store';

export default function ParkSwitcher() {
  const activePark = useAppStore((s) => s.activePark);
  const setActivePark = useAppStore((s) => s.setActivePark);

  return (
    <div className="pill-row">
      {PARKS.map((park) => (
        <button key={park.slug} className={`pill ${activePark === park.slug ? 'active' : ''}`} onClick={() => setActivePark(park.slug)}>
          {park.shortName}
        </button>
      ))}
    </div>
  );
}
