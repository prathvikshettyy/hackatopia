import React from 'react';
import { 
  Building2, 
  Lock, 
  Database, 
  Waves, 
  CheckCircle2, 
  Plus, 
  ShieldCheck,
  Clock,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OwnerDashboard: React.FC = () => {
  const { 
    properties, 
    evidence, 
    recoveryCases, 
    navigateTo, 
    setDisasterModalProperty,
    setCurrentView,
    jumpToDemoStep,
    guidedDemoStep
  } = useApp();

  const myProperties = properties.filter(p => p.recordedOwner.toLowerCase().includes('ravi') || properties.indexOf(p) === 0);
  const displayProps = myProperties.length > 0 ? myProperties : properties.slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Header */}
      <div className="gov-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>Citizen Landholding Portfolio</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-sans mt-1">
            Ravi Kumar
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Recorded Citizen Landholder • Taluk: Sirsi, District: Uttara Kannada
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setCurrentView('register-property')}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Register New Parcel</span>
          </button>

          <button
            onClick={() => {
              if (guidedDemoStep === 1) {
                jumpToDemoStep(2);
              } else {
                setCurrentView('property-recovery');
              }
            }}
            className="px-4 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Database className="w-4 h-4 text-blue-400" />
            <span>Recover Evidence</span>
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="gov-card p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
            Registered Parcels
          </span>
          <div className="text-2xl font-bold text-white font-sans">
            {displayProps.length}
          </div>
          <div className="text-[11px] text-blue-400 font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Government Synced
          </div>
        </div>

        <div className="gov-card p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
            Preserved Vault Files
          </span>
          <div className="text-2xl font-bold text-white font-sans">
            {evidence.filter(e => e.propertyId === 'KA-SIR-10234').length}
          </div>
          <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" />
            SHA-256 Verified
          </div>
        </div>

        <div className="gov-card p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
            Active Recovery Dockets
          </span>
          <div className="text-2xl font-bold text-white font-sans">
            {recoveryCases.filter(c => c.propertyId === 'KA-SIR-10234').length}
          </div>
          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            Dossier Prepared
          </div>
        </div>

        <div className="gov-card p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
            Resilience Status
          </span>
          <div className="text-2xl font-bold text-emerald-400 font-sans">
            PROTECTED
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Ledger Anchored
          </div>
        </div>

      </div>

      {/* Property Cards Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>Registered Cadastral Parcels</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {displayProps.length} Landholdings on Record
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayProps.map(prop => {
            const propEvidence = evidence.filter(e => e.propertyId === prop.id);

            return (
              <div 
                key={prop.id}
                className="gov-card p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-blue-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-700">
                          {prop.id}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          Survey {prop.surveyNumber}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-1">
                        {prop.village}, {prop.taluk}
                      </h4>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {prop.recordStatus}
                    </span>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs pt-2 border-t border-slate-800">
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-mono block">Recorded Owner</span>
                      <span className="text-slate-200 font-medium">{prop.recordedOwner}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-mono block">Cadastral Area</span>
                      <span className="text-slate-200 font-medium">{prop.area}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-mono block">Classification</span>
                      <span className="text-slate-200 font-medium">{prop.propertyType}</span>
                    </div>
                  </div>

                  {/* Preserved Evidence Status */}
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-300 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                        <span>Preserved Evidence:</span>
                      </span>
                      <span className="text-emerald-400 font-mono font-semibold">
                        {propEvidence.length} Files Anchored
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {propEvidence.map(ev => (
                        <span 
                          key={ev.id}
                          className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-300"
                        >
                          {ev.category}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Disaster Loss Alert */}
                  {prop.lossSimulated && (
                    <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-800/40 text-xs text-red-300 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Waves className="w-4 h-4 text-red-400 shrink-0" />
                        <span>Disaster Loss Simulated: Physical Papers Unavailable</span>
                      </div>
                      <span className="font-mono text-[10px] bg-red-900 px-2 py-0.5 rounded text-white font-bold">
                        LOST
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Action Buttons (Requirements #6 & #7) */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => navigateTo('evidence-vault', prop.id)}
                      className="py-2 px-3 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                    >
                      <Lock className="w-3.5 h-3.5 text-blue-400" />
                      <span>View Evidence ({propEvidence.length})</span>
                    </button>

                    <button
                      onClick={() => navigateTo('verification', prop.id)}
                      className="py-2 px-3 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                    >
                      <span>Consistency Check</span>
                    </button>
                  </div>

                  {/* MAJOR ACTION BUTTON: SIMULATE DOCUMENT LOSS */}
                  <button
                    onClick={() => {
                      setDisasterModalProperty(prop);
                      if (guidedDemoStep === 4) {
                        jumpToDemoStep(5);
                      }
                    }}
                    className="w-full py-2.5 px-4 rounded-md bg-red-800 hover:bg-red-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <Waves className="w-4 h-4" />
                    <span>SIMULATE DOCUMENT LOSS</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
