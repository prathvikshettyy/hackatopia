import React, { useState } from 'react';
import { 
  Building2, 
  FileCheck2, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  Search, 
  ShieldCheck, 
  Users, 
  BrainCircuit, 
  Lock, 
  Send, 
  FileText, 
  ChevronRight,
  Sparkles,
  Printer,
  Scale,
  Plus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RecoveryCase, Property, EvidenceItem } from '../../types/property';
import { getVerificationReport } from '../../data/mockData';
import { generateRecoveryPackagePDF } from '../../utils/pdfGenerator';
import { formatTimestamp, truncateHash } from '../../utils/crypto';
import { CommunityAttestationModal } from './CommunityAttestationModal';

export const AuthorityDashboard: React.FC = () => {
  const { 
    properties, 
    evidence, 
    attestations, 
    recoveryCases, 
    selectedCaseId, 
    setSelectedCaseId,
    updateCaseStatus,
    generateCasePackage,
    guidedDemoStep,
    jumpToDemoStep
  } = useApp();

  const [activeTab, setActiveTab] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'CONFLICT'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [attestationModalOpen, setAttestationModalOpen] = useState(false);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Stats calculation
  const totalProperties = properties.length;
  const totalEvidence = evidence.length;
  const totalRequests = recoveryCases.length;
  const pendingReviews = recoveryCases.filter(c => c.reviewStatus === 'PENDING_REVIEW').length;
  const conflictsDetected = recoveryCases.filter(c => c.evidenceStatus === 'CONFLICT').length;

  // Selected case
  const activeCase = recoveryCases.find(c => c.caseId === selectedCaseId) || recoveryCases[0];
  const linkedProperty = properties.find(p => p.id === activeCase?.propertyId) || properties[0];
  const linkedEvidence = evidence.filter(e => e.propertyId === linkedProperty?.id);
  const linkedAttestations = attestations.filter(a => a.propertyId === linkedProperty?.id);
  const report = getVerificationReport(linkedProperty, linkedEvidence);

  const filteredCases = recoveryCases.filter(c => {
    const matchesSearch = 
      c.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.propertyId.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'PENDING') return matchesSearch && c.reviewStatus === 'PENDING_REVIEW';
    if (activeTab === 'APPROVED') return matchesSearch && c.reviewStatus === 'PACKAGE_APPROVED';
    if (activeTab === 'CONFLICT') return matchesSearch && c.evidenceStatus === 'CONFLICT';
    return matchesSearch;
  });

  const handleApproveEvidencePackage = () => {
    updateCaseStatus(activeCase.caseId, 'PACKAGE_APPROVED', 'Evidence dossier corroborated against cadastral master record. Evidence package officially approved for restoration proceedings.');
    generateCasePackage(activeCase.caseId);
    setActionSuccessMessage('✓ Evidence Package Approved! (Statutory evidence sealed on ledger)');
    setTimeout(() => setActionSuccessMessage(null), 4000);
    if (guidedDemoStep === 12) {
      jumpToDemoStep(13);
    }
  };

  const handleSendForManualReview = () => {
    updateCaseStatus(activeCase.caseId, 'SENT_FOR_MANUAL_REVIEW', 'Discrepancy or partial record flagged. Case sent to Tahsildar / Revenue Inspector for physical ground survey.');
    setActionSuccessMessage('Case dispatched to Field Revenue Inspector for manual inquiry.');
    setTimeout(() => setActionSuccessMessage(null), 4000);
  };

  const handleRequestMoreEvidence = () => {
    updateCaseStatus(activeCase.caseId, 'ADDITIONAL_EVIDENCE_REQUESTED', 'Authority requested secondary utility bill or adjoining neighbor affidavit.');
    setActionSuccessMessage('Notification sent to citizen requesting supplementary evidence.');
    setTimeout(() => setActionSuccessMessage(null), 4000);
  };

  const handleDownloadPDF = () => {
    const doc = generateRecoveryPackagePDF({
      property: linkedProperty,
      evidenceList: linkedEvidence,
      attestations: linkedAttestations,
      recoveryCase: activeCase,
      checks: report.checks,
      conflicts: report.conflicts,
      consistencyScore: report.consistencyScore,
    });
    doc.save(`HARMONY_RECOVERY_DOSSIER_${activeCase.caseId}_${linkedProperty.id}.pdf`);
    generateCasePackage(activeCase.caseId);
    if (guidedDemoStep === 13) {
      jumpToDemoStep(14);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Authorized Authority Adjudication Portal</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-display mt-1">
            Revenue Authority Dashboard
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Disaster Recovery Case Queue • Sub-Divisional Magistrate & Tahsildar Evidence Adjudication
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-purple-300 bg-purple-950/80 px-3 py-1.5 rounded-xl border border-purple-500/30">
          <Scale className="w-4 h-4 text-purple-400" />
          <span>Statutory Authority Officer Active</span>
        </div>
      </div>

      {/* 5 Dashboard Metric Cards (Requirement #15) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        
        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-slate-400">Total Properties</span>
          <div className="text-2xl font-bold text-white font-display">{totalProperties}</div>
          <span className="text-[10px] font-mono text-cyan-400">Master Registry</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-slate-400">Preserved Evidence</span>
          <div className="text-2xl font-bold text-cyan-300 font-display">{totalEvidence}</div>
          <span className="text-[10px] font-mono text-emerald-400">SHA-256 Anchored</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-slate-400">Recovery Requests</span>
          <div className="text-2xl font-bold text-purple-300 font-display">{totalRequests}</div>
          <span className="text-[10px] font-mono text-purple-400">Disaster Dockets</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-slate-400">Pending Reviews</span>
          <div className="text-2xl font-bold text-amber-300 font-display">{pendingReviews}</div>
          <span className="text-[10px] font-mono text-amber-400">Awaiting Seal</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-slate-400">Conflicts Detected</span>
          <div className="text-2xl font-bold text-rose-400 font-display">{conflictsDetected}</div>
          <span className="text-[10px] font-mono text-rose-400">Discrepancy Flags</span>
        </div>

      </div>

      {/* Main Dual-Pane Layout: Case Table on Left / Selected Case Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Recovery-Case Queue Table (Requirement #15) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-white flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-purple-400" />
                <span>Recovery Cases Queue</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                {filteredCases.length} Cases
              </span>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 text-[11px]">
              {(['ALL', 'PENDING', 'APPROVED', 'CONFLICT'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : 'text-slate-400 hover:text-white bg-slate-900/60'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Case List Cards */}
            <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
              {filteredCases.map(item => {
                const isSelected = item.caseId === activeCase?.caseId;
                const prop = properties.find(p => p.id === item.propertyId);

                return (
                  <div
                    key={item.caseId}
                    onClick={() => {
                      setSelectedCaseId(item.caseId);
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-purple-950/40 border-purple-400/60 shadow-glow-purple'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-cyan-300">
                            {item.caseId}
                          </span>
                          <span className="font-mono text-[10px] text-slate-400">
                            {item.propertyId}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-0.5">
                          {item.ownerName}
                        </h4>
                        <div className="text-[11px] text-slate-400">
                          {prop ? `${prop.village}, ${prop.taluk}` : 'Karnataka'}
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold inline-block ${
                          item.consistencyScore >= 80 
                            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                            : item.consistencyScore >= 60
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}>
                          {item.consistencyScore}% Match
                        </span>

                        <div className={`text-[10px] font-mono uppercase ${
                          item.reviewStatus === 'PACKAGE_APPROVED'
                            ? 'text-emerald-400'
                            : item.reviewStatus === 'SENT_FOR_MANUAL_REVIEW'
                            ? 'text-rose-400'
                            : 'text-amber-400'
                        }`}>
                          {item.reviewStatus.replace(/_/g, ' ')}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* Right Column: Detailed 7-Section PROPERTY RECOVERY CASE (Requirement #15 & #16) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
            
            {/* Dossier Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold block">
                  PROPERTY RECOVERY CASE DOSSIER
                </span>
                <h3 className="text-xl font-bold text-white font-display mt-0.5">
                  Case {activeCase.caseId} — {linkedProperty.recordedOwner}
                </h3>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  Parcel: {linkedProperty.id} • Sy {linkedProperty.surveyNumber} • {linkedProperty.village}
                </div>
              </div>

              {/* DOWNLOAD PDF BUTTON (Requirement #16) */}
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-glow-cyan transition-all"
              >
                <Download className="w-4 h-4" />
                <span>GENERATE RECOVERY PACKAGE (PDF)</span>
              </button>
            </div>

            {/* Notification alert */}
            {actionSuccessMessage && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono animate-fadeIn flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{actionSuccessMessage}</span>
              </div>
            )}

            {/* ---------------- SECTION 1: Government Record ---------------- */}
            <div className="space-y-2.5">
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>SECTION 1: Government Record Details</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] font-mono block">ULPIN</span>
                  <span className="text-slate-200 font-mono">{linkedProperty.ulpin}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] font-mono block">Survey Number</span>
                  <span className="text-white font-bold">{linkedProperty.surveyNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] font-mono block">Recorded Owner</span>
                  <span className="text-white font-bold">{linkedProperty.recordedOwner}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] font-mono block">Cadastral Area</span>
                  <span className="text-slate-200">{linkedProperty.area}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] font-mono block">Taluk & District</span>
                  <span className="text-slate-200">{linkedProperty.taluk}, {linkedProperty.district}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] font-mono block">Mutation Status</span>
                  <span className="text-emerald-400 font-mono text-[11px]">{linkedProperty.mutationStatus}</span>
                </div>
              </div>
            </div>

            {/* ---------------- SECTION 2: Preserved Evidence ---------------- */}
            <div className="space-y-2.5">
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>SECTION 2: Preserved Digital Evidence ({linkedEvidence.length} Assets)</span>
              </div>
              <div className="space-y-2">
                {linkedEvidence.map(ev => (
                  <div key={ev.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="font-semibold text-slate-200 flex items-center gap-2">
                        <span>{ev.fileName}</span>
                        <span className="text-[10px] font-mono text-cyan-400 bg-slate-900 px-1.5 py-0.2 rounded border border-slate-700">
                          {ev.category}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        Uploaded: {ev.uploadedDate} • Size: {ev.fileSize}
                      </div>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      ✓ {ev.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ---------------- SECTION 3: Community Attestations ---------------- */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                  <span>SECTION 3: Community Attestations ({linkedAttestations.length})</span>
                </div>
                <button
                  onClick={() => setAttestationModalOpen(true)}
                  className="text-xs text-purple-400 hover:text-purple-300 font-mono flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Attestation</span>
                </button>
              </div>

              {linkedAttestations.length === 0 ? (
                <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-400 italic">
                  No community attestations recorded for this property yet.
                </div>
              ) : (
                <div className="space-y-2">
                  {linkedAttestations.map(att => (
                    <div key={att.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1 text-xs">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="font-bold text-purple-300">
                          {att.attesterName} <span className="font-mono text-[10px] text-slate-400">[{att.role}]</span>
                        </span>
                        <span className="text-[10px] font-mono">{att.date}</span>
                      </div>
                      <p className="text-slate-300 italic">“{att.statement}”</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ---------------- SECTION 4: AI / Verification Results ---------------- */}
            <div className="space-y-2.5">
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>SECTION 4: AI & Verification Consistency Score ({report.consistencyScore}%)</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Algorithmic Matrix:</span>
                  <span className="text-cyan-300 font-bold">{report.checks.filter(c => c.status === 'PASS').length} of {report.checks.length} Checks Passed</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {report.aiAnalysis.checksSummary}
                </p>
                <div className="text-[10px] text-purple-300/80 font-mono pt-1">
                  Model: {report.aiAnalysis.modelName}
                </div>
              </div>
            </div>

            {/* ---------------- SECTION 5: Evidence Integrity ---------------- */}
            <div className="space-y-2.5">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>SECTION 5: Evidence Cryptographic Hashes & Timestamps</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 font-mono text-[10px]">
                {linkedEvidence.slice(0, 3).map(ev => (
                  <div key={ev.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-400 pb-1 border-b border-slate-900 last:border-0">
                    <span className="text-cyan-300">{ev.fileName.slice(0, 24)}</span>
                    <span className="text-slate-300">{truncateHash(ev.sha256Hash, 8, 8)}</span>
                    <span className="text-emerald-400">{formatTimestamp(ev.timestamp)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ---------------- SECTION 6: Conflicts ---------------- */}
            <div className="space-y-2.5">
              <div className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                <span>SECTION 6: Conflict Detection & Audit Discrepancies</span>
              </div>
              {report.conflicts.length === 0 ? (
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Zero conflicting survey parcel claims or boundary disparities detected.</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {report.conflicts.map(conf => (
                    <div key={conf.id} className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/40 text-xs text-rose-200 space-y-1">
                      <div className="font-bold flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <span>⚠ {conf.message}</span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-300">
                        Government Index: {conf.govtValue} vs Evidence: {conf.evidenceValue}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ---------------- SECTION 7: Authority Review & Actions (Requirement #15) ---------------- */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>SECTION 7: Authority Review & Official Disposition</span>
              </div>

              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">Current Dossier Status:</span>
                  <span className="font-bold text-white font-mono bg-purple-900/60 px-2.5 py-0.5 rounded border border-purple-500/40">
                    {activeCase.reviewStatus.replace(/_/g, ' ')}
                  </span>
                </div>
                
                {activeCase.authorityRemarks && (
                  <p className="text-xs text-slate-300 italic">
                    “{activeCase.authorityRemarks}”
                  </p>
                )}

                {/* 3 Explicit Buttons from Requirement #15 */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  
                  {/* BUTTON 1: APPROVE EVIDENCE PACKAGE (Strictly NOT approve ownership) */}
                  <button
                    onClick={handleApproveEvidencePackage}
                    className="flex-1 min-w-[200px] py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>APPROVE EVIDENCE PACKAGE</span>
                  </button>

                  {/* BUTTON 2: SEND FOR MANUAL REVIEW */}
                  <button
                    onClick={handleSendForManualReview}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-400" />
                    <span>SEND FOR MANUAL REVIEW</span>
                  </button>

                  {/* BUTTON 3: REQUEST MORE EVIDENCE */}
                  <button
                    onClick={handleRequestMoreEvidence}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5 text-cyan-400" />
                    <span>REQUEST MORE EVIDENCE</span>
                  </button>

                </div>
              </div>

              {/* Crucial legal notice */}
              <div className="text-[10px] font-mono text-slate-400 text-center pt-1">
                Notice: Approving an evidence package certifies evidence consistency for official review. It does not replace statutory title deed registration.
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Community Attestation Modal */}
      <CommunityAttestationModal
        propertyId={linkedProperty.id}
        isOpen={attestationModalOpen}
        onClose={() => setAttestationModalOpen(false)}
      />

    </div>
  );
};
