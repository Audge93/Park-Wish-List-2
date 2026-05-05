import React from 'react';
import { useAppStore } from '../store';
import { PARKS } from '../constants';
import CategoryChips from '../components/CategoryChips';
import ResultRow from '../components/ResultRow';
import AttractionCard from '../components/AttractionCard';
import CustomItemModal from './custom/CustomItemModal';

export default function Search() {
  const activePark = useAppStore((s) => s.activePark);
  const attractions = useAppStore((s) => s.attractions);
  const query = useAppStore((s) => s.searchQuery);
  const setQuery = useAppStore((s) => s.setSearchQuery);
  const filter = useAppStore((s) => s.searchFilter);
  const setFilter = useAppStore((s) => s.setSearchFilter);
  const mode = useAppStore((s) => s.browseMode);
  const setMode = useAppStore((s) => s.setBrowseMode);
  const [customOpen, setCustomOpen] = React.useState(false);
  const park = PARKS.find((p) => p.slug === activePark);

  const filtered = attractions.filter((a) => {
    if (a.parkSlug !== activePark) return false;
    if (filter !== 'all' && a.category !== filter) return false;
    const hay = `${a.name} ${a.landName} ${a.category}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  const collections = [
    ['Must-Do Rides', filtered.filter((a) => a.category === 'ride' && a.tier === 1)],
    ['Iconic Eats', filtered.filter((a) => a.category === 'dining' && a.tier === 1)],
    [`Only at ${park?.name}`, filtered.filter((a) => a.category === 'experience' || a.tier === 1).slice(0, 6)],
    ['Meet Your Favorites', filtered.filter((a) => a.category === 'meet_greet')],
    ["Don’t Miss the Shows", filtered.filter((a) => a.category === 'show')]
  ];

  return (
    <div>
      <h1>Search</h1>
      <div className="search-box">
        <span>⌕</span>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search rides, food, experiences..." />
        {query && <button onClick={() => setQuery('')}>×</button>}
      </div>
      <p className="scope">Searching in {park?.name}</p>
      <CategoryChips value={filter} onChange={setFilter} />
      <div className="mode-row">
        <button className={mode === 'search' ? 'active' : ''} onClick={() => setMode('search')}>Browse</button>
        <button className={mode === 'discover' ? 'active' : ''} onClick={() => setMode('discover')}>Discover</button>
      </div>

      {mode === 'search' ? (
        <div className="results">
          {filtered.length ? filtered.map((a) => <ResultRow key={a.id} attraction={a} />) : <p className="empty">No results for “{query}” in {park?.name}. Try a different search.</p>}
        </div>
      ) : (
        <div>
          {collections.map(([title, items]) => items.length > 0 && (
            <section key={title}>
              <h2>{title}</h2>
              <div className="horizontal-cards">{items.map((a) => <AttractionCard key={a.id} attraction={a} />)}</div>
            </section>
          ))}
        </div>
      )}

      <button className="fab" onClick={() => setCustomOpen(true)}>+</button>
      {customOpen && <CustomItemModal onClose={() => setCustomOpen(false)} />}
    </div>
  );
}
