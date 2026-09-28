import React, { useState } from 'react';
import { Users, CheckCircle2, X, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CommunityAttestation } from '../../types/property';

interface Props {
  propertyId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CommunityAttestationModal: React.FC<Props> = ({ propertyId, isOpen, onClose }) => {
  const { addAttestation, properties } = useApp();
  const property = properties.find(p => p.id === propertyId);

  const [attesterName, setAttesterName] = useState('');
  const [role, setRole] = useState<CommunityAttestation['role']>('Neighbor');
  const [statement, setStatement] = useState('');
  const [location, setLocation] = useState(`${property?.village || 'Sirsi Rural'}, North Boundary`);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attesterName.trim() || !statement.trim()) {
      alert('Please fill out attester name and sworn statement.');
      return;
    }

    addAttestation({
      propertyId,
      attesterName,
      role,
      statement,
      location,
    });

    onClose();
  };

  const handlePreFill = () => {
    setAttesterName('Suresh Kumar Hegde');
    setRole('Neighbor');
    setStatement(`I own the adjoining property on Survey 124/2. I confirm that ${property?.recordedOwner || 'the owner'} has continuously occupied and cultivated this property before the disaster.`);
    setLocation(`${property?.village || 'Sirsi Rural'}, North Boundary`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg bg-navy-900 border border-purple-500/40 rounded-2xl shadow-glass p-6 space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-display">
                Record Community Attestation
              </h3>
              <p className="text-[11px] text-slate-400">
                Supporting corroboration for {propertyId}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          
          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Attester Full Name *
            </label>
            <input
              type="text"
              required
              value={attesterName}
              onChange={e => setAttesterName(e.target.value)}
              placeholder="e.g. Suresh Kumar Hegde"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Role / Relationship *
              </label>
              <select
                value={role}
                onChange={e => setRole(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400"
              >
                <option value="Neighbor">Neighbor</option>
                <option value="Community Representative">Community Representative</option>
                <option value="Field Worker">Field Worker / Revenue Assistant</option>
                <option value="Authorized Officer">Authorized Officer</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Attester Location / Boundary
              </label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. Adjoining North Boundary"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Corroborating Statement *
            </label>
            <textarea
              required
              rows={3}
              value={statement}
              onChange={e => setStatement(e.target.value)}
              placeholder="Describe pre-disaster possession, cultivation, or occupancy..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          {/* Legal Reminder (Requirement #10) */}
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 leading-relaxed font-mono">
            ⚠️ <strong>Legal Note:</strong> Community attestation is supporting evidence only and does not establish legal ownership.
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handlePreFill}
              className="text-purple-400 hover:underline text-[11px]"
            >
              Fill Sample Attestation
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Save to Ledger</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
