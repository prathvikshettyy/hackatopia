import React from 'react';
import { 
  Sliders, 
  Database, 
  Lock, 
  ShieldCheck, 
  BarChart3, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Play, 
  Cpu, 
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { truncateHash } from '../../utils/crypto';

export const AdminDashboard: React.FC = () => {
  const { 
    properties, 
    evidence, 
    recoveryCases, 
    ledgerBlocks, 
    navigateTo, 
    resetDemoData,
    setDemoGuideOpen,
    jumpToDemoStep 
  } = useApp();

  const totalProps = properties.length;
  const totalEv = evidence.length;
  const totalCases = recoveryCases.length;
  const avgConsistency = Math.round(
    recoveryCases.reduce((acc, c) => acc + c.consistencyScore, 0) / (totalCases || 1)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Sliders className="w-4 h-4" />
            <span>Master System Administration & Telemetry</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-display mt-1">
            System Administration & Telemetry
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Cross-district cadastral analytics, cryptographic ledger validation, and buildathon demo controls.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setDemoGuideOpen(true);
              jumpToDemoStep(1);
            }}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
            <span>3-Min Demo Script</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset all demo state to fresh buildathon defaults?')) {
                resetDemoData();
              }
            }}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Records</span>
          </button>
        </div>
      </div>

      {/* Top Telemetry Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        
        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-500">Cadastre Parcels</span>
          <div className="text-2xl font-bold text-white font-display">{totalProps}</div>
          <span className="text-[10px] text-cyan-400 font-mono">Karnataka GIS</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-500">Evidence Assets</span>
          <div className="text-2xl font-bold text-cyan-300 font-display">{totalEv}</div>
          <span className="text-[10px] text-emerald-400 font-mono">100% SHA-256</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-500">Recovery Dockets</span>
          <div className="text-2xl font-bold text-purple-300 font-display">{totalCases}</div>
          <span className="text-[10px] text-purple-400 font-mono">Disaster Claims</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-500">Ledger Blocks</span>
          <div className="text-2xl font-bold text-amber-300 font-display">{ledgerBlocks.length}</div>
          <span className="text-[10px] text-amber-400 font-mono">Confirmed</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-500">Avg Consistency</span>
          <div className="text-2xl font-bold text-emerald-400 font-display">{avgConsistency}%</div>
          <span className="text-[10px] text-slate-400 font-mono">Cross-Checked</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-500">Node Status</span>
          <div className="text-2xl font-bold text-white font-display">ONLINE</div>
          <span className="text-[10px] text-emerald-400 font-mono">4 Nodes Synced</span>
        </div>

      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Evidence Ingestion & Verification Volume (SVG Graphic) */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>Evidence Volume Ingestion & Preservation Trail</span>
            </h3>
            <span className="text-[10px] font-mono text-cyan-400">Monthly Audit</span>
          </div>

          {/* SVG Bar Chart */}
          <div className="h-48 w-full flex items-end justify-between gap-3 pt-4 px-2">
            {[
              { month: 'Apr', count: 18, height: '40%' },
              { month: 'May', count: 26, height: '55%' },
              { month: 'Jun', count: 34, height: '70%' },
              { month: 'Jul', count: 42, height: '85%' },
              { month: 'Aug', count: 48, height: '95%' },
              { month: 'Sep', count: 39, height: '80%' },
            ].map(col => (
              <div key={col.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-mono text-slate-400 group-hover:text-cyan-300">
                  {col.count}
                </span>
                <div 
                  className="w-full bg-gradient-to-t from-cyan-500/20 via-cyan-500/40 to-cyan-400 rounded-t-lg transition-all duration-500 group-hover:to-cyan-300 group-hover:shadow-glow-cyan"
                  style={{ height: col.height }}
                />
                <span className="text-[10px] font-mono text-slate-400">
                  {col.month}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
            <span>Cumulative Digital Evidences: 207 Assets</span>
            <span className="text-cyan-400">100% Zero Data Loss</span>
          </div>
        </div>

        {/* Chart 2: Recovery Status Distribution & Conflict Rate */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" />
              <span>Dossier Adjudication & Dispute Metrics</span>
            </h3>
            <span className="text-[10px] font-mono text-purple-400">Real-Time Metrics</span>
          </div>

          {/* Bar Metrics */}
          <div className="space-y-3 pt-2">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">High Evidence Consistency (80% - 100%)</span>
                <span className="text-cyan-400 font-bold">60% (3 parcels)</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full" style={{ width: '60%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Partial / Missing Document Corroboration (60% - 79%)</span>
                <span className="text-amber-400 font-bold">20% (1 parcel)</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: '20%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Survey Parcel Conflict Flagged (Below 60%)</span>
                <span className="text-rose-400 font-bold">20% (1 parcel)</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: '20%' }} />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              Demonstrates robust discrepancy handling: Conflicting survey claims are halted and escalated to Sub-Divisional Magistrates.
            </span>
          </div>
        </div>

      </div>

      {/* Master Properties Cadastre Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Master Cadastral Database Registry (Demo Dataset)</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">
            {properties.length} Registered Parcels
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Parcel ID</th>
                <th className="py-2.5 px-3">Survey #</th>
                <th className="py-2.5 px-3">Recorded Owner</th>
                <th className="py-2.5 px-3">Village / Taluk</th>
                <th className="py-2.5 px-3">Area / Type</th>
                <th className="py-2.5 px-3">Evidence Vault</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              {properties.map(p => {
                const evCount = evidence.filter(e => e.propertyId === p.id).length;
                return (
                  <tr key={p.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-3 px-3 font-bold text-cyan-300">{p.id}</td>
                    <td className="py-3 px-3 text-white">{p.surveyNumber}</td>
                    <td className="py-3 px-3 text-slate-200">{p.recordedOwner}</td>
                    <td className="py-3 px-3 text-slate-400">{p.village}, {p.taluk}</td>
                    <td className="py-3 px-3 text-slate-300">{p.area} ({p.propertyType})</td>
                    <td className="py-3 px-3 text-emerald-400">{evCount} Files Preserved</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {p.recordStatus}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => navigateTo('property-recovery', p.id)}
                        className="text-cyan-400 hover:text-cyan-300 font-sans text-xs underline"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
