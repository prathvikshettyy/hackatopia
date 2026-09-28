import React from 'react';
import { 
  Shield, 
  FileCheck2, 
  Database, 
  Building2, 
  UserCheck, 
  Sliders, 
  ArrowRight, 
  AlertTriangle, 
  Play, 
  CheckCircle2, 
  FileSearch,
  Scale,
  FileX,
  Lock,
  Compass,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingPage: React.FC = () => {
  const { 
    setRole, 
    setCurrentView, 
    navigateTo, 
    properties, 
    setDisasterModalProperty,
    setDemoGuideOpen,
    jumpToDemoStep
  } = useApp();

  const raviProp = properties.find(p => p.id === 'KA-SIR-10234') || properties[0];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Institutional Hero Section */}
      <section className="border-b border-slate-800 bg-gov-950 py-14">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>DISASTER LAND EVIDENCE RECONSTRUCTION SYSTEM</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
            PROJECT HARMONY
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl text-slate-200 font-serif italic">
            “Preserve the evidence. Restore the record.”
          </p>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed font-sans">
            When disasters destroy physical deeds and land titles, <strong className="text-white">PROJECT HARMONY</strong> reconstructs the pre-disaster evidence baseline by linking preserved cryptographic digital records with official state land registries for statutory authority adjudication.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => {
                setRole('OWNER');
                setCurrentView('register-property');
              }}
              className="px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-sm"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Register Land Parcel</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setRole('OWNER');
                setCurrentView('property-recovery');
              }}
              className="px-5 py-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-600 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
            >
              <Database className="w-4 h-4 text-blue-400" />
              <span>Recover Property Evidence</span>
            </button>

            <button
              onClick={() => {
                setDemoGuideOpen(true);
                jumpToDemoStep(1);
              }}
              className="px-5 py-2.5 rounded-md bg-slate-900 hover:bg-slate-800 text-blue-300 border border-blue-500/40 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
            >
              <Play className="w-4 h-4 fill-blue-400 text-blue-400" />
              <span>3-Minute Demo Walkthrough</span>
            </button>
          </div>

          {/* Regulatory Footnote */}
          <p className="text-[11px] text-slate-400 font-mono pt-2">
            Prototype System. Statutory property ownership adjudications remain with authorized government revenue officers.
          </p>

        </div>
      </section>

      {/* 4-Stage Institutional Pipeline (Requirement #3) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="gov-card p-6 sm:p-8">
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
              STATUTORY WORKFLOW PIPELINE
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              From Pre-Disaster Preservation to Official Adjudication
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Step 1 */}
            <div className="gov-card-subtle p-5 space-y-2">
              <div className="text-xs font-mono font-bold text-blue-400">
                STAGE 01
              </div>
              <h3 className="font-bold text-white text-sm">CAPTURE</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Landholders record cadastral survey coordinates, property frontage photographs, notarized deed extracts, and tax receipts.
              </p>
              <div className="text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800">
                ULPIN & Cadastral Ingestion
              </div>
            </div>

            {/* Step 2 */}
            <div className="gov-card-subtle p-5 space-y-2">
              <div className="text-xs font-mono font-bold text-blue-400">
                STAGE 02
              </div>
              <h3 className="font-bold text-white text-sm">VERIFY</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dual-source automated cross-check against demo government master records for survey parcel, owner identity, and area consistency.
              </p>
              <div className="text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800">
                Consistency Engine
              </div>
            </div>

            {/* Step 3 */}
            <div className="gov-card-subtle p-5 space-y-2">
              <div className="text-xs font-mono font-bold text-blue-400">
                STAGE 03
              </div>
              <h3 className="font-bold text-white text-sm">PRESERVE</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Calculates client-side SHA-256 cryptographic fingerprints and anchors pre-disaster timestamps onto the immutable audit ledger.
              </p>
              <div className="text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800">
                SHA-256 Hash Anchors
              </div>
            </div>

            {/* Step 4 */}
            <div className="gov-card-subtle p-5 space-y-2">
              <div className="text-xs font-mono font-bold text-blue-400">
                STAGE 04
              </div>
              <h3 className="font-bold text-white text-sm">RECOVER</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Reconstructs corroborated records and neighbor attestations into a sealed Property Evidence Recovery Package PDF for official review.
              </p>
              <div className="text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800">
                Statutory Dossier PDF
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Problem vs Solution Comparison Table */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="gov-card p-6 sm:p-8 space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
              THE PROBLEM & THE HARMONY SOLUTION
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Overcoming Post-Disaster Property Paralysis
            </h2>
            <p className="text-xs text-slate-300 mt-2">
              Physical property papers are vulnerable to water, mud, and fire. When they disappear, landholders face bureaucratic deadlocks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Without Project Harmony */}
            <div className="p-5 rounded-lg bg-red-950/20 border border-red-900/40 space-y-3">
              <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase font-mono tracking-wider">
                <FileX className="w-4 h-4" />
                <span>Physical Paper Vulnerability (Current State)</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span><strong>Physical deeds destroyed:</strong> Landslides and floods ruin home registries, leaving no local proof of boundaries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span><strong>Years of legal delays:</strong> Citizens must file costly title suits and wait years for reconstruction orders.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span><strong>Fraud risk:</strong> Secondary paper copies can be fabricated or disputed by unauthorized claimants.</span>
                </li>
              </ul>
            </div>

            {/* With Project Harmony */}
            <div className="p-5 rounded-lg bg-emerald-950/20 border border-emerald-900/40 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase font-mono tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>PROJECT HARMONY Resilience</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Immutable Digital Proof:</strong> Pre-disaster deeds and photographs are anchored with SHA-256 fingerprints before disaster strikes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Rapid Cadastral Pairing:</strong> Connects state land databases with corroborated field evidence in seconds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Statutory Dossier:</strong> Compiles an official, tamper-proof recovery dossier for Sub-Divisional Magistrates.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 3 User Roles Cards (Requirement #2) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
            PORTAL ACCESS BY ROLE
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Access Dedicated Functional Portals
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Built for demo access without authentication hurdles. Click below to enter immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Role 1: Property Owner */}
          <div className="gov-card p-6 flex flex-col justify-between space-y-4 hover:border-slate-600 transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400">
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-mono uppercase text-blue-400 font-bold">
                PORTAL 01
              </div>
              <h3 className="text-base font-bold text-white">
                Landowner / Citizen Portal
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                For property owners seeking to protect land records against natural catastrophes and recover evidence post-disaster.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-400 pt-1">
                <li className="flex items-center gap-1.5">✓ Register cadastral coordinates & ULPIN</li>
                <li className="flex items-center gap-1.5">✓ Upload deeds & photos with SHA-256 hashing</li>
                <li className="flex items-center gap-1.5">✓ Simulate physical document destruction</li>
                <li className="flex items-center gap-1.5">✓ Reconstruct dual-source evidence dossier</li>
              </ul>
            </div>
            <button
              onClick={() => {
                setRole('OWNER');
                setCurrentView('owner-dashboard');
              }}
              className="w-full py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Enter Citizen Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Role 2: Authority Officer */}
          <div className="gov-card p-6 flex flex-col justify-between space-y-4 hover:border-slate-600 transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                PORTAL 02
              </div>
              <h3 className="text-base font-bold text-white">
                Authorized Revenue Authority
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                For Sub-Divisional Magistrates, Tahsildars, and District Revenue Officers adjudicating disaster claims.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-400 pt-1">
                <li className="flex items-center gap-1.5">✓ Review incoming citizen recovery dockets</li>
                <li className="flex items-center gap-1.5">✓ Inspect 7-section corroborated evidence</li>
                <li className="flex items-center gap-1.5">✓ Evaluate neighbor & officer attestations</li>
                <li className="flex items-center gap-1.5">✓ Flag cadastral survey conflicts</li>
              </ul>
            </div>
            <button
              onClick={() => {
                setRole('AUTHORITY');
                setCurrentView('authority-dashboard');
              }}
              className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Enter Authority Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Role 3: Admin & Auditor */}
          <div className="gov-card p-6 flex flex-col justify-between space-y-4 hover:border-slate-600 transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200">
                <Sliders className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                PORTAL 03
              </div>
              <h3 className="text-base font-bold text-white">
                Cadastre Auditor & Admin
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                For disaster management directors, land records supervisors, and cryptographic audit verifiers.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-400 pt-1">
                <li className="flex items-center gap-1.5">✓ Master cadastral index & spatial layer</li>
                <li className="flex items-center gap-1.5">✓ SHA-256 cryptographic audit chain</li>
                <li className="flex items-center gap-1.5">✓ Disaster impact vulnerability mapping</li>
                <li className="flex items-center gap-1.5">✓ Buildathon demo controls & dataset resets</li>
              </ul>
            </div>
            <button
              onClick={() => {
                setRole('ADMIN');
                setCurrentView('admin-dashboard');
              }}
              className="w-full py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Enter Admin Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* Western Ghats Disaster Spotlight */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="p-6 rounded-xl bg-slate-900 border border-red-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-red-400 text-xs font-mono font-bold uppercase">
              <AlertTriangle className="w-4 h-4" />
              <span>ACTIVE DISASTER INCIDENT: WESTERN GHATS FLASH FLOOD & LANDSLIDE</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Primary Presentation Scenario: Ravi Kumar (Survey 124/3A, Sirsi)
            </h3>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Torrential rains and mudslides destroyed the physical dwelling and washed away the paper sale deed and tax receipts. Experience how PROJECT HARMONY retrieves the master cadastral entry, recovers preserved digital evidence, verifies consistency (94%), and delivers an official Recovery Dossier for the Sub-Divisional Magistrate.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setDisasterModalProperty(raviProp)}
              className="px-4 py-2 rounded-md bg-red-700 hover:bg-red-600 text-white font-semibold text-xs transition-colors"
            >
              Simulate Document Loss
            </button>
            <button
              onClick={() => {
                setRole('OWNER');
                navigateTo('property-recovery', 'KA-SIR-10234');
              }}
              className="px-4 py-2 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium text-xs transition-colors"
            >
              Recover Cadastre
            </button>
          </div>
        </div>
      </section>

      {/* Statutory Legal Boundary Notice */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-slate-200 font-bold text-xs uppercase font-mono">
            <Scale className="w-4 h-4 text-blue-400" />
            <span>Statutory Governance & Legal Guardrails</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-400 leading-relaxed">
            <div>
              <strong className="text-slate-200">Evidence Preservation Layer:</strong> PROJECT HARMONY provides cryptographic proof of pre-disaster documentation and spatial boundary correlation. It organizes available evidence so government officers can conduct informed inquiries.
            </div>
            <div>
              <strong className="text-slate-200">Statutory Authority Primacy:</strong> The system does NOT create ownership deeds or replace state land registries. All legal property title decrees and land records restorations remain strictly with authorized government revenue courts.
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
