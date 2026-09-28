import { jsPDF } from 'jspdf';
import { Property, EvidenceItem, CommunityAttestation, RecoveryCase, VerificationCheck, EvidenceConflict } from '../types/property';
import { formatTimestamp, truncateHash } from './crypto';

interface GeneratePdfOptions {
  property: Property;
  evidenceList: EvidenceItem[];
  attestations: CommunityAttestation[];
  recoveryCase: RecoveryCase;
  checks: VerificationCheck[];
  conflicts: EvidenceConflict[];
  consistencyScore: number;
}

export function generateRecoveryPackagePDF({
  property,
  evidenceList,
  attestations,
  recoveryCase,
  checks,
  conflicts,
  consistencyScore,
}: GeneratePdfOptions): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  let y = 16;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 20) {
      addFooter();
      doc.addPage();
      y = 16;
      addHeaderBanner();
    }
  };

  const addHeaderBanner = () => {
    doc.setFillColor(7, 12, 24);
    doc.rect(margin, y - 6, pageWidth - (margin * 2), 12, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(0, 240, 255);
    doc.text('PROJECT HARMONY — OFFICIAL PROPERTY EVIDENCE RECOVERY DOSSIER', margin + 4, y + 2);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(`CASE ID: ${recoveryCase.caseId} | ULPIN: ${property.ulpin}`, pageWidth - margin - 4, y + 2, { align: 'right' });
    y += 12;
  };

  const addFooter = () => {
    const pageNum = doc.getNumberOfPages();
    doc.setDrawColor(30, 41, 59);
    doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(
      'DISCLAIMER: This package organizes available evidence for official review. It does not itself establish legal ownership.',
      pageWidth / 2,
      pageHeight - 9,
      { align: 'center' }
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Document Ref: HARMONY-${recoveryCase.caseId}-${property.id} | Page ${pageNum}`, pageWidth - margin, pageHeight - 5, { align: 'right' });
    doc.text(`Generated: ${new Date().toUTCString()}`, margin, pageHeight - 5);
  };

  // ---------------- PAGE 1 HEADER ----------------
  doc.setFillColor(11, 17, 32);
  doc.rect(margin, y, pageWidth - (margin * 2), 34, 'F');
  doc.setDrawColor(0, 240, 255);
  doc.setLineWidth(0.6);
  doc.rect(margin, y, pageWidth - (margin * 2), 34, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(0, 240, 255);
  doc.text('PROJECT HARMONY', margin + 6, y + 9);

  doc.setFontSize(11);
  doc.setTextColor(241, 245, 249);
  doc.text('PROPERTY EVIDENCE RECOVERY PACKAGE', margin + 6, y + 17);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(56, 189, 248);
  doc.text('“Preserve the evidence. Restore the record.”', margin + 6, y + 24);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('For Authorized Authority Adjudication & Official Restoration', margin + 6, y + 30);

  // Status Badge on Right
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(pageWidth - margin - 52, y + 5, 46, 24, 2, 2, 'F');
  doc.setDrawColor(168, 85, 247);
  doc.roundedRect(pageWidth - margin - 52, y + 5, 46, 24, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(168, 85, 247);
  doc.text('CONSISTENCY SCORE', pageWidth - margin - 29, y + 11, { align: 'center' });

  doc.setFontSize(14);
  doc.setTextColor(0, 240, 255);
  doc.text(`${consistencyScore}%`, pageWidth - margin - 29, y + 19, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Evidence Consistency Only', pageWidth - margin - 29, y + 25, { align: 'center' });

  y += 40;

  // Metadata summary card
  doc.setFillColor(15, 23, 42);
  doc.rect(margin, y, pageWidth - (margin * 2), 22, 'F');
  doc.setDrawColor(51, 65, 85);
  doc.rect(margin, y, pageWidth - (margin * 2), 22, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('CASE ID:', margin + 4, y + 6);
  doc.text('PROPERTY ID:', margin + 4, y + 12);
  doc.text('RECORDED OWNER:', margin + 4, y + 18);

  doc.setTextColor(241, 245, 249);
  doc.text(recoveryCase.caseId, margin + 35, y + 6);
  doc.text(property.id, margin + 35, y + 12);
  doc.text(property.recordedOwner, margin + 35, y + 18);

  doc.setTextColor(148, 163, 184);
  doc.text('SURVEY NUMBER:', margin + 95, y + 6);
  doc.text('LOCATION:', margin + 95, y + 12);
  doc.text('LAND AREA:', margin + 95, y + 18);

  doc.setTextColor(241, 245, 249);
  doc.text(property.surveyNumber, margin + 130, y + 6);
  doc.text(`${property.village}, ${property.taluk}`, margin + 130, y + 12);
  doc.text(`${property.area} (${property.propertyType})`, margin + 130, y + 18);

  y += 28;

  // Helper function to draw Section headers
  const drawSectionHeader = (title: string, secNum: string) => {
    checkPageBreak(14);
    doc.setFillColor(30, 41, 59);
    doc.rect(margin, y, pageWidth - (margin * 2), 7, 'F');
    doc.setDrawColor(0, 240, 255);
    doc.setLineWidth(0.4);
    doc.line(margin, y, margin, y + 7);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(0, 240, 255);
    doc.text(`${secNum} | ${title}`, margin + 4, y + 5);
    y += 10;
  };

  // ---------------- SECTION 1: Government Record ----------------
  drawSectionHeader('DEMO GOVERNMENT RECORD DETAILS', 'SECTION 1');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);

  const govtFields = [
    ['State & District', `${property.state} — ${property.district}`],
    ['Taluk & Village', `${property.taluk}, ${property.village}`],
    ['ULPIN Identifier', property.ulpin],
    ['Survey Parcel Number', property.surveyNumber],
    ['Recorded Legal Owner', property.recordedOwner],
    ['Assigned Land Area', property.area],
    ['Classification', property.propertyType],
    ['Registry Book Reference', property.registrationReference],
    ['Cadastral Mutation Status', property.mutationStatus],
    ['Master Record Status', property.recordStatus],
    ['Cadastral Coordinates', `Lat: ${property.coordinates.lat.toFixed(4)}°N, Lng: ${property.coordinates.lng.toFixed(4)}°E`],
    ['Disaster Incident Status', property.disasterAffected ? `Impacted by: ${property.disasterEventName || 'Disaster Event'}` : 'Normal / Safe'],
  ];

  for (let i = 0; i < govtFields.length; i += 2) {
    checkPageBreak(7);
    const item1 = govtFields[i];
    const item2 = govtFields[i + 1];

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(148, 163, 184);
    doc.text(item1[0] + ':', margin + 4, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(241, 245, 249);
    doc.text(item1[1], margin + 42, y);

    if (item2) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(148, 163, 184);
      doc.text(item2[0] + ':', margin + 98, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(241, 245, 249);
      doc.text(item2[1], margin + 138, y);
    }
    y += 5.5;
  }
  y += 4;

  // ---------------- SECTION 2: Preserved Evidence ----------------
  drawSectionHeader('PROJECT HARMONY PRESERVED EVIDENCE VAULT', 'SECTION 2');
  doc.setFontSize(7.5);

  // Table header
  doc.setFillColor(15, 23, 42);
  doc.rect(margin, y, pageWidth - (margin * 2), 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 240, 255);
  doc.text('EVIDENCE ID', margin + 2, y + 4);
  doc.text('CATEGORY / FILE NAME', margin + 30, y + 4);
  doc.text('UPLOADED DATE', margin + 95, y + 4);
  doc.text('STATUS', margin + 130, y + 4);
  doc.text('SIZE', margin + 155, y + 4);
  y += 7;

  evidenceList.forEach((ev) => {
    checkPageBreak(9);
    doc.setFillColor(7, 12, 24);
    doc.rect(margin, y - 1, pageWidth - (margin * 2), 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(241, 245, 249);
    doc.text(ev.id, margin + 2, y + 3);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(203, 213, 225);
    doc.text(`${ev.category} (${ev.fileName.slice(0, 28)})`, margin + 30, y + 3);
    doc.text(ev.uploadedDate, margin + 95, y + 3);

    if (ev.status === 'VERIFIED') {
      doc.setTextColor(16, 185, 129);
      doc.text('✓ VERIFIED', margin + 130, y + 3);
    } else if (ev.status === 'FLAGGED') {
      doc.setTextColor(244, 63, 94);
      doc.text('⚠ FLAGGED', margin + 130, y + 3);
    } else {
      doc.setTextColor(245, 158, 11);
      doc.text('● PENDING', margin + 130, y + 3);
    }

    doc.setTextColor(148, 163, 184);
    doc.text(ev.fileSize, margin + 155, y + 3);
    y += 7;
  });
  y += 4;

  // ---------------- SECTION 3: Community Attestations ----------------
  drawSectionHeader('COMMUNITY & FIELD ATTESTATIONS', 'SECTION 3');
  if (attestations.length === 0) {
    checkPageBreak(8);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('No community attestations recorded for this property.', margin + 4, y + 4);
    y += 8;
  } else {
    attestations.forEach((att) => {
      checkPageBreak(16);
      doc.setFillColor(15, 23, 42);
      doc.rect(margin, y, pageWidth - (margin * 2), 14, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(0, 240, 255);
      doc.text(`${att.attesterName} [Role: ${att.role}]`, margin + 4, y + 4);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text(`Recorded Date: ${att.date} | Location: ${att.location}`, pageWidth - margin - 4, y + 4, { align: 'right' });

      doc.setTextColor(226, 232, 240);
      const splitStatement = doc.splitTextToSize(`“${att.statement}”`, pageWidth - (margin * 2) - 8);
      doc.text(splitStatement, margin + 4, y + 9);
      y += 16;
    });
  }
  y += 3;

  // ---------------- SECTION 4: Verification Results ----------------
  drawSectionHeader('EVIDENCE CONSISTENCY & VALIDATION ENGINE RESULTS', 'SECTION 4');
  doc.setFontSize(7.5);
  checks.forEach((chk) => {
    checkPageBreak(7);
    doc.setFont('helvetica', 'bold');
    if (chk.status === 'PASS') {
      doc.setTextColor(16, 185, 129);
      doc.text('[ PASS ]', margin + 4, y + 3);
    } else if (chk.status === 'FAIL') {
      doc.setTextColor(244, 63, 94);
      doc.text('[ FAIL ]', margin + 4, y + 3);
    } else {
      doc.setTextColor(245, 158, 11);
      doc.text('[ WARN ]', margin + 4, y + 3);
    }

    doc.setTextColor(241, 245, 249);
    doc.text(chk.name, margin + 22, y + 3);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    const detailText = doc.splitTextToSize(chk.detail, 105);
    doc.text(detailText[0] || '', margin + 75, y + 3);
    y += 5.5;
  });
  y += 4;

  // ---------------- SECTION 5: Evidence Hashes & Timestamps ----------------
  drawSectionHeader('CRYPTOGRAPHIC INTEGRITY TRAIL (SHA-256 HASHES & TIMESTAMPS)', 'SECTION 5');
  doc.setFontSize(7);
  doc.setFont('Courier', 'normal');

  evidenceList.forEach((ev) => {
    checkPageBreak(12);
    doc.setFillColor(15, 23, 42);
    doc.rect(margin, y, pageWidth - (margin * 2), 10, 'F');
    doc.setTextColor(0, 240, 255);
    doc.text(`FILE: ${ev.fileName} [${ev.id}]`, margin + 3, y + 4);
    doc.setTextColor(148, 163, 184);
    doc.text(`TIMESTAMP: ${formatTimestamp(ev.timestamp)}`, pageWidth - margin - 3, y + 4, { align: 'right' });

    doc.setTextColor(203, 213, 225);
    doc.text(`SHA-256: ${ev.sha256Hash}`, margin + 3, y + 8);
    y += 12;
  });
  y += 3;

  // ---------------- SECTION 6: Conflicts / Remarks ----------------
  drawSectionHeader('CONFLICTS, DISCREPANCIES & AUDIT REMARKS', 'SECTION 6');
  if (conflicts.length === 0) {
    checkPageBreak(8);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(16, 185, 129);
    doc.text('✓ No discrepancies or conflicting survey claims detected for this property.', margin + 4, y + 4);
    y += 8;
  } else {
    conflicts.forEach((conf) => {
      checkPageBreak(14);
      doc.setFillColor(30, 20, 30);
      doc.rect(margin, y, pageWidth - (margin * 2), 12, 'F');
      doc.setDrawColor(244, 63, 94);
      doc.rect(margin, y, pageWidth - (margin * 2), 12, 'D');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(244, 63, 94);
      doc.text(`⚠ CONFLICT DETECTED: ${conf.field}`, margin + 4, y + 4);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(241, 245, 249);
      doc.text(conf.message, margin + 4, y + 9);
      y += 14;
    });
  }
  y += 3;

  // ---------------- SECTION 7: Authority Review ----------------
  drawSectionHeader('AUTHORIZED AUTHORITY REVIEW & OFFICIAL DISPOSITION', 'SECTION 7');
  checkPageBreak(26);

  doc.setFillColor(15, 23, 42);
  doc.rect(margin, y, pageWidth - (margin * 2), 24, 'F');
  doc.setDrawColor(168, 85, 247);
  doc.rect(margin, y, pageWidth - (margin * 2), 24, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(168, 85, 247);
  doc.text('AUTHORITY REVIEW STATUS:', margin + 4, y + 5);

  doc.setTextColor(241, 245, 249);
  doc.text(recoveryCase.reviewStatus.replace(/_/g, ' '), margin + 55, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Officer Remarks:', margin + 4, y + 10);
  doc.setTextColor(226, 232, 240);
  const remarksText = doc.splitTextToSize(
    recoveryCase.authorityRemarks || 'Evidence dossier compiled and sealed for revenue commissioner examination.',
    pageWidth - (margin * 2) - 8
  );
  doc.text(remarksText, margin + 4, y + 15);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(0, 240, 255);
  doc.text('DIGITAL SEAL: HARMONY-AUTH-SIG-VERIFIED', pageWidth - margin - 4, y + 21, { align: 'right' });

  y += 28;

  // Stamp and watermark effect
  addFooter();

  return doc;
}
