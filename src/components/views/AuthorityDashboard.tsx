import React, { useState } from 'react';
import { 
  Building2, 
  FileCheck2, 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  Users, 
  Lock, 
  Send, 
  Scale,
  Plus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
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

  const totalProperties = properties.length;
  const totalEvidence = evidence.length;
  const totalRequests = recoveryCases.length;
  const pendingReviews = recoveryCases.filter(c => c.reviewStatus === 'PENDING_REVIEW').length;
  const conflictsDetected = recoveryCases.filter(c => c.evidenceStatus === 'CONFLICT').length;

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
    updateCaseStatus(activeCase.caseId, 'PACKAGE_APPROVED', 'Evidence dossier corroborated against cadastral master index. Evidence package officially approved for restoration proceedings.');
    generateCasePackage(activeCase.caseId);
    setActionSuccessMessage('✓ Evidence Package Approved (Statutory evidence sealed on ledger)');
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="gov-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>Revenue Authority Adjudication Portal</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-sans mt-1">
            Revenue Authority Dashboard
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Sub-Divisional Magistrate & Tahsildar Evidence Adjudication Docket
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-200 bg-slate-950 px-3 py-1.5 rounded-md border border-slate-800">
          <Scale className="w-4 h-4 text-blue-400" />
          <span>Statutory Authority Active</span>
        </div>
      </div>

      {/* 5 Metric Cards (Requirement #15) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        
        <div className="gov-card p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">Total Properties</span>
          <div className="text-2xl font-bold text-white font-sans">{totalProperties}</div>
          <span className="text-[10px] font-mono text-slate-400">Master Registry</span>
        </div>

        <div className="gov-card p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">Preserved Evidence</span>
          <div className="text-2xl font-bold text-white font-sans">{totalEvidence}</div>
          <span className="text-[10px] font-mono text-emerald-400">SHA-256 Anchored</span>
        </div>

        <div className="gov-card p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">Recovery Requests</span>
          <div className="text-2xl font-bold text-white font-sans">{totalRequests}</div>
          <span className="text-[10px] font-mono text-slate-400">Disaster Claims</span>
        </div>

        <div className="gov-card p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">Pending Reviews</span>
          <div className="text-2xl font-bold text-amber-300 font-sans">{pendingReviews}</div>
          <span className="text-[10px] font-mono text-amber-400">Awaiting Seal</span>
        </div>

        <div className="gov-card p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">Conflicts Detected</span>
          <div className="text-2xl font-bold text-red-400 font-sans">{conflictsDetected}</div>
          <span className="text-[10px] font-mono text-red-400">Discrepancy Flags</span>
        </div>

      </div>

      {/* Main Dual-Pane Layout: Cases Queue on Left / 7-Section Dossier on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Cases Queue */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="gov-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-white flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-blue-400" />
                <span>Recovery Dockets Queue</span>
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
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-white bg-slate-950'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Case List */}
            <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
              {filteredCases.map(item => {
                const isSelected = item.caseId === activeCase?.caseId;
                const prop = properties.find(p => p.id === item.propertyId);

                return (
                  <div
                    key={item.caseId}
                    onClick={() => setSelectedCaseId(item.caseId)}
                    className={`p-3.5 rounded-lg border cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-slate-800 border-blue-500'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 font-mono text-xs">
                          <span className="font-bold text-blue-400">{item.caseId}</span>
                          <span className="text-slate-500">{item.propertyId}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-white mt-0.5">
                          {item.ownerName}
                        </h4>
                        <div className="text-[11px] text-slate-400">
                          {prop ? `${prop.village}, ${prop.taluk}` : 'Karnataka'}
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold inline-block ${
                          item.consistencyScore >= 80 
                            ? 'bg-emerald-950 text-emerald-300'
                            : item.consistencyScore >= 60
                            ? 'bg-amber-950 text-amber-300'
                            : 'bg-red-950 text-red-300'
                        }`}>
                          {item.consistencyScore}% Match
                        </span>

                        <div className={`text-[10px] font-mono uppercase ${
                          item.reviewStatus === 'PACKAGE_APPROVED'
                            ? 'text-emerald-400'
                            : item.reviewStatus === 'SENT_FOR_MANUAL_REVIEW'
                            ? 'text-red-400'
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

        {/* Right Column: Detailed 7-Section PROPERTY RECOVERY CASE (Requirements #15 & #16) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="gov-card p-6 space-y-6">
            
            {/* Dossier Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold block">
                  PROPERTY RECOVERY CASE DOSSIER
                </span>
                <h3 className="text-lg font-bold text-white font-sans mt-0.5">
                  Case {activeCase.caseId} — {linkedProperty.recordedOwner}
                </h3>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  Parcel: {linkedProperty.id} • Survey {linkedProperty.surveyNumber} • {linkedProperty.village}
                </div>
              </div>

              {/* PDF GENERATION BUTTON (Requirement #16) */}
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>GENERATE RECOVERY PACKAGE (PDF)</span>
              </button>
            </div>

            {/* Notification alert */}
            {actionSuccessMessage && (
              <div className="p-3 rounded-md bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{actionSuccessMessage}</span>
              </div>
            )}

            {/* ---------------- SECTION 1: Government Record ---------------- */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>SECTION 1: Government Record Details</span>
              </div>
              <div className="p-4 rounded-md bg-slate-950 border border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] font-mono block">ULPIN</span>
                  <span className="text-slate-200 font-mono">{linkedProperty.ulpin}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] font-mono block">Survey Number</span>
                  <span className="text-white font-bold font-mono">{linkedProperty.surveyNumber}</span>
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
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>SECTION 2: Preserved Digital Evidence ({linkedEvidence.length} Assets)</span>
              </div>
              <div className="space-y-2">
                {linkedEvidence.map(ev => (
                  <div key={ev.id} className="p-3 rounded-md bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="font-semibold text-slate-200 flex items-center gap-2">
                        <span>{ev.fileName}</span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.2 rounded border border-slate-800">
                          {ev.category}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                        Uploaded: {ev.uploadedDate} • Size: {ev.fileSize}
                      </div>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      ✓ {ev.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ---------------- SECTION 3: Community Attestations ---------------- */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  <span>SECTION 3: Community Attestations ({linkedAttestations.length})</span>
                </div>
                <button
                  onClick={() => setAttestationModalOpen(true)}
                  className="text-xs text-blue-400 hover:underline font-mono flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Attestation</span>
                </button>
              </div>

              {linkedAttestations.length === 0 ? (
                <div className="p-3 rounded-md bg-slate-950 border border-slate-800 text-xs text-slate-400 italic">
                  No community attestations recorded for this parcel.
                </div>
              ) : (
                <div className="space-y-2">
                  {linkedAttestations.map(att => (
                    <div key={att.id} className="p-3 rounded-md bg-slate-950 border border-slate-800 space-y-1 text-xs">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="font-bold text-white">
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
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>SECTION 4: Cadastral Consistency Score ({report.consistencyScore}%)</span>
              </div>
              <div className="p-4 rounded-md bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Validation Matrix:</span>
                  <span className="text-emerald-400 font-bold">{report.checks.filter(c => c.status === 'PASS').length} of {report.checks.length} Checks Passed</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {report.aiAnalysis.checksSummary}
                </p>
                <div className="text-[10px] text-slate-500 font-mono pt-1">
                  Model: {report.aiAnalysis.modelName}
                </div>
              </div>
            </div>

            {/* ---------------- SECTION 5: Evidence Integrity ---------------- */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>SECTION 5: SHA-256 Hashes & Timestamps</span>
              </div>
              <div className="p-3.5 rounded-md bg-slate-950 border border-slate-800 space-y-1.5 font-mono text-[10px]">
                {linkedEvidence.slice(0, 3).map(ev => (
                  <div key={ev.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-400 pb-1 border-b border-slate-900 last:border-0">
                    <span className="text-slate-200">{ev.fileName.slice(0, 24)}</span>
                    <span className="text-slate-400">{truncateHash(ev.sha256Hash, 8, 8)}</span>
                    <span className="text-slate-300">{formatTimestamp(ev.timestamp)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ---------------- SECTION 6: Conflicts ---------------- */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>SECTION 6: Conflict Detection & Audit Discrepancies</span>
              </div>
              {report.conflicts.length === 0 ? (
                <div className="p-3 rounded-md bg-slate-950 border border-slate-800 text-xs text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Zero conflicting survey claims or boundary disparities detected.</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {report.conflicts.map(conf => (
                    <div key={conf.id} className="p-3.5 rounded-md bg-red-950/30 border border-red-800 text-xs text-red-200 space-y-1">
                      <div className="font-bold flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
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
              <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>SECTION 7: Authority Review & Official Disposition</span>
              </div>

              <div className="p-4 rounded-md bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">Current Docket Status:</span>
                  <span className="font-bold text-white font-mono bg-slate-900 px-2.5 py-0.5 rounded border border-slate-700">
                    {activeCase.reviewStatus.replace(/_/g, ' ')}
                  </span>
                </div>
                
                {activeCase.authorityRemarks && (
                  <p className="text-xs text-slate-300 italic">
                    “{activeCase.authorityRemarks}”
                  </p>
                )}

                {/* 3 Explicit Action Buttons from Requirement #15 */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  
                  {/* BUTTON 1: APPROVE EVIDENCE PACKAGE (Strictly NOT approve ownership) */}
                  <button
                    onClick={handleApproveEvidencePackage}
                    className="flex-1 min-w-[200px] py-2 px-3 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>APPROVE EVIDENCE PACKAGE</span>
                  </button>

                  {/* BUTTON 2: SEND FOR MANUAL REVIEW */}
                  <button
                    onClick={handleSendForManualReview}
                    className="py-2 px-3 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-400" />
                    <span>SEND FOR MANUAL REVIEW</span>
                  </button>

                  {/* BUTTON 3: REQUEST MORE EVIDENCE */}
                  <button
                    onClick={handleRequestMoreEvidence}
                    className="py-2 px-3 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                  >
                    <Plus className="w-3.5 h-3.5 text-blue-400" />
                    <span>REQUEST MORE EVIDENCE</span>
                  </button>

                </div>
              </div>

              {/* Crucial legal notice */}
              <div className="text-[10px] font-mono text-slate-500 text-center pt-1">
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
