import React from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Play, 
  RotateCcw,
  CheckSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DEMO_STEPS = [
  {
    step: 1,
    title: 'Login as Citizen Landholder',
    subtitle: 'Citizen perspective',
    role: 'OWNER',
    description: 'Switch context to citizen Ravi Kumar, who owns agricultural land in Sirsi, Uttara Kannada.',
    actionLabel: 'Switch to Citizen Portal',
  },
  {
    step: 2,
    title: "Register Ravi Kumar's Land Parcel",
    subtitle: 'Cadastral details',
    role: 'OWNER',
    description: 'Enter Survey No 124/3A, Sirsi Rural, 1.20 Acres, ULPIN, and coordinates.',
    actionLabel: 'Open Registration Form',
  },
  {
    step: 3,
    title: 'Upload Property Evidence',
    subtitle: 'Photos, deeds, tax receipts',
    role: 'OWNER',
    description: 'Upload property photograph, notarized deed copy, and GPS boundary coordinates.',
    actionLabel: 'Inspect Evidence Queue',
  },
  {
    step: 4,
    title: 'Verify Hashes & Timestamps',
    subtitle: 'Cryptographic proof',
    role: 'OWNER',
    description: 'Examine generated SHA-256 digests and immutable timestamps anchored in the vault.',
    actionLabel: 'View Evidence Vault',
  },
  {
    step: 5,
    title: 'Simulate Document Loss',
    subtitle: 'Disaster event triggered',
    role: 'OWNER',
    description: 'Simulate Western Ghats flood & mudslide destroying all physical papers and deeds.',
    actionLabel: 'Trigger Disaster Simulation',
  },
  {
    step: 6,
    title: 'Click "Recover My Property Evidence"',
    subtitle: 'Disaster recovery initiation',
    role: 'OWNER',
    description: 'Launch the recovery engine to reconstruct evidence without physical papers.',
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
    title: 'Retrieve Dual-Record Evidence',
    subtitle: 'Govt + HARMONY Evidence',
    role: 'OWNER',
    description: 'Retrieve official land record together with preserved cryptographic evidence.',
    actionLabel: 'View Dual-Record File',
  },
  {
    step: 9,
    title: 'Run Verification Engine',
    subtitle: '94% Consistency Check',
    role: 'OWNER',
    description: 'Execute multi-point algorithmic verification and consistency cross-check.',
    actionLabel: 'Run Verification Engine',
  },
  {
    step: 10,
    title: 'Login as Revenue Authority',
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
    subtitle: 'Neighbor & Officer statements',
    role: 'AUTHORITY',
    description: 'Validate statements from neighbor Suresh Kumar and Village Agricultural Assistant.',
    actionLabel: 'Inspect Attestations',
  },
  {
    step: 13,
    title: 'Approve Evidence Package',
    subtitle: 'Certify evidence package',
    role: 'AUTHORITY',
    description: 'Seal the recovery package with digital authority disposition.',
    actionLabel: 'Approve Evidence Package',
  },
  {
    step: 14,
    title: 'Download Recovery Package PDF',
    subtitle: 'Official statutory dossier',
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
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)] bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden font-sans">
      
      {/* Top Header */}
      <div className="bg-slate-950 p-3.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400">
            <CheckSquare className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
              <span>DEMO PRESENTATION RUNNER</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-blue-900 text-blue-200 rounded">
                Step {guidedDemoStep || 1}/14
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-sans">
              Buildathon Presentation Walkthrough
            </div>
          </div>
        </div>
        <button
          onClick={() => setDemoGuideOpen(false)}
          className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-950 h-1">
        <div 
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Current Step Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              {currentStepData.subtitle}
            </div>
            <h4 className="text-sm font-bold text-white mt-0.5">
              {currentStepData.step}. {currentStepData.title}
            </h4>
          </div>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
            currentStepData.role === 'OWNER' 
              ? 'bg-slate-800 text-blue-300 border-slate-700' 
              : 'bg-slate-800 text-purple-300 border-slate-700'
          }`}>
            {currentStepData.role}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-2.5 rounded-md border border-slate-800">
          {currentStepData.description}
        </p>

        {/* Action Button */}
        <button
          onClick={() => jumpToDemoStep(guidedDemoStep)}
          className="w-full py-2 px-3 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>Execute: {currentStepData.actionLabel}</span>
        </button>

        {/* Navigation Step Controls */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <button
            disabled={guidedDemoStep <= 1}
            onClick={() => jumpToDemoStep(Math.max(1, guidedDemoStep - 1))}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed border border-slate-700"
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
            className="flex items-center gap-1 px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed font-medium"
          >
            Next
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Step dropdown */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <select
            value={guidedDemoStep}
            onChange={(e) => jumpToDemoStep(Number(e.target.value))}
            className="bg-slate-950 text-slate-300 text-[11px] rounded border border-slate-700 px-2 py-1 outline-none"
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
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            title="Restart demo from Step 1"
          >
            <RotateCcw className="w-3 h-3" />
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};
