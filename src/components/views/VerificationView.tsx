import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  FileCheck2, 
  XCircle, 
  ArrowRight, 
  BrainCircuit, 
  Building2, 
  FileText, 
  Search,
  Scale,
  ExternalLink,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getVerificationReport } from '../../data/mockData';

export const VerificationView: React.FC = () => {
  const { 
    properties, 
    evidence, 
    selectedPropertyId, 
    setSelectedPropertyId, 
    setRole, 
    navigateTo,
    jumpToDemoStep,
    guidedDemoStep
  } = useApp();

  const currentProperty = properties.find(p => p.id === selectedPropertyId) || properties[0];
  const linkedEvidence = evidence.filter(e => e.propertyId === currentProperty.id);

  const report = getVerificationReport(currentProperty, linkedEvidence);
  const [selectedConflict, setSelectedConflict] = useState<any>(null);

  const isConflictScenario = currentProperty.id === 'KA-BEL-30912';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Top Header & Property Switcher */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Dual-Source Corroboration Engine</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-display mt-1">
            Evidence Verification & Consistency Matrix
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Comparing Demo Government Land Cadastre against Preserved Harmony Evidence Vault.
          </p>
        </div>

        {/* Property Selector for Testing Different Scenarios */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Parcel:</span>
          <select
            value={currentProperty.id}
            onChange={(e) => setSelectedPropertyId(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-xs text-cyan-300 font-mono rounded-xl px-3 py-2 outline-none focus:border-cyan-400"
          >
            {properties.map(p => (
              <option key={p.id} value={p.id}>
                {p.id} — {p.recordedOwner} ({p.id === 'KA-BEL-30912' ? '⚠ Conflict Demo' : p.village})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero Consistency Gauge & Summary Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Score Card (Requirement #11: "Evidence Consistency Score", never ownership probability) */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center space-y-3 relative overflow-hidden">
          <div className="absolute top-2 right-3 text-[10px] font-mono text-slate-500 uppercase">
            Consistency Metric
          </div>

          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Circular SVG Ring */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="56"
                stroke="currentColor"
                strokeWidth="10"
                className="text-slate-800"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r="56"
                stroke="currentColor"
                strokeWidth="10"
                className={`${
                  report.consistencyScore >= 80 
                    ? 'text-cyan-400' 
                    : report.consistencyScore >= 60 
                    ? 'text-amber-400' 
                    : 'text-rose-500'
                } transition-all duration-1000 ease-out`}
                fill="transparent"
                strokeDasharray="351.8"
                strokeDashoffset={351.8 - (351.8 * report.consistencyScore) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-white font-display">
                {report.consistencyScore}%
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                Consistency
              </span>
            </div>
          </div>

          <div>
            <div className="text-sm font-bold text-white">
              Evidence Consistency Score
            </div>
            {/* Crucial requirement #11 reminder */}
            <p className="text-[11px] text-amber-300/80 font-mono mt-1">
              ⚠️ Evidence consistency indicator only. Does NOT imply legal ownership probability.
            </p>
          </div>
        </div>

        {/* Verification Overview Breakdown */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Evaluation Summary for {currentProperty.id} ({currentProperty.recordedOwner})
              </span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                report.conflicts.length > 0 
                  ? 'bg-rose-500/10 text-rose-300 border-rose-500/30' 
                  : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
              }`}>
                {report.conflicts.length > 0 ? '⚠ Discrepancy Flagged' : '✓ Congruent Dataset'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 text-[10px] font-mono block">Pass Rate</span>
                <span className="text-emerald-400 font-bold font-display text-base">
                  {report.checks.filter(c => c.status === 'PASS').length} / {report.checks.length}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 text-[10px] font-mono block">Conflicts</span>
                <span className={`font-bold font-display text-base ${report.conflicts.length > 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                  {report.conflicts.length}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 text-[10px] font-mono block">Hashes Verified</span>
                <span className="text-cyan-400 font-bold font-display text-base">
                  {linkedEvidence.length} / {linkedEvidence.length}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 text-[10px] font-mono block">AI Confidence</span>
                <span className="text-purple-400 font-bold font-display text-base">
                  {Math.round(report.aiAnalysis.confidenceScore * 100)}%
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
            <span className="text-xs text-slate-400">
              Review case in official Authority Dashboard:
            </span>
            <button
              onClick={() => {
                setRole('AUTHORITY');
                if (guidedDemoStep === 9) {
                  jumpToDemoStep(10);
                } else {
                  navigateTo('authority-dashboard', currentProperty.id);
                }
              }}
              className="px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Forward to Authority Review</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* CONFLICT DETECTION SECTION (Requirement #12) */}
      {report.conflicts.length > 0 && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/50 via-red-950/40 to-rose-950/50 border border-rose-500/50 shadow-glow-rose space-y-4 animate-pulse-subtle">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-400 font-bold font-mono text-xs uppercase tracking-wider">
              <AlertTriangle className="w-5 h-5 text-rose-400 animate-bounce" />
              <span>⚠ CONFLICT DETECTED — HARMONY DOES NOT BLINDLY APPROVE</span>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-xs font-bold border border-rose-500/40">
              CRITICAL AUDIT EXCEPTION
            </span>
          </div>

          {report.conflicts.map(conf => (
            <div key={conf.id} className="p-4 bg-slate-950/80 rounded-xl border border-rose-500/30 space-y-3">
              <div className="text-sm font-bold text-white">
                {conf.message}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-700">
                  <span className="text-slate-500 text-[10px] font-mono uppercase block">Government Cadastre Index</span>
                  <span className="text-cyan-300 font-mono font-bold">{conf.govtValue}</span>
                </div>
                <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/40">
                  <span className="text-rose-400 text-[10px] font-mono uppercase block">Submitted Digital Evidence</span>
                  <span className="text-rose-200 font-mono font-bold">{conf.evidenceValue}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => alert(`Conflict Details: ${conf.field}\n${conf.message}\nGovernment Master: ${conf.govtValue}\nEvidence Dossier: ${conf.evidenceValue}`)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white text-xs font-semibold"
                >
                  VIEW CONFLICT
                </button>
                <button
                  onClick={() => {
                    setRole('AUTHORITY');
                    navigateTo('authority-dashboard', currentProperty.id);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>SEND FOR AUTHORITY REVIEW</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Algorithmic Verification Checks Matrix (Requirement #11) */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            Verification Engine Checks Matrix
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {report.checks.length} Automated Cross-Checks
          </span>
        </div>

        <div className="space-y-2">
          {report.checks.map(chk => (
            <div
              key={chk.id}
              className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-start gap-3">
                {chk.status === 'PASS' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : chk.status === 'FAIL' ? (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-semibold text-slate-200 flex items-center gap-2">
                    <span>{chk.name}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      chk.status === 'PASS' 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : chk.status === 'FAIL' 
                        ? 'bg-rose-500/10 text-rose-400' 
                        : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {chk.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    {chk.detail}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[11px] font-mono shrink-0 pl-7 sm:pl-0">
                <div>
                  <span className="text-slate-500 text-[9px] block">GOVT VALUE</span>
                  <span className="text-slate-300">{chk.govtValue}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[9px] block">EVIDENCE VALUE</span>
                  <span className={chk.status === 'FAIL' ? 'text-rose-400 font-bold' : 'text-cyan-300'}>
                    {chk.evidenceValue}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI-ASSISTED VERIFICATION SECTION (Requirement #13) */}
      <div className="glass-panel p-6 rounded-2xl border border-purple-500/30 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold uppercase tracking-wider">
            <BrainCircuit className="w-4 h-4" />
            <span>AI DOCUMENT ANALYSIS & EXTRACTION</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">
            AI-Assisted Verification
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          {/* Extracted Information Card */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <span className="text-slate-400 font-mono text-[11px] uppercase font-semibold block">
              Extracted Information (OCR + Vision Model)
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-500 text-[10px] font-mono block">Owner Name:</span>
                <span className="text-white font-medium">{report.aiAnalysis.extractedOwner}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] font-mono block">Survey Number:</span>
                <span className={isConflictScenario ? 'text-rose-400 font-bold font-mono' : 'text-white font-medium font-mono'}>
                  {report.aiAnalysis.extractedSurveyNo}
                </span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] font-mono block">Property Type:</span>
                <span className="text-white font-medium">{report.aiAnalysis.extractedType}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] font-mono block">Deed Execution Date:</span>
                <span className="text-white font-medium">{report.aiAnalysis.extractedDate}</span>
              </div>
            </div>
          </div>

          {/* AI Comparison & Summary */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <span className="text-slate-400 font-mono text-[11px] uppercase font-semibold block">
              Automated Cross-Comparison
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Owner matched in digital index</span>
              </div>
              <div className={`flex items-center gap-2 ${isConflictScenario ? 'text-rose-400' : 'text-emerald-400'}`}>
                {isConflictScenario ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                <span>{isConflictScenario ? 'Survey number disparity (124/3A vs 124/3B)' : 'Survey number matched'}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Land use & classification matched</span>
              </div>
            </div>
          </div>

        </div>

        {/* AI Disclaimer (Requirement #13 mandatory) */}
        <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-[11px] text-purple-200/90 leading-relaxed font-mono">
          ℹ️ {report.aiAnalysis.disclaimer}
        </div>
      </div>

    </div>
  );
};
