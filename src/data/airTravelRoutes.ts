// Air Travel Routes and Aviation Intelligence Database
export interface AirRoute {
  id: string;
  name: string;
  codename?: string;
  type: 'commercial' | 'military' | 'private' | 'cargo' | 'covert' | 'diplomatic';
  classification: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP SECRET';
  status: 'ACTIVE' | 'SUSPENDED' | 'CLASSIFIED' | 'MONITORED';
  origin: {
    name: string;
    coordinates: [number, number]; // [lat, lng]
    country: string;
    airportCode?: string;
  };
  destination: {
    name: string;
    coordinates: [number, number]; // [lat, lng]
    country: string;
    airportCode?: string;
  };
  waypoints?: Array<{
    name: string;
    coordinates: [number, number];
    type: 'checkpoint' | 'refuel' | 'dropoff' | 'pickup';
  }>;
  frequency: 'daily' | 'weekly' | 'monthly' | 'irregular' | 'on-demand';
  aircraftTypes: string[];
  purpose: string;
  securityLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'MAXIMUM';
  threats: string[];
  intelligence: {
    reliability: number; // 0-100
    lastConfirmed: string;
    sources: string[];
  };
}

export interface Airport {
  id: string;
  name: string;
  codename?: string;
  coordinates: [number, number];
  country: string;
  region: string;
  airportCode: string;
  type: 'civilian' | 'military' | 'joint_use' | 'private' | 'black_site';
  classification: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP SECRET';
  status: 'OPERATIONAL' | 'RESTRICTED' | 'CLASSIFIED' | 'ABANDONED';
  runways: number;
  capabilities: string[];
  securityFeatures: string[];
  purpose: string;
  threats: string[];
  intelligence: {
    humanInt: number;
    signalsInt: number;
    imageInt: number;
    reliability: number;
  };
}

