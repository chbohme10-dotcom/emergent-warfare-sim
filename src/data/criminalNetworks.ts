// Criminal Networks and Organized Crime Intelligence Database
export interface CriminalNode {
  id: string;
  name: string;
  codename?: string;
  type: 'cartel_hq' | 'trafficking_route' | 'money_laundering' | 'weapons_cache' | 'safe_house' | 'meeting_point' | 'border_crossing' | 'corruption_node';
  coordinates: [number, number]; // [lat, lng]
  country: string;
  region: string;
  organization: string;
  classification: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP SECRET';
  status: 'ACTIVE' | 'INACTIVE' | 'COMPROMISED' | 'UNDER_SURVEILLANCE';
  threat_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  operations: string[];
  connections: string[]; // IDs of connected nodes
  estimated_value: number; // USD millions
  personnel: number;
  security_measures: string[];
  law_enforcement_interest: string[];
  intelligence: {
    reliability: number; // 0-100
    last_updated: string;
    sources: string[];
    threat_assessment: string;
  };
}

// Major Criminal Networks and Operations
export const CRIMINAL_NETWORKS: CriminalNode[] = [
  // Sinaloa Cartel Operations
  {
    id: 'sinaloa_001',
    name: 'Culiacán Command Center',
    codename: 'EL DORADO',
    type: 'cartel_hq',
    coordinates: [24.7993, -107.3938],
    country: 'Mexico',
    region: 'Sinaloa',
    organization: 'Sinaloa Cartel',
    classification: 'SECRET',
    status: 'ACTIVE',
    threat_level: 'CRITICAL',
    description: 'Primary command and control center for Sinaloa Cartel operations',
    operations: ['Drug trafficking coordination', 'Territory control', 'Corruption network management'],
    connections: ['sinaloa_002', 'sinaloa_003', 'border_001'],
    estimated_value: 2500,
    personnel: 150,
    security_measures: ['Armed guards', 'Surveillance network', 'Counter-intelligence', 'Bribery network'],
    law_enforcement_interest: ['DEA', 'Mexican Military', 'Interpol'],
    intelligence: {
      reliability: 90,
      last_updated: '2024-01-01',
      sources: ['DEA surveillance', 'HUMINT assets', 'Financial intelligence'],
      threat_assessment: 'Maximum threat to regional stability'
    }
  },

  {
    id: 'sinaloa_002',
    name: 'Pacific Corridor Route',
    codename: 'GOLDEN HIGHWAY',
    type: 'trafficking_route',
    coordinates: [23.2494, -106.4194],
    country: 'Mexico',
    region: 'Sinaloa-Nayarit Border',
    organization: 'Sinaloa Cartel',
    classification: 'SECRET',
    status: 'ACTIVE',
    threat_level: 'HIGH',
    description: 'Major trafficking route for fentanyl and cocaine to US market',
    operations: ['Drug transportation', 'Route security', 'Smuggling operations'],
    connections: ['sinaloa_001', 'border_001', 'laundering_001'],
    estimated_value: 800,
    personnel: 75,
    security_measures: ['Mobile security teams', 'Communication encryption', 'Lookout posts'],
    law_enforcement_interest: ['DEA', 'CBP', 'Mexican Navy'],
    intelligence: {
      reliability: 85,
      last_updated: '2024-01-01',
      sources: ['Border surveillance', 'Intercepted communications'],
      threat_assessment: 'High-volume trafficking operations'
    }
  },

  // Colombian FARC Operations
  {
    id: 'farc_001',
    name: 'Putumayo Cocaine Laboratory',
    codename: 'WHITE FOREST',
    type: 'cartel_hq',
    coordinates: [0.9306, -76.0947],
    country: 'Colombia',
    region: 'Putumayo',
    organization: 'FARC Dissidents',
    classification: 'SECRET',
    status: 'ACTIVE',
    threat_level: 'HIGH',
    description: 'Large-scale cocaine processing facility in jungle territory',
    operations: ['Cocaine production', 'Territory control', 'Guerrilla operations'],
    connections: ['farc_002', 'trafficking_001'],
    estimated_value: 300,
    personnel: 200,
    security_measures: ['Armed guerrillas', 'Jungle concealment', 'Early warning systems'],
    law_enforcement_interest: ['Colombian Military', 'DEA', 'UN Peacekeepers'],
    intelligence: {
      reliability: 80,
      last_updated: '2024-01-01',
      sources: ['Military intelligence', 'Aerial surveillance'],
      threat_assessment: 'Armed resistance expected'
    }
  },

  // Yakuza Operations
  {
    id: 'yakuza_001',
    name: 'Yamaguchi-gumi Headquarters',
    codename: 'MOUNTAIN MOUTH',
    type: 'cartel_hq',
    coordinates: [34.6851, 135.1831],
    country: 'Japan',
    region: 'Kobe, Hyogo',
    organization: 'Yamaguchi-gumi',
    classification: 'CONFIDENTIAL',
    status: 'ACTIVE',
    threat_level: 'MEDIUM',
    description: 'Largest yakuza organization headquarters',
    operations: ['Protection rackets', 'Real estate manipulation', 'Political corruption'],
    connections: ['yakuza_002', 'corruption_001'],
    estimated_value: 1500,
    personnel: 300,
    security_measures: ['Legal protection', 'Political connections', 'Business fronts'],
    law_enforcement_interest: ['Japanese Police', 'Financial Crimes Unit'],
    intelligence: {
      reliability: 75,
      last_updated: '2024-01-01',
      sources: ['Police surveillance', 'Financial tracking'],
      threat_assessment: 'Sophisticated organized crime'
    }
  },

  // Russian Mafia
  {
    id: 'bratva_001',
    name: 'Solntsevskaya Bratva HQ',
    codename: 'RED SUN',
    type: 'cartel_hq',
    coordinates: [55.7522, 37.6156],
    country: 'Russia',
    region: 'Moscow',
    organization: 'Solntsevskaya Bratva',
    classification: 'SECRET',
    status: 'ACTIVE',
    threat_level: 'HIGH',
    description: 'Most powerful Russian organized crime group',
    operations: ['Arms trafficking', 'Cybercrime', 'Money laundering', 'Political corruption'],
    connections: ['bratva_002', 'cyber_001', 'laundering_002'],
    estimated_value: 3000,
    personnel: 500,
    security_measures: ['Government protection', 'Counter-surveillance', 'International networks'],
    law_enforcement_interest: ['FSB', 'Interpol', 'FBI'],
    intelligence: {
      reliability: 85,
      last_updated: '2024-01-01',
      sources: ['Financial intelligence', 'Communication intercepts'],
      threat_assessment: 'State-level threat capabilities'
    }
  },

  // Ndrangheta Operations
  {
    id: 'ndrangheta_001',
    name: 'Calabrian Command Center',
    codename: 'SOUTHERN CROSS',
    type: 'cartel_hq',
    coordinates: [38.1594, 15.8214],
    country: 'Italy',
    region: 'Calabria',
    organization: 'Ndrangheta',
    classification: 'SECRET',
    status: 'ACTIVE',
    threat_level: 'HIGH',
    description: 'Most powerful Italian organized crime group',
    operations: ['Cocaine trafficking', 'Money laundering', 'Political corruption', 'Kidnapping'],
    connections: ['ndrangheta_002', 'laundering_003', 'corruption_002'],
    estimated_value: 2000,
    personnel: 400,
    security_measures: ['Family loyalty', 'Code of silence', 'Political protection'],
    law_enforcement_interest: ['Carabinieri', 'Anti-Mafia Commission', 'Europol'],
    intelligence: {
      reliability: 90,
      last_updated: '2024-01-01',
      sources: ['Informants', 'Financial tracking', 'Wiretaps'],
      threat_assessment: 'Deeply embedded in society'
    }
  },

  // Money Laundering Operations
  {
    id: 'laundering_001',
    name: 'Macau Casino Complex',
    codename: 'LUCKY DRAGON',
    type: 'money_laundering',
    coordinates: [22.1987, 113.5439],
    country: 'Macau SAR',
    region: 'Cotai Strip',
    organization: 'Multiple Triads',
    classification: 'SECRET',
    status: 'ACTIVE',
    threat_level: 'HIGH',
    description: 'Major money laundering hub through high-stakes gambling',
    operations: ['Money laundering', 'High-stakes gambling', 'VIP junket operations'],
    connections: ['triad_001', 'sinaloa_002', 'bratva_001'],
    estimated_value: 5000,
    personnel: 100,
    security_measures: ['Gaming regulations', 'VIP protection', 'Financial privacy'],
    law_enforcement_interest: ['AMCM', 'FBI', 'Chinese Public Security'],
    intelligence: {
      reliability: 85,
      last_updated: '2024-01-01',
      sources: ['Financial monitoring', 'Casino surveillance'],
      threat_assessment: 'Massive financial flows'
    }
  },

  {
    id: 'laundering_002',
    name: 'Cyprus Banking Network',
    codename: 'GOLDEN FLEECE',
    type: 'money_laundering',
    coordinates: [35.1264, 33.4299],
    country: 'Cyprus',
    region: 'Nicosia',
    organization: 'Russian Mafia',
    classification: 'SECRET',
    status: 'UNDER_SURVEILLANCE',
    threat_level: 'MEDIUM',
    description: 'Offshore banking network for Russian organized crime',
    operations: ['Money laundering', 'Shell company operations', 'Real estate investments'],
    connections: ['bratva_001', 'oligarch_001'],
    estimated_value: 2500,
    personnel: 50,
    security_measures: ['Banking secrecy', 'Political protection', 'Legal shields'],
    law_enforcement_interest: ['EU Financial Intelligence', 'FBI', 'Russian authorities'],
    intelligence: {
      reliability: 80,
      last_updated: '2024-01-01',
      sources: ['Banking records', 'Paradise Papers'],
      threat_assessment: 'Complex financial structures'
    }
  },

  // Border Crossing Operations
  {
    id: 'border_001',
    name: 'Tijuana-San Diego Tunnel Network',
    codename: 'UNDERGROUND RAILROAD',
    type: 'border_crossing',
    coordinates: [32.5027, -117.0824],
    country: 'Mexico/United States',
    region: 'Baja California/California',
    organization: 'Sinaloa Cartel',
    classification: 'SECRET',
    status: 'ACTIVE',
    threat_level: 'CRITICAL',
    description: 'Sophisticated tunnel network for drug smuggling',
    operations: ['Drug smuggling', 'Human trafficking', 'Weapons trafficking'],
    connections: ['sinaloa_001', 'sinaloa_002'],
    estimated_value: 400,
    personnel: 80,
    security_measures: ['Hidden entrances', 'Ventilation systems', 'Counter-detection measures'],
    law_enforcement_interest: ['CBP', 'DEA', 'Mexican Military'],
    intelligence: {
      reliability: 95,
      last_updated: '2024-01-01',
      sources: ['Ground penetrating radar', 'Surveillance'],
      threat_assessment: 'Primary smuggling route'
    }
  },

  // Corruption Networks
  {
    id: 'corruption_001',
    name: 'Guatemala Political Network',
    codename: 'GOLDEN HANDSHAKE',
    type: 'corruption_node',
    coordinates: [14.6349, -90.5069],
    country: 'Guatemala',
    region: 'Guatemala City',
    organization: 'Multiple Cartels',
    classification: 'SECRET',
    status: 'ACTIVE',
    threat_level: 'HIGH',
    description: 'Extensive corruption network in government and military',
    operations: ['Political corruption', 'Judicial manipulation', 'Military cooperation'],
    connections: ['sinaloa_001', 'farc_001'],
    estimated_value: 150,
    personnel: 200,
    security_measures: ['Political immunity', 'Information compartmentalization'],
    law_enforcement_interest: ['CICIG', 'DEA', 'FBI'],
    intelligence: {
      reliability: 75,
      last_updated: '2024-01-01',
      sources: ['Wiretaps', 'Financial records', 'Informants'],
      threat_assessment: 'State capture threat'
    }
  },

  // Arms Trafficking
  {
    id: 'arms_001',
    name: 'Balkan Arms Route',
    codename: 'IRON CURTAIN',
    type: 'weapons_cache',
    coordinates: [44.0165, 21.0059],
    country: 'Serbia',
    region: 'Belgrade',
    organization: 'Pink Panthers',
    classification: 'SECRET',
    status: 'ACTIVE',
    threat_level: 'HIGH',
    description: 'Major arms trafficking network from Balkans to global markets',
    operations: ['Arms trafficking', 'Weapons smuggling', 'Military surplus trade'],
    connections: ['bratva_001', 'ndrangheta_001'],
    estimated_value: 800,
    personnel: 120,
    security_measures: ['Military contacts', 'Corrupt customs', 'Transit country protection'],
    law_enforcement_interest: ['Interpol', 'ATF', 'Europol'],
    intelligence: {
      reliability: 85,
      last_updated: '2024-01-01',
      sources: ['Arms tracking', 'Intelligence sharing'],
      threat_assessment: 'Weapons to conflict zones'
    }
  }
];

// Criminal Organization Types
export const CRIMINAL_TYPES = {
  DRUG_CARTEL: 'Drug Trafficking Cartel',
  ORGANIZED_CRIME: 'Organized Crime Syndicate',
  TERRORIST_GROUP: 'Terrorist Organization',
  ARMS_DEALERS: 'Arms Trafficking Network',
  HUMAN_TRAFFICKERS: 'Human Trafficking Ring',
  CYBERCRIME: 'Cybercrime Organization',
  MONEY_LAUNDERING: 'Money Laundering Network',
  CORRUPTION: 'Corruption Network',
  SMUGGLING: 'Smuggling Organization',
  EXTORTION: 'Extortion Racket'
};

export const ALL_CRIMINAL_NODES = CRIMINAL_NETWORKS;