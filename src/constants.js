export const COLORS = {
  background: '#FAFAF8',
  surface: '#F2F0EB',
  textPrimary: '#1A1814',
  textSecondary: '#8C8880',
  accentGold: '#C9A84C',
  ride: '#4A90D9',
  dining: '#E8734A',
  show: '#9B6DD6',
  meet_greet: '#E85D8A',
  experience: '#C9A84C',
  inactive: '#C4C0B8',
  error: '#D94A4A',
  success: '#4CAF50'
};

export const PARKS = [
  { slug: 'magic-kingdom', name: 'Magic Kingdom', shortName: 'MK', icon: '🏰', theme: '#4A1FB0' },
  { slug: 'epcot', name: 'EPCOT', shortName: 'EPCOT', icon: '🌐', theme: '#1A7A9C' },
  { slug: 'hollywood-studios', name: 'Hollywood Studios', shortName: 'HS', icon: '🎬', theme: '#B04A1F' },
  { slug: 'animal-kingdom', name: 'Animal Kingdom', shortName: 'AK', icon: '🌳', theme: '#4A7A1F' }
];

export const CATEGORIES = [
  { key: 'all', label: 'All', icon: '✨' },
  { key: 'ride', label: 'Rides', icon: '🎢' },
  { key: 'dining', label: 'Dining', icon: '🍽️' },
  { key: 'show', label: 'Shows', icon: '🎭' },
  { key: 'meet_greet', label: 'Meet & Greets', icon: '👋' },
  { key: 'experience', label: 'Experiences', icon: '⭐' }
];

export const categoryLabel = (key) => CATEGORIES.find((c) => c.key === key)?.label || key;
export const categoryIcon = (key) => CATEGORIES.find((c) => c.key === key)?.icon || '📍';
export const categoryColor = (key) => COLORS[key] || COLORS.accentGold;
