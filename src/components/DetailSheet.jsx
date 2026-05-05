import React, { useMemo, useState } from 'react';
import { useAppStore } from '../store';
import { categoryColor, categoryIcon, categoryLabel, PARKS } from '../constants';

export default function DetailSheet() {
  const selected = useAppStore((s) => s.selectedItem);
  const detailMode = useAppStore((s) => s.detailMode);
  const closeDetail = useAppStore((s) => s.closeDetail);
  const addAttraction = useAppStore((s) => s.addAttraction);
  const removeItem = useAppStore((s) => s.removeItem);
  const updateItem = useAppStore((s) => s.updateItem);
  const toggleComplete = useAppStore((s) => s.toggleComplete);
  const addSubItem = useAppStore((s) => s.addSubItem);
  const toggleSubItem = useAppStore((s) => s.toggleSubItem);
  const isOnList = useAppStore((s) => s.isOnList);
  const lists = useAppStore((s) => s.lists);
  const menuItems = useAppStore((s) => s.menuItems);
  const setCurrentTab = useAppStore((s) => s.setCurrentTab);
  const [customSub, setCustomSub] = useState('');

  const listItem = useMemo(() => {
    if (!selected) return null;
    if (selected.attractionId || selected.isCustom) return selected;
    return lists[selected.parkSlug]?.find((item) => item.attractionId === selected.id) || null;
  }, [selected, lists]);

  if (!selected) return null;

  const item = listItem || selected;
  const onList = !!listItem || selected.isCustom;
  const park = PARKS.find((p) => p.slug === item.parkSlug || p.slug === selected.parkSlug);
  const attractionMenus = menuItems.filter((m) => m.attractionId === (selected.attractionId || selected.id));
  const isDining = item.category === 'dining';

  const addMenu = (menu) => {
    const target = listItem || addAttraction(selected, false);
    if (!target.subItems?.some((s) => s.menuItemId === menu.id)) {
      addSubItem(target.id, { menuItemId: menu.id, name: menu.name });
    }
  };

  return (
    <div className="sheet-backdrop" onClick={closeDetail}>
      <section className="detail-sheet" onClick={(e) => e.stopPropagation()}>
        <button className="sheet-close" onClick={closeDetail}>×</button>
        <div className="sheet-hero" style={{ background: `linear-gradient(135deg, ${categoryColor(item.category)}, ${park?.theme || '#1A1814'})` }}>
          <span>{categoryIcon(item.category)}</span>
        </div>

        <div className="sheet-content">
          <span className="badge" style={{ backgroundColor: categoryColor(item.category) }}>{categoryLabel(item.category)}</span>
          <h2>{item.name}</h2>
          <p className="muted">{item.landName}{selected.lightningLane ? ' • ⚡ Lightning Lane' : ''}</p>
          {selected.description && <p>{selected.description}</p>}
          {selected.heightRequirement && <p><strong>Height:</strong> {selected.heightRequirement}</p>}
          {selected.diningType && <p><strong>Dining:</strong> {selected.diningType.replace('_', ' ')}</p>}

          {onList && (
            <>
              <div className="field">
                <label>Priority</label>
                <div className="segmented">
                  <button className={item.priority === 'must_do' ? 'active' : ''} onClick={() => updateItem(item.id, { priority: 'must_do' })}>Must Do ⭐</button>
                  <button className={item.priority !== 'must_do' ? 'active' : ''} onClick={() => updateItem(item.id, { priority: 'nice_to_have' })}>Nice to Have</button>
                </div>
              </div>
              <div className="field">
                <label>Notes</label>
                <textarea value={item.notes || ''} placeholder="Add a note..." onChange={(e) => updateItem(item.id, { notes: e.target.value })} />
              </div>
            </>
          )}

          {isDining && (onList || detailMode === 'sub-items') && (
            <div className="field">
              <label>Menu items to remember</label>
              {attractionMenus.map((menu) => {
                const checked = item.subItems?.some((s) => s.menuItemId === menu.id);
                return <button key={menu.id} className={`sub-row ${checked ? 'checked' : ''}`} onClick={() => addMenu(menu)}>{checked ? '✓' : '+'} {menu.name}</button>;
              })}
              {item.subItems?.map((sub) => (
                <button key={sub.id} className={`sub-row ${sub.isCompleted ? 'done' : ''}`} onClick={() => toggleSubItem(item.id, sub.id)}>
                  {sub.isCompleted ? '✓' : '○'} {sub.name}
                </button>
              ))}
              <div className="inline-add">
                <input value={customSub} placeholder="Add custom menu item" onChange={(e) => setCustomSub(e.target.value)} />
                <button onClick={() => { if (customSub.trim()) { addSubItem(item.id, { name: customSub.trim() }); setCustomSub(''); }}}>Add</button>
              </div>
            </div>
          )}

          {!onList ? (
            <button className="primary" onClick={() => addAttraction(selected)}>Add to My List</button>
          ) : (
            <>
              <button className="primary disabled">Already on your list ✓</button>
              <button className="secondary" onClick={() => toggleComplete(item.id)}>{item.isCompleted ? 'Move Back to List' : 'Mark as Done'}</button>
              <button className="danger" onClick={() => removeItem(item.id)}>Remove from List</button>
            </>
          )}

          {!item.isCustom && (
            <button className="secondary" onClick={() => { closeDetail(); setCurrentTab('map'); }}>View on Map</button>
          )}

          {(item.category === 'show' || item.category === 'meet_greet' || item.category === 'experience') && (
            <p className="warning">Check the My Disney Experience app for today’s current times.</p>
          )}
        </div>
      </section>
    </div>
  );
}
