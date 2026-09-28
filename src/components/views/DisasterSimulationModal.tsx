import React from 'react';
import { 
  AlertTriangle, 
  FileX, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Database,
  Building2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DisasterSimulationModal: React.FC = () => {
  const { 
    disasterModalProperty, 
    setDisasterModalProperty, 
    navigateTo, 
    setSearchQuery,
    jumpToDemoStep,
    guidedDemoStep
  } = useApp();

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
        
        {/* Disaster Incident Banner */}
        <div className="bg-red-950/80 p-4 border-b border-red-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-red-900/60 border border-red-700 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-red-300 font-bold">
                SIMULATED DISASTER EVENT
              </div>
              <h3 className="text-base font-bold text-white font-sans">
                Monsoon Flash Flood & Hill Slope Landslide
              </h3>
            </div>
          </div>
          <button
            onClick={() => setDisasterModalProperty(null)}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          
          {/* Cadastral Incident Location */}
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pb-2 mb-2 border-b border-slate-800 text-slate-400 font-mono text-[11px]">
              <div>PARCEL: <strong className="text-white">{property.id}</strong></div>
              <div>SURVEY: <strong className="text-white">{property.surveyNumber}</strong></div>
              <div>OWNER: <strong className="text-white">{property.recordedOwner}</strong></div>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Catastrophic runoff and mud inundation struck the property dwelling in {property.village}, {property.taluk}. The dwelling was submerged and local physical archives were washed away.
            </p>
          </div>

          {/* Comparison: Physical Loss vs Digital Vault */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Destroyed Physical Documents */}
            <div className="p-4 rounded-lg bg-red-950/20 border border-red-900/40 space-y-3">
              <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase font-mono">
                <FileX className="w-4 h-4" />
                Physical Documents Lost
              </div>
              <ul className="space-y-2 text-xs text-slate-300 font-sans">
                <li className="flex items-center gap-2">
                  <span className="text-red-400 font-bold">❌</span>
                  Original registered sale deed copy unavailable
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400 font-bold">❌</span>
                  Historical tax receipts washed away
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400 font-bold">❌</span>
                  Physical village survey sketches destroyed
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400 font-bold">❌</span>
                  Original printed property photographs ruined
                </li>
              </ul>
            </div>

            {/* Preserved Harmony Digital Evidence */}
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Preserved Digital Resilience
              </div>
              <ul className="space-y-2 text-xs text-slate-300 font-sans">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Government cadastre index remains accessible
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  HARMONY preserved digital evidence intact
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Immutable SHA-256 evidence hashes preserved
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Pre-disaster timestamps anchored on ledger
                </li>
              </ul>
            </div>

          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setDisasterModalProperty(null)}
              className="px-4 py-2 rounded-md bg-slate-800 text-slate-300 hover:text-white text-xs font-medium"
            >
              Close
            </button>

            <button
              onClick={handleStartRecovery}
              className="px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-colors"
            >
              <span>RECOVER PROPERTY EVIDENCE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
