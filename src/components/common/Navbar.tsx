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
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useApp, AppView } from '../../context/AppContext';
import { UserRole } from '../../types/property';

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

  // Close search dropdown on click outside
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

  // Nav Links by Role
  const ownerNav: { label: string; view: AppView; icon: any }[] = [
    { label: 'Dashboard', view: 'owner-dashboard', icon: Building2 },
    { label: 'Register Property', view: 'register-property', icon: FileCheck2 },
    { label: 'Recover Property', view: 'property-recovery', icon: Sparkles },
    { label: 'Evidence Vault', view: 'evidence-vault', icon: Lock },
    { label: 'Map Explorer', view: 'map-view', icon: MapPin },
  ];

  const authorityNav: { label: string; view: AppView; icon: any }[] = [
    { label: 'Dashboard', view: 'authority-dashboard', icon: Building2 },
    { label: 'Govt Records', view: 'property-recovery', icon: Database },
    { label: 'Verification Engine', view: 'verification', icon: FileCheck2 },
    { label: 'Evidence Ledger', view: 'blockchain-ledger', icon: Lock },
    { label: 'Map Cadastre', view: 'map-view', icon: MapPin },
  ];

  const adminNav: { label: string; view: AppView; icon: any }[] = [
    { label: 'System Overview', view: 'admin-dashboard', icon: Sliders },
    { label: 'All Properties', view: 'property-recovery', icon: Database },
    { label: 'Evidence Vault', view: 'evidence-vault', icon: Lock },
    { label: 'Integrity Ledger', view: 'blockchain-ledger', icon: Lock },
    { label: 'Spatial Map', view: 'map-view', icon: MapPin },
  ];

  const activeNavLinks = role === 'OWNER' ? ownerNav : role === 'AUTHORITY' ? authorityNav : adminNav;

  return (
    <nav className="sticky top-0 z-40 bg-navy-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setCurrentView('landing')} 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center group-hover:border-cyan-400 group-hover:shadow-glow-cyan transition-all">
              <Shield className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-lg tracking-wider text-slate-100 group-hover:text-cyan-300 transition-colors">
                  PROJECT HARMONY
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded">
                  MVP v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans tracking-wide">
                Preserve the evidence. Restore the record.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {activeNavLinks.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.label}
                  onClick={() => setCurrentView(item.view)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    isActive 
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-glow-cyan' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
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
                placeholder="Search Property, Survey, Owner..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
            </div>

            {/* Instant Search Dropdown */}
            {searchFocused && (searchResults.length > 0 || caseResults.length > 0) && (
              <div className="absolute left-0 right-0 mt-2 bg-navy-900 border border-slate-700 rounded-xl shadow-glass p-2 z-50 max-h-80 overflow-y-auto">
                {searchResults.length > 0 && (
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 py-1">
                      Properties Matched ({searchResults.length})
                    </div>
                    {searchResults.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          navigateTo('property-recovery', p.id);
                          setSearchFocused(false);
                          setSearchTerm('');
                        }}
                        className="p-2 hover:bg-slate-800/80 rounded-lg cursor-pointer transition-colors flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-semibold text-cyan-300">{p.id} — Sy {p.surveyNumber}</div>
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
                    <div className="text-[10px] font-mono uppercase tracking-wider text-purple-400 px-2 py-1">
                      Recovery Cases ({caseResults.length})
                    </div>
                    {caseResults.map(c => (
                      <div
                        key={c.caseId}
                        onClick={() => {
                          navigateTo('authority-dashboard', c.propertyId, c.caseId);
                          setSearchFocused(false);
                          setSearchTerm('');
                        }}
                        className="p-2 hover:bg-slate-800/80 rounded-lg cursor-pointer transition-colors flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-semibold text-purple-300">{c.caseId} ({c.ownerName})</div>
                          <div className="text-slate-400 text-[11px]">{c.propertyId} • Score: {c.consistencyScore}%</div>
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
            
            {/* 3-Minute Demo Quick Button */}
            <button
              onClick={() => {
                setDemoGuideOpen(true);
                jumpToDemoStep(1);
              }}
              className="relative group hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-semibold hover:border-cyan-300 hover:shadow-glow-cyan transition-all"
              title="Start guided 3-minute presentation for buildathon judges"
            >
              <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400 group-hover:scale-110 transition-transform" />
              <span>3-Min Demo</span>
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
              </span>
            </button>

            {/* Role Switcher Dropdown / Pills */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setRole('OWNER')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  role === 'OWNER'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch to Property Owner perspective"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Owner</span>
              </button>

              <button
                onClick={() => setRole('AUTHORITY')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  role === 'AUTHORITY'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch to Government Authority Officer perspective"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Authority</span>
              </button>

              <button
                onClick={() => setRole('ADMIN')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  role === 'ADMIN'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch to Admin & Ledger Audit perspective"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            </div>

            {/* Reset Demo State Button */}
            <button
              onClick={() => {
                if (window.confirm('Reset all demo records, evidence items, and simulated disasters to fresh buildathon state?')) {
                  resetDemoData();
                }
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all"
              title="Reset Demo Data"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-slate-300 hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-950 border-b border-slate-800 px-4 py-3 space-y-2 animate-fadeIn">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
            Navigation ({role})
          </div>
          {activeNavLinks.map(item => (
            <button
              key={item.label}
              onClick={() => {
                setCurrentView(item.view);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg text-left ${
                currentView === item.view 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
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
              className="w-full flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 text-cyan-300 rounded-lg text-xs font-semibold"
            >
              <Play className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
              Launch 3-Minute Buildathon Demo
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
