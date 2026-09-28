export type UserRole = 'OWNER' | 'AUTHORITY' | 'ADMIN';

export type PropertyType = 'Agricultural' | 'Residential' | 'Commercial' | 'Plantation';

export type RecordStatus = 'Active' | 'Under Dispute' | 'Archived' | 'Pending Verification';

export type MutationStatus = 'Approved & Mutated' | 'Pending' | 'Flagged for Audit';

export type EvidenceCategory = 
  | 'Property Photograph' 
  | 'Sale Deed Copy' 
  | 'Tax Receipt' 
  | 'Survey Settlement Map' 
  | 'GPS Boundary Log'
  | 'Utility Electricity Bill'
  | 'Identity Aadhaar Card';

export type EvidenceStatus = 'VERIFIED' | 'PENDING' | 'FLAGGED' | 'CORRUPTED';

export interface Property {
  id: string; // e.g., KA-SIR-10234
  ulpin: string; // Unique Land Parcel Identification Number
  surveyNumber: string; // e.g., 124/3A
  recordedOwner: string; // e.g., Ravi Kumar
  village: string;
  taluk: string;
  district: string;
  state: string;
  area: string; // e.g., 1.2 acres
  propertyType: PropertyType;
  recordStatus: RecordStatus;
  mutationStatus: MutationStatus;
  registrationReference: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  disasterAffected?: boolean;
  disasterEventName?: string;
  lossSimulated?: boolean;
  registeredDate: string;
  evidenceIds: string[];
}

export interface EvidenceItem {
  id: string; // e.g. EV-10234-01
  propertyId: string;
  fileName: string;
  category: EvidenceCategory;
  fileSize: string;
  uploadedDate: string;
  timestamp: string;
  sha256Hash: string;
  status: EvidenceStatus;
  uploadedBy: string;
  thumbnailUrl?: string;
  previewText?: string;
  ocrExtractedData?: {
    ownerName?: string;
    surveyNumber?: string;
    propertyType?: string;
    extractedDate?: string;
    confidence: number;
  };
}

export interface CommunityAttestation {
  id: string;
  propertyId: string;
  attesterName: string;
  role: 'Neighbor' | 'Community Representative' | 'Field Worker' | 'Authorized Officer';
  statement: string;
  date: string;
  verificationStatus: 'VERIFIED' | 'REVIEW_REQUESTED' | 'CONFIRMED';
  contactHash: string;
  location: string;
}

export interface VerificationCheck {
  id: string;
  name: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  detail: string;
  govtValue: string;
  evidenceValue: string;
}

export interface EvidenceConflict {
  id: string;
  field: string;
  govtValue: string;
  evidenceValue: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  message: string;
}

export interface AIAnalysisReport {
  modelName: string;
  analyzedAt: string;
  extractedOwner: string;
  extractedSurveyNo: string;
  extractedType: string;
  extractedDate: string;
  confidenceScore: number;
  checksSummary: string;
  disclaimer: string;
}

export interface LedgerBlock {
  blockHeight: number;
  txHash: string;
  evidenceId: string;
  propertyId: string;
  eventType: 
    | 'EVIDENCE_UPLOAD' 
    | 'HASH_ANCHOR' 
    | 'TIMESTAMP_RECORD' 
    | 'ATTESTATION_ADDED' 
    | 'RECOVERY_REQUEST' 
    | 'AUTHORITY_PACKAGE_SEALED';
  timestamp: string;
  previousHash: string;
  currentHash: string;
  status: 'CONFIRMED' | 'PENDING';
  validatorNode: string;
}

export interface RecoveryCase {
  caseId: string; // e.g. REC-2026-081
  propertyId: string;
  ownerName: string;
  requestDate: string;
  disasterEvent: string;
  evidenceStatus: 'COMPLETE' | 'PARTIAL' | 'CONFLICT' | 'INSUFFICIENT';
  consistencyScore: number; // e.g. 92% (Never called ownership probability!)
  reviewStatus: 'PENDING_REVIEW' | 'PACKAGE_APPROVED' | 'SENT_FOR_MANUAL_REVIEW' | 'ADDITIONAL_EVIDENCE_REQUESTED';
  authorityRemarks?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  packageGenerated?: boolean;
}
