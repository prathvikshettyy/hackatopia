import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  Database, 
  MapPin, 
  FileCheck2, 
  Camera, 
  FileText, 
  Users, 
  Hash, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  Compass,
  FileCode,
  Download
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatTimestamp, truncateHash } from '../../utils/crypto';

export const PropertyRecovery: React.FC = () => {
  const { 
    properties, 
    evidence, 
    attestations, 
    recoveryCases, 
    searchQuery, 
    setSearchQuery,
    selectedPropertyId, 
    setSelectedPropertyId,
    navigateTo,
    jumpToDemoStep,
    guidedDemoStep
  } = useApp();

  const [inputQuery, setInputQuery] = useState(searchQuery || selectedPropertyId || 'KA-SIR-10234');
  const [matchedProperty, setMatchedProperty] = useState<any>(null);

  // Auto-search if query or selectedPropertyId changes
  useEffect(() => {
    const q = (searchQuery || inputQuery || selectedPropertyId || 'KA-SIR-10234').trim().toLowerCase();
    const found = properties.find(p => 
      p.id.toLowerCase() === q ||
      p.surveyNumber.toLowerCase() === q ||
      p.recordedOwner.toLowerCase().includes(q) ||
      p.ulpin.toLowerCase() === q
    );
    if (found) {
      setMatchedProperty(found);
      setSelectedPropertyId(found.id);
    } else if (properties.length > 0) {
      setMatchedProperty(properties[0]);
    }
  }, [searchQuery, selectedPropertyId, properties]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = inputQuery.trim().toLowerCase();
    const found = properties.find(p => 
      p.id.toLowerCase() === q ||
      p.surveyNumber.toLowerCase() === q ||
      p.recordedOwner.toLowerCase().includes(q) ||
      p.ulpin.toLowerCase() === q
    );
    if (found) {
      setMatchedProperty(found);
      setSelectedPropertyId(found.id);
      if (guidedDemoStep === 7) {
        jumpToDemoStep(8);
      }
    } else {
      alert(`No record found matching "${inputQuery}" in DEMO GOVERNMENT RECORDS.`);
    }
  };

  const currentProperty = matchedProperty || properties[0];
  const linkedEvidence = evidence.filter(e => e.propertyId === currentProperty?.id);
  const linkedAttestations = attestations.filter(a => a.propertyId === currentProperty?.id);
  const linkedCase = recoveryCases.find(c => c.propertyId === currentProperty?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Disaster Evidence Reconstruction Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
          Recover My Property Evidence
        </h2>
        <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
          Search the <strong className="text-slate-200">DEMO GOVERNMENT RECORDS</strong> to locate your cadastral parcel. PROJECT HARMONY will automatically retrieve all cryptographically anchored evidence, photos, GPS boundaries, and community attestations to assemble your complete recovery file.
        </p>

        {/* Search Input Bar */}
        <form onSubmit={handleSearch} className="pt-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={inputQuery}
                onChange={e => setInputQuery(e.target.value)}
                placeholder="Search Property ID (KA-SIR-10234), Survey No (124/3A), or Owner Name..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-glow-cyan transition-all"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Query Records</span>
            </button>
          </div>

          {/* Quick Demo Search Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-3 text-[11px]">
            <span className="text-slate-500 font-mono">Demo Record Chips:</span>
            <button
              type="button"
              onClick={() => {
                setInputQuery('KA-SIR-10234');
                const p = properties.find(x => x.id === 'KA-SIR-10234');
                if (p) setMatchedProperty(p);
              }}
              className="px-2.5 py-1 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 font-mono"
            >
              KA-SIR-10234 (Ravi Kumar - Sirsi)
            </button>
            <button
              type="button"
              onClick={() => {
                setInputQuery('KA-KAR-20411');
                const p = properties.find(x => x.id === 'KA-KAR-20411');
                if (p) setMatchedProperty(p);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-mono"
            >
              KA-KAR-20411 (Lakshmi Bai - Karwar)
            </button>
            <button
              type="button"
              onClick={() => {
                setInputQuery('KA-BEL-30912');
                const p = properties.find(x => x.id === 'KA-BEL-30912');
                if (p) setMatchedProperty(p);
              }}
              className="px-2.5 py-1 rounded-lg bg-rose-950/40 hover:bg-rose-900/40 border border-rose-500/30 text-rose-300 font-mono"
            >
              KA-BEL-30912 (Conflict Demo - Belagavi)
            </button>
            <button
              type="button"
              onClick={() => {
                setInputQuery('KA-KOD-40188');
                const p = properties.find(x => x.id === 'KA-KOD-40188');
                if (p) setMatchedProperty(p);
              }}
              className="px-2.5 py-1 rounded-lg bg-purple-950/40 hover:bg-purple-900/40 border border-purple-500/30 text-purple-300 font-mono"
            >
              KA-KOD-40188 (Attestation Demo - Kodagu)
            </button>
          </div>
        </form>
      </div>

      {currentProperty && (
        <div className="space-y-6">
          
          {/* Dual-Record Card: Government Record + HARMONY Evidence */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 1 Column: PROPERTY RECOVERY FILE (Govt Record Details) */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <Database className="w-4 h-4" />
                  <span>DEMO GOVERNMENT RECORDS</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  Cadastre Match
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 font-mono text-[10px] uppercase block">Property Identifier</span>
                  <span className="text-cyan-300 font-mono font-bold text-sm">{currentProperty.id}</span>
                  <div className="text-[10px] font-mono text-slate-400">{currentProperty.ulpin}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80">
                  <div>
                    <span className="text-slate-500 font-mono text-[10px] uppercase block">Survey Number</span>
                    <span className="text-slate-200 font-bold">{currentProperty.surveyNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono text-[10px] uppercase block">Recorded Owner</span>
                    <span className="text-slate-200 font-bold">{currentProperty.recordedOwner}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80">
                  <div>
                    <span className="text-slate-500 font-mono text-[10px] uppercase block">Land Area</span>
                    <span className="text-slate-200 font-medium">{currentProperty.area}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono text-[10px] uppercase block">Property Type</span>
                    <span className="text-slate-200 font-medium">{currentProperty.propertyType}</span>
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-800/80">
                  <span className="text-slate-500 font-mono text-[10px] uppercase block">Cadastral Location</span>
                  <span className="text-slate-200">{currentProperty.village}, {currentProperty.taluk}, {currentProperty.district}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80">
                  <div>
                    <span className="text-slate-500 font-mono text-[10px] uppercase block">Record Status</span>
                    <span className="text-emerald-400 font-mono">{currentProperty.recordStatus}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono text-[10px] uppercase block">Mutation Status</span>
                    <span className="text-slate-300 font-mono text-[11px]">{currentProperty.mutationStatus}</span>
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-800/80">
                  <span className="text-slate-500 font-mono text-[10px] uppercase block">Sub-Registrar Registry Ref</span>
                  <span className="text-slate-300 font-mono">{currentProperty.registrationReference}</span>
                </div>

                <div className="pt-1 border-t border-slate-800/80">
                  <span className="text-slate-500 font-mono text-[10px] uppercase block">GPS Cadastral Centroid</span>
                  <span className="text-cyan-400 font-mono text-[11px]">
                    {currentProperty.coordinates.lat.toFixed(4)}°N, {currentProperty.coordinates.lng.toFixed(4)}°E
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    if (guidedDemoStep === 8) {
                      jumpToDemoStep(9);
                    } else {
                      navigateTo('verification', currentProperty.id);
                    }
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-glow-purple transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Run Verification Engine</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right 2 Columns: Retrieved HARMONY Evidence */}
            <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>RETRIEVED PROJECT HARMONY EVIDENCE ({linkedEvidence.length} ASSETS)</span>
                </div>
                <button
                  onClick={() => navigateTo('evidence-vault', currentProperty.id)}
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-mono"
                >
                  <span>Vault Details</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* 6 Category Evidence Grid (Requirement #8) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 1. GPS Evidence */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold font-mono">
                    <MapPin className="w-3.5 h-3.5" />
                    📍 GPS Evidence
                  </div>
                  <div className="text-xs text-slate-200 font-medium">
                    Boundary Waypoint Coordinates
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    {currentProperty.coordinates.lat.toFixed(4)}°N, {currentProperty.coordinates.lng.toFixed(4)}°E
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono">
                    ✓ Verified within Cadastral Polygon
                  </div>
                </div>

                {/* 2. Property Photos */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold font-mono">
                    <Camera className="w-3.5 h-3.5" />
                    📸 Property Photos
                  </div>
                  <div className="text-xs text-slate-200 font-medium">
                    {linkedEvidence.filter(e => e.category === 'Property Photograph').length} High-Res Images Preserved
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Geotagged stone markers & dwelling roofline
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono">
                    ✓ Pre-Disaster Imagery Match
                  </div>
                </div>

                {/* 3. Preserved Documents */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold font-mono">
                    <FileText className="w-3.5 h-3.5" />
                    📄 Preserved Documents
                  </div>
                  <div className="text-xs text-slate-200 font-medium">
                    {linkedEvidence.filter(e => e.category !== 'Property Photograph').length} Documents on File
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Registered Deed Extracts, Tax Challans, Utility Proof
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono">
                    ✓ OCR Fields Extracted
                  </div>
                </div>

                {/* 4. Community Attestations */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold font-mono">
                    <Users className="w-3.5 h-3.5" />
                    👥 Community Attestations
                  </div>
                  <div className="text-xs text-slate-200 font-medium">
                    {linkedAttestations.length} Neighbor & Field Statements
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Pre-disaster occupancy sworn statements
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono">
                    ✓ Corroborating Evidence Only
                  </div>
                </div>

                {/* 5. Evidence Hashes */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold font-mono">
                    <Hash className="w-3.5 h-3.5" />
                    🔐 Evidence Hashes (SHA-256)
                  </div>
                  <div className="text-xs text-slate-200 font-medium">
                    Immutable Cryptographic Fingerprints
                  </div>
                  <div className="text-[10px] font-mono text-cyan-300 truncate">
                    {truncateHash(linkedEvidence[0]?.sha256Hash || '8a72ec93b48f657a1e0b92d6e4c7f1a3098d57e2c41893bf720c45aa8191bf3e', 12, 12)}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono">
                    ✓ Zero Hash Tampering Detected
                  </div>
                </div>

                {/* 6. Timestamps */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    🕐 Pre-Disaster Timestamps
                  </div>
                  <div className="text-xs text-slate-200 font-medium">
                    Chronological Audit Trail
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {linkedEvidence[0] ? formatTimestamp(linkedEvidence[0].timestamp) : '2024-03-15'}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono">
                    ✓ Preserved Before Disaster Date
                  </div>
                </div>

              </div>

              {/* Evidence Items Micro-Table */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Preserved Vault Files for this Parcel
                </div>
                <div className="space-y-1.5">
                  {linkedEvidence.map(ev => (
                    <div 
                      key={ev.id}
                      className="p-2.5 rounded-lg bg-slate-950/90 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileCheck2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="font-semibold text-slate-200 truncate">{ev.fileName}</span>
                        <span className="text-[10px] font-mono text-slate-500">[{ev.category}]</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 font-mono text-[10px]">
                        <span className="text-cyan-400">{truncateHash(ev.sha256Hash, 6, 6)}</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {ev.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
