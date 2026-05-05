export const PARK_SLUGS = {
  MK: 'magic-kingdom',
  EPCOT: 'epcot',
  HS: 'hollywood-studios',
  AK: 'animal-kingdom',
};

export const PARKS = [
  {slug: PARK_SLUGS.MK, name: 'Magic Kingdom', shortName: 'MK', icon: '🏰', themeColor: '#4A1FB0'},
  {slug: PARK_SLUGS.EPCOT, name: 'EPCOT', shortName: 'EPCOT', icon: '🌐', themeColor: '#1A7A9C'},
  {slug: PARK_SLUGS.HS, name: 'Hollywood Studios', shortName: 'HS', icon: '🎬', themeColor: '#B04A1F'},
  {slug: PARK_SLUGS.AK, name: 'Animal Kingdom', shortName: 'AK', icon: '🌳', themeColor: '#4A7A1F'},
];

export function getPark(slug) {
  return PARKS.find((p) => p.slug === slug) || PARKS[0];
}
