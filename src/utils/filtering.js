export function filterAttractions(attractions, {parkSlug, query = '', category = 'all'} = {}) {
  const q = query.trim().toLowerCase();
  return attractions.filter((item) => {
    const parkOk = !parkSlug || item.parkSlug === parkSlug;
    const categoryOk = category === 'all' || item.category === category;
    const text = [item.name, item.landName, item.category, item.description, ...(item.menuItems || []).map((m) => m.name)].join(' ').toLowerCase();
    const queryOk = !q || text.includes(q);
    return parkOk && categoryOk && queryOk && item.isActive !== false;
  });
}

export function groupBy(items, keyGetter) {
  return items.reduce((acc, item) => {
    const key = keyGetter(item) || 'Other';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}
