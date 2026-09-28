import React from 'react';
import { 
  Building2, 
  Lock, 
  Sparkles, 
  Waves, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Plus, 
  FileText, 
  MapPin, 
  ShieldCheck,
  ExternalLink,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Property } from '../../types/property';

export const OwnerDashboard: React.FC = () => {
  const { 
    properties, 
    evidence, 
    recoveryCases, 
    navigateTo, 
    setDisasterModalProperty,
    setCurrentView,
    setSelectedPropertyId,
    jumpToDemoStep,
    guidedDemoStep
  } = useApp();

  // Citizen's properties (Ravi Kumar default)
  const myProperties = properties.filter(p => p.recordedOwner.toLowerCase().includes('ravi') || properties.indexOf(p) === 0);
  const displayProps = myProperties.length > 0 ? myProperties : properties.slice(0, 2);

  const totalPreservedFiles = evidence.length;
  const pendingCases = recoveryCases.filter(c => c.reviewStatus === 'PENDING_REVIEW');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Welcome Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Citizen Property Portfolio</span>
          </div>
          <h2 className="text-2xl font-bold font-display text-white mt-1">
            Welcome, Ravi Kumar
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Registered Citizen Landholder • Taluk: Sirsi, District: Uttara Kannada
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setCurrentView('register-property')}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-glow-cyan transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Register New Property</span>
          </button>

          <button
            onClick={() => {
              if (guidedDemoStep === 1) {
                jumpToDemoStep(2);
              } else {
                setCurrentView('property-recovery');
              }
            }}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Recover Property</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            Registered Parcels
          </div>
          <div className="text-2xl font-bold text-white font-display">
            {displayProps.length}
          </div>
          <div className="text-[11px] text-cyan-400 font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Government Synced
          </div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            Preserved Evidence Items
          </div>
          <div className="text-2xl font-bold text-cyan-300 font-display">
            {evidence.filter(e => e.propertyId === 'KA-SIR-10234').length}
          </div>
          <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" />
            All SHA-256 Verified
          </div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            Active Recovery Requests
          </div>
          <div className="text-2xl font-bold text-purple-300 font-display">
            {recoveryCases.filter(c => c.propertyId === 'KA-SIR-10234').length}
          </div>
          <div className="text-[11px] text-purple-400 font-mono flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Dossier Ready
          </div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            Resilience Status
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-display">
            PROTECTED
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Vault Hash Anchored
          </div>
        </div>

      </div>

      {/* Property Cards Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-cyan-400" />
            My Registered Properties & Preserved Evidence
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            Showing {displayProps.length} properties
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayProps.map(prop => {
            const propEvidence = evidence.filter(e => e.propertyId === prop.id);
            const propCase = recoveryCases.find(c => c.propertyId === prop.id);

            return (
              <div 
                key={prop.id}
                className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-5"
              >
                {/* Card Top */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                          {prop.id}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          Sy {prop.surveyNumber}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-1">
                        {prop.village}, {prop.taluk}
                      </h4>
                    </div>

                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {prop.recordStatus}
                    </span>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs pt-2 border-t border-slate-800/80">
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-mono block">Owner</span>
                      <span className="text-slate-200 font-semibold">{prop.recordedOwner}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-mono block">Land Area</span>
                      <span className="text-slate-200 font-semibold">{prop.area}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-mono block">Classification</span>
                      <span className="text-slate-200">{prop.propertyType}</span>
                    </div>
                  </div>

                  {/* Preserved Evidence Status Box */}
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-300 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                        Evidence Status:
                      </span>
                      <span className="text-emerald-400 font-mono font-semibold">
                        {propEvidence.length} Files Preserved
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {propEvidence.map(ev => (
                        <span 
                          key={ev.id}
                          className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 border border-slate-700 text-slate-300 flex items-center gap-1"
                        >
                          <Lock className="w-2.5 h-2.5 text-cyan-400" />
                          {ev.category}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Disaster status if simulated */}
                  {prop.lossSimulated && (
                    <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-300 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Waves className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>Disaster Event Simulated: Physical Papers Destroyed</span>
                      </div>
                      <span className="font-mono text-[10px] bg-rose-900/60 px-2 py-0.5 rounded text-rose-200">
                        LOST
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Action Buttons (Requirement #6 & #7) */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => navigateTo('evidence-vault', prop.id)}
                      className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Lock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>View Evidence ({propEvidence.length})</span>
                    </button>

                    <button
                      onClick={() => navigateTo('verification', prop.id)}
                      className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span>Consistency Check</span>
                    </button>
                  </div>

                  {/* MAJOR BUTTON: SIMULATE DOCUMENT LOSS */}
                  <button
                    onClick={() => {
                      setDisasterModalProperty(prop);
                      if (guidedDemoStep === 4) {
                        jumpToDemoStep(5);
                      }
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-900/60 via-red-800/50 to-rose-900/60 hover:from-rose-800/70 hover:to-red-700/70 border border-rose-500/40 text-rose-200 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-glow-rose"
                  >
                    <Waves className="w-4 h-4 text-rose-400 animate-pulse" />
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
