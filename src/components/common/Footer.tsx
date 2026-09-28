import React from 'react';
import { Shield, Lock, FileCheck2, Cpu, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setRole, setCurrentView } = useApp();

  return (
    <footer className="mt-20 border-t border-slate-800 bg-navy-950 text-slate-400 text-xs">
      {/* Architecture Flow Banner */}
      <div className="border-b border-slate-800/80 bg-navy-900/60 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 font-semibold">
              SYSTEM ARCHITECTURE & LEGAL SEPARATION PRINCIPLE
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-slate-300">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200">
              GOVERNMENT RECORDS
            </span>
            <span className="text-cyan-400 font-bold">+</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200">
              PRESERVED EVIDENCE
            </span>
            <span className="text-cyan-400 font-bold">+</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200">
              VERIFICATION ENGINE
            </span>
            <span className="text-purple-400 font-bold">→</span>
            <span className="px-3 py-1.5 rounded-lg bg-purple-950/60 border border-purple-500/40 text-purple-200">
              PROPERTY RECOVERY PACKAGE
            </span>
            <span className="text-purple-400 font-bold">→</span>
            <span className="px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 font-bold">
              AUTHORIZED AUTHORITY REVIEW
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="font-display font-bold text-base text-white tracking-wide">
                PROJECT HARMONY
              </span>
            </div>
            <p className="text-slate-300 text-sm italic font-serif">
              “Preserve the evidence. Restore the record.”
            </p>
            <p className="text-slate-400 text-xs leading-relaxed max-w-lg">
              When disaster strikes and original physical documents are destroyed, PROJECT HARMONY connects existing government land records with preserved cryptographic evidence to prepare a structured Property Evidence Recovery Package for official authority adjudication.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[11px] font-mono text-cyan-400/80">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" /> SHA-256 Hashing
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" /> Cadastral Cross-Check
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" /> Leaflet GIS Cadastre
              </span>
            </div>
          </div>

          {/* Quick Demo Navigation */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-200 font-mono uppercase tracking-wider">
              Quick Role Portals
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button 
                  onClick={() => setRole('OWNER')} 
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Property Owner Portal
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setRole('AUTHORITY')} 
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  Authorized Authority Officer
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setRole('ADMIN')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Audit & Ledger Admin
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('map-view')} 
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Interactive Cadastre Map
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('blockchain-ledger')} 
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Immutable Evidence Ledger
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Boundary Notice */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-200 font-mono uppercase tracking-wider">
              Legal Boundary
            </h4>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] leading-relaxed text-slate-400 space-y-1.5">
              <p>
                <strong className="text-slate-300">Non-Deed Disclaimer:</strong> PROJECT HARMONY does not create legal ownership, issue deeds, or replace official state land archives.
              </p>
              <p>
                All final property adjudications and record restorations are conducted solely by authorized statutory officers under applicable Land Revenue Acts.
              </p>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 PROJECT HARMONY — Buildathon MVP Edition. Built for Disaster Resilience.
          </div>
          <div className="flex items-center gap-4 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Ledger Synchronized
            </span>
            <span>v2.4.0-Production-Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
