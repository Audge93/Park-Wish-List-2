export const CATEGORIES = [
  {key: 'all', label: 'All', icon: '✨'},
  {key: 'ride', label: 'Rides', icon: '🎢'},
  {key: 'dining', label: 'Dining', icon: '🍽️'},
  {key: 'show', label: 'Shows', icon: '🎭'},
  {key: 'meet_greet', label: 'Meet & Greets', icon: '👋'},
  {key: 'experience', label: 'Experiences', icon: '⭐'},
];

export const CATEGORY_LABELS = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.label]));
export const CATEGORY_ICONS = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.icon]));
