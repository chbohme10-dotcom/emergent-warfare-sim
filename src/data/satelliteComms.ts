// Comprehensive satellite communications and infrastructure dataset
// Inspired by deep-matrix-fall architecture with thousands of nodes

export interface SatelliteNode {
  id: string;
  type: 'satellite' | 'ground_station' | 'relay' | 'deep_space' | 'military' | 'commercial' | 'spy';
  name: string;
  coordinates: [number, number]; // [lat, lng]
  altitude?: number; // for satellites
  status: 'active' | 'inactive' | 'classified' | 'compromised';
  classification: 'unclassified' | 'confidential' | 'secret' | 'top_secret';
  frequency?: string;
  coverage_area?: number; // km radius
  organization?: string;
  purpose: string;
  encryption_level?: 'none' | 'basic' | 'military' | 'quantum';
  threat_level: 'low' | 'medium' | 'high' | 'critical';
}

export interface CommunicationLink {
  id: string;
  from: string;
  to: string;
  type: 'uplink' | 'downlink' | 'crosslink' | 'relay' | 'encrypted' | 'quantum';
  frequency: string;
  bandwidth: string;
  encryption: string;
  active: boolean;
  classification: string;
  strength: number; // 0-100
}

// Major satellite constellations and ground infrastructure
export const SATELLITE_COMMUNICATIONS: SatelliteNode[] = [
  // GPS/GNSS Constellation
  ...Array.from({ length: 32 }, (_, i) => ({
    id: `gps-${i + 1}`,
    type: 'satellite' as const,
    name: `GPS-${i + 1}`,
    coordinates: [
      (Math.random() - 0.5) * 180,
      (Math.random() - 0.5) * 360
    ] as [number, number],
    altitude: 20200,
    status: 'active' as const,
    classification: 'unclassified' as const,
    frequency: '1575.42 MHz',
    organization: 'US Space Force',
    purpose: 'Global positioning and navigation',
    encryption_level: 'military' as const,
    threat_level: 'medium' as const
  })),

  // Starlink Constellation (subset of 4000+)
  ...Array.from({ length: 200 }, (_, i) => ({
    id: `starlink-${i + 1}`,
    type: 'satellite' as const,
    name: `Starlink-${i + 1}`,
    coordinates: [
      (Math.random() - 0.5) * 120, // More concentrated in populated areas
      (Math.random() - 0.5) * 360
    ] as [number, number],
    altitude: 550,
    status: Math.random() > 0.1 ? 'active' as const : 'inactive' as const,
    classification: 'unclassified' as const,
    frequency: 'Ku/Ka Band',
    organization: 'SpaceX',
    purpose: 'Internet connectivity',
    encryption_level: 'basic' as const,
    threat_level: 'low' as const
  })),

  // Military/Intelligence Satellites
  {
    id: 'nro-l87',
    type: 'spy',
    name: 'NROL-87 (Classified)',
    coordinates: [39.0458, -76.6413], // Ft. Meade area
    altitude: 35786,
    status: 'active',
    classification: 'top_secret',
    frequency: 'X-Band',
    organization: 'NRO',
    purpose: 'Signals intelligence',
    encryption_level: 'quantum',
    threat_level: 'critical'
  },
  {
    id: 'keyhole-15',
    type: 'spy',
    name: 'KH-15 Reconnaissance',
    coordinates: [64.8378, -147.7164], // Alaska
    altitude: 400,
    status: 'active',
    classification: 'top_secret',
    frequency: 'Ka-Band',
    organization: 'CIA/NRO',
    purpose: 'Optical reconnaissance',
    encryption_level: 'quantum',
    threat_level: 'critical'
  },

  // Chinese Military Satellites
  {
    id: 'yaogan-35',
    type: 'military',
    name: 'Yaogan-35',
    coordinates: [39.9042, 116.4074], // Beijing
    altitude: 1200,
    status: 'active',
    classification: 'secret',
    frequency: 'S-Band',
    organization: 'PLA',
    purpose: 'Military reconnaissance',
    encryption_level: 'military',
    threat_level: 'high'
  },

  // Russian GLONASS
  ...Array.from({ length: 24 }, (_, i) => ({
    id: `glonass-${i + 1}`,
    type: 'satellite' as const,
    name: `GLONASS-${i + 1}`,
    coordinates: [
      (Math.random() - 0.5) * 180,
      (Math.random() - 0.5) * 360
    ] as [number, number],
    altitude: 19100,
    status: 'active' as const,
    classification: 'confidential' as const,
    frequency: '1602 MHz',
    organization: 'Roscosmos',
    purpose: 'Russian navigation system',
    encryption_level: 'military' as const,
    threat_level: 'medium' as const
  })),

  // Ground Stations - NSA/Five Eyes
  {
    id: 'menwith-hill',
    type: 'ground_station',
    name: 'RAF Menwith Hill',
    coordinates: [54.0094, -1.6922],
    status: 'active',
    classification: 'top_secret',
    frequency: 'Multi-band',
    coverage_area: 5000,
    organization: 'NSA/GCHQ',
    purpose: 'SIGINT collection',
    encryption_level: 'quantum',
    threat_level: 'critical'
  },
  {
    id: 'pine-gap',
    type: 'ground_station',
    name: 'Pine Gap',
    coordinates: [-23.7988, 133.7378],
    status: 'active',
    classification: 'top_secret',
    frequency: 'Multi-band',
    coverage_area: 8000,
    organization: 'CIA/ASD',
    purpose: 'Satellite control & SIGINT',
    encryption_level: 'quantum',
    threat_level: 'critical'
  },
  {
    id: 'bad-aibling',
    type: 'ground_station',
    name: 'Bad Aibling Station',
    coordinates: [47.8636, 12.0086],
    status: 'active',
    classification: 'secret',
    frequency: 'C/Ku/Ka Band',
    organization: 'BND/NSA',
    purpose: 'European SIGINT hub',
    encryption_level: 'military',
    threat_level: 'high'
  },

  // Deep Space Communications
  {
    id: 'dss-14',
    type: 'deep_space',
    name: 'Goldstone DSS-14',
    coordinates: [35.4264, -116.8895],
    status: 'active',
    classification: 'unclassified',
    frequency: 'X/Ka Band',
    coverage_area: 15000,
    organization: 'NASA/JPL',
    purpose: 'Deep space communications',
    encryption_level: 'basic',
    threat_level: 'low'
  },

  // Commercial Satellite Operations
  {
    id: 'intelsat-901',
    type: 'commercial',
    name: 'Intelsat 901',
    coordinates: [0, -27.5], // Geostationary
    altitude: 35786,
    status: 'active',
    classification: 'unclassified',
    frequency: 'C/Ku Band',
    organization: 'Intelsat',
    purpose: 'Commercial communications',
    encryption_level: 'basic',
    threat_level: 'low'
  },

  // Underground/Hardened Facilities
  {
    id: 'cheyenne-mountain',
    type: 'ground_station',
    name: 'Cheyenne Mountain Complex',
    coordinates: [38.7456, -104.8464],
    status: 'active',
    classification: 'top_secret',
    frequency: 'Multi-band',
    organization: 'NORAD/USSTRATCOM',
    purpose: 'Space surveillance & missile warning',
    encryption_level: 'quantum',
    threat_level: 'critical'
  },

  // Rogue/Compromised Assets
  {
    id: 'amateur-sat-1',
    type: 'satellite',
    name: 'FO-29 (Compromised)',
    coordinates: [40.7128, -74.0060], // NYC area
    altitude: 800,
    status: 'compromised',
    classification: 'unclassified',
    frequency: '435 MHz',
    organization: 'Amateur Radio',
    purpose: 'Ham radio relay (hijacked)',
    encryption_level: 'none',
    threat_level: 'medium'
  },

  // 5G Ground Infrastructure
  ...Array.from({ length: 50 }, (_, i) => {
    const cities = [
      [40.7128, -74.0060], // NYC
      [34.0522, -118.2437], // LA
      [41.8781, -87.6298], // Chicago
      [29.7604, -95.3698], // Houston
      [51.5074, -0.1278], // London
      [48.8566, 2.3522], // Paris
      [35.6762, 139.6503], // Tokyo
      [39.9042, 116.4074], // Beijing
      [55.7558, 37.6176], // Moscow
      [28.6139, 77.2090] // Delhi
    ];
    const city = cities[i % cities.length];
    
    return {
      id: `5g-tower-${i + 1}`,
      type: 'ground_station' as const,
      name: `5G Base Station ${i + 1}`,
      coordinates: [
        city[0] + (Math.random() - 0.5) * 0.5,
        city[1] + (Math.random() - 0.5) * 0.5
      ] as [number, number],
      status: 'active' as const,
      classification: 'confidential' as const,
      frequency: '28/39 GHz',
      coverage_area: 1,
      organization: 'Various Telecom',
      purpose: '5G cellular network',
      encryption_level: 'basic' as const,
      threat_level: 'medium' as const
    };
  }),

  // Submarine Cable Landing Stations
  {
    id: 'tac-guam',
    type: 'ground_station',
    name: 'TAT-14 Guam Landing',
    coordinates: [13.4443, 144.7937],
    status: 'active',
    classification: 'secret',
    frequency: 'Fiber Optic',
    organization: 'Various ISPs',
    purpose: 'Undersea cable terminus',
    encryption_level: 'military',
    threat_level: 'high'
  },

  // Iranian/North Korean Assets
  {
    id: 'omid-1',
    type: 'satellite',
    name: 'Omid-1',
    coordinates: [35.6892, 51.3890], // Tehran
    altitude: 400,
    status: 'active',
    classification: 'secret',
    frequency: 'UHF',
    organization: 'Iranian Space Agency',
    purpose: 'Earth observation',
    encryption_level: 'basic',
    threat_level: 'high'
  },
  {
    id: 'kwangmyongsong-4',
    type: 'satellite',
    name: 'Kwangmyongsong-4',
    coordinates: [39.0392, 125.7625], // Pyongyang
    altitude: 500,
    status: 'active',
    classification: 'secret',
    frequency: 'VHF',
    organization: 'NADA',
    purpose: 'Earth observation & signals',
    encryption_level: 'military',
    threat_level: 'critical'
  }
];

