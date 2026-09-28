# PROJECT HARMONY — Disaster-Resilient Property Evidence & Recovery Platform

> **“Preserve the evidence. Restore the record.”**

---

## 🌟 Executive Summary

**PROJECT HARMONY** helps citizens recover property evidence when original physical property documents (deeds, tax receipts, land surveys, photographs) are lost or destroyed during catastrophic natural disasters like floods, landslides, and storm surges.

By connecting existing government-style property records with preserved digital cryptographic evidence (client-side SHA-256 digests, pre-disaster timestamps, and community attestations), PROJECT HARMONY reconstructs a verified **Property Evidence Recovery Package** for authorized government authority adjudication.

---

## ⚖️ Strict Legal Boundaries & Core Architecture Principle

> [!IMPORTANT]
> - **PROJECT HARMONY does NOT create legal ownership.**
> - **It does NOT replace government land registries.**
> - **It does NOT issue legally valid property deeds.**
> - **It does NOT make the final ownership decision.**
> 
> It preserves, reconstructs, organizes, and verifies available evidence so that an **authorized government authority (Sub-Divisional Magistrate / Tahsildar)** can review and adjudicate the case.

### System Architecture Flow:
```mermaid
graph TD
    A[DEMO GOVERNMENT LAND RECORDS] --> D[PROJECT HARMONY RECONSTRUCTION ENGINE]
    B[PRESERVED DIGITAL EVIDENCE VAULT] --> D
    C[COMMUNITY & FIELD ATTESTATIONS] --> D
    D --> E[VERIFICATION & AI CONSISTENCY MATRIX]
    E --> F[PROPERTY EVIDENCE RECOVERY PACKAGE (PDF)]
    F --> G[AUTHORIZED AUTHORITY REVIEW (SDM / Tahsildar)]
```

---

## 👥 3 User Roles & Features

### 👤 Role 1 — Property Owner (Citizen)
- **Register Property:** Enter Survey No, ULPIN, Village, Taluk, District, Area, GPS coordinates.
- **Upload & Preserve Evidence:** Upload photos, deeds, tax receipts with real WebCrypto SHA-256 calculation.
- **Simulate Document Loss:** Immersive disaster simulator depicting washed-away physical papers vs preserved digital proofs.
- **Recover Property Evidence:** One-click query of Demo Government Records to reconstruct evidence dossier.
- **Evidence Vault:** View and download cryptographic proof certificates.

### 🏛️ Role 2 — Authorized Authority (Magistrate / Revenue Officer)
- **Recovery Queue:** Triage incoming disaster recovery claims with filtering by status and consistency score.
- **Complete 7-Section Dossier Review:**
  1. *Section 1:* Government Record Details
  2. *Section 2:* Preserved Digital Evidence
  3. *Section 3:* Community Attestations (Neighbor & Field Officer)
  4. *Section 4:* AI & Verification Consistency Matrix (e.g. 94% Consistency)
  5. *Section 5:* Evidence Integrity (SHA-256 Hashes & Timestamps)
  6. *Section 6:* Conflicts & Discrepancies
  7. *Section 7:* Authority Disposition
- **Discrepancy Actions:** `[APPROVE EVIDENCE PACKAGE]`, `[SEND FOR MANUAL REVIEW]`, `[REQUEST MORE EVIDENCE]`.
- **Downloadable PDF Dossier:** Instant generation of official multi-page Property Evidence Recovery Package PDF.

### ⚙️ Role 3 — Admin & Ledger Auditor
- **Cadastral Telemetry:** Ingestion metrics, consistency score distributions, and node synchronizations.
- **Prototype Blockchain Ledger:** Timeline from upload to SHA-256 digest, timestamping, attestation, and sealing.
- **GIS Cadastre Map:** Leaflet + OpenStreetMap spatial layer with disaster flood zones and parcel markers.
- **Buildathon Demo Tools:** 1-click dataset reset and 14-step automated demo runner.

---

## ⚡ 3-Minute Buildathon Demo Guide (14 Steps)

PROJECT HARMONY includes a built-in **"3-Min Demo"** interactive presenter tray. You can run through this exact live demo:

1. **Step 1:** Click **Role: Property Owner**.
2. **Step 2:** Click **Register Property** (click *Pre-fill Demo: Ravi Kumar*).
3. **Step 3:** View the uploaded photograph and deed copy; notice real client-side **SHA-256** digests calculated instantly.
4. **Step 4:** Click **PRESERVE PROPERTY EVIDENCE** → verify the 4 green checkmarks confirming vault anchoring.
5. **Step 5:** Click **SIMULATE DOCUMENT LOSS** → see the immersive Western Ghats landslide event destroying physical papers.
6. **Step 6:** Click **RECOVER MY PROPERTY EVIDENCE**.
7. **Step 7:** Search `KA-SIR-10234` in the Demo Government Records.
8. **Step 8:** Observe dual-source retrieval: Official Government Cadastre + HARMONY Preserved Evidence (GPS, Photos, Documents, Attestations, Hashes, Timestamps).
9. **Step 9:** Click **Run Verification Engine** → inspect the **94% Evidence Consistency Score** (never called ownership probability!), checks matrix, and AI analysis.
10. **Step 10:** Test Discrepancy Handling: Switch parcel dropdown to `KA-BEL-30912` to observe **⚠ CONFLICT DETECTED** (Survey 124/3A vs 124/3B).
11. **Step 11:** Click **Role: Authority** → select Case `REC-2026-081` (Ravi Kumar).
12. **Step 12:** Review community attestations from neighbor Suresh Kumar and Agricultural Assistant Manjunath Naik.
13. **Step 13:** Click **APPROVE EVIDENCE PACKAGE** → seals disposition on the audit ledger.
14. **Step 14:** Click **GENERATE RECOVERY PACKAGE (PDF)** → downloads the official high-resolution 7-section recovery dossier PDF.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS, Lucide Icons
- **Cryptography:** Native Web Crypto API (SHA-256 hashing)
- **Spatial GIS:** Leaflet + OpenStreetMap
- **PDF Engine:** jsPDF with customized government-tech dossiers, seals, and watermarks
- **State & Storage:** Persistent AppContext with local storage synchronization and seeded demo records
- **Design System:** Dark Navy (`#030712`, `#070C18`), Neon Cyan (`#00F0FF`), Purple (`#A855F7`), Rose Alert (`#F43F5E`), Glassmorphism panels.

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/prathvikshettyy/hackatopia.git
cd hackatopia

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173/ in your browser
```

---

*PROJECT HARMONY — Preserve the evidence. Restore the record.*
