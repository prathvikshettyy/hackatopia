import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  Property, 
  EvidenceItem, 
  CommunityAttestation, 
  RecoveryCase, 
  LedgerBlock,
  EvidenceCategory
} from '../types/property';
import { 
  INITIAL_PROPERTIES, 
  INITIAL_EVIDENCE, 
  INITIAL_ATTESTATIONS, 
  INITIAL_RECOVERY_CASES, 
  INITIAL_LEDGER_BLOCKS 
} from '../data/mockData';
import { calculateFileHash, generateMockHash } from '../utils/crypto';

export type AppView = 
  | 'landing'
  | 'owner-dashboard'
  | 'register-property'
  | 'property-recovery'
  | 'evidence-vault'
  | 'authority-dashboard'
  | 'admin-dashboard'
  | 'map-view'
  | 'blockchain-ledger'
  | 'verification';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  properties: Property[];
  evidence: EvidenceItem[];
  attestations: CommunityAttestation[];
  recoveryCases: RecoveryCase[];
  ledgerBlocks: LedgerBlock[];
  selectedPropertyId: string;
  setSelectedPropertyId: (id: string) => void;
  selectedCaseId: string;
  setSelectedCaseId: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  disasterModalProperty: Property | null;
  setDisasterModalProperty: (prop: Property | null) => void;
  guidedDemoStep: number;
  setGuidedDemoStep: (step: number) => void;
  demoGuideOpen: boolean;
  setDemoGuideOpen: (open: boolean) => void;
  
  // Handlers
  navigateTo: (view: AppView, propId?: string, caseId?: string) => void;
  registerProperty: (
    newProp: Omit<Property, 'id' | 'ulpin' | 'evidenceIds' | 'registeredDate'>,
    files: Array<{ file?: File; name: string; size: string; category: EvidenceCategory; dataUrl?: string }>
  ) => Promise<{ property: Property; newEvidence: EvidenceItem[] }>;
  simulateDocumentLoss: (propertyId: string) => void;
  addAttestation: (data: {
    propertyId: string;
    attesterName: string;
    role: CommunityAttestation['role'];
    statement: string;
    location: string;
  }) => void;
  updateCaseStatus: (caseId: string, status: RecoveryCase['reviewStatus'], remarks?: string) => void;
  generateCasePackage: (caseId: string) => void;
  resetDemoData: () => void;
  nextDemoStep: () => void;
  jumpToDemoStep: (step: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem('harmony_role') as UserRole) || 'OWNER';
  });
  
  const [currentView, setCurrentViewState] = useState<AppView>(() => {
    return (localStorage.getItem('harmony_view') as AppView) || 'landing';
  });

  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('harmony_properties');
    return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
  });

  const [evidence, setEvidence] = useState<EvidenceItem[]>(() => {
    const saved = localStorage.getItem('harmony_evidence');
    return saved ? JSON.parse(saved) : INITIAL_EVIDENCE;
  });

  const [attestations, setAttestations] = useState<CommunityAttestation[]>(() => {
    const saved = localStorage.getItem('harmony_attestations');
    return saved ? JSON.parse(saved) : INITIAL_ATTESTATIONS;
  });

  const [recoveryCases, setRecoveryCases] = useState<RecoveryCase[]>(() => {
    const saved = localStorage.getItem('harmony_cases');
    return saved ? JSON.parse(saved) : INITIAL_RECOVERY_CASES;
  });

  const [ledgerBlocks, setLedgerBlocks] = useState<LedgerBlock[]>(() => {
    const saved = localStorage.getItem('harmony_ledger');
    return saved ? JSON.parse(saved) : INITIAL_LEDGER_BLOCKS;
  });

  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('KA-SIR-10234');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('REC-2026-081');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [disasterModalProperty, setDisasterModalProperty] = useState<Property | null>(null);
  
  // Guided Demo Tour (0: off, 1-14: specific demo steps)
  const [guidedDemoStep, setGuidedDemoStep] = useState<number>(0);
  const [demoGuideOpen, setDemoGuideOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('harmony_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('harmony_view', currentView);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem('harmony_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('harmony_evidence', JSON.stringify(evidence));
  }, [evidence]);

  useEffect(() => {
    localStorage.setItem('harmony_attestations', JSON.stringify(attestations));
  }, [attestations]);

  useEffect(() => {
    localStorage.setItem('harmony_cases', JSON.stringify(recoveryCases));
  }, [recoveryCases]);

  useEffect(() => {
    localStorage.setItem('harmony_ledger', JSON.stringify(ledgerBlocks));
  }, [ledgerBlocks]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === 'OWNER') {
      setCurrentViewState('owner-dashboard');
    } else if (newRole === 'AUTHORITY') {
      setCurrentViewState('authority-dashboard');
    } else if (newRole === 'ADMIN') {
      setCurrentViewState('admin-dashboard');
    }
  };

  const setCurrentView = (view: AppView) => {
    setCurrentViewState(view);
  };

  const navigateTo = (view: AppView, propId?: string, caseId?: string) => {
    if (propId) setSelectedPropertyId(propId);
    if (caseId) setSelectedCaseId(caseId);
    setCurrentViewState(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const registerProperty = async (
    newProp: Omit<Property, 'id' | 'ulpin' | 'evidenceIds' | 'registeredDate'>,
    uploadedFiles: Array<{ file?: File; name: string; size: string; category: EvidenceCategory; dataUrl?: string }>
  ) => {
    // Generate IDs
    const districtCode = (newProp.district || 'KA').slice(0, 3).toUpperCase();
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newPropId = `KA-${districtCode}-${randomSuffix}`;
    const newUlpin = `ULPIN-29-${Math.floor(10 + Math.random() * 89)}-${randomSuffix}`;
    const registeredDate = new Date().toISOString();

    const newEvidenceItems: EvidenceItem[] = [];
    const newBlocks: LedgerBlock[] = [];
    let prevHash = ledgerBlocks[ledgerBlocks.length - 1]?.currentHash || generateMockHash('genesis');

    for (let i = 0; i < uploadedFiles.length; i++) {
      const item = uploadedFiles[i];
      let hash = '';
      if (item.file) {
        try {
          hash = await calculateFileHash(item.file);
        } catch {
          hash = generateMockHash(item.name + Date.now());
        }
      } else {
        hash = generateMockHash(item.name + Date.now());
      }

      const evId = `EV-${randomSuffix}-${String(i + 1).padStart(2, '0')}`;
      const nowIso = new Date().toISOString();

      const evItem: EvidenceItem = {
        id: evId,
        propertyId: newPropId,
        fileName: item.name,
        category: item.category,
        fileSize: item.size || '1.8 MB',
        uploadedDate: nowIso.slice(0, 10),
        timestamp: nowIso,
        sha256Hash: hash,
        status: 'VERIFIED',
        uploadedBy: `${newProp.recordedOwner} (Owner)`,
        thumbnailUrl: item.dataUrl || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80',
        previewText: `Preserved digital document for Survey ${newProp.surveyNumber}, ${newProp.village}.`,
        ocrExtractedData: {
          ownerName: newProp.recordedOwner,
          surveyNumber: newProp.surveyNumber,
          propertyType: newProp.propertyType,
          extractedDate: nowIso.slice(0, 10),
          confidence: 0.95,
        },
      };

      newEvidenceItems.push(evItem);

      // Ledger block
      const curHash = generateMockHash(prevHash + hash + nowIso);
      const block: LedgerBlock = {
        blockHeight: (ledgerBlocks[ledgerBlocks.length - 1]?.blockHeight || 1000) + i + 1,
        txHash: '0x' + generateMockHash(curHash).slice(0, 64),
        evidenceId: evId,
        propertyId: newPropId,
        eventType: i === 0 ? 'EVIDENCE_UPLOAD' : 'HASH_ANCHOR',
        timestamp: nowIso,
        previousHash: prevHash,
        currentHash: curHash,
        status: 'CONFIRMED',
        validatorNode: 'Node-Sirsi-Govt-01',
      };
      newBlocks.push(block);
      prevHash = curHash;
    }

    const createdProperty: Property = {
      ...newProp,
      id: newPropId,
      ulpin: newUlpin,
      registeredDate,
      evidenceIds: newEvidenceItems.map(e => e.id),
      disasterAffected: false,
      lossSimulated: false,
    };

    // Auto-create recovery case
    const caseId = `REC-2026-${Math.floor(100 + Math.random() * 899)}`;
    const newCase: RecoveryCase = {
      caseId,
      propertyId: newPropId,
      ownerName: newProp.recordedOwner,
      requestDate: registeredDate.slice(0, 10),
      disasterEvent: 'Simulated Disaster Vulnerability Zone',
      evidenceStatus: newEvidenceItems.length >= 2 ? 'COMPLETE' : 'PARTIAL',
      consistencyScore: 94,
      reviewStatus: 'PENDING_REVIEW',
      authorityRemarks: 'Initial property registration and digital evidence preservation recorded on ledger.',
      packageGenerated: false,
    };

    setProperties(prev => [createdProperty, ...prev]);
    setEvidence(prev => [...newEvidenceItems, ...prev]);
    setLedgerBlocks(prev => [...prev, ...newBlocks]);
    setRecoveryCases(prev => [newCase, ...prev]);
    setSelectedPropertyId(newPropId);
    setSelectedCaseId(caseId);

    return { property: createdProperty, newEvidence: newEvidenceItems };
  };

  const simulateDocumentLoss = (propertyId: string) => {
    setProperties(prev => prev.map(p => {
      if (p.id === propertyId) {
        return {
          ...p,
          lossSimulated: true,
          disasterAffected: true,
          disasterEventName: p.disasterEventName || 'Severe Flash Flood & Landslide 2026',
        };
      }
      return p;
    }));

    const target = properties.find(p => p.id === propertyId);
    if (target) {
      setDisasterModalProperty(target);
    }
  };

  const addAttestation = (data: {
    propertyId: string;
    attesterName: string;
    role: CommunityAttestation['role'];
    statement: string;
    location: string;
  }) => {
    const id = `ATT-${data.propertyId.slice(3, 8)}-${Math.floor(10 + Math.random() * 89)}`;
    const date = new Date().toISOString().slice(0, 10);
    const contactHash = generateMockHash(data.attesterName).slice(0, 8) + '...';

    const newAtt: CommunityAttestation = {
      id,
      propertyId: data.propertyId,
      attesterName: data.attesterName,
      role: data.role,
      statement: data.statement,
      date,
      verificationStatus: 'VERIFIED',
      contactHash,
      location: data.location,
    };

    setAttestations(prev => [newAtt, ...prev]);

    // Add block to ledger
    const lastBlock = ledgerBlocks[ledgerBlocks.length - 1];
    const prevHash = lastBlock?.currentHash || '0x00';
    const curHash = generateMockHash(prevHash + id + date);
    const newBlock: LedgerBlock = {
      blockHeight: (lastBlock?.blockHeight || 1000) + 1,
      txHash: '0x' + generateMockHash(curHash).slice(0, 64),
      evidenceId: id,
      propertyId: data.propertyId,
      eventType: 'ATTESTATION_ADDED',
      timestamp: new Date().toISOString(),
      previousHash: prevHash,
      currentHash: curHash,
      status: 'CONFIRMED',
      validatorNode: 'Node-Citizen-Verify-01',
    };
    setLedgerBlocks(prev => [...prev, newBlock]);
  };

  const updateCaseStatus = (caseId: string, status: RecoveryCase['reviewStatus'], remarks?: string) => {
    setRecoveryCases(prev => prev.map(c => {
      if (c.caseId === caseId) {
        return {
          ...c,
          reviewStatus: status,
          authorityRemarks: remarks || c.authorityRemarks,
          reviewedBy: 'Authorized Authority Officer (Divisional Magistrate)',
          reviewedAt: new Date().toISOString(),
        };
      }
      return c;
    }));
  };

  const generateCasePackage = (caseId: string) => {
    setRecoveryCases(prev => prev.map(c => {
      if (c.caseId === caseId) {
        return {
          ...c,
          packageGenerated: true,
        };
      }
      return c;
    }));

    // Add sealing block to ledger
    const targetCase = recoveryCases.find(c => c.caseId === caseId);
    if (targetCase) {
      const lastBlock = ledgerBlocks[ledgerBlocks.length - 1];
      const prevHash = lastBlock?.currentHash || '0x00';
      const curHash = generateMockHash(prevHash + caseId + 'SEAL');
      const newBlock: LedgerBlock = {
        blockHeight: (lastBlock?.blockHeight || 1000) + 1,
        txHash: '0x' + generateMockHash(curHash).slice(0, 64),
        evidenceId: caseId,
        propertyId: targetCase.propertyId,
        eventType: 'AUTHORITY_PACKAGE_SEALED',
        timestamp: new Date().toISOString(),
        previousHash: prevHash,
        currentHash: curHash,
        status: 'CONFIRMED',
        validatorNode: 'Node-State-Audit-03',
      };
      setLedgerBlocks(prev => [...prev, newBlock]);
    }
  };

  const resetDemoData = () => {
    localStorage.removeItem('harmony_properties');
    localStorage.removeItem('harmony_evidence');
    localStorage.removeItem('harmony_attestations');
    localStorage.removeItem('harmony_cases');
    localStorage.removeItem('harmony_ledger');

    setProperties(INITIAL_PROPERTIES);
    setEvidence(INITIAL_EVIDENCE);
    setAttestations(INITIAL_ATTESTATIONS);
    setRecoveryCases(INITIAL_RECOVERY_CASES);
    setLedgerBlocks(INITIAL_LEDGER_BLOCKS);
    setSelectedPropertyId('KA-SIR-10234');
    setSelectedCaseId('REC-2026-081');
    setGuidedDemoStep(0);
    setCurrentViewState('landing');
  };

  const nextDemoStep = () => {
    jumpToDemoStep(guidedDemoStep + 1);
  };

  const jumpToDemoStep = (step: number) => {
    setGuidedDemoStep(step);
    setDemoGuideOpen(true);

    switch (step) {
      case 1:
        // STEP 1: Login as Property Owner
        setRoleState('OWNER');
        setCurrentViewState('owner-dashboard');
        break;
      case 2:
        // STEP 2: Register Ravi Kumar's property
        setRoleState('OWNER');
        setCurrentViewState('register-property');
        break;
      case 3:
      case 4:
        // STEP 3 & 4: Upload & Show Evidence preserved, SHA-256, Timestamp
        setRoleState('OWNER');
        setSelectedPropertyId('KA-SIR-10234');
        setCurrentViewState('owner-dashboard');
        break;
      case 5:
        // STEP 5: Click “SIMULATE DOCUMENT LOSS”
        setRoleState('OWNER');
        const raviProp = properties.find(p => p.id === 'KA-SIR-10234') || properties[0];
        setDisasterModalProperty(raviProp);
        break;
      case 6:
      case 7:
        // STEP 6 & 7: Click “RECOVER MY PROPERTY” & Search KA-SIR-10234
        setDisasterModalProperty(null);
        setRoleState('OWNER');
        setSelectedPropertyId('KA-SIR-10234');
        setSearchQuery('KA-SIR-10234');
        setCurrentViewState('property-recovery');
        break;
      case 8:
        // STEP 8: Retrieve Govt Record + HARMONY Evidence
        setRoleState('OWNER');
        setSelectedPropertyId('KA-SIR-10234');
        setCurrentViewState('property-recovery');
        break;
      case 9:
        // STEP 9: Run verification
        setSelectedPropertyId('KA-SIR-10234');
        setCurrentViewState('verification');
        break;
      case 10:
        // STEP 10: Login as Authority
        setRoleState('AUTHORITY');
        setCurrentViewState('authority-dashboard');
        break;
      case 11:
      case 12:
        // STEP 11 & 12: Open recovery case & Review evidence and attestations
        setRoleState('AUTHORITY');
        setSelectedCaseId('REC-2026-081');
        setSelectedPropertyId('KA-SIR-10234');
        setCurrentViewState('authority-dashboard');
        break;
      case 13:
      case 14:
        // STEP 13 & 14: Generate Recovery Package & Download PDF
        setRoleState('AUTHORITY');
        setSelectedCaseId('REC-2026-081');
        setSelectedPropertyId('KA-SIR-10234');
        setCurrentViewState('authority-dashboard');
        break;
      default:
        break;
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentView,
        setCurrentView,
        properties,
        evidence,
        attestations,
        recoveryCases,
        ledgerBlocks,
        selectedPropertyId,
        setSelectedPropertyId,
        selectedCaseId,
        setSelectedCaseId,
        searchQuery,
        setSearchQuery,
        disasterModalProperty,
        setDisasterModalProperty,
        guidedDemoStep,
        setGuidedDemoStep,
        demoGuideOpen,
        setDemoGuideOpen,
        navigateTo,
        registerProperty,
        simulateDocumentLoss,
        addAttestation,
        updateCaseStatus,
        generateCasePackage,
        resetDemoData,
        nextDemoStep,
        jumpToDemoStep,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
