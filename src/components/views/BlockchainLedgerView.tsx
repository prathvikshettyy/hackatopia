import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Clock, 
  Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatTimestamp, truncateHash } from '../../utils/crypto';

export const BlockchainLedgerView: React.FC = () => {
  const { ledgerBlocks } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlocks = [...ledgerBlocks].reverse().filter(b => 
    b.txHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.propertyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.evidenceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.eventType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="gov-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Lock className="w-4 h-4 text-blue-400" />
            <span>Cryptographic Audit Ledger</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-sans mt-1">
            Immutable Evidence Audit Chain
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Cryptographic SHA-256 Block Pointer Linkage & Pre-Disaster Timestamp Verification
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-200 bg-slate-950 px-3 py-1.5 rounded-md border border-slate-800">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Chain Continuity Verified</span>
        </div>
      </div>

      {/* 5-Stage Audit Timeline (Requirement #14) */}
      <div className="gov-card p-6 space-y-4">
        <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
          EVIDENCE INTEGRITY AUDIT TIMELINE
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 text-xs font-mono">
          
          <div className="p-3 rounded-md bg-slate-950 border border-slate-800 text-center flex-1 w-full sm:w-auto">
            <span className="text-[10px] text-blue-400 font-bold block mb-1">STAGE 1</span>
            <div className="font-semibold text-white">Evidence Uploaded</div>
            <span className="text-[10px] text-slate-500">Deed/Photo File Ingestion</span>
          </div>

          <div className="text-slate-600 font-bold hidden sm:block">→</div>
          <div className="text-slate-600 font-bold sm:hidden">↓</div>

          <div className="p-3 rounded-md bg-slate-950 border border-slate-800 text-center flex-1 w-full sm:w-auto">
            <span className="text-[10px] text-blue-400 font-bold block mb-1">STAGE 2</span>
            <div className="font-semibold text-white">SHA-256 Computed</div>
            <span className="text-[10px] text-slate-500">256-bit Cryptographic Hash</span>
          </div>

          <div className="text-slate-600 font-bold hidden sm:block">→</div>
          <div className="text-slate-600 font-bold sm:hidden">↓</div>

          <div className="p-3 rounded-md bg-slate-950 border border-slate-800 text-center flex-1 w-full sm:w-auto">
            <span className="text-[10px] text-blue-400 font-bold block mb-1">STAGE 3</span>
            <div className="font-semibold text-white">Timestamp Anchored</div>
            <span className="text-[10px] text-slate-500">Pre-Disaster Proof</span>
          </div>

          <div className="text-slate-600 font-bold hidden sm:block">→</div>
          <div className="text-slate-600 font-bold sm:hidden">↓</div>

          <div className="p-3 rounded-md bg-slate-950 border border-slate-800 text-center flex-1 w-full sm:w-auto">
            <span className="text-[10px] text-blue-400 font-bold block mb-1">STAGE 4</span>
            <div className="font-semibold text-white">Attestation Recorded</div>
            <span className="text-[10px] text-slate-500">Community Corroboration</span>
          </div>

          <div className="text-slate-600 font-bold hidden sm:block">→</div>
          <div className="text-slate-600 font-bold sm:hidden">↓</div>

          <div className="p-3 rounded-md bg-slate-950 border border-slate-800 text-center flex-1 w-full sm:w-auto">
            <span className="text-[10px] text-emerald-400 font-bold block mb-1">STAGE 5</span>
            <div className="font-semibold text-white">Dossier Sealed</div>
            <span className="text-[10px] text-slate-400">Authority Disposition</span>
          </div>

        </div>

        <div className="text-[11px] text-slate-400 font-mono bg-slate-950 p-3 rounded-md border border-slate-800">
          ℹ️ <strong>System Architecture Note:</strong> Prototype simulated blockchain ledger utilizing SHA-256 hash pointers. No public cryptocurrency gas tokens or speculation mechanisms are involved.
        </div>
      </div>

      {/* Block Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search Tx Hash, Evidence ID, or Parcel..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-md pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
          />
        </div>

        <span className="text-xs font-mono text-slate-400 self-start sm:self-auto">
          Showing {filteredBlocks.length} Confirmed Blocks
        </span>
      </div>

      {/* Blockchain Blocks List */}
      <div className="space-y-3">
        {filteredBlocks.map((block) => (
          <div
            key={block.txHash}
            className="gov-card p-5 space-y-3 hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono font-bold">
                  Block #{block.blockHeight}
                </span>
                <span className="text-xs font-mono text-white font-bold">
                  {block.eventType.replace(/_/g, ' ')}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {block.status}
                </span>
              </div>

              <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{formatTimestamp(block.timestamp)}</span>
              </div>
            </div>

            {/* Block Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Evidence ID</span>
                <span className="text-blue-400 font-bold">{block.evidenceId}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Linked Parcel ID</span>
                <span className="text-slate-200">{block.propertyId}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Validator Node</span>
                <span className="text-slate-400">{block.validatorNode}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Transaction Hash</span>
                <span className="text-slate-300">{truncateHash(block.txHash, 6, 6)}</span>
              </div>
            </div>

            {/* Hash Pointer Chain */}
            <div className="p-3 rounded-md bg-slate-950 border border-slate-800/80 space-y-1 text-[11px] font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-slate-400">
                <span>PREVIOUS BLOCK HASH:</span>
                <span className="text-slate-400 break-all">{block.previousHash}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-slate-200 pt-1 border-t border-slate-900">
                <span className="text-blue-400 font-bold">CURRENT BLOCK HASH:</span>
                <span className="text-white font-bold break-all">{block.currentHash}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
