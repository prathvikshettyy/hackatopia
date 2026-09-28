import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  MapPin, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  Waves, 
  Building2, 
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const InteractiveMap: React.FC = () => {
  const { properties, evidence, navigateTo, setSelectedPropertyId } = useApp();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selectedMapProp, setSelectedMapProp] = useState<any>(properties[0]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy existing instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Default center around Western Ghats / Karnataka (Sirsi: 14.6195, 74.8354)
    const map = L.map(mapContainerRef.current, {
      center: [14.45, 74.75],
      zoom: 8,
      scrollWheelZoom: false,
    });

    mapInstanceRef.current = map;

    // Dark OpenStreetMap Tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors | PROJECT HARMONY CADASTRE',
    }).addTo(map);

    // Custom marker icon creator
    const createCustomIcon = (isConflict: boolean, isDisaster: boolean) => {
      const color = isConflict ? '#F43F5E' : isDisaster ? '#EC4899' : '#00F0FF';
      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            width: 24px;
            height: 24px;
            background: ${color};
            border: 2px solid #ffffff;
            border-radius: 50%;
            box-shadow: 0 0 14px ${color};
            display: flex;
            align-items: center;
            justify-content: center;
            color: #030712;
            font-size: 11px;
            font-weight: bold;
          ">
            🏛
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
    };

    // Plot each property
    properties.forEach((prop) => {
      const isConflict = prop.id === 'KA-BEL-30912';
      const isDisaster = !!prop.disasterAffected;
      const marker = L.marker([prop.coordinates.lat, prop.coordinates.lng], {
        icon: createCustomIcon(isConflict, isDisaster),
      }).addTo(map);

      // Add Disaster Risk Buffer Zone
      if (isDisaster) {
        L.circle([prop.coordinates.lat, prop.coordinates.lng], {
          color: '#F43F5E',
          fillColor: '#F43F5E',
          fillOpacity: 0.15,
          radius: 12000,
          weight: 1,
        }).addTo(map);
      }

      // Popup Content (Requirement #17)
      const popupHtml = `
        <div style="font-family: inherit; font-size: 12px; line-height: 1.4; padding: 4px;">
          <div style="color: #00F0FF; font-weight: bold; font-family: monospace;">${prop.id}</div>
          <div style="color: #ffffff; font-weight: 600; font-size: 13px; margin: 2px 0;">Sy ${prop.surveyNumber} — ${prop.recordedOwner}</div>
          <div style="color: #94A3B8; font-size: 11px;">${prop.village}, ${prop.taluk}</div>
          <div style="color: #10B981; font-weight: bold; font-size: 11px; margin-top: 4px;">Evidence Status: Preserved & Verified</div>
          <div style="margin-top: 6px; font-size: 10px; color: #38BDF8;">Click to select parcel details below</div>
        </div>
      `;

      marker.bindPopup(popupHtml);
      marker.on('click', () => {
        setSelectedMapProp(prop);
        setSelectedPropertyId(prop.id);
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [properties]);

  const propEvidence = evidence.filter(e => e.propertyId === selectedMapProp?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>GIS Cadastral & Disaster Spatial Layer</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-display mt-1">
            Cadastre Map & Evidence GIS Explorer
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            OpenStreetMap geospatial visualization of parcels, GPS boundary coordinates, and disaster impact zones.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> Preserved Parcel
          </span>
          <span className="flex items-center gap-1.5 text-rose-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Disaster Impact Zone
          </span>
        </div>
      </div>

      {/* Map + Detail Side Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Leaflet Map Container */}
        <div className="lg:col-span-8 glass-panel p-2 rounded-2xl border border-slate-800 h-[520px] relative overflow-hidden">
          <div ref={mapContainerRef} className="w-full h-full rounded-xl z-10" />
        </div>

        {/* Selected Marker Detail Card (Requirement #17) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                SELECTED PARCEL IN GIS CADASTRE
              </span>
              <h3 className="text-lg font-bold text-white font-display mt-0.5">
                {selectedMapProp.id}
              </h3>
              <div className="text-xs text-slate-400 font-mono">
                Survey Number: <strong className="text-slate-200">{selectedMapProp.surveyNumber}</strong>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-slate-500 text-[10px] font-mono uppercase block">Recorded Owner</span>
                <span className="text-slate-200 font-bold">{selectedMapProp.recordedOwner}</span>
              </div>

              <div>
                <span className="text-slate-500 text-[10px] font-mono uppercase block">Cadastral Location</span>
                <span className="text-slate-200">{selectedMapProp.village}, {selectedMapProp.taluk}, {selectedMapProp.district}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800">
                <div>
                  <span className="text-slate-500 text-[10px] font-mono uppercase block">Area Extent</span>
                  <span className="text-slate-200">{selectedMapProp.area}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] font-mono uppercase block">Property Type</span>
                  <span className="text-slate-200">{selectedMapProp.propertyType}</span>
                </div>
              </div>

              <div className="pt-1 border-t border-slate-800">
                <span className="text-slate-500 text-[10px] font-mono uppercase block">GPS Centroid Coordinates</span>
                <span className="text-cyan-400 font-mono text-[11px]">
                  {selectedMapProp.coordinates.lat.toFixed(4)}°N, {selectedMapProp.coordinates.lng.toFixed(4)}°E
                </span>
              </div>

              {/* Evidence status summary */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">Evidence Vault:</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    {propEvidence.length} Preserved
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  SHA-256 Hashes Anchored on Prototype Ledger
                </div>
              </div>

              {selectedMapProp.disasterAffected && (
                <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-[11px] text-rose-300">
                  ⚠️ <strong>Disaster Alert:</strong> {selectedMapProp.disasterEventName || 'High-Risk Disaster Zone'}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => navigateTo('property-recovery', selectedMapProp.id)}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-glow-cyan transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Recover Property Evidence</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => navigateTo('evidence-vault', selectedMapProp.id)}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
              >
                <span>View Preserved Vault ({propEvidence.length})</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
