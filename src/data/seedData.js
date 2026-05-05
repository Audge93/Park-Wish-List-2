export const attractions = [
  // Magic Kingdom
  { id:'mk-001', parkSlug:'magic-kingdom', landName:'Fantasyland', name:'Seven Dwarfs Mine Train', category:'ride', tier:1, description:'A family coaster through the diamond mine with swinging ride vehicles.', heightRequirement:'38 inches', lightningLane:true, mapX:.57, mapY:.35 },
  { id:'mk-002', parkSlug:'magic-kingdom', landName:'Liberty Square', name:'Haunted Mansion', category:'ride', tier:1, description:'A spooky tour through a mansion with 999 happy haunts.', heightRequirement:null, lightningLane:true, mapX:.43, mapY:.41 },
  { id:'mk-003', parkSlug:'magic-kingdom', landName:'Adventureland', name:'Jungle Cruise', category:'ride', tier:1, description:'A pun-filled riverboat cruise through exotic jungle scenes.', heightRequirement:null, lightningLane:true, mapX:.25, mapY:.56 },
  { id:'mk-004', parkSlug:'magic-kingdom', landName:'Fantasyland', name:'Be Our Guest Restaurant', category:'dining', tier:1, description:'Dine inside the Beast’s enchanted castle.', diningType:'table_service', lightningLane:false, mapX:.62, mapY:.29 },
  { id:'mk-005', parkSlug:'magic-kingdom', landName:'Fantasyland', name:'The Friar’s Nook', category:'dining', tier:2, description:'Quick-service comfort food near Fantasyland.', diningType:'quick_service', mapX:.52, mapY:.38 },
  { id:'mk-006', parkSlug:'magic-kingdom', landName:'Main Street, U.S.A.', name:'Festival of Fantasy Parade', category:'show', tier:1, description:'A colorful daytime parade with classic Disney characters.', mapX:.49, mapY:.72 },
  { id:'mk-007', parkSlug:'magic-kingdom', landName:'Town Square Theater', name:'Meet Mickey Mouse', category:'meet_greet', tier:1, description:'Meet Mickey near the park entrance.', mapX:.50, mapY:.84 },
  { id:'mk-008', parkSlug:'magic-kingdom', landName:'Tomorrowland', name:'TRON Lightcycle / Run', category:'ride', tier:1, description:'A high-speed launch coaster inspired by TRON.', heightRequirement:'48 inches', lightningLane:true, mapX:.76, mapY:.29 },
  // EPCOT
  { id:'ep-001', parkSlug:'epcot', landName:'World Discovery', name:'Guardians of the Galaxy: Cosmic Rewind', category:'ride', tier:1, description:'A thrilling storytelling coaster with rotating vehicles.', heightRequirement:'42 inches', lightningLane:true, mapX:.57, mapY:.28 },
  { id:'ep-002', parkSlug:'epcot', landName:'World Nature', name:'Soarin’ Around the World', category:'ride', tier:1, description:'A simulated hang-gliding journey over global landmarks.', heightRequirement:'40 inches', lightningLane:true, mapX:.32, mapY:.38 },
  { id:'ep-003', parkSlug:'epcot', landName:'World Showcase - France', name:'Remy’s Ratatouille Adventure', category:'ride', tier:1, description:'A trackless 4D ride through Gusteau’s restaurant.', heightRequirement:null, lightningLane:true, mapX:.22, mapY:.69 },
  { id:'ep-004', parkSlug:'epcot', landName:'World Showcase - France', name:'Chefs de France', category:'dining', tier:1, description:'A classic French table-service restaurant in the France pavilion.', diningType:'table_service', mapX:.24, mapY:.66 },
  { id:'ep-005', parkSlug:'epcot', landName:'World Showcase - Mexico', name:'La Cava del Tequila', category:'dining', tier:1, description:'A cozy tequila bar tucked inside the Mexico pavilion.', diningType:'snack', mapX:.71, mapY:.58 },
  { id:'ep-006', parkSlug:'epcot', landName:'World Showcase', name:'Luminous The Symphony of Us', category:'show', tier:1, description:'A nighttime spectacular over World Showcase Lagoon.', mapX:.50, mapY:.62 },
  { id:'ep-007', parkSlug:'epcot', landName:'World Celebration', name:'Spaceship Earth', category:'ride', tier:1, description:'A slow-moving journey through the history of communication.', heightRequirement:null, lightningLane:true, mapX:.49, mapY:.14 },
  { id:'ep-008', parkSlug:'epcot', landName:'World Showcase - Norway', name:'Meet Anna and Elsa', category:'meet_greet', tier:1, description:'Meet Anna and Elsa in their Royal Sommerhus.', mapX:.64, mapY:.53 },
  // Hollywood Studios
  { id:'hs-001', parkSlug:'hollywood-studios', landName:'Star Wars: Galaxy’s Edge', name:'Star Wars: Rise of the Resistance', category:'ride', tier:1, description:'A large-scale Star Wars attraction blending multiple ride systems.', heightRequirement:'40 inches', lightningLane:true, mapX:.73, mapY:.61 },
  { id:'hs-002', parkSlug:'hollywood-studios', landName:'Toy Story Land', name:'Slinky Dog Dash', category:'ride', tier:1, description:'A family coaster through Andy’s backyard.', heightRequirement:'38 inches', lightningLane:true, mapX:.59, mapY:.44 },
  { id:'hs-003', parkSlug:'hollywood-studios', landName:'Sunset Boulevard', name:'The Twilight Zone Tower of Terror', category:'ride', tier:1, description:'A haunted elevator drop ride in the Hollywood Tower Hotel.', heightRequirement:'40 inches', lightningLane:true, mapX:.24, mapY:.29 },
  { id:'hs-004', parkSlug:'hollywood-studios', landName:'Star Wars: Galaxy’s Edge', name:'Ronto Roasters', category:'dining', tier:1, description:'Quick-service wraps and snacks in Black Spire Outpost.', diningType:'quick_service', mapX:.70, mapY:.58 },
  { id:'hs-005', parkSlug:'hollywood-studios', landName:'Commissary Lane', name:'Sci-Fi Dine-In Theater', category:'dining', tier:1, description:'Table-service dining in cars at a retro drive-in movie theater.', diningType:'table_service', mapX:.43, mapY:.50 },
  { id:'hs-006', parkSlug:'hollywood-studios', landName:'Animation Courtyard', name:'The Little Mermaid - A Musical Adventure', category:'show', tier:1, description:'A stage show inspired by The Little Mermaid.', mapX:.42, mapY:.36 },
  { id:'hs-007', parkSlug:'hollywood-studios', landName:'Star Wars Launch Bay', name:'Meet Darth Vader', category:'meet_greet', tier:2, description:'A Star Wars character encounter.', mapX:.43, mapY:.32 },
  { id:'hs-008', parkSlug:'hollywood-studios', landName:'Hollywood Boulevard', name:'Mickey & Minnie’s Runaway Railway', category:'ride', tier:1, description:'A trackless ride through a Mickey cartoon short.', heightRequirement:null, lightningLane:true, mapX:.47, mapY:.21 },
  // Animal Kingdom
  { id:'ak-001', parkSlug:'animal-kingdom', landName:'Pandora - The World of Avatar', name:'Avatar Flight of Passage', category:'ride', tier:1, description:'A breathtaking simulated flight on the back of a banshee.', heightRequirement:'44 inches', lightningLane:true, mapX:.24, mapY:.42 },
  { id:'ak-002', parkSlug:'animal-kingdom', landName:'Africa', name:'Kilimanjaro Safaris', category:'ride', tier:1, description:'A safari ride through animal habitats.', heightRequirement:null, lightningLane:true, mapX:.52, mapY:.35 },
  { id:'ak-003', parkSlug:'animal-kingdom', landName:'Asia', name:'Expedition Everest', category:'ride', tier:1, description:'A high-speed coaster through the Forbidden Mountain.', heightRequirement:'44 inches', lightningLane:true, mapX:.70, mapY:.48 },
  { id:'ak-004', parkSlug:'animal-kingdom', landName:'Pandora - The World of Avatar', name:'Satu’li Canteen', category:'dining', tier:1, description:'A quick-service restaurant with customizable bowls.', diningType:'quick_service', mapX:.27, mapY:.47 },
  { id:'ak-005', parkSlug:'animal-kingdom', landName:'Africa', name:'Tusker House Restaurant', category:'dining', tier:1, description:'A buffet-style character dining location with African-inspired flavors.', diningType:'table_service', mapX:.49, mapY:.43 },
  { id:'ak-006', parkSlug:'animal-kingdom', landName:'Discovery Island', name:'Festival of the Lion King', category:'show', tier:1, description:'A high-energy stage show with music, acrobatics, and characters.', mapX:.43, mapY:.52 },
  { id:'ak-007', parkSlug:'animal-kingdom', landName:'Discovery Island', name:'Meet Favorite Disney Pals', category:'meet_greet', tier:1, description:'Meet classic characters in adventure outfits.', mapX:.49, mapY:.58 },
  { id:'ak-008', parkSlug:'animal-kingdom', landName:'Discovery Island', name:'Tree of Life Awakenings', category:'experience', tier:1, description:'A projection experience on the Tree of Life after dark.', mapX:.50, mapY:.50 }
];