// Communication links between nodes
export const COMMUNICATION_LINKS: CommunicationLink[] = [
  {
    id: 'link-1',
    from: 'menwith-hill',
    to: 'nro-l87',
    type: 'uplink',
    frequency: 'X-Band',
    bandwidth: '50 Mbps',
    encryption: 'AES-256',
    active: true,
    classification: 'TOP SECRET',
    strength: 95
  },
  {
    id: 'link-2',
    from: 'pine-gap',
    to: 'keyhole-15',
    type: 'downlink',
    frequency: 'Ka-Band',
    bandwidth: '100 Mbps',
    encryption: 'Quantum',
    active: true,
    classification: 'TOP SECRET',
    strength: 87
  },
  {
    id: 'link-3',
    from: 'cheyenne-mountain',
    to: 'gps-1',
    type: 'crosslink',
    frequency: 'L-Band',
    bandwidth: '10 Mbps',
    encryption: 'Military',
    active: true,
    classification: 'SECRET',
    strength: 92
  }
];

// Generate additional random satellite positions for constellation coverage
export const generateRandomSatellites = (count: number, type: SatelliteNode['type'] = 'satellite'): SatelliteNode[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `random-${type}-${i + 1}`,
    type,
    name: `${type.toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
    coordinates: [
      (Math.random() - 0.5) * 180,
      (Math.random() - 0.5) * 360
    ] as [number, number],
    altitude: Math.floor(Math.random() * 35000) + 200,
    status: Math.random() > 0.15 ? 'active' as const : 'inactive' as const,
    classification: ['unclassified', 'confidential', 'secret', 'top_secret'][Math.floor(Math.random() * 4)] as any,
    frequency: ['VHF', 'UHF', 'C-Band', 'X-Band', 'Ku-Band', 'Ka-Band'][Math.floor(Math.random() * 6)],
    organization: 'Classified',
    purpose: 'Multi-purpose communications',
    encryption_level: ['none', 'basic', 'military', 'quantum'][Math.floor(Math.random() * 4)] as any,
    threat_level: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any
  }));
};

// Export complete dataset with thousands of nodes
export const ALL_SATELLITE_NODES = [
  ...SATELLITE_COMMUNICATIONS,
  ...generateRandomSatellites(800, 'satellite'),
  ...generateRandomSatellites(200, 'ground_station'),
  ...generateRandomSatellites(50, 'relay'),
  ...generateRandomSatellites(30, 'military'),
  ...generateRandomSatellites(20, 'spy')
];