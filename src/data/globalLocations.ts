// Global Intelligence Database - Comprehensive Location Structure
export interface LocationCategory {
  id: string;
  name: string;
  description: string;
  classification: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP SECRET';
  color: string;
  icon: string;
  subcategories: LocationSubcategory[];
}

export interface LocationSubcategory {
  id: string;
  name: string;
  description: string;
  locations: IntelLocation[];
}

export interface IntelLocation {
  id: string;
  name: string;
  codename?: string;
  type: string;
  coordinates?: [number, number]; // [lat, lng]
  country: string;
  region: string;
  classification: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP SECRET';
  status: 'ACTIVE' | 'INACTIVE' | 'COMPROMISED' | 'UNKNOWN' | 'DEMOLISHED';
  description: string;
  operationalDetails?: string;
  threats: string[];
  assets: string[];
  lastUpdated: string;
  intelligence: {
    humanInt: number; // 0-100
    signalsInt: number; // 0-100
    imageInt: number; // 0-100
    reliability: number; // 0-100
  };
}

export const GLOBAL_LOCATIONS: LocationCategory[] = [
  {
    id: 'government_agencies',
    name: 'Government Agencies',
    description: 'Intelligence agencies, military commands, and government facilities',
    classification: 'SECRET',
    color: '#ff4444',
    icon: 'shield',
    subcategories: [
      {
        id: 'intelligence_agencies',
        name: 'Intelligence Agencies',
        description: 'National and international intelligence services',
        locations: [
          {
            id: 'cia_langley',
            name: 'CIA Headquarters',
            codename: 'Langley',
            type: 'Intelligence HQ',
            coordinates: [38.9516, -77.1467],
            country: 'United States',
            region: 'Virginia',
            classification: 'TOP SECRET',
            status: 'ACTIVE',
            description: 'Central Intelligence Agency headquarters complex',
            operationalDetails: 'Primary US foreign intelligence service headquarters',
            threats: ['Cyber attacks', 'Foreign surveillance', 'Insider threats'],
            assets: ['Global intelligence network', 'Cyber warfare division', 'Special operations'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 95, signalsInt: 90, imageInt: 85, reliability: 98 }
          },
          {
            id: 'gchq_cheltenham',
            name: 'GCHQ Cheltenham',
            codename: 'The Doughnut',
            type: 'Signals Intelligence',
            coordinates: [51.8998, -2.1218],
            country: 'United Kingdom',
            region: 'Gloucestershire',
            classification: 'TOP SECRET',
            status: 'ACTIVE',
            description: 'Government Communications Headquarters',
            operationalDetails: 'UK signals intelligence and cyber security',
            threats: ['State-sponsored hackers', 'Terrorist surveillance'],
            assets: ['ECHELON network', 'Cyber defense teams', 'Cryptographic research'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 80, signalsInt: 98, imageInt: 75, reliability: 95 }
          }
        ]
      },
      {
        id: 'military_commands',
        name: 'Military Commands',
        description: 'Strategic military command centers and bases',
        locations: [
          {
            id: 'norad_cheyenne',
            name: 'NORAD Cheyenne Mountain',
            codename: 'The Mountain',
            type: 'Command Center',
            coordinates: [38.7444, -104.8461],
            country: 'United States',
            region: 'Colorado',
            classification: 'TOP SECRET',
            status: 'ACTIVE',
            description: 'North American Aerospace Defense Command',
            operationalDetails: 'Continental air defense and space surveillance',
            threats: ['Nuclear attack', 'EMP weapons', 'Cyber warfare'],
            assets: ['Missile defense systems', 'Space tracking', 'Emergency command'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 90, signalsInt: 95, imageInt: 88, reliability: 99 }
          }
        ]
      }
    ]
  },
  {
    id: 'drug_cartels',
    name: 'Drug Cartels & Criminal Organizations',
    description: 'International criminal syndicates and trafficking networks',
    classification: 'CONFIDENTIAL',
    color: '#8b0000',
    icon: 'skull',
    subcategories: [
      {
        id: 'mexican_cartels',
        name: 'Mexican Cartels',
        description: 'Major Mexican drug trafficking organizations',
        locations: [
          {
            id: 'sinaloa_compound',
            name: 'Sinaloa Cartel Compound',
            codename: 'El Dorado',
            type: 'Criminal HQ',
            coordinates: [25.7939, -108.9856],
            country: 'Mexico',
            region: 'Sinaloa',
            classification: 'CONFIDENTIAL',
            status: 'ACTIVE',
            description: 'Primary Sinaloa Cartel operational base',
            operationalDetails: 'Drug production and distribution coordination',
            threats: ['Armed guards', 'Tunnel networks', 'Corrupt officials'],
            assets: ['Drug labs', 'Weapon caches', 'Money laundering'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 70, signalsInt: 45, imageInt: 60, reliability: 65 }
          }
        ]
      }
    ]
  },
  {
    id: 'safe_houses',
    name: 'Safe Houses & Cover Operations',
    description: 'Covert facilities and operational safe houses',
    classification: 'SECRET',
    color: '#4a90e2',
    icon: 'home',
    subcategories: [
      {
        id: 'cia_safe_houses',
        name: 'CIA Safe Houses',
        description: 'Agency safe houses and cover locations',
        locations: [
          {
            id: 'vienna_safe_house',
            name: 'Vienna Safe House Alpha',
            codename: 'Mozart Station',
            type: 'Safe House',
            coordinates: [48.2082, 16.3738],
            country: 'Austria',
            region: 'Vienna',
            classification: 'SECRET',
            status: 'ACTIVE',
            description: 'Primary European operations safe house',
            operationalDetails: 'Agent debrief and emergency extraction point',
            threats: ['Foreign surveillance', 'Asset compromise'],
            assets: ['Secure communications', 'Weapons cache', 'Medical facilities'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 85, signalsInt: 70, imageInt: 60, reliability: 90 }
          }
        ]
      }
    ]
  },
  {
    id: 'data_centers',
    name: 'Data Centers & Edge Networks',
    description: 'Critical internet infrastructure and data processing facilities',
    classification: 'CONFIDENTIAL',
    color: '#00ff88',
    icon: 'server',
    subcategories: [
      {
        id: 'cloud_providers',
        name: 'Major Cloud Providers',
        description: 'Large-scale cloud computing facilities',
        locations: [
          {
            id: 'aws_us_east_1',
            name: 'AWS US-East-1',
            codename: 'Northern Virginia',
            type: 'Data Center',
            coordinates: [38.9072, -77.0369],
            country: 'United States',
            region: 'Virginia',
            classification: 'CONFIDENTIAL',
            status: 'ACTIVE',
            description: 'Amazon Web Services primary data center region',
            operationalDetails: 'Critical internet infrastructure hosting',
            threats: ['Cyber attacks', 'Physical infiltration', 'Power grid failure'],
            assets: ['Massive server farms', 'Fiber optic networks', 'Backup power'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 40, signalsInt: 95, imageInt: 80, reliability: 95 }
          }
        ]
      }
    ]
  },
  {
    id: 'warfronts',
    name: 'Active Warfronts & Conflict Zones',
    description: 'Current military conflicts and unstable regions',
    classification: 'CONFIDENTIAL',
    color: '#ff6b35',
    icon: 'crosshair',
    subcategories: [
      {
        id: 'proxy_conflicts',
        name: 'Proxy Conflicts',
        description: 'Regions of proxy warfare and insurgency',
        locations: [
          {
            id: 'syria_conflict',
            name: 'Syrian Conflict Zone',
            codename: 'Desert Storm',
            type: 'Active Conflict',
            coordinates: [35.2137, 38.9967],
            country: 'Syria',
            region: 'Central Syria',
            classification: 'CONFIDENTIAL',
            status: 'ACTIVE',
            description: 'Ongoing multi-faction conflict zone',
            operationalDetails: 'Complex proxy war with multiple international actors',
            threats: ['Active combat', 'Chemical weapons', 'Terrorist groups'],
            assets: ['Strategic airfields', 'Oil facilities', 'Supply routes'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 60, signalsInt: 70, imageInt: 85, reliability: 70 }
          }
        ]
      }
    ]
  },
  {
    id: 'cell_towers',
    name: 'Telecommunications Infrastructure',
    description: 'Critical communications infrastructure and monitoring stations',
    classification: 'UNCLASSIFIED',
    color: '#ffa500',
    icon: 'radio',
    subcategories: [
      {
        id: 'cellular_networks',
        name: 'Cellular Networks',
        description: 'Mobile phone tower networks and base stations',
        locations: [
          {
            id: 'verizon_tower_ny',
            name: 'Verizon Cell Tower NY-4471',
            type: 'Cell Tower',
            coordinates: [40.7589, -73.9851],
            country: 'United States',
            region: 'New York',
            classification: 'UNCLASSIFIED',
            status: 'ACTIVE',
            description: 'High-capacity urban cellular base station',
            operationalDetails: 'Provides coverage for Manhattan financial district',
            threats: ['Signal jamming', 'Physical sabotage', 'Data interception'],
            assets: ['5G capability', 'Emergency backup', 'High bandwidth'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 20, signalsInt: 85, imageInt: 40, reliability: 90 }
          }
        ]
      }
    ]
  },
  {
    id: 'shipping_routes',
    name: 'Maritime Shipping Routes',
    description: 'Major ocean shipping lanes and port facilities',
    classification: 'UNCLASSIFIED',
    color: '#0088ff',
    icon: 'anchor',
    subcategories: [
      {
        id: 'container_routes',
        name: 'Container Shipping Routes',
        description: 'Major container shipping lanes between continents',
        locations: [
          {
            id: 'suez_canal',
            name: 'Suez Canal',
            codename: 'Desert Passage',
            type: 'Shipping Lane',
            coordinates: [30.0444, 32.3487],
            country: 'Egypt',
            region: 'Suez',
            classification: 'CONFIDENTIAL',
            status: 'ACTIVE',
            description: 'Critical maritime chokepoint connecting Europe and Asia',
            operationalDetails: '12% of global trade passes through this waterway',
            threats: ['Piracy', 'Blockade', 'Terrorist attacks'],
            assets: ['Canal authority control', 'Military protection', 'Pilot services'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 75, signalsInt: 60, imageInt: 90, reliability: 95 }
          }
        ]
      }
    ]
  },
  {
    id: 'air_routes',
    name: 'Aviation Networks',
    description: 'Commercial and military aviation routes and airports',
    classification: 'UNCLASSIFIED',
    color: '#ff8800',
    icon: 'plane',
    subcategories: [
      {
        id: 'major_airports',
        name: 'Major International Airports',
        description: 'Primary global aviation hubs',
        locations: [
          {
            id: 'heathrow_airport',
            name: 'London Heathrow Airport',
            codename: 'Gateway',
            type: 'International Airport',
            coordinates: [51.4700, -0.4543],
            country: 'United Kingdom',
            region: 'London',
            classification: 'UNCLASSIFIED',
            status: 'ACTIVE',
            description: 'One of the busiest international airports globally',
            operationalDetails: 'Major hub for European and intercontinental flights',
            threats: ['Terrorism', 'Cyber attacks', 'Smuggling'],
            assets: ['Air traffic control', 'Security systems', 'Cargo facilities'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 70, signalsInt: 80, imageInt: 85, reliability: 95 }
          }
        ]
      }
    ]
  },
  {
    id: 'satellite_networks',
    name: 'Satellite Networks',
    description: 'Orbital satellite systems and ground control stations',
    classification: 'SECRET',
    color: '#9b59b6',
    icon: 'satellite',
    subcategories: [
      {
        id: 'military_satellites',
        name: 'Military Satellites',
        description: 'Defense and intelligence satellite systems',
        locations: [
          {
            id: 'kh11_keyhole',
            name: 'KH-11 Keyhole Satellite',
            codename: 'Crystal',
            type: 'Reconnaissance Satellite',
            coordinates: [0, 0], // Orbital
            country: 'United States',
            region: 'Low Earth Orbit',
            classification: 'TOP SECRET',
            status: 'ACTIVE',
            description: 'Advanced electro-optical reconnaissance satellite',
            operationalDetails: 'Real-time intelligence gathering from space',
            threats: ['Anti-satellite weapons', 'Space debris', 'Electronic warfare'],
            assets: ['High-resolution imaging', 'Real-time downlink', 'Encrypted comms'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 30, signalsInt: 98, imageInt: 99, reliability: 95 }
          }
        ]
      }
    ]
  },
  {
    id: 'secret_locations',
    name: 'Classified Facilities',
    description: 'Highly classified and compartmentalized facilities',
    classification: 'TOP SECRET',
    color: '#2c3e50',
    icon: 'eye-off',
    subcategories: [
      {
        id: 'black_sites',
        name: 'Black Sites',
        description: 'Unacknowledged special access facilities',
        locations: [
          {
            id: 'area_51',
            name: 'Area 51',
            codename: 'Groom Lake',
            type: 'Research Facility',
            coordinates: [37.2431, -115.7930],
            country: 'United States',
            region: 'Nevada',
            classification: 'TOP SECRET',
            status: 'ACTIVE',
            description: 'Highly classified U.S. Air Force facility',
            operationalDetails: 'Advanced aerospace testing and development',
            threats: ['Foreign intelligence', 'Unauthorized surveillance', 'Information leaks'],
            assets: ['Test aircraft', 'Advanced technology', 'Research personnel'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 95, signalsInt: 85, imageInt: 70, reliability: 90 }
          },
          {
            id: 'pine_gap',
            name: 'Pine Gap',
            codename: 'Joint Defense Facility',
            type: 'Intelligence Station',
            coordinates: [-23.7988, 133.7381],
            country: 'Australia',
            region: 'Northern Territory',
            classification: 'TOP SECRET',
            status: 'ACTIVE',
            description: 'Joint US-Australian intelligence facility',
            operationalDetails: 'Satellite intelligence and missile detection',
            threats: ['Foreign surveillance', 'Cyber attacks', 'Espionage'],
            assets: ['Satellite ground stations', 'Signal intelligence', 'Missile warning'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 85, signalsInt: 95, imageInt: 80, reliability: 95 }
          }
        ]
      }
    ]
  },
  {
    id: 'cyber_infrastructure',
    name: 'Cyber Infrastructure',
    description: 'Critical cybersecurity and network infrastructure',
    classification: 'SECRET',
    color: '#00ffff',
    icon: 'shield-check',
    subcategories: [
      {
        id: 'internet_exchanges',
        name: 'Internet Exchange Points',
        description: 'Critical internet infrastructure nodes',
        locations: [
          {
            id: 'de_cix_frankfurt',
            name: 'DE-CIX Frankfurt',
            type: 'Internet Exchange',
            coordinates: [50.1109, 8.6821],
            country: 'Germany',
            region: 'Frankfurt',
            classification: 'CONFIDENTIAL',
            status: 'ACTIVE',
            description: 'Major European internet exchange point',
            operationalDetails: 'Critical hub for European internet traffic',
            threats: ['DDoS attacks', 'State surveillance', 'Physical sabotage'],
            assets: ['High-speed routers', 'Fiber networks', 'Redundant systems'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 50, signalsInt: 90, imageInt: 70, reliability: 90 }
          }
        ]
      }
    ]
  }
];

