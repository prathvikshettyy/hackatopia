import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Flame, 
  Waves, 
  FileX, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Clock, 
  Hash,
  Database
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Property } from '../../types/property';

export const DisasterSimulationModal: React.FC = () => {
  const { 
    disasterModalProperty, 
    setDisasterModalProperty, 
    navigateTo, 
    setSearchQuery,
    jumpToDemoStep,
    guidedDemoStep
  } = useApp();

  const [simulating, setSimulating] = useState(false);

  if (!disasterModalProperty) return null;

  const property = disasterModalProperty;

  const handleStartRecovery = () => {
    setDisasterModalProperty(null);
    setSearchQuery(property.id);
    if (guidedDemoStep === 5) {
      jumpToDemoStep(6);
    } else {
      navigateTo('property-recovery', property.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 to-navy-950 border border-rose-500/40 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Disaster Warning Top Banner */}
        <div className="bg-gradient-to-r from-rose-900/80 via-red-900/60 to-rose-950/90 p-4 border-b border-rose-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center animate-pulse">
              <Waves className="w-6 h-6 text-rose-400" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-rose-300 font-bold flex items-center gap-1.5">
                <span>SIMULATED DISASTER EVENT</span>
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              </div>
              <h3 className="text-base font-bold text-white font-display">
                Catastrophic Flash Flood & Hill Landslide
              </h3>
            </div>
          </div>
          <button
            onClick={() => setDisasterModalProperty(null)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Disaster Context Card */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800 mb-3">
              <span>AFFECTED PARCEL: <strong className="text-slate-200">{property.id} (Sy {property.surveyNumber})</strong></span>
              <span>OWNER: <strong className="text-slate-200">{property.recordedOwner}</strong></span>
              <span>LOCATION: <strong className="text-slate-200">{property.village}, {property.taluk}</strong></span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Unprecedented torrential rainfall triggered a flash flood and mudslide across {property.taluk}. The owner's physical dwelling was inundated and paper storage archives were completely washed away.
            </p>
          </div>

          {/* Contrast Grid: Lost Physical vs Preserved Digital */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Left Column: Destroyed Physical Papers */}
            <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider font-mono">
                <FileX className="w-4 h-4" />
                Physical Documents Lost
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2 text-rose-300/90">
                  <span className="text-rose-400 font-bold">❌</span>
                  Original registered sale deed copy unavailable
                </li>
                <li className="flex items-center gap-2 text-rose-300/90">
                  <span className="text-rose-400 font-bold">❌</span>
                  Historical panchayat tax receipts washed away
                </li>
                <li className="flex items-center gap-2 text-rose-300/90">
                  <span className="text-rose-400 font-bold">❌</span>
                  Physical village survey sketches destroyed
                </li>
                <li className="flex items-center gap-2 text-rose-300/90">
                  <span className="text-rose-400 font-bold">❌</span>
                  Original printed boundary photographs ruined
                </li>
              </ul>
            </div>

            {/* Right Column: Preserved Harmony Evidence */}
            <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider font-mono">
                <ShieldCheck className="w-4 h-4" />
                Preserved Digital Resilience
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2 text-cyan-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Government cadastre index remains accessible
                </li>
                <li className="flex items-center gap-2 text-cyan-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  HARMONY preserved digital evidence intact
                </li>
                <li className="flex items-center gap-2 text-cyan-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Immutable SHA-256 evidence hashes preserved
                </li>
                <li className="flex items-center gap-2 text-cyan-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Pre-disaster timestamps anchored on ledger
                </li>
              </ul>
            </div>

          </div>

          {/* Key Message */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-950/40 to-slate-900 border border-cyan-500/20 text-xs text-slate-300 flex items-center gap-3">
            <Database className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>
              Even when every physical deed is destroyed, PROJECT HARMONY reconstructs the evidence baseline to compile a complete official recovery dossier for government review.
            </span>
          </div>

          {/* Action Button */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setDisasterModalProperty(null)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-medium"
            >
              Cancel
            </button>

            <button
              onClick={handleStartRecovery}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-glow-cyan transition-all"
            >
              <span>RECOVER MY PROPERTY EVIDENCE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
