import React from 'react';
import { useAppStore } from '../store';
import { PARKS } from '../constants';
import ParkSwitcher from '../components/ParkSwitcher';
import AttractionCard from '../components/AttractionCard';

export default function Home() {
  const activePark = useAppStore((s) => s.activePark);
  const setCurrentTab = useAppStore((s) => s.setCurrentTab);
  const lists = useAppStore((s) => s.lists);
  const attractions = useAppStore((s) => s.attractions);
  const openDetail = useAppStore((s) => s.openDetail);
  const park = PARKS.find((p) => p.slug === activePark);
  const incomplete = (lists[activePark] || []).filter((i) => !i.isCompleted);
  const highlights = attractions.filter((a) => a.parkSlug === activePark && a.tier === 1);

  return (
    <div>
      <header className="topbar">
        <div><span className="logo">✦</span> <strong>Wish List</strong></div>
        <button onClick={() => setCurrentTab('settings')}>⚙</button>
      </header>
      <ParkSwitcher />
      {incomplete.length > 0 && <p className="muted">{incomplete.length} things planned for {park?.name}</p>}

      {incomplete.length > 0 && (
        <section>
          <h2>Your Wish List</h2>
          <div className="horizontal-list">
            {incomplete.map((item) => <button className="list-card" key={item.id} onClick={() => openDetail(item)}><strong>{item.name}</strong><span>{item.landName}</span></button>)}
          </div>
        </section>
      )}

      <section>
        <h2>Park Highlights</h2>
        <div className="horizontal-cards">
          {highlights.map((a) => <AttractionCard key={a.id} attraction={a} />)}
        </div>
      </section>
    </div>
  );
}