// Additional location types to be expanded
export const LOCATION_TYPES = {
  // Financial Infrastructure
  CENTRAL_BANKS: 'Central Banks & Financial Institutions',
  STOCK_EXCHANGES: 'Stock Exchanges & Trading Centers',
  CRYPTO_EXCHANGES: 'Cryptocurrency Exchanges',
  
  // Energy Infrastructure
  NUCLEAR_FACILITIES: 'Nuclear Power Plants',
  OIL_REFINERIES: 'Oil Refineries & Pipelines',
  POWER_GRIDS: 'Electrical Grid Control Centers',
  
  // Transportation Hubs
  MAJOR_PORTS: 'Strategic Seaports',
  RAIL_NETWORKS: 'Railway Control Centers',
  HIGHWAY_SYSTEMS: 'Highway Infrastructure',
  
  // Research Facilities
  BIOWEAPON_LABS: 'Biological Research Facilities',
  PARTICLE_ACCELERATORS: 'Physics Research Centers',
  SPACE_FACILITIES: 'Space Launch & Control Centers',
  
  // Underground Networks
  TUNNEL_SYSTEMS: 'Underground Tunnel Networks',
  BUNKER_COMPLEXES: 'Hardened Underground Facilities',
  METRO_SYSTEMS: 'Urban Transportation Networks',
  
  // Diplomatic Facilities
  EMBASSIES: 'Embassy & Consulate Facilities',
  UN_FACILITIES: 'United Nations Facilities',
  DIPLOMATIC_RESIDENCES: 'Diplomatic Housing Compounds',
  
  // Media & Communications
  NEWS_ORGANIZATIONS: 'Major News Organizations',
  BROADCAST_CENTERS: 'Television & Radio Centers',
  SOCIAL_MEDIA_HQ: 'Social Media Company Headquarters',
  
  // Technology Companies
  TECH_CAMPUSES: 'Major Technology Company Campuses',
  SEMICONDUCTOR_FABS: 'Semiconductor Manufacturing',
  AI_RESEARCH_LABS: 'Artificial Intelligence Research Centers'
};