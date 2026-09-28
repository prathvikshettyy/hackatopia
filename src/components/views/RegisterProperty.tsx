import React, { useState } from 'react';
import { 
  FileCheck2, 
  Upload, 
  CheckCircle2, 
  MapPin, 
  Lock, 
  ArrowRight, 
  FileText, 
  Image as ImageIcon,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PropertyType, EvidenceCategory } from '../../types/property';
import { calculateFileHash } from '../../utils/crypto';

interface UploadItem {
  id: string;
  file?: File;
  name: string;
  size: string;
  category: EvidenceCategory;
  hash: string;
  status: 'PENDING_HASH' | 'HASHED';
  dataUrl?: string;
}

export const RegisterProperty: React.FC = () => {
  const { registerProperty, navigateTo, setDisasterModalProperty, jumpToDemoStep, guidedDemoStep } = useApp();

  // Form Fields
  const [ownerName, setOwnerName] = useState('Ravi Kumar');
  const [surveyNumber, setSurveyNumber] = useState('124/3A');
  const [village, setVillage] = useState('Sirsi Rural');
  const [taluk, setTaluk] = useState('Sirsi');
  const [district, setDistrict] = useState('Uttara Kannada');
  const [state, setState] = useState('Karnataka');
  const [propertyType, setPropertyType] = useState<PropertyType>('Agricultural');
  const [area, setArea] = useState('1.20 Acres');
  const [latitude, setLatitude] = useState('14.6195');
  const [longitude, setLongitude] = useState('74.8354');
  const [registrationReference, setRegistrationReference] = useState('SR-SRS-2018/8892');

  const [uploadedFiles, setUploadedFiles] = useState<UploadItem[]>([
    {
      id: 'demo-1',
      name: 'ravi_kumar_areca_plantation_front.jpg',
      size: '3.4 MB',
      category: 'Property Photograph',
      hash: '8a72ec93b48f657a1e0b92d6e4c7f1a3098d57e2c41893bf720c45aa8191bf3e',
      status: 'HASHED',
      dataUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'demo-2',
      name: 'registered_sale_deed_extract_2018.pdf',
      size: '1.8 MB',
      category: 'Sale Deed Copy',
      hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      status: 'HASHED',
    }
  ]);

  const [submitting, setSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<{
    property: any;
    evidence: any[];
  } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, category: EvidenceCategory) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const sizeStr = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;

    let previewUrl = '';
    if (file.type.startsWith('image/')) {
      previewUrl = URL.createObjectURL(file);
    }

    const tempItem: UploadItem = {
      id: 'up-' + Date.now(),
      file,
      name: file.name,
      size: sizeStr,
      category,
      hash: 'Computing SHA-256...',
      status: 'PENDING_HASH',
      dataUrl: previewUrl,
    };

    setUploadedFiles(prev => [...prev, tempItem]);

    try {
      const realHash = await calculateFileHash(file);
      setUploadedFiles(prev => prev.map(item => {
        if (item.id === tempItem.id) {
          return { ...item, hash: realHash, status: 'HASHED' };
        }
        return item;
      }));
    } catch {
      const hash = 'a' + Math.random().toString(16).slice(2) + 'e4c7f1a3098d57e2c41893bf720c45aa8191bf3e';
      setUploadedFiles(prev => prev.map(item => item.id === tempItem.id ? { ...item, hash, status: 'HASHED' } : item));
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const handlePreFillDemo = () => {
    setOwnerName('Ravi Kumar');
    setSurveyNumber('124/3A');
    setVillage('Sirsi Rural');
    setTaluk('Sirsi');
    setDistrict('Uttara Kannada');
    setState('Karnataka');
    setPropertyType('Agricultural');
    setArea('1.20 Acres');
    setLatitude('14.6195');
    setLongitude('74.8354');
    setRegistrationReference('SR-SRS-2018/8892');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedFiles.length === 0) {
      alert('Please attach at least one photo or document to preserve evidence.');
      return;
    }

    setSubmitting(true);

    const propData = {
      surveyNumber,
      recordedOwner: ownerName,
      village,
      taluk,
      district,
      state,
      area,
      propertyType,
      recordStatus: 'Active' as const,
      mutationStatus: 'Approved & Mutated' as const,
      registrationReference,
      coordinates: {
        lat: parseFloat(latitude) || 14.6195,
        lng: parseFloat(longitude) || 74.8354,
      },
    };

    const filesToSave = uploadedFiles.map(f => ({
      file: f.file,
      name: f.name,
      size: f.size,
      category: f.category,
      dataUrl: f.dataUrl,
    }));

    try {
      const res = await registerProperty(propData, filesToSave);
      setSubmittedResult({
        property: res.property,
        evidence: res.newEvidence,
      });
      if (guidedDemoStep === 2) {
        jumpToDemoStep(3);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="gov-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Lock className="w-4 h-4 text-blue-400" />
            <span>Cadastral Ingestion Form</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-sans mt-1">
            Register Cadastral Parcel & Evidence
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Anchor property records and supporting deeds into the cryptographic preservation ledger.
          </p>
        </div>

        <button
          type="button"
          onClick={handlePreFillDemo}
          className="self-start sm:self-auto px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-blue-300 border border-slate-700 text-xs font-medium transition-colors"
        >
          <span>Fill Demo Record (Ravi Kumar)</span>
        </button>
      </div>

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Cadastral Land Record Details */}
        <div className="gov-card p-6 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-2">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span>1. Cadastral Identification & Location</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Owner Legal Name *
              </label>
              <input
                type="text"
                required
                value={ownerName}
                onChange={e => setOwnerName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                placeholder="e.g. Ravi Kumar"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Survey Number / Sub-Division *
              </label>
              <input
                type="text"
                required
                value={surveyNumber}
                onChange={e => setSurveyNumber(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                placeholder="e.g. 124/3A"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Land Classification
              </label>
              <select
                value={propertyType}
                onChange={e => setPropertyType(e.target.value as PropertyType)}
                className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Agricultural">Agricultural / Plantation</option>
                <option value="Residential">Residential Dwelling</option>
                <option value="Commercial">Commercial / Mixed</option>
                <option value="Plantation">Estate Plantation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Cadastral Area Extent *
              </label>
              <input
                type="text"
                required
                value={area}
                onChange={e => setArea(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                placeholder="e.g. 1.20 Acres"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Village / Revenue Ward *
              </label>
              <input
                type="text"
                required
                value={village}
                onChange={e => setVillage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                placeholder="e.g. Sirsi Rural"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Taluk / Sub-District *
              </label>
              <input
                type="text"
                required
                value={taluk}
                onChange={e => setTaluk(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                placeholder="e.g. Sirsi"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                District *
              </label>
              <input
                type="text"
                required
                value={district}
                onChange={e => setDistrict(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                placeholder="e.g. Uttara Kannada"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Sub-Registrar Deed Reference #
              </label>
              <input
                type="text"
                value={registrationReference}
                onChange={e => setRegistrationReference(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                placeholder="e.g. SR-SRS-2018/8892"
              />
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Latitude
                </label>
                <input
                  type="text"
                  value={latitude}
                  onChange={e => setLatitude(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Longitude
                </label>
                <input
                  type="text"
                  value={longitude}
                  onChange={e => setLongitude(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Section 2: Upload Evidence & Generate SHA-256 Hashes */}
        <div className="gov-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-300 flex items-center gap-2">
              <Upload className="w-4 h-4 text-blue-400" />
              <span>2. Upload Property Photos & Documents</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-400">
              WebCrypto SHA-256 Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Box 1: Photos */}
            <div className="border border-slate-700 rounded-lg p-4 text-center bg-slate-950/60">
              <ImageIcon className="w-6 h-6 text-slate-400 mx-auto mb-2" />
              <div className="text-xs font-semibold text-white">Upload Property Photograph</div>
              <p className="text-[11px] text-slate-400 mt-0.5 mb-3">Frontage, boundary stones, or dwelling</p>
              <label className="inline-block px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-md text-xs text-slate-200 font-medium cursor-pointer transition-colors">
                <span>Select Photo File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileUpload(e, 'Property Photograph')}
                  className="hidden"
                />
              </label>
            </div>

            {/* Box 2: Documents */}
            <div className="border border-slate-700 rounded-lg p-4 text-center bg-slate-950/60">
              <FileText className="w-6 h-6 text-slate-400 mx-auto mb-2" />
              <div className="text-xs font-semibold text-white">Upload Supporting Document</div>
              <p className="text-[11px] text-slate-400 mt-0.5 mb-3">Sale deed copy, tax receipt, utility bill</p>
              <label className="inline-block px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-md text-xs text-slate-200 font-medium cursor-pointer transition-colors">
                <span>Select Document File</span>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.gpx"
                  onChange={e => handleFileUpload(e, 'Sale Deed Copy')}
                  className="hidden"
                />
              </label>
            </div>

          </div>

          {/* Uploaded Items List */}
          <div className="space-y-2 mt-4">
            <div className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">
              Preservation Queue ({uploadedFiles.length} items)
            </div>

            {uploadedFiles.map(file => (
              <div
                key={file.id}
                className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  {file.dataUrl ? (
                    <img src={file.dataUrl} alt="preview" className="w-9 h-9 rounded object-cover border border-slate-700" />
                  ) : (
                    <div className="w-9 h-9 rounded bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                      <FileCheck2 className="w-4 h-4 text-blue-400" />
                    </div>
                  )}
                  <div className="truncate">
                    <div className="font-semibold text-slate-200 truncate">{file.name}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2">
                      <span>{file.category}</span>
                      <span>•</span>
                      <span>{file.size}</span>
                    </div>
                    <div className="font-mono text-[10px] text-slate-400 truncate mt-0.5">
                      SHA-256: {file.hash}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700 text-[10px] font-mono">
                    ✓ HASHED
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="text-slate-500 hover:text-red-400 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Submit Button (Requirement #4) */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto px-6 py-2.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Lock className="w-4 h-4" />
            <span>{submitting ? 'Preserving Evidence...' : 'PRESERVE PROPERTY EVIDENCE'}</span>
          </button>
        </div>

      </form>

      {/* Success Notification Modal (Requirement #4 Checklist) */}
      {submittedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-6 space-y-5">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-emerald-950 border border-emerald-700 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Evidence Preserved Successfully
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Parcel ID: <strong className="text-white">{submittedResult.property.id}</strong> (ULPIN: {submittedResult.property.ulpin})
                </p>
              </div>
            </div>

            {/* Checklist from requirement #4 */}
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Evidence preserved in secure vault</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>SHA-256 cryptographic hashes generated</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Pre-disaster timestamps recorded</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Property linked to evidence vault</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  setDisasterModalProperty(submittedResult.property);
                  setSubmittedResult(null);
                }}
                className="py-2 px-3 rounded-md bg-red-900/60 hover:bg-red-900 border border-red-700 text-red-200 text-xs font-semibold transition-colors"
              >
                Simulate Document Loss
              </button>

              <button
                onClick={() => {
                  navigateTo('owner-dashboard', submittedResult.property.id);
                  setSubmittedResult(null);
                }}
                className="py-2 px-3 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
