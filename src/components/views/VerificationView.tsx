import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Building2, 
  Send,
  FileCheck2
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
  const isConflictScenario = currentProperty.id === 'KA-BEL-30912';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header & Property Switcher */}
      <div className="gov-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <FileCheck2 className="w-4 h-4 text-blue-400" />
            <span>Dual-Source Cadastral Verification</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-sans mt-1">
            Cadastral Consistency & Validation Matrix
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Comparing Demo Government Land Registry against Preserved Evidence Vault.
          </p>
        </div>

        {/* Property Selector for Testing Scenarios */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Select Parcel:</span>
          <select
            value={currentProperty.id}
            onChange={(e) => setSelectedPropertyId(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-xs text-white font-mono rounded-md px-3 py-1.5 outline-none focus:border-blue-500"
          >
            {properties.map(p => (
              <option key={p.id} value={p.id}>
                {p.id} — {p.recordedOwner} ({p.id === 'KA-BEL-30912' ? '⚠ Conflict Demo' : p.village})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Consistency Metric & Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Metric Score Card */}
        <div className="gov-card p-6 flex flex-col items-center justify-center text-center space-y-3">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            EVIDENCE CONSISTENCY INDICATOR
          </span>

          <div className="py-2">
            <div className={`text-5xl font-black font-sans ${
              report.consistencyScore >= 80 
                ? 'text-emerald-400' 
                : report.consistencyScore >= 60 
                ? 'text-amber-400' 
                : 'text-red-400'
            }`}>
              {report.consistencyScore}%
            </div>
            <div className="text-xs font-semibold text-white mt-1">
              Evidence Alignment
            </div>
          </div>

          <div className="p-2.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] text-amber-300 font-mono leading-relaxed">
            ⚠️ Evidence consistency score only. Does NOT establish legal ownership.
          </div>
        </div>

        {/* Verification Overview Breakdown */}
        <div className="lg:col-span-2 gov-card p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Evaluation for {currentProperty.id} ({currentProperty.recordedOwner})
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                report.conflicts.length > 0 
                  ? 'bg-red-950 text-red-300 border border-red-800' 
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}>
                {report.conflicts.length > 0 ? '⚠ Discrepancy Detected' : '✓ Full Alignment'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs">
              <div className="p-3 rounded-md bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] font-mono block">Pass Rate</span>
                <span className="text-emerald-400 font-bold font-sans text-base">
                  {report.checks.filter(c => c.status === 'PASS').length} / {report.checks.length}
                </span>
              </div>
              <div className="p-3 rounded-md bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] font-mono block">Discrepancies</span>
                <span className={`font-bold font-sans text-base ${report.conflicts.length > 0 ? 'text-red-400' : 'text-slate-300'}`}>
                  {report.conflicts.length}
                </span>
              </div>
              <div className="p-3 rounded-md bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] font-mono block">Hashes Verified</span>
                <span className="text-blue-400 font-bold font-sans text-base">
                  {linkedEvidence.length} / {linkedEvidence.length}
                </span>
              </div>
              <div className="p-3 rounded-md bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] font-mono block">OCR Extraction</span>
                <span className="text-slate-200 font-bold font-sans text-base">
                  {Math.round(report.aiAnalysis.confidenceScore * 100)}%
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
            <span className="text-xs text-slate-400">
              Submit docket for Sub-Divisional Magistrate review:
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
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
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
        <div className="p-5 rounded-lg bg-red-950/30 border border-red-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-400 font-bold font-mono text-xs uppercase">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>⚠ CONFLICT DETECTED — HARMONY DOES NOT BLINDLY APPROVE CLAIMS</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-red-900 text-white font-mono text-[10px] font-bold">
              CADASTRE DISCREPANCY
            </span>
          </div>

          {report.conflicts.map(conf => (
            <div key={conf.id} className="p-4 bg-slate-950 rounded-md border border-red-900/60 space-y-3">
              <div className="text-sm font-semibold text-white">
                {conf.message}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase block">Government Cadastre Index</span>
                  <span className="text-white font-bold">{conf.govtValue}</span>
                </div>
                <div className="p-2.5 rounded bg-red-950/40 border border-red-800/60">
                  <span className="text-red-400 text-[10px] uppercase block">Submitted Digital Evidence</span>
                  <span className="text-red-200 font-bold">{conf.evidenceValue}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-1">
                <button
                  onClick={() => alert(`Conflict Details:\n${conf.message}\nGovernment Master: ${conf.govtValue}\nEvidence Dossier: ${conf.evidenceValue}`)}
                  className="px-3 py-1.5 rounded-md bg-slate-800 text-slate-200 hover:text-white text-xs font-medium border border-slate-700"
                >
                  VIEW CONFLICT
                </button>
                <button
                  onClick={() => {
                    setRole('AUTHORITY');
                    navigateTo('authority-dashboard', currentProperty.id);
                  }}
                  className="px-3.5 py-1.5 rounded-md bg-red-700 hover:bg-red-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
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
      <div className="gov-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span>Cadastral Consistency Checks Matrix</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {report.checks.length} Automated Cross-Checks
          </span>
        </div>

        <div className="space-y-2">
          {report.checks.map(chk => (
            <div
              key={chk.id}
              className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-start gap-3">
                {chk.status === 'PASS' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : chk.status === 'FAIL' ? (
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-semibold text-slate-200 flex items-center gap-2">
                    <span>{chk.name}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                      chk.status === 'PASS' 
                        ? 'bg-emerald-950 text-emerald-300' 
                        : chk.status === 'FAIL' 
                        ? 'bg-red-950 text-red-300' 
                        : 'bg-amber-950 text-amber-300'
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
                  <span className={chk.status === 'FAIL' ? 'text-red-400 font-bold' : 'text-slate-200 font-medium'}>
                    {chk.evidenceValue}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI-ASSISTED VERIFICATION SECTION (Requirement #13) */}
      <div className="gov-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-slate-200 font-mono text-xs font-bold uppercase tracking-wider">
            <span>AI-Assisted Verification & Optical Extraction</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            Automated Analysis
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          {/* Extracted Information Card */}
          <div className="p-4 rounded-md bg-slate-950 border border-slate-800 space-y-2.5">
            <span className="text-slate-400 font-mono text-[11px] uppercase font-semibold block">
              Extracted Information (OCR & Document Parsing)
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-500 text-[10px] font-mono block">Owner Name:</span>
                <span className="text-white font-medium">{report.aiAnalysis.extractedOwner}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] font-mono block">Survey Number:</span>
                <span className={isConflictScenario ? 'text-red-400 font-bold font-mono' : 'text-white font-medium font-mono'}>
                  {report.aiAnalysis.extractedSurveyNo}
                </span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] font-mono block">Property Type:</span>
                <span className="text-white font-medium">{report.aiAnalysis.extractedType}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] font-mono block">Execution Date:</span>
                <span className="text-white font-medium font-mono">{report.aiAnalysis.extractedDate}</span>
              </div>
            </div>
          </div>

          {/* AI Comparison & Summary */}
          <div className="p-4 rounded-md bg-slate-950 border border-slate-800 space-y-2.5">
            <span className="text-slate-400 font-mono text-[11px] uppercase font-semibold block">
              Automated Cadastral Cross-Comparison
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Owner identity matched with master register</span>
              </div>
              <div className={`flex items-center gap-2 ${isConflictScenario ? 'text-red-400 font-medium' : 'text-emerald-400'}`}>
                {isConflictScenario ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                <span>{isConflictScenario ? 'Survey number discrepancy (124/3A vs 124/3B)' : 'Survey parcel number matched'}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Land utilization classification consistent</span>
              </div>
            </div>
          </div>

        </div>

        {/* AI Disclaimer (Requirement #13 mandatory) */}
        <div className="p-3 rounded-md bg-slate-950 border border-slate-800 text-[11px] text-slate-400 leading-relaxed font-mono">
          ℹ️ {report.aiAnalysis.disclaimer}
        </div>
      </div>

    </div>
  );
};
