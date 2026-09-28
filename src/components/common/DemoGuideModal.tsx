import React from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Sparkles, 
  Play, 
  RotateCcw,
  Shield,
  FileCheck2,
  FileWarning,
  Download,
  Building2,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DEMO_STEPS = [
  {
    step: 1,
    title: 'Login as Property Owner',
    subtitle: 'Access citizen portal',
    role: 'OWNER',
    description: 'Switch context to citizen Ravi Kumar, who owns land in Sirsi, Uttara Kannada.',
    actionLabel: 'Switch to Owner Portal',
  },
  {
    step: 2,
    title: "Register Ravi Kumar's Property",
    subtitle: 'Fill cadastral details',
    role: 'OWNER',
    description: 'Enter Survey No 124/3A, Sirsi Rural, 1.2 Acres, ULPIN, and coordinates.',
    actionLabel: 'Open Registration Form',
  },
  {
    step: 3,
    title: 'Upload Property Evidence',
    subtitle: 'Photos, deeds, tax receipts',
    role: 'OWNER',
    description: 'Upload high-resolution property photograph, notarized deed copy, and GPS logs.',
    actionLabel: 'Inspect Preserved Evidence',
  },
  {
    step: 4,
    title: 'Verify Hashes & Timestamps',
    subtitle: 'Cryptographic anchor',
    role: 'OWNER',
    description: 'Examine generated SHA-256 digests and immutable timestamps anchored to the vault.',
    actionLabel: 'View Evidence Vault',
  },
  {
    step: 5,
    title: 'Simulate Document Loss',
    subtitle: 'Disaster event triggered',
    role: 'OWNER',
    description: 'Simulate severe Western Ghats flood/landslide destroying all physical deeds and papers.',
    actionLabel: 'Trigger Disaster Simulation',
  },
  {
    step: 6,
    title: 'Click "Recover My Property"',
    subtitle: 'Disaster recovery initiation',
    role: 'OWNER',
    description: 'Launch the recovery wizard to reconstruct evidence without physical papers.',
    actionLabel: 'Open Recovery Wizard',
  },
  {
    step: 7,
    title: 'Search Government Master Index',
    subtitle: 'Query KA-SIR-10234',
    role: 'OWNER',
    description: 'Look up property ID KA-SIR-10234 or Survey 124/3A in the Demo Government Records.',
    actionLabel: 'Perform Cadastral Query',
  },
  {
    step: 8,
    title: 'Retrieve Government + HARMONY Evidence',
    subtitle: 'Dual-record fusion',
    role: 'OWNER',
    description: 'Retrieve official land record together with preserved cryptographic evidence.',
    actionLabel: 'View Dual-Record File',
  },
  {
    step: 9,
    title: 'Run Verification Engine',
    subtitle: '94% Consistency Check',
    role: 'OWNER',
    description: 'Execute multi-point algorithmic verification and AI consistency cross-check.',
    actionLabel: 'Run Verification Engine',
  },
  {
    step: 10,
    title: 'Login as Authority',
    subtitle: 'Sub-Divisional Magistrate role',
    role: 'AUTHORITY',
    description: 'Switch to official government authority dashboard to adjudicate the recovery case.',
    actionLabel: 'Switch to Authority Role',
  },
  {
    step: 11,
    title: 'Open Recovery Case REC-2026-081',
    subtitle: 'Dossier inspection',
    role: 'AUTHORITY',
    description: 'Inspect the 7-section recovery case file for Ravi Kumar with all corroborated records.',
    actionLabel: 'Open Case Dossier',
  },
  {
    step: 12,
    title: 'Review Evidence & Attestations',
    subtitle: 'Neighbor & Field corroboration',
    role: 'AUTHORITY',
    description: 'Validate statements from neighbor Suresh Kumar and Village Agricultural Officer.',
    actionLabel: 'Inspect Attestations',
  },
  {
    step: 13,
    title: 'Approve Evidence Package',
    subtitle: 'Not ownership — evidence package',
    role: 'AUTHORITY',
    description: 'Seal the recovery package with digital authority disposition.',
    actionLabel: 'Approve Evidence Package',
  },
  {
    step: 14,
    title: 'Download Recovery Package PDF',
    subtitle: 'Official official legal dossier',
    role: 'AUTHORITY',
    description: 'Generate and download the official 7-section Property Evidence Recovery Package PDF.',
    actionLabel: 'Download Recovery PDF',
  },
];

export const DemoGuideModal: React.FC = () => {
  const { 
    guidedDemoStep, 
    jumpToDemoStep, 
    demoGuideOpen, 
    setDemoGuideOpen,
    resetDemoData
  } = useApp();

  if (!demoGuideOpen) return null;

  const currentStepData = DEMO_STEPS.find(s => s.step === guidedDemoStep) || DEMO_STEPS[0];
  const progressPercent = Math.round((guidedDemoStep / DEMO_STEPS.length) * 100);

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)] bg-navy-900/95 border border-cyan-500/40 rounded-2xl shadow-glass backdrop-blur-xl overflow-hidden animate-slideUp">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-cyan-950/80 via-navy-900 to-purple-950/80 p-3.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5 font-display tracking-wide">
              <span>3-MINUTE DEMO RUNNER</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30">
                Step {guidedDemoStep || 1}/14
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Buildathon Presentation Walkthrough
            </div>
          </div>
        </div>
        <button
          onClick={() => setDemoGuideOpen(false)}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-950 h-1.5">
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Current Step Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              {currentStepData.subtitle}
            </div>
            <h4 className="text-sm font-bold text-white mt-0.5">
              {currentStepData.step}. {currentStepData.title}
            </h4>
          </div>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
            currentStepData.role === 'OWNER' 
              ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' 
              : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
          }`}>
            {currentStepData.role}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
          {currentStepData.description}
        </p>

        {/* Action Button */}
        <button
          onClick={() => jumpToDemoStep(guidedDemoStep)}
          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-glow-cyan transition-all"
        >
          <Play className="w-3.5 h-3.5 fill-slate-950" />
          <span>Execute: {currentStepData.actionLabel}</span>
        </button>

        {/* Navigation Step Controls */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <button
            disabled={guidedDemoStep <= 1}
            onClick={() => jumpToDemoStep(Math.max(1, guidedDemoStep - 1))}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed border border-slate-700/60"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Prev
          </button>

          <span className="text-[11px] font-mono text-slate-400">
            {guidedDemoStep} of 14
          </span>

          <button
            disabled={guidedDemoStep >= 14}
            onClick={() => jumpToDemoStep(Math.min(14, guidedDemoStep + 1))}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/30 disabled:opacity-30 disabled:cursor-not-allowed font-medium"
          >
            Next
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick step picker dropdown */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <select
            value={guidedDemoStep}
            onChange={(e) => jumpToDemoStep(Number(e.target.value))}
            className="bg-slate-950 text-slate-300 text-[11px] rounded border border-slate-700 px-2 py-1 outline-none focus:border-cyan-400"
          >
            {DEMO_STEPS.map(s => (
              <option key={s.step} value={s.step}>
                {s.step}. {s.title}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              resetDemoData();
              jumpToDemoStep(1);
            }}
            className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
            title="Restart demo from Step 1"
          >
            <RotateCcw className="w-3 h-3" />
            Restart Demo
          </button>
        </div>
      </div>
    </div>
  );
};
