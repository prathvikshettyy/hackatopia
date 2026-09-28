import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  MapPin, 
  ArrowRight,
  Database
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const InteractiveMap: React.FC = () => {
  const { properties, evidence, navigateTo, setSelectedPropertyId } = useApp();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selectedMapProp, setSelectedMapProp] = useState<any>(properties[0]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: [14.45, 74.75],
      zoom: 8,
      scrollWheelZoom: false,
    });

    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors | PROJECT HARMONY CADASTRE',
    }).addTo(map);

    const createCustomIcon = (isConflict: boolean, isDisaster: boolean) => {
      const color = isConflict ? '#DC2626' : isDisaster ? '#B91C1C' : '#2563EB';
      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            width: 22px;
            height: 22px;
            background: ${color};
            border: 2px solid #ffffff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-size: 11px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.5);
          ">
            🏛
          </div>
        `,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });
    };

    properties.forEach((prop) => {
      const isConflict = prop.id === 'KA-BEL-30912';
      const isDisaster = !!prop.disasterAffected;
      const marker = L.marker([prop.coordinates.lat, prop.coordinates.lng], {
        icon: createCustomIcon(isConflict, isDisaster),
      }).addTo(map);

      if (isDisaster) {
        L.circle([prop.coordinates.lat, prop.coordinates.lng], {
          color: '#DC2626',
          fillColor: '#DC2626',
          fillOpacity: 0.12,
          radius: 12000,
          weight: 1,
        }).addTo(map);
      }

      const popupHtml = `
        <div style="font-family: inherit; font-size: 12px; line-height: 1.4; padding: 4px;">
          <div style="color: #60A5FA; font-weight: bold; font-family: monospace;">${prop.id}</div>
          <div style="color: #ffffff; font-weight: 600; font-size: 13px; margin: 2px 0;">Survey ${prop.surveyNumber} — ${prop.recordedOwner}</div>
          <div style="color: #94A3B8; font-size: 11px;">${prop.village}, ${prop.taluk}</div>
          <div style="color: #10B981; font-weight: bold; font-size: 11px; margin-top: 4px;">Evidence Status: Preserved & Verified</div>
          <div style="margin-top: 6px; font-size: 10px; color: #93C5FD;">Click to select parcel details below</div>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="gov-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span>GIS Cadastral Layer</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-sans mt-1">
            Cadastre Spatial GIS Explorer
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Geospatial representation of cadastral parcels, GPS boundary coordinates, and disaster impact zones.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Preserved Parcel
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span> Disaster Impact Zone
          </span>
        </div>
      </div>

      {/* Map & Detail Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-8 gov-card p-2 h-[520px] relative overflow-hidden">
          <div ref={mapContainerRef} className="w-full h-full rounded-md z-10" />
        </div>

        {/* Selected Marker Detail Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="gov-card p-6 space-y-4">
            
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                SELECTED PARCEL RECORD
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                {selectedMapProp.id}
              </h3>
              <div className="text-xs text-slate-400 font-mono">
                Survey Number: <strong className="text-white">{selectedMapProp.surveyNumber}</strong>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-slate-500 text-[10px] font-mono uppercase block">Recorded Owner</span>
                <span className="text-slate-200 font-medium">{selectedMapProp.recordedOwner}</span>
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
                <span className="text-slate-500 text-[10px] font-mono uppercase block">GPS Centroid</span>
                <span className="text-slate-300 font-mono text-[11px]">
                  {selectedMapProp.coordinates.lat.toFixed(4)}°N, {selectedMapProp.coordinates.lng.toFixed(4)}°E
                </span>
              </div>

              <div className="p-3 rounded-md bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">Evidence Vault:</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    {propEvidence.length} Preserved
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  SHA-256 Hashes Anchored on Audit Ledger
                </div>
              </div>

              {selectedMapProp.disasterAffected && (
                <div className="p-2.5 rounded-md bg-red-950/40 border border-red-800/40 text-[11px] text-red-300">
                  ⚠️ <strong>Disaster Alert:</strong> {selectedMapProp.disasterEventName || 'High-Risk Disaster Zone'}
                </div>
              )}
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => navigateTo('property-recovery', selectedMapProp.id)}
                className="w-full py-2 px-3 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <Database className="w-3.5 h-3.5" />
                <span>Recover Property Evidence</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => navigateTo('evidence-vault', selectedMapProp.id)}
                className="w-full py-2 px-3 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
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