export const menuItems = [
  { id:'menu-mk-004-1', attractionId:'mk-004', name:'The Grey Stuff', description:'A signature dessert item.', isIconic:true },
  { id:'menu-mk-004-2', attractionId:'mk-004', name:'French Onion Soup', description:'Classic soup option.', isIconic:true },
  { id:'menu-mk-005-1', attractionId:'mk-005', name:'Creamy Bacon Macaroni & Cheese Tots', description:'A hearty snack/meal item.', isIconic:true },
  { id:'menu-ep-004-1', attractionId:'ep-004', name:'Quiche Lorraine', description:'Classic French quiche.', isIconic:true },
  { id:'menu-ep-004-2', attractionId:'ep-004', name:'Crème Brûlée', description:'Classic French dessert.', isIconic:true },
  { id:'menu-ep-005-1', attractionId:'ep-005', name:'Avocado Margarita', description:'Popular specialty drink.', isIconic:true },
  { id:'menu-hs-004-1', attractionId:'hs-004', name:'Ronto Wrap', description:'Signature Galaxy’s Edge wrap.', isIconic:true },
  { id:'menu-hs-005-1', attractionId:'hs-005', name:'Fried Dill Pickles', description:'Popular appetizer.', isIconic:true },
  { id:'menu-ak-004-1', attractionId:'ak-004', name:'Cheeseburger Steamed Pods', description:'Bao-style pods.', isIconic:true },
  { id:'menu-ak-004-2', attractionId:'ak-004', name:'Ocean Moon Bowl', description:'Colorful customizable bowl.', isIconic:true },
  { id:'menu-ak-005-1', attractionId:'ak-005', name:'Character Breakfast', description:'Buffet meal with characters.', isIconic:true }
];
