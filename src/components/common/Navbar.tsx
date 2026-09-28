import React, { useState, useRef, useEffect } from 'react';
import { 
  Shield, 
  Search, 
  UserCheck, 
  Building2, 
  Sliders, 
  Play, 
  RotateCcw, 
  Menu, 
  X,
  FileCheck2,
  Database,
  MapPin,
  Lock,
  ExternalLink
} from 'lucide-react';
import { useApp, AppView } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const { 
    role, 
    setRole, 
    currentView, 
    setCurrentView, 
    navigateTo, 
    properties, 
    recoveryCases, 
    resetDemoData,
    setDemoGuideOpen,
    jumpToDemoStep
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchTerm.trim().length > 1 ? properties.filter(p => 
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.surveyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.recordedOwner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.district.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5) : [];

  const caseResults = searchTerm.trim().length > 1 ? recoveryCases.filter(c =>
    c.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.propertyId.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 3) : [];

  const ownerNav: { label: string; view: AppView; icon: any }[] = [
    { label: 'Citizen Dashboard', view: 'owner-dashboard', icon: Building2 },
    { label: 'Register Land', view: 'register-property', icon: FileCheck2 },
    { label: 'Recover Evidence', view: 'property-recovery', icon: Database },
    { label: 'Evidence Vault', view: 'evidence-vault', icon: Lock },
    { label: 'Cadastre Map', view: 'map-view', icon: MapPin },
  ];

  const authorityNav: { label: string; view: AppView; icon: any }[] = [
    { label: 'Authority Portal', view: 'authority-dashboard', icon: Building2 },
    { label: 'Government Records', view: 'property-recovery', icon: Database },
    { label: 'Verification Engine', view: 'verification', icon: FileCheck2 },
    { label: 'Cryptographic Ledger', view: 'blockchain-ledger', icon: Lock },
    { label: 'Cadastre Map', view: 'map-view', icon: MapPin },
  ];

  const adminNav: { label: string; view: AppView; icon: any }[] = [
    { label: 'System Overview', view: 'admin-dashboard', icon: Sliders },
    { label: 'Master Registry', view: 'property-recovery', icon: Database },
    { label: 'Evidence Vault', view: 'evidence-vault', icon: Lock },
    { label: 'Audit Trail', view: 'blockchain-ledger', icon: Lock },
    { label: 'GIS Cadastre', view: 'map-view', icon: MapPin },
  ];

  const activeNavLinks = role === 'OWNER' ? ownerNav : role === 'AUTHORITY' ? authorityNav : adminNav;

  return (
    <nav className="sticky top-0 z-40 bg-gov-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Official Emblem & Portal Title */}
          <div 
            onClick={() => setCurrentView('landing')} 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-100 group-hover:border-blue-500 transition-colors">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white font-sans">
                  PROJECT HARMONY
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono tracking-wider bg-blue-950 text-blue-300 border border-blue-800/80 rounded">
                  PORTAL
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Disaster Land Evidence Recovery & Cadastral Restoration
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {activeNavLinks.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.label}
                  onClick={() => setCurrentView(item.view)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white font-semibold shadow-sm' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Global Search Bar */}
          <div className="relative hidden md:block w-48 xl:w-64" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search Survey #, ULPIN, Owner..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                className="w-full bg-slate-950 border border-slate-700 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Instant Search Dropdown */}
            {searchFocused && (searchResults.length > 0 || caseResults.length > 0) && (
              <div className="absolute left-0 right-0 mt-1.5 bg-slate-900 border border-slate-700 rounded-lg shadow-xl p-2 z-50 max-h-80 overflow-y-auto">
                {searchResults.length > 0 && (
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 py-1 font-semibold">
                      Cadastral Parcels ({searchResults.length})
                    </div>
                    {searchResults.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          navigateTo('property-recovery', p.id);
                          setSearchFocused(false);
                          setSearchTerm('');
                        }}
                        className="p-2 hover:bg-slate-800 rounded-md cursor-pointer transition-colors flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-semibold text-blue-400">{p.id} — Sy {p.surveyNumber}</div>
                          <div className="text-slate-400 text-[11px]">{p.recordedOwner} • {p.village}, {p.taluk}</div>
                        </div>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded">
                          {p.area}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {caseResults.length > 0 && (
                  <div className="mt-2 border-t border-slate-800 pt-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 py-1 font-semibold">
                      Recovery Dockets ({caseResults.length})
                    </div>
                    {caseResults.map(c => (
                      <div
                        key={c.caseId}
                        onClick={() => {
                          navigateTo('authority-dashboard', c.propertyId, c.caseId);
                          setSearchFocused(false);
                          setSearchTerm('');
                        }}
                        className="p-2 hover:bg-slate-800 rounded-md cursor-pointer transition-colors flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-semibold text-slate-200">{c.caseId} ({c.ownerName})</div>
                          <div className="text-slate-400 text-[11px]">{c.propertyId} • Match: {c.consistencyScore}%</div>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Role Switcher Pill & Actions */}
          <div className="flex items-center gap-2">
            
            {/* 3-Minute Demo Guide Button */}
            <button
              onClick={() => {
                setDemoGuideOpen(true);
                jumpToDemoStep(1);
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-semibold transition-colors"
              title="Launch 3-minute presentation script"
            >
              <Play className="w-3.5 h-3.5 fill-blue-400 text-blue-400" />
              <span>Demo Walkthrough</span>
            </button>

            {/* Official Role Switcher Tabs */}
            <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={() => setRole('OWNER')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  role === 'OWNER'
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Citizen / Landowner Perspective"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Citizen</span>
              </button>

              <button
                onClick={() => setRole('AUTHORITY')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  role === 'AUTHORITY'
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Revenue Authority (SDM / Tahsildar)"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Authority</span>
              </button>

              <button
                onClick={() => setRole('ADMIN')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  role === 'ADMIN'
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="System Administration & Audit"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            </div>

            {/* Reset Demo Data Button */}
            <button
              onClick={() => {
                if (window.confirm('Reset all demo records, evidence items, and simulated disasters to fresh baseline state?')) {
                  resetDemoData();
                }
              }}
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent transition-colors"
              title="Reset Demo Records"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-md text-slate-300 hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 py-3 space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
            Portal Navigation ({role})
          </div>
          {activeNavLinks.map(item => (
            <button
              key={item.label}
              onClick={() => {
                setCurrentView(item.view);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md text-left ${
                currentView === item.view 
                  ? 'bg-blue-600 text-white font-semibold' 
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                setDemoGuideOpen(true);
                jumpToDemoStep(1);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-md text-xs font-semibold"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              Start 3-Minute Walkthrough
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
