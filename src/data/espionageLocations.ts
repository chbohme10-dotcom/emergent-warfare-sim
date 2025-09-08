// Espionage Operations and Intelligence Assets Database
export interface EspionageLocation {
  id: string;
  name: string;
  codename?: string;
  type: 'spy_nest' | 'dead_drop' | 'safe_house' | 'surveillance_post' | 'communication_hub' | 'asset_meeting' | 'embassy_annex' | 'front_company';
  coordinates: [number, number]; // [lat, lng]
  country: string;
  region: string;
  controlling_agency: string;
  target_agencies: string[];
  classification: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP SECRET';
  status: 'ACTIVE' | 'DORMANT' | 'COMPROMISED' | 'BURNED' | 'DOUBLE_AGENT';
  operational_security: 'MINIMAL' | 'STANDARD' | 'ENHANCED' | 'MAXIMUM';
  description: string;
  primary_mission: string;
  secondary_missions: string[];
  assets: string[];
  covers: string[];
  counter_surveillance: string[];
  exposure_risks: string[];
  intelligence: {
    collection_methods: string[];
    target_classification: string;
    operation_duration: string;
    success_rate: number; // 0-100
    compromise_risk: number; // 0-100
    last_activity: string;
  };
}

// Global Espionage Operations
export const ESPIONAGE_LOCATIONS: EspionageLocation[] = [
  // CIA Operations
  {
    id: 'cia_001',
    name: 'Moscow Station Safe House',
    codename: 'CAVIAR ROOM',
    type: 'safe_house',
    coordinates: [55.7558, 37.6173],
    country: 'Russia',
    region: 'Moscow',
    controlling_agency: 'CIA',
    target_agencies: ['SVR', 'FSB', 'GRU'],
    classification: 'TOP SECRET',
    status: 'ACTIVE',
    operational_security: 'MAXIMUM',
    description: 'Primary CIA safe house for Moscow operations',
    primary_mission: 'HUMINT collection on Russian government and military',
    secondary_missions: ['Asset recruitment', 'Exfiltration operations', 'Communication relay'],
    assets: ['Russian government sources', 'Military contractors', 'Academic contacts'],
    covers: ['Business consulting firm', 'Cultural exchange program'],
    counter_surveillance: ['Multi-layered security', 'Digital countermeasures', 'Physical surveillance detection'],
    exposure_risks: ['FSB surveillance', 'Asset compromise', 'Diplomatic exposure'],
    intelligence: {
      collection_methods: ['HUMINT', 'SIGINT intercept', 'Document photography'],
      target_classification: 'Russian state secrets',
      operation_duration: '2018-present',
      success_rate: 85,
      compromise_risk: 40,
      last_activity: '2024-01-01'
    }
  },

  {
    id: 'cia_002',
    name: 'Beijing Tech Surveillance',
    codename: 'SILICON DRAGON',
    type: 'surveillance_post',
    coordinates: [39.9042, 116.4074],
    country: 'China',
    region: 'Beijing',
    controlling_agency: 'CIA',
    target_agencies: ['MSS', 'PLA Unit 61398'],
    classification: 'TOP SECRET',
    status: 'ACTIVE',
    operational_security: 'ENHANCED',
    description: 'Technology intelligence collection on Chinese cyber capabilities',
    primary_mission: 'Cyber warfare intelligence collection',
    secondary_missions: ['Technology transfer monitoring', 'Academic recruitment'],
    assets: ['University researchers', 'Tech company employees', 'Government contractors'],
    covers: ['Tech startup', 'Academic exchange program'],
    counter_surveillance: ['Encrypted communications', 'Compartmentalized operations'],
    exposure_risks: ['MSS counterintelligence', 'Academic surveillance', 'Technology monitoring'],
    intelligence: {
      collection_methods: ['Technical intelligence', 'Academic HUMINT', 'Corporate espionage'],
      target_classification: 'Chinese cyber warfare capabilities',
      operation_duration: '2020-present',
      success_rate: 75,
      compromise_risk: 60,
      last_activity: '2024-01-01'
    }
  },

  // SVR Operations
  {
    id: 'svr_001',
    name: 'Washington Embassy Annex',
    codename: 'RED SQUARE',
    type: 'embassy_annex',
    coordinates: [38.9072, -77.0369],
    country: 'United States',
    region: 'Washington DC',
    controlling_agency: 'SVR',
    target_agencies: ['CIA', 'NSA', 'FBI'],
    classification: 'TOP SECRET',
    status: 'ACTIVE',
    operational_security: 'MAXIMUM',
    description: 'Russian intelligence operations under diplomatic cover',
    primary_mission: 'US government and military intelligence collection',
    secondary_missions: ['Technology acquisition', 'Political influence operations'],
    assets: ['Government contractors', 'Academic sources', 'Think tank researchers'],
    covers: ['Diplomatic immunity', 'Cultural affairs'],
    counter_surveillance: ['Diplomatic protection', 'Encrypted communications'],
    exposure_risks: ['FBI surveillance', 'Congressional oversight', 'Media exposure'],
    intelligence: {
      collection_methods: ['Diplomatic HUMINT', 'Social engineering', 'Document theft'],
      target_classification: 'US defense and foreign policy',
      operation_duration: '1991-present',
      success_rate: 80,
      compromise_risk: 35,
      last_activity: '2024-01-01'
    }
  },

  {
    id: 'svr_002',
    name: 'London Financial District',
    codename: 'GOLDEN POUND',
    type: 'front_company',
    coordinates: [51.5074, -0.0901],
    country: 'United Kingdom',
    region: 'London City',
    controlling_agency: 'SVR',
    target_agencies: ['MI6', 'GCHQ'],
    classification: 'SECRET',
    status: 'ACTIVE',
    operational_security: 'ENHANCED',
    description: 'Financial intelligence collection operation',
    primary_mission: 'UK financial and economic intelligence',
    secondary_missions: ['Money laundering operations', 'Sanctions evasion'],
    assets: ['Bank executives', 'Financial consultants', 'Regulatory officials'],
    covers: ['Investment firm', 'Financial consulting'],
    counter_surveillance: ['Corporate legitimacy', 'Financial privacy laws'],
    exposure_risks: ['Financial monitoring', 'Regulatory investigation'],
    intelligence: {
      collection_methods: ['Financial HUMINT', 'Data harvesting', 'Insider trading'],
      target_classification: 'UK economic policy',
      operation_duration: '2015-present',
      success_rate: 90,
      compromise_risk: 25,
      last_activity: '2024-01-01'
    }
  },

  // MSS Operations
  {
    id: 'mss_001',
    name: 'Silicon Valley Tech Hub',
    codename: 'GOLDEN GATE',
    type: 'spy_nest',
    coordinates: [37.4419, -122.1430],
    country: 'United States',
    region: 'California',
    controlling_agency: 'MSS',
    target_agencies: ['CIA', 'NSA', 'FBI'],
    classification: 'TOP SECRET',
    status: 'ACTIVE',
    operational_security: 'ENHANCED',
    description: 'Technology intelligence collection network',
    primary_mission: 'Advanced technology acquisition',
    secondary_missions: ['Academic recruitment', 'Corporate espionage'],
    assets: ['Tech executives', 'University researchers', 'Venture capitalists'],
    covers: ['Research institute', 'Investment firm', 'Cultural association'],
    counter_surveillance: ['Academic cover', 'Business legitimacy'],
    exposure_risks: ['FBI counterintelligence', 'Corporate security'],
    intelligence: {
      collection_methods: ['Technical HUMINT', 'Academic espionage', 'Corporate infiltration'],
      target_classification: 'Advanced US technology',
      operation_duration: '2012-present',
      success_rate: 85,
      compromise_risk: 45,
      last_activity: '2024-01-01'
    }
  },

  // Mossad Operations
  {
    id: 'mossad_001',
    name: 'Tehran Communication Hub',
    codename: 'DESERT FLOWER',
    type: 'communication_hub',
    coordinates: [35.6892, 51.3890],
    country: 'Iran',
    region: 'Tehran',
    controlling_agency: 'Mossad',
    target_agencies: ['IRGC Intelligence', 'MOIS'],
    classification: 'TOP SECRET',
    status: 'ACTIVE',
    operational_security: 'MAXIMUM',
    description: 'Deep cover nuclear intelligence operation',
    primary_mission: 'Iranian nuclear program intelligence',
    secondary_missions: ['IRGC activities monitoring', 'Assassination planning'],
    assets: ['Nuclear scientists', 'IRGC officers', 'Government officials'],
    covers: ['Import/export business', 'Technical consulting'],
    counter_surveillance: ['Multiple cutouts', 'Compartmentalized cells'],
    exposure_risks: ['IRGC counterintelligence', 'Revolutionary Guards'],
    intelligence: {
      collection_methods: ['Scientific HUMINT', 'Technical surveillance', 'Document theft'],
      target_classification: 'Iranian nuclear program',
      operation_duration: '2010-present',
      success_rate: 95,
      compromise_risk: 70,
      last_activity: '2024-01-01'
    }
  },

  // Dead Drop Locations
  {
    id: 'dead_drop_001',
    name: 'Central Park Bridge',
    codename: 'STONE BRIDGE',
    type: 'dead_drop',
    coordinates: [40.7689, -73.9731],
    country: 'United States',
    region: 'New York',
    controlling_agency: 'Multiple',
    target_agencies: ['Various'],
    classification: 'SECRET',
    status: 'ACTIVE',
    operational_security: 'STANDARD',
    description: 'Classic dead drop location for intelligence exchanges',
    primary_mission: 'Secure communication between handlers and assets',
    secondary_missions: ['Emergency communication', 'Document transfer'],
    assets: ['Various intelligence operatives'],
    covers: ['Tourist attraction', 'Jogger route'],
    counter_surveillance: ['Public location', 'Multiple escape routes'],
    exposure_risks: ['Surveillance cameras', 'Tourist witnesses'],
    intelligence: {
      collection_methods: ['Dead drop exchange', 'Brush contacts'],
      target_classification: 'Operational intelligence',
      operation_duration: '1980s-present',
      success_rate: 90,
      compromise_risk: 20,
      last_activity: '2024-01-01'
    }
  },

  {
    id: 'dead_drop_002',
    name: 'Vienna Café Meeting',
    codename: 'COFFEE GROUNDS',
    type: 'asset_meeting',
    coordinates: [48.2082, 16.3738],
    country: 'Austria',
    region: 'Vienna',
    controlling_agency: 'Multiple',
    target_agencies: ['Various'],
    classification: 'SECRET',
    status: 'ACTIVE',
    operational_security: 'ENHANCED',
    description: 'Neutral territory for high-level intelligence meetings',
    primary_mission: 'International intelligence cooperation',
    secondary_missions: ['Defector debriefing', 'Asset recruitment'],
    assets: ['International intelligence officers'],
    covers: ['Business meetings', 'Tourist café'],
    counter_surveillance: ['Neutral country', 'Counter-surveillance teams'],
    exposure_risks: ['Multiple intelligence services', 'International monitoring'],
    intelligence: {
      collection_methods: ['Personal meetings', 'Document exchange'],
      target_classification: 'High-level intelligence',
      operation_duration: '1955-present',
      success_rate: 95,
      compromise_risk: 15,
      last_activity: '2024-01-01'
    }
  },

  // Surveillance Posts
  {
    id: 'surveillance_001',
    name: 'Berlin Embassy Watch',
    codename: 'WALL EYES',
    type: 'surveillance_post',
    coordinates: [52.5200, 13.4050],
    country: 'Germany',
    region: 'Berlin',
    controlling_agency: 'CIA',
    target_agencies: ['BND', 'FSB', 'SVR'],
    classification: 'SECRET',
    status: 'ACTIVE',
    operational_security: 'ENHANCED',
    description: 'Multi-target surveillance post in diplomatic quarter',
    primary_mission: 'Diplomatic intelligence collection',
    secondary_missions: ['Counter-surveillance', 'Communication intercept'],
    assets: ['Electronic surveillance equipment', 'HUMINT operators'],
    covers: ['Commercial building', 'Service apartments'],
    counter_surveillance: ['Electronic countermeasures', 'Physical security'],
    exposure_risks: ['German intelligence', 'Diplomatic surveillance'],
    intelligence: {
      collection_methods: ['Electronic surveillance', 'Visual observation'],
      target_classification: 'Diplomatic activities',
      operation_duration: '1990-present',
      success_rate: 85,
      compromise_risk: 30,
      last_activity: '2024-01-01'
    }
  },

  // Front Companies
  {
    id: 'front_001',
    name: 'Dubai Trading Company',
    codename: 'GOLDEN SANDS',
    type: 'front_company',
    coordinates: [25.2048, 55.2708],
    country: 'United Arab Emirates',
    region: 'Dubai',
    controlling_agency: 'Multiple',
    target_agencies: ['Various Middle Eastern'],
    classification: 'SECRET',
    status: 'ACTIVE',
    operational_security: 'STANDARD',
    description: 'International trading front for multiple intelligence services',
    primary_mission: 'Middle East intelligence collection',
    secondary_missions: ['Money laundering', 'Arms trafficking intelligence'],
    assets: ['Business executives', 'Government contacts'],
    covers: ['Legitimate business operations', 'Free trade zone'],
    counter_surveillance: ['Business legitimacy', 'UAE regulations'],
    exposure_risks: ['Financial monitoring', 'Business investigation'],
    intelligence: {
      collection_methods: ['Business HUMINT', 'Financial intelligence'],
      target_classification: 'Middle East activities',
      operation_duration: '2005-present',
      success_rate: 80,
      compromise_risk: 25,
      last_activity: '2024-01-01'
    }
  }
];

// Espionage Operation Types
export const ESPIONAGE_TYPES = {
  HUMINT: 'Human Intelligence',
  SIGINT: 'Signals Intelligence',
  IMAGERY: 'Imagery Intelligence',
  TECHNICAL: 'Technical Intelligence',
  ECONOMIC: 'Economic Espionage',
  INDUSTRIAL: 'Industrial Espionage',
  POLITICAL: 'Political Intelligence',
  MILITARY: 'Military Intelligence',
  COUNTERINTEL: 'Counterintelligence',
  COVERT_OPS: 'Covert Operations'
};

export const ALL_ESPIONAGE_LOCATIONS = ESPIONAGE_LOCATIONS;