// Major Air Routes - Including Covert and Black Operations
export const AIR_TRAVEL_ROUTES: AirRoute[] = [
  // Commercial Routes with Intelligence Value
  {
    id: 'route_001',
    name: 'Moscow-Beijing Express',
    codename: 'SILK ROAD SKY',
    type: 'commercial',
    classification: 'SECRET',
    status: 'MONITORED',
    origin: {
      name: 'Sheremetyevo International Airport',
      coordinates: [55.9736, 37.4125],
      country: 'Russia',
      airportCode: 'SVO'
    },
    destination: {
      name: 'Beijing Capital International Airport',
      coordinates: [40.0799, 116.6031],
      country: 'China',
      airportCode: 'PEK'
    },
    frequency: 'daily',
    aircraftTypes: ['Aeroflot A350', 'Air China 777'],
    purpose: 'Commercial passenger service with diplomatic pouch transport',
    securityLevel: 'HIGH',
    threats: ['Intelligence gathering', 'Diplomatic surveillance', 'Technology transfer'],
    intelligence: {
      reliability: 95,
      lastConfirmed: '2024-01-01',
      sources: ['SIGINT', 'HUMINT', 'OSINT']
    }
  },
  
  // CIA Rendition Routes
  {
    id: 'route_002',
    name: 'Extraordinary Rendition Circuit',
    codename: 'GHOST FLIGHTS',
    type: 'covert',
    classification: 'TOP SECRET',
    status: 'CLASSIFIED',
    origin: {
      name: 'Dulles International Airport',
      coordinates: [38.9445, -77.4558],
      country: 'United States',
      airportCode: 'IAD'
    },
    destination: {
      name: 'Cairo International Airport',
      coordinates: [30.1219, 31.4056],
      country: 'Egypt',
      airportCode: 'CAI'
    },
    waypoints: [
      {
        name: 'Shannon Airport',
        coordinates: [52.7019, -8.9248],
        type: 'refuel'
      },
      {
        name: 'Ramstein Air Base',
        coordinates: [49.4369, 7.6003],
        type: 'checkpoint'
      }
    ],
    frequency: 'irregular',
    aircraftTypes: ['Boeing 737 BBJ', 'Gulfstream V'],
    purpose: 'Extraordinary rendition operations',
    securityLevel: 'MAXIMUM',
    threats: ['Legal exposure', 'Diplomatic incidents', 'Media exposure'],
    intelligence: {
      reliability: 90,
      lastConfirmed: '2024-01-01',
      sources: ['Flight tracking', 'Whistleblower reports']
    }
  },

  // Drug Trafficking Routes
  {
    id: 'route_003',
    name: 'Andean Cocaine Express',
    codename: 'WHITE BIRD',
    type: 'covert',
    classification: 'SECRET',
    status: 'MONITORED',
    origin: {
      name: 'Clandestine Airstrip Valle del Cauca',
      coordinates: [3.4516, -76.5320],
      country: 'Colombia',
      airportCode: 'N/A'
    },
    destination: {
      name: 'Private Airfield Sinaloa',
      coordinates: [24.8091, -107.4009],
      country: 'Mexico',
      airportCode: 'N/A'
    },
    waypoints: [
      {
        name: 'Refuel Point Guatemala',
        coordinates: [14.5833, -90.5275],
        type: 'refuel'
      }
    ],
    frequency: 'weekly',
    aircraftTypes: ['Cessna 208', 'Beechcraft King Air'],
    purpose: 'Cocaine trafficking from Colombia to Mexico',
    securityLevel: 'HIGH',
    threats: ['Law enforcement interdiction', 'Rival cartels', 'Aircraft seizure'],
    intelligence: {
      reliability: 85,
      lastConfirmed: '2024-01-01',
      sources: ['DEA surveillance', 'HUMINT assets']
    }
  },

  // Arms Trafficking
  {
    id: 'route_004',
    name: 'Eastern European Arms Pipeline',
    codename: 'IRON CROW',
    type: 'covert',
    classification: 'SECRET',
    status: 'ACTIVE',
    origin: {
      name: 'Bratislava Airport',
      coordinates: [48.1702, 17.2127],
      country: 'Slovakia',
      airportCode: 'BTS'
    },
    destination: {
      name: 'Benghazi Airport',
      coordinates: [32.0968, 20.2695],
      country: 'Libya',
      airportCode: 'BEN'
    },
    frequency: 'monthly',
    aircraftTypes: ['Antonov An-12', 'Ilyushin Il-76'],
    purpose: 'Small arms and ammunition trafficking to conflict zones',
    securityLevel: 'HIGH',
    threats: ['International sanctions', 'Military interdiction', 'Customs inspection'],
    intelligence: {
      reliability: 80,
      lastConfirmed: '2024-01-01',
      sources: ['Customs intelligence', 'SIGINT']
    }
  },

  // Diplomatic Black Ops
  {
    id: 'route_005',
    name: 'Diplomatic Pouch Express',
    codename: 'SEALED ENVELOPE',
    type: 'diplomatic',
    classification: 'TOP SECRET',
    status: 'ACTIVE',
    origin: {
      name: 'Andrews Air Force Base',
      coordinates: [38.8101, -76.8669],
      country: 'United States',
      airportCode: 'ADW'
    },
    destination: {
      name: 'Ben Gurion Airport',
      coordinates: [32.0114, 34.8867],
      country: 'Israel',
      airportCode: 'TLV'
    },
    frequency: 'weekly',
    aircraftTypes: ['C-37A Gulfstream V', 'Boeing C-32A'],
    purpose: 'Classified intelligence sharing and covert coordination',
    securityLevel: 'MAXIMUM',
    threats: ['Foreign intelligence services', 'Cyber intercepts', 'Double agents'],
    intelligence: {
      reliability: 98,
      lastConfirmed: '2024-01-01',
      sources: ['NSA SIGINT', 'CIA assets']
    }
  },

  // Russian Military Transport
  {
    id: 'route_006',
    name: 'Arctic Military Corridor',
    codename: 'POLAR BEAR',
    type: 'military',
    classification: 'SECRET',
    status: 'ACTIVE',
    origin: {
      name: 'Severodvinsk Airport',
      coordinates: [64.5601, 39.8403],
      country: 'Russia',
      airportCode: 'N/A'
    },
    destination: {
      name: 'Nagurskoye Airfield',
      coordinates: [80.7944, 47.6544],
      country: 'Russia',
      airportCode: 'N/A'
    },
    frequency: 'weekly',
    aircraftTypes: ['Antonov An-124', 'Ilyushin Il-76MD'],
    purpose: 'Military supply runs to Arctic bases',
    securityLevel: 'HIGH',
    threats: ['NATO surveillance', 'Weather conditions', 'Equipment failures'],
    intelligence: {
      reliability: 85,
      lastConfirmed: '2024-01-01',
      sources: ['Satellite imagery', 'ELINT']
    }
  }
];

