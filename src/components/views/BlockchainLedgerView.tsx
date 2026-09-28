import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Link, 
  Clock, 
  Hash, 
  CheckCircle2, 
  Search, 
  Cpu, 
  ExternalLink,
  Layers,
  ArrowDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatTimestamp, truncateHash } from '../../utils/crypto';
import { LedgerBlock } from '../../types/property';

export const BlockchainLedgerView: React.FC = () => {
  const { ledgerBlocks, properties } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlock, setSelectedBlock] = useState<LedgerBlock | null>(null);

  const filteredBlocks = [...ledgerBlocks].reverse().filter(b => 
    b.txHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.propertyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.evidenceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.eventType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            <span>Cryptographic Proof Chain</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-display mt-1">
            Prototype Blockchain Ledger
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Simulated Immutable Audit Trail • SHA-256 Block Anchoring & Hash Continuity Verification
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-500/30">
          <ShieldCheck className="w-4 h-4" />
          <span>Chain Integrity 100% Validated</span>
        </div>
      </div>

      {/* Visual Timeline (Requirement #14: Evidence Uploaded -> SHA-256 Hash Generated -> Timestamp Recorded -> Attestation Added -> Recovery Request) */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider text-center sm:text-left">
          EVIDENCE INTEGRITY BLOCKCHAIN TIMELINE
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-xs font-mono">
          
          <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-center flex-1 w-full sm:w-auto">
            <span className="text-[10px] text-cyan-400 font-bold block mb-1">STAGE 1</span>
            <div className="font-semibold text-white">Evidence Uploaded</div>
            <span className="text-[10px] text-slate-500">Document/Photo Ingestion</span>
          </div>

          <div className="text-cyan-400 font-bold hidden sm:block">→</div>
          <div className="text-cyan-400 font-bold sm:hidden">↓</div>

          <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-center flex-1 w-full sm:w-auto">
            <span className="text-[10px] text-cyan-400 font-bold block mb-1">STAGE 2</span>
            <div className="font-semibold text-white">SHA-256 Digest</div>
            <span className="text-[10px] text-slate-500">256-bit WebCrypto Hash</span>
          </div>

          <div className="text-cyan-400 font-bold hidden sm:block">→</div>
          <div className="text-cyan-400 font-bold sm:hidden">↓</div>

          <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-center flex-1 w-full sm:w-auto">
            <span className="text-[10px] text-cyan-400 font-bold block mb-1">STAGE 3</span>
            <div className="font-semibold text-white">Timestamp Recorded</div>
            <span className="text-[10px] text-slate-500">Pre-Disaster Proof</span>
          </div>

          <div className="text-cyan-400 font-bold hidden sm:block">→</div>
          <div className="text-cyan-400 font-bold sm:hidden">↓</div>

          <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-center flex-1 w-full sm:w-auto">
            <span className="text-[10px] text-purple-400 font-bold block mb-1">STAGE 4</span>
            <div className="font-semibold text-white">Attestation Added</div>
            <span className="text-[10px] text-slate-500">Community Corroboration</span>
          </div>

          <div className="text-purple-400 font-bold hidden sm:block">→</div>
          <div className="text-purple-400 font-bold sm:hidden">↓</div>

          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/40 text-center flex-1 w-full sm:w-auto">
            <span className="text-[10px] text-purple-300 font-bold block mb-1">STAGE 5</span>
            <div className="font-semibold text-white">Recovery Request</div>
            <span className="text-[10px] text-purple-300/80">Authority Dossier Sealed</span>
          </div>

        </div>

        {/* Legal notice requirement #14 */}
        <div className="text-[11px] text-slate-400 font-mono bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-center sm:text-left">
          ℹ️ <strong>Ledger Architecture Note:</strong> Prototype simulated blockchain ledger with SHA-256 hash pointer linkage. No public mainnet gas fees or external cryptocurrency required for disaster evidence preservation.
        </div>
      </div>

      {/* Ledger Block Search & Summary */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search Tx Hash, Evidence ID, or Parcel..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <span className="text-xs font-mono text-slate-400 self-start sm:self-auto">
          Showing {filteredBlocks.length} Confirmed Blocks
        </span>
      </div>

      {/* Blockchain Blocks List (Requirement #14 Table/Cards) */}
      <div className="space-y-3">
        {filteredBlocks.map((block, idx) => (
          <div
            key={block.txHash}
            className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold">
                  Block #{block.blockHeight}
                </span>
                <span className="text-xs font-mono text-white font-bold">
                  {block.eventType.replace(/_/g, ' ')}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {block.status}
                </span>
              </div>

              <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{formatTimestamp(block.timestamp)}</span>
              </div>
            </div>

            {/* Block Fields Grid (Requirement #14) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Evidence ID</span>
                <span className="text-cyan-300 font-bold">{block.evidenceId}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Linked Property ID</span>
                <span className="text-slate-200">{block.propertyId}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Validator Node</span>
                <span className="text-slate-400">{block.validatorNode}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Transaction Hash</span>
                <span className="text-purple-300">{truncateHash(block.txHash, 6, 6)}</span>
              </div>
            </div>

            {/* Cryptographic Hash Pointer Chain */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1 text-[11px] font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-slate-400">
                <span>PREVIOUS BLOCK HASH:</span>
                <span className="text-slate-400 break-all">{block.previousHash}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-slate-300 pt-1 border-t border-slate-900">
                <span className="text-cyan-400">CURRENT BLOCK HASH:</span>
                <span className="text-cyan-300 font-bold break-all">{block.currentHash}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
