import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/15 to-amber-500/10 border-b border-amber-500/25 px-4 py-2 text-xs text-amber-200/90">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
          <span>
            <strong className="font-semibold text-amber-300">DEMO PROTOTYPE SYSTEM:</strong> Official ownership decisions remain with authorized authorities. PROJECT HARMONY does not create legal deeds or replace government land records.
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-amber-300/80 font-mono text-[11px] shrink-0">
          <Info className="w-3.5 h-3.5" />
          <span>Evidence Preservation & Recovery Layer</span>
        </div>
      </div>
    </div>
  );
};
