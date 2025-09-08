import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SatelliteNode, ALL_SATELLITE_NODES } from '@/data/satelliteComms';
import { GLOBAL_LOCATIONS } from '@/data/globalLocations';
import { ALL_AIR_ROUTES, ALL_AIRPORTS } from '@/data/airTravelRoutes';
import { ALL_CRIMINAL_NODES } from '@/data/criminalNetworks';
import { ALL_ESPIONAGE_LOCATIONS } from '@/data/espionageLocations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Globe, Map, Satellite, AlertTriangle, Settings } from 'lucide-react';

interface MapboxGlobeProps {
  visibleLayers: string[];
  mapMode: '2d' | '3d';
  onModeChange: (mode: '2d' | '3d') => void;
}

export const MapboxGlobe: React.FC<MapboxGlobeProps> = ({ 
  visibleLayers, 
  mapMode, 
  onModeChange 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('pk.eyJ1IjoiY3JpbmtlZGFydCIsImEiOiJjbWZhbXJkeTgxZDloMmxvZjB1ZjQxczBzIn0.XanOxg-xA88pNFAvy5K5kA');
  const [isTokenSet, setIsTokenSet] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize map when token is provided
  useEffect(() => {
    if (!mapContainer.current || !isTokenSet || !mapboxToken) return;

    setIsLoading(true);
    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapMode === '3d' ? 'mapbox://styles/mapbox/satellite-streets-v12' : 'mapbox://styles/mapbox/dark-v11',
      projection: mapMode === '3d' ? { name: 'globe' } : { name: 'mercator' },
      zoom: mapMode === '3d' ? 1.5 : 2,
      center: [0, 20],
      pitch: mapMode === '3d' ? 45 : 0,
      bearing: 0,
      antialias: true
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add fullscreen control
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    // Add scale control
    map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-left');

    // Configure 3D globe effects
    if (mapMode === '3d') {
      map.current.on('style.load', () => {
        // Add atmosphere
        map.current?.setFog({
          color: 'rgb(186, 210, 235)',
          'high-color': 'rgb(36, 92, 223)',
          'horizon-blend': 0.02,
          'space-color': 'rgb(11, 11, 25)',
          'star-intensity': 0.6
        });

        // Enable terrain
        map.current?.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14
        });
        map.current?.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

        // Add 3D buildings
        const layers = map.current?.getStyle().layers;
        if (layers) {
          const labelLayerId = layers.find(
            (layer) => layer.type === 'symbol' && layer.layout?.['text-field']
          )?.id;

          map.current?.addLayer({
            id: '3d-buildings',
            source: 'composite',
            'source-layer': 'building',
            filter: ['==', 'extrude', 'true'],
            type: 'fill-extrusion',
            minzoom: 15,
            paint: {
              'fill-extrusion-color': '#aaa',
              'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'height']
              ],
              'fill-extrusion-base': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'min_height']
              ],
              'fill-extrusion-opacity': 0.6
            }
          }, labelLayerId);
        }
      });

      // Auto-rotate globe
      let userInteracting = false;
      const spinGlobe = () => {
        const zoom = map.current?.getZoom();
        if (!userInteracting && zoom && zoom < 5) {
          let distancePerSecond = 360 / 240; // Complete rotation in 4 minutes
          if (zoom > 2) {
            const zoomDif = (5 - zoom) / (5 - 2);
            distancePerSecond *= zoomDif;
          }
          const center = map.current?.getCenter();
          if (center) {
            center.lng -= distancePerSecond;
            map.current?.easeTo({ center, duration: 1000, easing: (n) => n });
          }
        }
      };

      // Control auto-rotation based on user interaction
      map.current.on('mousedown', () => { userInteracting = true; });
      map.current.on('mouseup', () => { userInteracting = false; spinGlobe(); });
      map.current.on('touchstart', () => { userInteracting = true; });
      map.current.on('touchend', () => { userInteracting = false; spinGlobe(); });
      map.current.on('moveend', spinGlobe);

      spinGlobe();
    }

    setIsLoading(false);

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, isTokenSet, mapMode]);

  // Add data layers when map is ready and layers change
  useEffect(() => {
    if (!map.current || !isTokenSet) return;

    map.current.on('load', () => {
      addDataLayers();
    });

    if (map.current.isStyleLoaded()) {
      addDataLayers();
    }
  }, [visibleLayers, isTokenSet]);

  const addDataLayers = () => {
    if (!map.current) return;

    // Remove existing sources
    ['satellite-nodes', 'global-locations', 'air-routes', 'airports', 'criminal-nodes', 'espionage-locations'].forEach(sourceId => {
      if (map.current?.getSource(sourceId)) {
        // Remove layers first
        [
          'satellite-points', 'satellite-labels', 'location-points', 'location-labels',
          'air-routes', 'airport-points', 'airport-labels', 'criminal-points', 'criminal-labels',
          'espionage-points', 'espionage-labels'
        ].forEach(layerId => {
          if (map.current?.getLayer(layerId)) {
            map.current.removeLayer(layerId);
          }
        });
        map.current.removeSource(sourceId);
      }
    });

    // Add satellite nodes
    const satelliteFeatures = ALL_SATELLITE_NODES
      .filter(node => visibleLayers.includes('satellites') || visibleLayers.includes(node.type))
      .map(node => ({
        type: 'Feature' as const,
        geometry: {
          type: 'Point' as const,
          coordinates: [node.coordinates[1], node.coordinates[0]]
        },
        properties: {
          ...node,
          color: getNodeColor(node),
          size: getNodeSize(node)
        }
      }));

    if (satelliteFeatures.length > 0) {
      map.current.addSource('satellite-nodes', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: satelliteFeatures
        }
      });

      // Add satellite points
      map.current.addLayer({
        id: 'satellite-points',
        type: 'circle',
        source: 'satellite-nodes',
        paint: {
          'circle-radius': ['get', 'size'],
          'circle-color': ['get', 'color'],
          'circle-opacity': [
            'case',
            ['==', ['get', 'status'], 'active'], 0.9,
            ['==', ['get', 'status'], 'compromised'], 0.7,
            0.5
          ],
          'circle-stroke-width': 1,
          'circle-stroke-color': '#ffffff'
        }
      });

      // Add satellite labels
      map.current.addLayer({
        id: 'satellite-labels',
        type: 'symbol',
        source: 'satellite-nodes',
        layout: {
          'text-field': ['get', 'name'],
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-size': 10,
          'text-offset': [0, 1.5],
          'text-anchor': 'top'
        },
        paint: {
          'text-color': '#ffffff',
          'text-halo-color': '#000000',
          'text-halo-width': 1
        }
      });
    }

    // Add global locations
    const locationFeatures: any[] = [];
    GLOBAL_LOCATIONS.forEach(category => {
      if (visibleLayers.includes(category.id)) {
        category.subcategories.forEach(subcategory => {
          subcategory.locations.forEach(location => {
            if (location.coordinates) {
              locationFeatures.push({
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [location.coordinates[1], location.coordinates[0]]
                },
                properties: {
                  ...location,
                  category: category.id,
                  color: category.color,
                  size: getLocationSize(location.classification)
                }
              });
            }
          });
        });
      }
    });

    if (locationFeatures.length > 0) {
      map.current.addSource('global-locations', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: locationFeatures
        }
      });

      // Add location points
      map.current.addLayer({
        id: 'location-points',
        type: 'circle',
        source: 'global-locations',
        paint: {
          'circle-radius': ['get', 'size'],
          'circle-color': ['get', 'color'],
          'circle-opacity': 0.8,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      });

      // Add location labels
      map.current.addLayer({
        id: 'location-labels',
        type: 'symbol',
        source: 'global-locations',
        layout: {
          'text-field': ['get', 'name'],
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-size': 11,
          'text-offset': [0, 1.5],
          'text-anchor': 'top'
        },
        paint: {
          'text-color': '#ffffff',
          'text-halo-color': '#000000',
          'text-halo-width': 1
        }
      });
    }

    // Add Air Routes
    if (visibleLayers.includes('air_routes')) {
      const routeFeatures = ALL_AIR_ROUTES.map(route => ({
        type: 'Feature' as const,
        geometry: {
          type: 'LineString' as const,
          coordinates: [
            [route.origin.coordinates[1], route.origin.coordinates[0]],
            ...(route.waypoints?.map(wp => [wp.coordinates[1], wp.coordinates[0]]) || []),
            [route.destination.coordinates[1], route.destination.coordinates[0]]
          ]
        },
        properties: {
          ...route,
          color: getRouteColor(route.type),
          width: getRouteWidth(route.classification)
        }
      }));

      if (routeFeatures.length > 0) {
        map.current.addSource('air-routes', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: routeFeatures }
        });

        map.current.addLayer({
          id: 'air-routes',
          type: 'line',
          source: 'air-routes',
          paint: {
            'line-color': ['get', 'color'],
            'line-width': ['get', 'width'],
            'line-opacity': 0.8,
            'line-dasharray': [
              'case',
              ['==', ['get', 'type'], 'covert'], [2, 2],
              ['==', ['get', 'type'], 'military'], [4, 2],
              [1]
            ]
          }
        });
      }
    }

    // Add Airports
    if (visibleLayers.includes('airports')) {
      const airportFeatures = ALL_AIRPORTS.map(airport => ({
        type: 'Feature' as const,
        geometry: {
          type: 'Point' as const,
          coordinates: [airport.coordinates[1], airport.coordinates[0]]
        },
        properties: {
          ...airport,
          color: getAirportColor(airport.type),
          size: getAirportSize(airport.classification)
        }
      }));

      if (airportFeatures.length > 0) {
        map.current.addSource('airports', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: airportFeatures }
        });

        map.current.addLayer({
          id: 'airport-points',
          type: 'circle',
          source: 'airports',
          paint: {
            'circle-radius': ['get', 'size'],
            'circle-color': ['get', 'color'],
            'circle-opacity': 0.9,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
          }
        });

        map.current.addLayer({
          id: 'airport-labels',
          type: 'symbol',
          source: 'airports',
          layout: {
            'text-field': ['get', 'name'],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-size': 9,
            'text-offset': [0, 1.5],
            'text-anchor': 'top'
          },
          paint: {
            'text-color': '#ffffff',
            'text-halo-color': '#000000',
            'text-halo-width': 1
          }
        });
      }
    }

    // Add Criminal Networks
    if (visibleLayers.includes('criminal_networks')) {
      const criminalFeatures = ALL_CRIMINAL_NODES.map(node => ({
        type: 'Feature' as const,
        geometry: {
          type: 'Point' as const,
          coordinates: [node.coordinates[1], node.coordinates[0]]
        },
        properties: {
          ...node,
          color: getCriminalColor(node.type),
          size: getCriminalSize(node.threat_level)
        }
      }));

      if (criminalFeatures.length > 0) {
        map.current.addSource('criminal-nodes', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: criminalFeatures }
        });

        map.current.addLayer({
          id: 'criminal-points',
          type: 'circle',
          source: 'criminal-nodes',
          paint: {
            'circle-radius': ['get', 'size'],
            'circle-color': ['get', 'color'],
            'circle-opacity': 0.8,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000'
          }
        });

        map.current.addLayer({
          id: 'criminal-labels',
          type: 'symbol',
          source: 'criminal-nodes',
          layout: {
            'text-field': ['get', 'name'],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-size': 8,
            'text-offset': [0, 1.5],
            'text-anchor': 'top'
          },
          paint: {
            'text-color': '#ff4444',
            'text-halo-color': '#000000',
            'text-halo-width': 1
          }
        });
      }
    }

    // Add Espionage Locations
    if (visibleLayers.includes('espionage')) {
      const espionageFeatures = ALL_ESPIONAGE_LOCATIONS.map(location => ({
        type: 'Feature' as const,
        geometry: {
          type: 'Point' as const,
          coordinates: [location.coordinates[1], location.coordinates[0]]
        },
        properties: {
          ...location,
          color: getEspionageColor(location.type),
          size: getEspionageSize(location.classification)
        }
      }));

      if (espionageFeatures.length > 0) {
        map.current.addSource('espionage-locations', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: espionageFeatures }
        });

        map.current.addLayer({
          id: 'espionage-points',
          type: 'circle',
          source: 'espionage-locations',
          paint: {
            'circle-radius': ['get', 'size'],
            'circle-color': ['get', 'color'],
            'circle-opacity': 0.7,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#ffffff'
          }
        });

        map.current.addLayer({
          id: 'espionage-labels',
          type: 'symbol',
          source: 'espionage-locations',
          layout: {
            'text-field': ['get', 'codename'],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-size': 8,
            'text-offset': [0, 1.5],
            'text-anchor': 'top'
          },
          paint: {
            'text-color': '#00ff88',
            'text-halo-color': '#000000',
            'text-halo-width': 1
          }
        });
      }
    }

    // Add click handlers
    [
      'satellite-points', 'location-points', 'airport-points', 
      'criminal-points', 'espionage-points'
    ].forEach(layerId => {
      if (map.current?.getLayer(layerId)) {
        map.current.on('click', layerId, (e) => {
          if (e.features && e.features[0]) {
            const properties = e.features[0].properties;
            
            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(`
                <div class="p-3 bg-terminal-bg border border-terminal-border rounded">
                  <h3 class="font-bold text-glow-primary mb-2">${properties?.name}</h3>
                  <div class="space-y-1 text-xs text-terminal-text">
                    <div><strong>Type:</strong> ${properties?.type}</div>
                    <div><strong>Status:</strong> ${properties?.status}</div>
                    <div><strong>Classification:</strong> ${properties?.classification}</div>
                    ${properties?.organization ? `<div><strong>Organization:</strong> ${properties?.organization}</div>` : ''}
                    ${properties?.purpose ? `<div><strong>Purpose:</strong> ${properties?.purpose}</div>` : ''}
                    ${properties?.frequency ? `<div><strong>Frequency:</strong> ${properties?.frequency}</div>` : ''}
                    ${properties?.altitude ? `<div><strong>Altitude:</strong> ${properties?.altitude} km</div>` : ''}
                  </div>
                </div>
              `)
              .addTo(map.current!);
          }
        });

        // Change cursor on hover
        map.current.on('mouseenter', layerId, () => {
          if (map.current) map.current.getCanvas().style.cursor = 'pointer';
        });
        map.current.on('mouseleave', layerId, () => {
          if (map.current) map.current.getCanvas().style.cursor = '';
        });
      }
    });
  };

  const getNodeColor = (node: SatelliteNode) => {
    switch (node.classification) {
      case 'top_secret': return '#ff0066';
      case 'secret': return '#ff4444';
      case 'confidential': return '#ff8800';
      case 'unclassified': return '#00ff88';
      default: return '#ffffff';
    }
  };

  const getNodeSize = (node: SatelliteNode) => {
    const baseSize = mapMode === '3d' ? 8 : 6;
    switch (node.classification) {
      case 'top_secret': return baseSize * 1.5;
      case 'secret': return baseSize * 1.3;
      case 'confidential': return baseSize * 1.1;
      default: return baseSize;
    }
  };

  const getLocationSize = (classification: string) => {
    const baseSize = mapMode === '3d' ? 6 : 4;
    switch (classification.toLowerCase()) {
      case 'top secret': return baseSize * 1.4;
      case 'secret': return baseSize * 1.2;
      case 'confidential': return baseSize * 1.1;
      default: return baseSize;
    }
  };

  const getRouteColor = (type: string) => {
    switch (type) {
      case 'commercial': return '#00ff88';
      case 'military': return '#ff4444';
      case 'covert': return '#ff0066';
      case 'diplomatic': return '#ffaa00';
      case 'cargo': return '#8888ff';
      default: return '#ffffff';
    }
  };

  const getRouteWidth = (classification: string) => {
    switch (classification) {
      case 'TOP SECRET': return 4;
      case 'SECRET': return 3;
      case 'CONFIDENTIAL': return 2;
      default: return 1;
    }
  };

  const getAirportColor = (type: string) => {
    switch (type) {
      case 'black_site': return '#000000';
      case 'military': return '#ff4444';
      case 'civilian': return '#00ff88';
      case 'joint_use': return '#ffaa00';
      case 'private': return '#8888ff';
      default: return '#ffffff';
    }
  };

  const getAirportSize = (classification: string) => {
    const baseSize = mapMode === '3d' ? 8 : 6;
    switch (classification) {
      case 'TOP SECRET': return baseSize * 1.5;
      case 'SECRET': return baseSize * 1.3;
      case 'CONFIDENTIAL': return baseSize * 1.1;
      default: return baseSize;
    }
  };

  const getCriminalColor = (type: string) => {
    switch (type) {
      case 'cartel_hq': return '#8B0000';
      case 'trafficking_route': return '#FF4500';
      case 'money_laundering': return '#FFD700';
      case 'weapons_cache': return '#A0522D';
      case 'corruption_node': return '#800080';
      default: return '#8B4513';
    }
  };

  const getCriminalSize = (threatLevel: string) => {
    const baseSize = mapMode === '3d' ? 7 : 5;
    switch (threatLevel) {
      case 'CRITICAL': return baseSize * 1.6;
      case 'HIGH': return baseSize * 1.3;
      case 'MEDIUM': return baseSize * 1.1;
      default: return baseSize;
    }
  };

  const getEspionageColor = (type: string) => {
    switch (type) {
      case 'spy_nest': return '#4B0082';
      case 'safe_house': return '#228B22';
      case 'dead_drop': return '#000080';
      case 'surveillance_post': return '#FF1493';
      case 'embassy_annex': return '#DAA520';
      default: return '#008B8B';
    }
  };

  const getEspionageSize = (classification: string) => {
    const baseSize = mapMode === '3d' ? 6 : 4;
    switch (classification) {
      case 'TOP SECRET': return baseSize * 1.4;
      case 'SECRET': return baseSize * 1.2;
      case 'CONFIDENTIAL': return baseSize * 1.1;
      default: return baseSize;
    }
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setIsTokenSet(true);
    }
  };

  if (!isTokenSet) {
    return (
      <div className="flex items-center justify-center h-full bg-terminal-bg">
        <Card className="w-96 p-6 bg-terminal-surface border-terminal-border">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-glow-primary" />
              <h3 className="font-display font-bold text-glow-primary">MAPBOX CONFIGURATION</h3>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-terminal-text">
                Enter your Mapbox public token to enable real-world mapping:
              </p>
              <Input
                type="password"
                placeholder="pk.eyJ1IjoieW91cm5hbWUiLCJhIjoiY..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="font-mono text-xs"
              />
            </div>
            
            <div className="space-y-2">
              <p className="text-xs text-terminal-muted">
                Get your token from: <span className="text-glow-primary">mapbox.com</span>
              </p>
              <Button 
                onClick={handleTokenSubmit}
                disabled={!mapboxToken.trim()}
                className="w-full"
              >
                Initialize Map
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Map Container */}
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-terminal-bg/80 flex items-center justify-center z-10">
          <div className="text-glow-primary font-display">Initializing Global Map...</div>
        </div>
      )}

      {/* Map Mode Toggle */}
      <Card className="absolute top-4 right-4 p-2 bg-terminal-bg/90 border-terminal-border backdrop-blur-md">
        <div className="flex gap-1">
          <Button
            variant={mapMode === '2d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onModeChange('2d')}
            className="text-xs"
          >
            <Map className="w-3 h-3 mr-1" />
            2D
          </Button>
          <Button
            variant={mapMode === '3d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onModeChange('3d')}
            className="text-xs"
          >
            <Globe className="w-3 h-3 mr-1" />
            3D
          </Button>
        </div>
      </Card>

      {/* Stats Panel */}
      <Card className="absolute bottom-4 right-4 p-3 bg-terminal-bg/90 border-terminal-border backdrop-blur-md">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Satellite className="w-4 h-4 text-glow-primary" />
            <span className="font-display font-bold text-glow-primary text-sm">LIVE ASSETS</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="text-terminal-muted">Satellites</div>
              <div className="text-glow-primary font-mono">
                {ALL_SATELLITE_NODES.filter(n => n.type === 'satellite').length}
              </div>
            </div>
            <div>
              <div className="text-terminal-muted">Ground Stations</div>
              <div className="text-glow-primary font-mono">
                {ALL_SATELLITE_NODES.filter(n => n.type === 'ground_station').length}
              </div>
            </div>
            <div>
              <div className="text-terminal-muted">Military</div>
              <div className="text-glow-primary font-mono">
                {ALL_SATELLITE_NODES.filter(n => n.type === 'military' || n.type === 'spy').length}
              </div>
            </div>
            <div>
              <div className="text-terminal-muted">Compromised</div>
              <div className="text-orange-500 font-mono">
                {ALL_SATELLITE_NODES.filter(n => n.status === 'compromised').length}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs mt-3">
            <div>
              <div className="text-terminal-muted">Air Routes</div>
              <div className="text-glow-primary font-mono">
                {ALL_AIR_ROUTES.length}
              </div>
            </div>
            <div>
              <div className="text-terminal-muted">Airports</div>
              <div className="text-glow-primary font-mono">
                {ALL_AIRPORTS.length}
              </div>
            </div>
            <div>
              <div className="text-terminal-muted">Criminal Ops</div>
              <div className="text-red-500 font-mono">
                {ALL_CRIMINAL_NODES.length}
              </div>
            </div>
            <div>
              <div className="text-terminal-muted">Espionage</div>
              <div className="text-purple-500 font-mono">
                {ALL_ESPIONAGE_LOCATIONS.length}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};