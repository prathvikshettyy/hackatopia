import React from 'react';
import { 
  Shield, 
  FileCheck2, 
  Sparkles, 
  Database, 
  Lock, 
  Building2, 
  UserCheck, 
  Sliders, 
  ArrowRight, 
  Waves, 
  Flame, 
  Play, 
  CheckCircle2, 
  Layers, 
  MapPin, 
  FileText,
  Clock,
  Compass,
  FileSearch,
  Scale
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
    <div className="space-y-16 pb-12">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        {/* Glow ambient background circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-glow-cyan">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>DISASTER-RESILIENT PROPERTY EVIDENCE & RECOVERY PLATFORM</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white">
            PROJECT <span className="gradient-text-cyan">HARMONY</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl font-serif italic text-cyan-200/90 font-medium">
            “Preserve the evidence. Restore the record.”
          </p>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            When disaster destroys physical property documents, <strong className="text-white">HARMONY</strong> helps reconstruct the evidence needed for official government recovery and authority review.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setRole('OWNER');
                setCurrentView('register-property');
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-glow-cyan transition-all transform hover:-translate-y-0.5"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Register Property</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setRole('OWNER');
                setCurrentView('property-recovery');
              }}
              className="px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 font-semibold text-sm flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Recover Property</span>
            </button>

            <button
              onClick={() => {
                setDemoGuideOpen(true);
                jumpToDemoStep(1);
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/40 text-purple-200 font-semibold text-sm flex items-center gap-2 transition-all shadow-glow-purple"
            >
              <Play className="w-4 h-4 fill-purple-400 text-purple-400" />
              <span>Start 3-Min Buildathon Demo</span>
            </button>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-slate-400 font-mono pt-2">
            ⚠️ Prototype system. Official ownership decisions remain with authorized authorities.
          </p>

        </div>
      </section>

      {/* Visual Process Section: CAPTURE → VERIFY → PRESERVE → RECOVER */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden">
          <div className="text-center mb-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              EVIDENCE RECOVERY LIFECYCLE
            </span>
            <h2 className="text-2xl font-bold font-display text-white mt-1">
              From Pre-Disaster Preservation to Official Restoration
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            
            {/* Step 1 */}
            <div className="glass-panel-subtle p-5 rounded-xl border border-slate-800 relative group hover:border-cyan-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold mb-3">
                01
              </div>
              <h3 className="font-bold text-white text-base mb-1 font-display">CAPTURE</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Citizens register cadastral survey boundaries, high-res photos, utility bills, and sale deed copies.
              </p>
              <div className="mt-3 text-[11px] font-mono text-cyan-400/80">
                GPS + OCR + Metadata
              </div>
            </div>

            {/* Step 2 */}
            <div className="glass-panel-subtle p-5 rounded-xl border border-slate-800 relative group hover:border-purple-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold mb-3">
                02
              </div>
              <h3 className="font-bold text-white text-base mb-1 font-display">VERIFY</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Algorithmic cross-check against demo government records for owner, parcel survey number, and area consistency.
              </p>
              <div className="mt-3 text-[11px] font-mono text-purple-400/80">
                Consistency Engine
              </div>
            </div>

            {/* Step 3 */}
            <div className="glass-panel-subtle p-5 rounded-xl border border-slate-800 relative group hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold mb-3">
                03
              </div>
              <h3 className="font-bold text-white text-base mb-1 font-display">PRESERVE</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generates SHA-256 cryptographic digests and anchors pre-disaster timestamps onto the immutable audit ledger.
              </p>
              <div className="mt-3 text-[11px] font-mono text-emerald-400/80">
                SHA-256 Proofs
              </div>
            </div>

            {/* Step 4 */}
            <div className="glass-panel-subtle p-5 rounded-xl border border-slate-800 relative group hover:border-cyan-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold mb-3">
                04
              </div>
              <h3 className="font-bold text-white text-base mb-1 font-display">RECOVER</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                When disaster strikes, the platform reconstructs all evidence into a certified dossier for authority adjudication.
              </p>
              <div className="mt-3 text-[11px] font-mono text-cyan-400/80">
                Certified PDF Package
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3 User Roles Cards (Requirement #2) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400 font-semibold">
            DEMO USER ROLES
          </span>
          <h2 className="text-2xl font-bold font-display text-white mt-1">
            Explore PROJECT HARMONY by Persona
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            No password required for MVP demo. Click any role below to enter the platform immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Role 1: Property Owner */}
          <div className="glass-panel rounded-2xl p-6 border border-cyan-500/30 flex flex-col justify-between hover:border-cyan-400 transition-all shadow-glass">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-4">
                <UserCheck className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                ROLE 1
              </div>
              <h3 className="text-lg font-bold text-white font-display mt-0.5">
                Property Owner
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Citizens facing document loss from floods, landslides, or fires.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-400">
                <li className="flex items-center gap-2">✓ Register property & cadastral coordinates</li>
                <li className="flex items-center gap-2">✓ Upload & anchor evidence with SHA-256</li>
                <li className="flex items-center gap-2">✓ Simulate physical document loss</li>
                <li className="flex items-center gap-2">✓ Reconstruct evidence without physical deeds</li>
                <li className="flex items-center gap-2">✓ Submit recovery request to authority</li>
              </ul>
            </div>
            <button
              onClick={() => {
                setRole('OWNER');
                setCurrentView('owner-dashboard');
              }}
              className="mt-6 w-full py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <span>Enter as Property Owner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Role 2: Authority Officer */}
          <div className="glass-panel rounded-2xl p-6 border border-purple-500/30 flex flex-col justify-between hover:border-purple-400 transition-all shadow-glass">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400 mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                ROLE 2
              </div>
              <h3 className="text-lg font-bold text-white font-display mt-0.5">
                Authorized Authority
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Tahsildars, Sub-Divisional Magistrates & Revenue Disaster Recovery Officers.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-400">
                <li className="flex items-center gap-2">✓ View incoming citizen recovery claims</li>
                <li className="flex items-center gap-2">✓ Inspect 7-section case dossier</li>
                <li className="flex items-center gap-2">✓ Review neighbor & field attestations</li>
                <li className="flex items-center gap-2">✓ Flag conflicting survey parcel claims</li>
                <li className="flex items-center gap-2">✓ Approve evidence package & generate PDF</li>
              </ul>
            </div>
            <button
              onClick={() => {
                setRole('AUTHORITY');
                setCurrentView('authority-dashboard');
              }}
              className="mt-6 w-full py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <span>Enter as Authority Officer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Role 3: Admin & Ledger Auditor */}
          <div className="glass-panel rounded-2xl p-6 border border-amber-500/30 flex flex-col justify-between hover:border-amber-400 transition-all shadow-glass">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4">
                <Sliders className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                ROLE 3
              </div>
              <h3 className="text-lg font-bold text-white font-display mt-0.5">
                Admin / Auditor
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                System supervisors, disaster coordinators, and blockchain ledger auditors.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-400">
                <li className="flex items-center gap-2">✓ View master properties cadastre</li>
                <li className="flex items-center gap-2">✓ Cryptographic hash vault verification</li>
                <li className="flex items-center gap-2">✓ Immutable blockchain audit ledger</li>
                <li className="flex items-center gap-2">✓ System analytics & consistency scores</li>
                <li className="flex items-center gap-2">✓ Disaster zone vulnerability mapping</li>
              </ul>
            </div>
            <button
              onClick={() => {
                setRole('ADMIN');
                setCurrentView('admin-dashboard');
              }}
              className="mt-6 w-full py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <span>Enter as System Admin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* Featured Disaster Scenario Spotlight */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-slate-900 via-navy-900 to-rose-950/40 rounded-2xl p-6 sm:p-8 border border-rose-500/30 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Waves className="w-4 h-4 animate-pulse" />
                <span>ACTIVE DEMO SCENARIO • WESTERN GHATS DISASTER</span>
              </div>
              <h3 className="text-2xl font-bold font-display text-white">
                Ravi Kumar's Land Parcel (Sy 124/3A, Sirsi)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                A massive monsoon landslide inundated the property dwelling. Ravi's registered sale deed and tax receipts are completely gone. Experience how PROJECT HARMONY retrieves the master government cadastral index, pairs it with preserved digital photos and neighbor attestations, and outputs an official Recovery Dossier for the Sub-Divisional Magistrate.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-slate-300">
                <span className="px-2.5 py-1 bg-slate-950/80 rounded border border-slate-700">
                  Parcel: KA-SIR-10234
                </span>
                <span className="px-2.5 py-1 bg-slate-950/80 rounded border border-slate-700">
                  Survey: 124/3A
                </span>
                <span className="px-2.5 py-1 bg-slate-950/80 rounded border border-slate-700">
                  Consistency: 94% Match
                </span>
              </div>
            </div>

            <div className="space-y-3 flex flex-col justify-center">
              <button
                onClick={() => setDisasterModalProperty(raviProp)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Waves className="w-4 h-4" />
                <span>Simulate Document Loss</span>
              </button>

              <button
                onClick={() => {
                  setRole('OWNER');
                  navigateTo('property-recovery', 'KA-SIR-10234');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium text-xs flex items-center justify-center gap-2 transition-all"
              >
                <FileSearch className="w-4 h-4 text-cyan-400" />
                <span>Direct Cadastre Query</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Core Principles & Legal Guardrails */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm font-display">
              <Scale className="w-5 h-5" />
              What PROJECT HARMONY Does
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Preserves digital proof:</strong> Computes client-side SHA-256 digests of deeds, bills, photos, and boundary maps prior to disasters.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Integrates government cadastres:</strong> Cross-checks citizen uploads against official state land indices.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Flags discrepancies:</strong> Automatically detects conflicting survey numbers and notifies authority officers.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Generates recovery dossiers:</strong> Packages all corroborated records into an actionable legal PDF for official review.</span>
              </li>
            </ul>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-rose-500/20 space-y-3 bg-gradient-to-br from-navy-950 via-slate-900 to-rose-950/20">
            <div className="flex items-center gap-2 text-rose-300 font-bold text-sm font-display">
              <Shield className="w-5 h-5 text-rose-400" />
              Strict Legal Guardrails (What It Does NOT Do)
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong>No legal deed issuance:</strong> PROJECT HARMONY does NOT create legal ownership or issue deeds.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong>Does not replace government records:</strong> Official revenue master registries remain the sole source of truth.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong>No autonomous ownership approvals:</strong> Consistency scores measure evidence alignment only, never legal title probability.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong>Statutory authority supremacy:</strong> All final restoration orders must be signed by authorized government magistrates.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

    </div>
  );
};
