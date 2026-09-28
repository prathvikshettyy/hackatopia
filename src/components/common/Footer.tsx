import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setRole, setCurrentView } = useApp();

  return (
    <footer className="mt-20 border-t border-slate-800 bg-gov-950 text-slate-400 text-xs">
      {/* Architecture Flow Banner */}
      <div className="border-b border-slate-800 bg-slate-900/60 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 font-semibold">
              SYSTEM ARCHITECTURE & STATUTORY SEPARATION
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-slate-300">
            <span className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-200">
              GOVERNMENT LAND RECORDS
            </span>
            <span className="text-slate-500 font-bold">+</span>
            <span className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-200">
              PRESERVED DIGITAL EVIDENCE
            </span>
            <span className="text-slate-500 font-bold">+</span>
            <span className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-200">
              VERIFICATION ENGINE
            </span>
            <span className="text-blue-400 font-bold">→</span>
            <span className="px-3 py-1.5 rounded bg-blue-950 border border-blue-800 text-blue-200">
              PROPERTY RECOVERY PACKAGE (PDF)
            </span>
            <span className="text-blue-400 font-bold">→</span>
            <span className="px-3 py-1.5 rounded bg-slate-800 border border-slate-600 text-white font-bold">
              AUTHORIZED AUTHORITY REVIEW
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-bold text-base text-white">
                PROJECT HARMONY
              </span>
            </div>
            <p className="text-slate-300 text-sm italic font-serif">
              “Preserve the evidence. Restore the record.”
            </p>
            <p className="text-slate-400 text-xs leading-relaxed max-w-lg">
              When disaster strikes and original physical documents are destroyed, PROJECT HARMONY connects existing government land records with preserved cryptographic evidence to prepare a structured Property Evidence Recovery Package for official authority adjudication.
            </p>
            <div className="flex items-center gap-4 pt-1 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400" /> SHA-256 Checksums
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400" /> Cadastral Cross-Check
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400" /> OpenStreetMap GIS
              </span>
            </div>
          </div>

          {/* Quick Portals */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-200 font-mono uppercase tracking-wider">
              Functional Portals
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button 
                  onClick={() => setRole('OWNER')} 
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Citizen Landowner Portal
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setRole('AUTHORITY')} 
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Sub-Divisional Magistrate Portal
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setRole('ADMIN')} 
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  System Administration & Audit
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('map-view')} 
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Cadastre GIS Explorer
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('blockchain-ledger')} 
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Cryptographic Audit Chain
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Boundary Notice */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-200 font-mono uppercase tracking-wider">
              Statutory Boundary
            </h4>
            <div className="p-3 rounded-md bg-slate-900 border border-slate-800 text-[11px] leading-relaxed text-slate-400 space-y-1.5">
              <p>
                <strong className="text-slate-300">Non-Deed Policy:</strong> PROJECT HARMONY does not create legal ownership, issue deeds, or replace official state land archives.
              </p>
              <p>
                All final property adjudications and record restorations are conducted solely by authorized statutory officers under applicable Land Revenue Acts.
              </p>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            © 2026 PROJECT HARMONY — Buildathon Prototype Edition.
          </div>
          <div>
            ISO/IEC 10118-3 (SHA-256) • Statutory Compliance Layer
          </div>
        </div>
      </div>
    </footer>
  );
};
