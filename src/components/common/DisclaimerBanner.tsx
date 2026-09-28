import React from 'react';
import { AlertCircle, FileText } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-amber-950/40 border-b border-amber-500/20 px-4 py-2 text-xs text-amber-200/90 font-mono">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-amber-300 font-semibold tracking-wide">STATUTORY NOTICE:</strong> Prototype Disaster Evidence Vault. Official deeds and mutation records remain under the statutory jurisdiction of the State Land Revenue Department.
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-amber-400/80 text-[11px] shrink-0">
          <FileText className="w-3.5 h-3.5" />
          <span>Cadastral Evidence Layer</span>
        </div>
      </div>
    </div>
  );
};