// Strategic Airports and Airfields
export const STRATEGIC_AIRPORTS: Airport[] = [
  {
    id: 'airport_001',
    name: 'Area 51 / Groom Lake',
    codename: 'DREAMLAND',
    coordinates: [37.2431, -115.7930],
    country: 'United States',
    region: 'Nevada',
    airportCode: 'KXTA',
    type: 'black_site',
    classification: 'TOP SECRET',
    status: 'CLASSIFIED',
    runways: 3,
    capabilities: ['Stealth aircraft testing', 'Foreign technology analysis', 'Black project development'],
    securityFeatures: ['Restricted airspace', 'Surface-to-air missiles', 'Perimeter sensors'],
    purpose: 'Advanced aerospace research and testing',
    threats: ['Foreign surveillance', 'Unauthorized intrusion', 'Media exposure'],
    intelligence: {
      humanInt: 95,
      signalsInt: 90,
      imageInt: 85,
      reliability: 98
    }
  },

  {
    id: 'airport_002',
    name: 'Ramstein Air Base',
    codename: 'HUB EUROPA',
    coordinates: [49.4369, 7.6003],
    country: 'Germany',
    region: 'Rhineland-Palatinate',
    airportCode: 'ETAR',
    type: 'military',
    classification: 'SECRET',
    status: 'OPERATIONAL',
    runways: 2,
    capabilities: ['NATO operations center', 'Medical evacuation hub', 'Drone operations'],
    securityFeatures: ['Patriot missile systems', 'Military police', 'Restricted access'],
    purpose: 'US Air Force operations in Europe and Africa',
    threats: ['Terrorist attacks', 'Russian surveillance', 'Anti-war protests'],
    intelligence: {
      humanInt: 90,
      signalsInt: 95,
      imageInt: 80,
      reliability: 95
    }
  },

  {
    id: 'airport_003',
    name: 'Diego Garcia',
    codename: 'FOOTPRINT OF FREEDOM',
    coordinates: [-7.3167, 72.4167],
    country: 'British Indian Ocean Territory',
    region: 'Chagos Archipelago',
    airportCode: 'NKW',
    type: 'military',
    classification: 'SECRET',
    status: 'OPERATIONAL',
    runways: 1,
    capabilities: ['Strategic bomber operations', 'Naval support', 'Intelligence gathering'],
    securityFeatures: ['Naval exclusion zone', 'Electronic surveillance', 'Restricted access'],
    purpose: 'Power projection into Middle East and Asia',
    threats: ['Chinese naval expansion', 'Legal challenges', 'Climate change'],
    intelligence: {
      humanInt: 85,
      signalsInt: 90,
      imageInt: 95,
      reliability: 90
    }
  },

  {
    id: 'airport_004',
    name: 'Bagram Airfield',
    codename: 'STRONGHOLD',
    coordinates: [34.9461, 69.2647],
    country: 'Afghanistan',
    region: 'Parwan Province',
    airportCode: 'OAI',
    type: 'military',
    classification: 'SECRET',
    status: 'RESTRICTED',
    runways: 2,
    capabilities: ['Counterterrorism operations', 'Logistics hub', 'Intelligence collection'],
    securityFeatures: ['Fortified perimeter', 'Air defense systems', 'Biometric screening'],
    purpose: 'Former hub for Afghanistan operations',
    threats: ['Taliban control', 'Equipment abandonment', 'Security compromise'],
    intelligence: {
      humanInt: 70,
      signalsInt: 60,
      imageInt: 75,
      reliability: 80
    }
  },

  {
    id: 'airport_005',
    name: 'Tonopah Test Range Airport',
    codename: 'AREA 52',
    coordinates: [37.7980, -116.7807],
    country: 'United States',
    region: 'Nevada',
    airportCode: 'TNX',
    type: 'black_site',
    classification: 'TOP SECRET',
    status: 'CLASSIFIED',
    runways: 2,
    capabilities: ['Stealth bomber operations', 'Nuclear weapons testing', 'Special projects'],
    securityFeatures: ['Restricted airspace', 'Underground facilities', 'Electronic countermeasures'],
    purpose: 'Special Access Program testing',
    threats: ['Foreign intelligence', 'Technology theft', 'Unauthorized disclosure'],
    intelligence: {
      humanInt: 92,
      signalsInt: 88,
      imageInt: 85,
      reliability: 95
    }
  },

  // Private Cartel Airstrips
  {
    id: 'airport_006',
    name: 'Clandestine Strip Alpha',
    codename: 'COCA RUNWAY',
    coordinates: [8.0843, -73.0906],
    country: 'Colombia',
    region: 'Arauca',
    airportCode: 'N/A',
    type: 'private',
    classification: 'SECRET',
    status: 'OPERATIONAL',
    runways: 1,
    capabilities: ['Drug trafficking operations', 'Quick turnaround', 'Remote operations'],
    securityFeatures: ['Armed guards', 'Hidden location', 'Rapid dispersal capability'],
    purpose: 'Cocaine export operations',
    threats: ['Law enforcement raids', 'Rival cartels', 'Military operations'],
    intelligence: {
      humanInt: 75,
      signalsInt: 60,
      imageInt: 80,
      reliability: 85
    }
  }
];

// Air Route Classifications
export const ROUTE_TYPES = {
  COMMERCIAL: 'Commercial Aviation',
  MILITARY: 'Military Transport',
  PRIVATE: 'Private Aviation',
  CARGO: 'Cargo Operations',
  COVERT: 'Covert Operations',
  DIPLOMATIC: 'Diplomatic Transport',
  RENDITION: 'Extraordinary Rendition',
  TRAFFICKING: 'Trafficking Operations',
  ARMS: 'Arms Trafficking',
  INTELLIGENCE: 'Intelligence Operations'
};

export const ALL_AIR_ROUTES = AIR_TRAVEL_ROUTES;
export const ALL_AIRPORTS = STRATEGIC_AIRPORTS;