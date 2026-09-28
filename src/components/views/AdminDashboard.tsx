import React from 'react';
import { 
  Sliders, 
  Database, 
  BarChart3, 
  RotateCcw, 
  Play, 
  Activity,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="gov-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Sliders className="w-4 h-4 text-blue-400" />
            <span>Cadastral Administration & Telemetry</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-sans mt-1">
            System Administration & Telemetry
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            State-level cadastral parcel metrics, cryptographic hash verification, and demonstration controls.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setDemoGuideOpen(true);
              jumpToDemoStep(1);
            }}
            className="px-3.5 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>3-Min Demo Script</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset all demo state to fresh baseline defaults?')) {
                resetDemoData();
              }
            }}
            className="px-3 py-2 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Records</span>
          </button>
        </div>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        
        <div className="gov-card p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">Cadastre Parcels</span>
          <div className="text-2xl font-bold text-white font-sans">{totalProps}</div>
          <span className="text-[10px] text-slate-400 font-mono">Karnataka Cadastre</span>
        </div>

        <div className="gov-card p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">Evidence Assets</span>
          <div className="text-2xl font-bold text-white font-sans">{totalEv}</div>
          <span className="text-[10px] text-emerald-400 font-mono">SHA-256 Verified</span>
        </div>

        <div className="gov-card p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">Recovery Dockets</span>
          <div className="text-2xl font-bold text-white font-sans">{totalCases}</div>
          <span className="text-[10px] text-slate-400 font-mono">Disaster Claims</span>
        </div>

        <div className="gov-card p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">Ledger Blocks</span>
          <div className="text-2xl font-bold text-white font-sans">{ledgerBlocks.length}</div>
          <span className="text-[10px] text-slate-400 font-mono">Confirmed</span>
        </div>

        <div className="gov-card p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">Avg Consistency</span>
          <div className="text-2xl font-bold text-emerald-400 font-sans">{avgConsistency}%</div>
          <span className="text-[10px] text-slate-400 font-mono">Cross-Checked</span>
        </div>

        <div className="gov-card p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">Validator Nodes</span>
          <div className="text-2xl font-bold text-white font-sans">ONLINE</div>
          <span className="text-[10px] text-emerald-400 font-mono">4 Nodes Synced</span>
        </div>

      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Monthly Evidence Ingestion */}
        <div className="gov-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span>Evidence Ingestion Volume</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Monthly Metric</span>
          </div>

          <div className="h-44 w-full flex items-end justify-between gap-3 pt-3 px-2">
            {[
              { month: 'Apr', count: 18, height: '40%' },
              { month: 'May', count: 26, height: '55%' },
              { month: 'Jun', count: 34, height: '70%' },
              { month: 'Jul', count: 42, height: '85%' },
              { month: 'Aug', count: 48, height: '95%' },
              { month: 'Sep', count: 39, height: '80%' },
            ].map(col => (
              <div key={col.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-mono text-slate-400 group-hover:text-white">
                  {col.count}
                </span>
                <div 
                  className="w-full bg-blue-600 rounded-t-sm transition-all duration-300 group-hover:bg-blue-500"
                  style={{ height: col.height }}
                />
                <span className="text-[10px] font-mono text-slate-400">
                  {col.month}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
            <span>Cumulative Digital Files: 207 Assets</span>
            <span className="text-emerald-400">Zero Integrity Failures</span>
          </div>
        </div>

        {/* Chart 2: Consistency Distribution */}
        <div className="gov-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <span>Dossier Adjudication & Dispute Metrics</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Current Status</span>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">High Evidence Consistency (80% - 100%)</span>
                <span className="text-emerald-400 font-bold">60% (3 parcels)</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '60%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Partial Documentation Corroboration (60% - 79%)</span>
                <span className="text-amber-400 font-bold">20% (1 parcel)</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '20%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Survey Parcel Conflict Flagged (Below 60%)</span>
                <span className="text-red-400 font-bold">20% (1 parcel)</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full rounded-full" style={{ width: '20%' }} />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-md bg-slate-950 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Discrepancy control active: Conflicting survey claims are halted and escalated to Sub-Divisional Magistrates.
            </span>
          </div>
        </div>

      </div>

      {/* Master Properties Table */}
      <div className="gov-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-400" />
            <span>Master Cadastral Database Registry (Demo Dataset)</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">
            {properties.length} Registered Land Parcels
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Parcel ID</th>
                <th className="py-2.5 px-3">Survey #</th>
                <th className="py-2.5 px-3">Recorded Owner</th>
                <th className="py-2.5 px-3">Location</th>
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
                  <tr key={p.id} className="hover:bg-slate-900 transition-colors">
                    <td className="py-3 px-3 font-bold text-blue-400">{p.id}</td>
                    <td className="py-3 px-3 text-white">{p.surveyNumber}</td>
                    <td className="py-3 px-3 text-slate-200">{p.recordedOwner}</td>
                    <td className="py-3 px-3 text-slate-400">{p.village}, {p.taluk}</td>
                    <td className="py-3 px-3 text-slate-300">{p.area} ({p.propertyType})</td>
                    <td className="py-3 px-3 text-emerald-400">{evCount} Files Preserved</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {p.recordStatus}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => navigateTo('property-recovery', p.id)}
                        className="text-blue-400 hover:underline font-sans text-xs"
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
