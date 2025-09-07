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
    id: 'black_sites',
    name: 'Black Sites & Classified Operations',
    description: 'Undisclosed detention facilities, black sites, and covert operations centers',
    classification: 'TOP SECRET',
    color: '#000000',
    icon: 'skull',
    subcategories: [
      {
        id: 'detention_facilities',
        name: 'Detention Facilities',
        description: 'Classified detention and interrogation centers',
        locations: [
          {
            id: 'guantanamo_bay',
            name: 'Guantanamo Bay Detention Camp',
            codename: 'GTMO',
            type: 'Detention Facility',
            coordinates: [19.9031, -75.0967],
            country: 'Cuba (US Controlled)',
            region: 'Caribbean',
            classification: 'TOP SECRET',
            status: 'ACTIVE',
            description: 'High-value detainee interrogation facility',
            operationalDetails: 'Enhanced interrogation techniques, psychological operations',
            threats: ['International legal challenges', 'Terrorist recruitment'],
            assets: ['Enhanced interrogation teams', 'Military police', 'Intelligence analysts'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 95, signalsInt: 85, imageInt: 90, reliability: 98 }
          },
          {
            id: 'site_green',
            name: 'Site Green',
            codename: 'COBALT',
            type: 'Black Site',
            coordinates: [34.5553, 69.2075],
            country: 'Afghanistan',
            region: 'Kabul Province',
            classification: 'TOP SECRET',
            status: 'COMPROMISED',
            description: 'Former CIA black site detention facility',
            operationalDetails: 'High-value target interrogation and psychological conditioning',
            threats: ['Exposure risk', 'Political fallout', 'Legal proceedings'],
            assets: ['Psychological operations unit', 'Medical staff', 'Security detail'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 75, signalsInt: 60, imageInt: 40, reliability: 70 }
          }
        ]
      }
    ]
  },
  {
    id: 'drug_cartels',
    name: 'Narcotics & Trafficking Networks',
    description: 'Major drug cartel operations, smuggling routes, and production facilities',
    classification: 'SECRET',
    color: '#8B4513',
    icon: 'alert-triangle',
    subcategories: [
      {
        id: 'production_facilities',
        name: 'Production Facilities',
        description: 'Known and suspected drug production laboratories',
        locations: [
          {
            id: 'sinaloa_lab_alpha',
            name: 'Culiacán Super Lab',
            codename: 'CRYSTAL PALACE',
            type: 'Methamphetamine Production',
            coordinates: [24.7993, -107.3938],
            country: 'Mexico',
            region: 'Sinaloa',
            classification: 'SECRET',
            status: 'ACTIVE',
            description: 'Large-scale methamphetamine production facility',
            operationalDetails: 'Capable of producing 200kg+ per week, heavily fortified',
            threats: ['Armed guards', 'Chemical hazards', 'Cartel violence'],
            assets: ['Chemical precursors', 'Distribution network', 'Corruption network'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 85, signalsInt: 70, imageInt: 80, reliability: 90 }
          },
          {
            id: 'golden_triangle_lab',
            name: 'Mekong Super Lab',
            codename: 'DRAGON SMOKE',
            type: 'Synthetic Drug Production',
            coordinates: [20.2518, 100.2683],
            country: 'Myanmar',
            region: 'Shan State',
            classification: 'SECRET',
            status: 'ACTIVE',
            description: 'Industrial-scale methamphetamine and fentanyl production',
            operationalDetails: 'Chinese precursor chemicals, armed ethnic groups protection',
            threats: ['Ethnic armed organizations', 'Chemical weapons', 'Cross-border violence'],
            assets: ['Precursor smuggling routes', 'Distribution networks', 'Bribery networks'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 80, signalsInt: 65, imageInt: 75, reliability: 85 }
          }
        ]
      }
    ]
  },
  {
    id: 'cyber_warfare',
    name: 'Cyber Warfare Centers',
    description: 'State-sponsored hacking groups, cyber warfare units, and digital espionage centers',
    classification: 'TOP SECRET',
    color: '#00FF41',
    icon: 'wifi',
    subcategories: [
      {
        id: 'state_sponsored',
        name: 'State-Sponsored Groups',
        description: 'Government-backed cyber warfare and espionage units',
        locations: [
          {
            id: 'apt29_moscow',
            name: 'SVR Cyber Operations',
            codename: 'COZY BEAR',
            type: 'Cyber Warfare Unit',
            coordinates: [55.7558, 37.6173],
            country: 'Russia',
            region: 'Moscow',
            classification: 'TOP SECRET',
            status: 'ACTIVE',
            description: 'Russian Foreign Intelligence Service cyber division',
            operationalDetails: 'Advanced persistent threat operations, election interference',
            threats: ['International sanctions', 'Cyber retaliation', 'Attribution'],
            assets: ['Zero-day exploits', 'Botnet infrastructure', 'Social engineering teams'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 95, signalsInt: 98, imageInt: 70, reliability: 95 }
          },
          {
            id: 'unit_61398',
            name: 'PLA Unit 61398',
            codename: 'COMMENT CREW',
            type: 'Military Cyber Unit',
            coordinates: [31.2304, 121.4737],
            country: 'China',
            region: 'Shanghai',
            classification: 'TOP SECRET',
            status: 'ACTIVE',
            description: 'People\'s Liberation Army cyber espionage unit',
            operationalDetails: 'Industrial espionage, intellectual property theft',
            threats: ['Economic sanctions', 'Diplomatic consequences', 'Exposure'],
            assets: ['Advanced malware', 'Spear phishing capabilities', 'Insider networks'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 90, signalsInt: 95, imageInt: 65, reliability: 92 }
          }
        ]
      }
    ]
  },
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
          },
          {
            id: 'mossad_tel_aviv',
            name: 'Mossad Headquarters',
            codename: 'The Institute',
            type: 'Intelligence Service',
            coordinates: [32.0853, 34.7818],
            country: 'Israel',
            region: 'Tel Aviv',
            classification: 'TOP SECRET',
            status: 'ACTIVE',
            description: 'Israeli foreign intelligence service',
            operationalDetails: 'Counterterrorism, nuclear intelligence, assassination operations',
            threats: ['Regional terrorism', 'State-sponsored attacks', 'Cyber warfare'],
            assets: ['Kidon unit', 'HUMINT networks', 'Technology operations'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 98, signalsInt: 85, imageInt: 90, reliability: 95 }
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
            coordinates: [38.7434, -104.8465],
            country: 'United States',
            region: 'Colorado',
            classification: 'TOP SECRET',
            status: 'ACTIVE',
            description: 'North American Aerospace Defense Command',
            operationalDetails: 'Nuclear attack detection, space surveillance, air defense',
            threats: ['EMP attacks', 'Nuclear strike', 'Cyber warfare'],
            assets: ['Early warning systems', 'Satellite tracking', 'Command infrastructure'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 90, signalsInt: 95, imageInt: 80, reliability: 98 }
          },
          {
            id: 'pentagon',
            name: 'The Pentagon',
            codename: 'BUILDING',
            type: 'Military HQ',
            coordinates: [38.8719, -77.0563],
            country: 'United States',
            region: 'Virginia',
            classification: 'SECRET',
            status: 'ACTIVE',
            description: 'United States Department of Defense headquarters',
            operationalDetails: 'Global military command and control',
            threats: ['Terrorist attacks', 'Cyber warfare', 'Insider threats'],
            assets: ['Global communications', 'Command systems', 'Intelligence fusion'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 95, signalsInt: 90, imageInt: 85, reliability: 95 }
          }
        ]
      }
    ]
  },
  {
    id: 'nuclear_facilities',
    name: 'Nuclear Facilities & WMD Sites',
    description: 'Nuclear facilities, weapons storage, and WMD development sites',
    classification: 'TOP SECRET',
    color: '#FFD700',
    icon: 'zap',
    subcategories: [
      {
        id: 'enrichment_facilities',
        name: 'Uranium Enrichment',
        description: 'Uranium enrichment and nuclear fuel cycle facilities',
        locations: [
          {
            id: 'natanz_iran',
            name: 'Natanz Fuel Enrichment Plant',
            codename: 'DESERT BLOOM',
            type: 'Enrichment Facility',
            coordinates: [33.7248, 51.7281],
            country: 'Iran',
            region: 'Isfahan Province',
            classification: 'TOP SECRET',
            status: 'ACTIVE',
            description: 'Iran\'s primary uranium enrichment facility',
            operationalDetails: 'Gas centrifuge cascades, underground bunkers',
            threats: ['Military strikes', 'Cyber attacks', 'Sabotage operations'],
            assets: ['Centrifuge technology', 'Enriched uranium', 'Defense systems'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 90, signalsInt: 95, imageInt: 85, reliability: 95 }
          },
          {
            id: 'yongbyon_dprk',
            name: 'Yongbyon Nuclear Complex',
            codename: 'HERMIT KINGDOM',
            type: 'Nuclear Complex',
            coordinates: [39.7972, 125.7547],
            country: 'North Korea',
            region: 'North Pyongan Province',
            classification: 'TOP SECRET',
            status: 'ACTIVE',
            description: 'North Korea\'s main nuclear facility',
            operationalDetails: 'Plutonium production, reactor operations, reprocessing',
            threats: ['Military action', 'International sanctions', 'Technical failures'],
            assets: ['Nuclear reactors', 'Plutonium stockpile', 'Technical expertise'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 85, signalsInt: 90, imageInt: 80, reliability: 90 }
          }
        ]
      }
    ]
  },
  {
    id: 'safe_houses',
    name: 'Safe Houses & Dead Drops',
    description: 'Covert meeting locations, safe houses, and intelligence dead drop sites',
    classification: 'TOP SECRET',
    color: '#228B22',
    icon: 'home',
    subcategories: [
      {
        id: 'embassy_safe_houses',
        name: 'Embassy Safe Houses',
        description: 'Diplomatic cover safe houses and meeting points',
        locations: [
          {
            id: 'moscow_safe_house',
            name: 'Moscow Embassy Safe House',
            codename: 'VODKA ROOM',
            type: 'Safe House',
            coordinates: [55.7558, 37.6176],
            country: 'Russia',
            region: 'Moscow',
            classification: 'TOP SECRET',
            status: 'ACTIVE',
            description: 'US Embassy covert operations safe house',
            operationalDetails: 'Asset debriefing, emergency exfiltration point',
            threats: ['FSB surveillance', 'Diplomatic exposure', 'Asset compromise'],
            assets: ['Secure communications', 'Emergency supplies', 'Exfiltration routes'],
            lastUpdated: '2024-01-01',
            intelligence: { humanInt: 95, signalsInt: 70, imageInt: 60, reliability: 90 }
          }
        ]
      }
    ]
  }
];

// Location type constants for easy reference
export const LOCATION_TYPES = {
  INTELLIGENCE_HQ: 'Intelligence Headquarters',
  MILITARY_BASE: 'Military Base',
  GOVERNMENT_FACILITY: 'Government Facility',
  RESEARCH_LAB: 'Research Laboratory',
  DATA_CENTER: 'Data Center',
  COMMUNICATION_HUB: 'Communication Hub',
  SATELLITE_FACILITY: 'Satellite Facility',
  NUCLEAR_FACILITY: 'Nuclear Facility',
  DETENTION_CENTER: 'Detention Center',
  TRAINING_FACILITY: 'Training Facility',
  SAFE_HOUSE: 'Safe House',
  DEAD_DROP: 'Dead Drop',
  BORDER_CROSSING: 'Border Crossing',
  SMUGGLING_ROUTE: 'Smuggling Route',
  PRODUCTION_LAB: 'Production Laboratory',
  CYBER_OPERATIONS: 'Cyber Operations Center',
  BLACK_SITE: 'Black Site',
  UNDERGROUND_FACILITY: 'Underground Facility'
};