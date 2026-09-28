import React, { useState } from 'react';
import { 
  Lock, 
  Search, 
  Download, 
  Eye, 
  Copy, 
  Check, 
  ShieldCheck, 
  X,
  FileCheck2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EvidenceItem } from '../../types/property';
import { formatTimestamp, truncateHash } from '../../utils/crypto';

export const EvidenceVaultView: React.FC = () => {
  const { evidence } = useApp();

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
      `PROJECT HARMONY — CADASTRAL EVIDENCE CERTIFICATE\n` +
      `Evidence ID: ${item.id}\n` +
      `File Name: ${item.fileName}\n` +
      `Property ID: ${item.propertyId}\n` +
      `Category: ${item.category}\n` +
      `SHA-256 Digest: ${item.sha256Hash}\n` +
      `Timestamp: ${item.timestamp}\n` +
      `Status: ${item.status}\n` +
      `Recorded By: ${item.uploadedBy}\n` +
      `Cadastral Notes: ${item.previewText || 'N/A'}\n\n` +
      `Cryptographic Integrity Verified via WebCrypto SHA-256 Standard.`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `HARMONY_CERTIFICATE_${item.id}_${item.fileName}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="gov-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Lock className="w-4 h-4 text-blue-400" />
            <span>Digital Evidence Vault</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-sans mt-1">
            Cadastral Evidence Vault
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Immutable archive of pre-disaster deeds, ground photographs, and GPS cadastral boundary records.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-200 bg-slate-950 px-3 py-1.5 rounded-md border border-slate-800">
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
            placeholder="Search by File, Hash, or Parcel..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-md pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto text-xs">
          {['ALL', 'Property Photograph', 'Sale Deed Copy', 'Tax Receipt', 'GPS Boundary Log'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white'
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
            className="gov-card p-5 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-blue-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {item.id}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {item.propertyId}
                  </span>
                </div>

                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  item.status === 'VERIFIED'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-red-950 text-red-300 border border-red-800'
                }`}>
                  {item.status}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white truncate" title={item.fileName}>
                  {item.fileName}
                </h4>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  {item.category} • {item.fileSize}
                </div>
              </div>

              {item.thumbnailUrl && (
                <div className="w-full h-32 rounded-md overflow-hidden border border-slate-800">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.fileName}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Hash and Timestamp */}
              <div className="p-2.5 rounded-md bg-slate-950 border border-slate-800 space-y-1 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>SHA-256 Digest:</span>
                  <button
                    onClick={() => handleCopyHash(item.sha256Hash)}
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
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
                className="flex-1 py-1.5 px-3 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
              >
                <Eye className="w-3.5 h-3.5 text-blue-400" />
                <span>Inspect Evidence</span>
              </button>

              <button
                onClick={() => handleDownloadDemo(item)}
                className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                title="Download Proof Certificate"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Inspection Modal */}
      {inspectItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  {inspectItem.category} • {inspectItem.id}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
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
              <div className="rounded-md overflow-hidden border border-slate-800 max-h-64">
                <img src={inspectItem.thumbnailUrl} alt="inspection" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="p-4 rounded-md bg-slate-950 border border-slate-800 space-y-2.5 text-xs font-mono">
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Cryptographic SHA-256 Digest</span>
                <span className="text-slate-200 text-[11px] break-all select-all font-mono">{inspectItem.sha256Hash}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-900">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block">Linked Parcel ID</span>
                  <span className="text-white font-bold">{inspectItem.propertyId}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block">Preserved Timestamp</span>
                  <span className="text-slate-300">{formatTimestamp(inspectItem.timestamp)}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-900">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block">Recorded By</span>
                  <span className="text-slate-300">{inspectItem.uploadedBy}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block">File Extent</span>
                  <span className="text-slate-300">{inspectItem.fileSize}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => handleDownloadDemo(inspectItem)}
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Proof Certificate</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
