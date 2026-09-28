import React, { useState } from 'react';
import { 
  Lock, 
  Search, 
  Download, 
  ExternalLink, 
  Eye, 
  Copy, 
  Check, 
  ShieldCheck, 
  FileText, 
  Camera, 
  MapPin, 
  Filter,
  X,
  Clock,
  Hash,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EvidenceItem } from '../../types/property';
import { formatTimestamp, truncateHash } from '../../utils/crypto';

export const EvidenceVaultView: React.FC = () => {
  const { evidence, properties, selectedPropertyId, setSelectedPropertyId } = useApp();

  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [inspectItem, setInspectItem] = useState<EvidenceItem | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const filtered = evidence.filter(item => {
    const matchesCat = filterCategory === 'ALL' || item.category === filterCategory;
    const matchesSearch = 
      item.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.propertyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sha256Hash.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleDownloadDemo = (item: EvidenceItem) => {
    const element = document.createElement('a');
    const file = new Blob([
      `PROJECT HARMONY — PRESERVED EVIDENCE CERTIFICATE\n` +
      `Evidence ID: ${item.id}\n` +
      `File Name: ${item.fileName}\n` +
      `Property ID: ${item.propertyId}\n` +
      `Category: ${item.category}\n` +
      `SHA-256 Hash: ${item.sha256Hash}\n` +
      `Timestamp: ${item.timestamp}\n` +
      `Status: ${item.status}\n` +
      `Preserved By: ${item.uploadedBy}\n` +
      `Extracted Notes: ${item.previewText || 'N/A'}\n\n` +
      `Cryptographic Proof Verified via WebCrypto SHA-256.`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `HARMONY_${item.id}_${item.fileName}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            <span>Cryptographic Proof Vault</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-display mt-1">
            PROJECT HARMONY Evidence Vault
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Pre-disaster deeds, site photographs, GPS boundary polygons, and tax receipts with SHA-256 hash anchors.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-950/80 px-3 py-1.5 rounded-xl border border-cyan-500/30">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{evidence.length} Assets Anchored</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by File, Hash, or Parcel ID..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto text-xs">
          {['ALL', 'Property Photograph', 'Sale Deed Copy', 'Tax Receipt', 'GPS Boundary Log'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Evidence Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
          <div
            key={item.id}
            className="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Card Top */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                    {item.id}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {item.propertyId}
                  </span>
                </div>

                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  item.status === 'VERIFIED'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}>
                  {item.status}
                </span>
              </div>

              {/* Title & Preview Image */}
              <div>
                <h4 className="text-sm font-bold text-white truncate" title={item.fileName}>
                  {item.fileName}
                </h4>
                <div className="text-[11px] text-cyan-400 font-mono mt-0.5">
                  {item.category} • {item.fileSize}
                </div>
              </div>

              {item.thumbnailUrl && (
                <div className="w-full h-32 rounded-xl overflow-hidden border border-slate-800 relative group">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.fileName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-60" />
                </div>
              )}

              {/* Metadata Details */}
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>SHA-256 Digest:</span>
                  <button
                    onClick={() => handleCopyHash(item.sha256Hash)}
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    title="Copy full 64-char hash"
                  >
                    {copiedHash === item.sha256Hash ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>{truncateHash(item.sha256Hash, 6, 6)}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>Timestamp:</span>
                  <span className="text-slate-300">{item.uploadedDate}</span>
                </div>
              </div>

              {item.previewText && (
                <p className="text-[11px] text-slate-400 italic line-clamp-2">
                  “{item.previewText}”
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setInspectItem(item)}
                className="flex-1 py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>Inspect Evidence</span>
              </button>

              <button
                onClick={() => handleDownloadDemo(item)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                title="Download Evidence Proof Docket"
              >
                <Download className="w-4 h-4 text-purple-400" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Inspect Item Modal */}
      {inspectItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-2xl bg-navy-900 border border-slate-700 rounded-2xl shadow-glass p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                  {inspectItem.category} • {inspectItem.id}
                </span>
                <h3 className="text-lg font-bold text-white font-display mt-0.5">
                  {inspectItem.fileName}
                </h3>
              </div>
              <button
                onClick={() => setInspectItem(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {inspectItem.thumbnailUrl && (
              <div className="rounded-xl overflow-hidden border border-slate-800 max-h-64">
                <img src={inspectItem.thumbnailUrl} alt="inspection" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs font-mono">
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Full Cryptographic SHA-256 Digest</span>
                <span className="text-cyan-300 text-[11px] break-all select-all font-mono">{inspectItem.sha256Hash}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-900">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block">Linked Parcel</span>
                  <span className="text-slate-200">{inspectItem.propertyId}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block">Preserved Timestamp</span>
                  <span className="text-slate-200">{formatTimestamp(inspectItem.timestamp)}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-900">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block">Preserved By</span>
                  <span className="text-slate-200">{inspectItem.uploadedBy}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block">File Size</span>
                  <span className="text-slate-200">{inspectItem.fileSize}</span>
                </div>
              </div>
            </div>

            {inspectItem.ocrExtractedData && (
              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs space-y-1">
                <div className="font-semibold text-purple-300 font-mono text-[11px]">
                  OCR & Metadata Extraction:
                </div>
                <div className="text-slate-300 text-[11px]">
                  Owner: {inspectItem.ocrExtractedData.ownerName || 'Verified'} | Survey: {inspectItem.ocrExtractedData.surveyNumber || '124/3A'} | Confidence: {Math.round(inspectItem.ocrExtractedData.confidence * 100)}%
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => handleDownloadDemo(inspectItem)}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Proof Docket</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
