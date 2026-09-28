import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { DisclaimerBanner } from './components/common/DisclaimerBanner';
import { Footer } from './components/common/Footer';
import { DemoGuideModal } from './components/common/DemoGuideModal';
import { DisasterSimulationModal } from './components/views/DisasterSimulationModal';
import { LandingPage } from './components/views/LandingPage';
import { OwnerDashboard } from './components/views/OwnerDashboard';
import { RegisterProperty } from './components/views/RegisterProperty';
import { PropertyRecovery } from './components/views/PropertyRecovery';
import { EvidenceVaultView } from './components/views/EvidenceVaultView';
import { VerificationView } from './components/views/VerificationView';
import { AuthorityDashboard } from './components/views/AuthorityDashboard';
import { BlockchainLedgerView } from './components/views/BlockchainLedgerView';
import { InteractiveMap } from './components/views/InteractiveMap';
import { AdminDashboard } from './components/views/AdminDashboard';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <main className="min-h-[calc(100vh-280px)]">
      {currentView === 'landing' && <LandingPage />}
      {currentView === 'owner-dashboard' && <OwnerDashboard />}
      {currentView === 'register-property' && <RegisterProperty />}
      {currentView === 'property-recovery' && <PropertyRecovery />}
      {currentView === 'evidence-vault' && <EvidenceVaultView />}
      {currentView === 'verification' && <VerificationView />}
      {currentView === 'authority-dashboard' && <AuthorityDashboard />}
      {currentView === 'blockchain-ledger' && <BlockchainLedgerView />}
      {currentView === 'map-view' && <InteractiveMap />}
      {currentView === 'admin-dashboard' && <AdminDashboard />}
    </main>
  );
};

export function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        <DisclaimerBanner />
        <Navbar />
        <MainContent />
        <DisasterSimulationModal />
        <DemoGuideModal />
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
