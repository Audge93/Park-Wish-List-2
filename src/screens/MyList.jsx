import React, { useState } from 'react';
import { useAppStore } from '../store';
import { categoryColor, categoryIcon, categoryLabel } from '../constants';
import ParkSwitcher from '../components/ParkSwitcher';
import MapScreen from './MapScreen';

export default function MyList() {
  const activePark = useAppStore((s) => s.activePark);
  const lists = useAppStore((s) => s.lists);
  const grouping = useAppStore((s) => s.listGrouping);
  const setGrouping = useAppStore((s) => s.setListGrouping);
  const openDetail = useAppStore((s) => s.openDetail);
  const toggleComplete = useAppStore((s) => s.toggleComplete);
  const [view, setView] = useState('list');
  const [doneOpen, setDoneOpen] = useState(false);
  const items = lists[activePark] || [];
  const incomplete = items.filter((i) => !i.isCompleted);
  const done = items.filter((i) => i.isCompleted);

  const grouped = incomplete.reduce((acc, item) => {
    const key = grouping === 'category' ? categoryLabel(item.category) : item.landName;
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});

  if (view === 'map') return <div><ListHeader view={view} setView={setView} /><MapScreen myListOnly /></div>;

  return (
    <div>
      <ListHeader view={view} setView={setView} />
      <ParkSwitcher />
      <div className="segmented compact">
        <button className={grouping === 'category' ? 'active' : ''} onClick={() => setGrouping('category')}>By Category</button>
        <button className={grouping === 'land' ? 'active' : ''} onClick={() => setGrouping('land')}>By Land</button>
      </div>

      {incomplete.length === 0 && <p className="empty">Your list is empty for this park. Search or use the map to add things you do not want to miss.</p>}

      {Object.entries(grouped).map(([group, groupItems]) => (
        <section key={group} className="list-section">
          <h2>{group} <small>{groupItems.length}</small></h2>
          {groupItems.map((item) => <ListRow key={item.id} item={item} openDetail={openDetail} toggleComplete={toggleComplete} />)}
        </section>
      ))}

      {done.length > 0 && (
        <section className="done-section">
          <button className="done-header" onClick={() => setDoneOpen(!doneOpen)}>Done ({done.length}) {doneOpen ? '⌃' : '⌄'}</button>
          {doneOpen && done.map((item) => <ListRow key={item.id} item={item} openDetail={openDetail} toggleComplete={toggleComplete} muted />)}
        </section>
      )}
    </div>
  );
}

function ListHeader({ view, setView }) {
  return (
    <header className="topbar">
      <h1>My Wish List</h1>
      <div className="view-toggle">
        <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>☰ List</button>
        <button className={view === 'map' ? 'active' : ''} onClick={() => setView('map')}>⌖ Map</button>
      </div>
    </header>
  );
}

function ListRow({ item, openDetail, toggleComplete, muted }) {
  return (
    <div className={`wish-row ${muted ? 'muted-row' : ''}`}>
      <button className="pin-dot" style={{ backgroundColor: categoryColor(item.category) }}>{categoryIcon(item.category)}</button>
      <div className="result-main" onClick={() => openDetail(item)}>
        <strong>{item.name}</strong>
        <span>{item.landName}{item.priority === 'must_do' ? ' • Must Do ⭐' : ''}{item.subItems?.length ? ` • ${item.subItems.length} items` : ''}</span>
      </div>
      <button className="check-btn" onClick={() => toggleComplete(item.id)}>{item.isCompleted ? '✓' : '○'}</button>
    </div>
  );
}
