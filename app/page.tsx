'use client';

import { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  ChevronRight,
  Users,
  Search,
  Bell,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';
import DashboardView from '@/components/DashboardView';
import QuotesView from '@/components/QuotesView';
import CRMView from '@/components/CRMView';
import SettingsView from '@/components/SettingsView';

type ViewState = 'dashboard' | 'quotes' | 'crm' | 'settings';

export default function ProsperNexus() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isLocked, setIsLocked] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  
  const isExpanded = isLocked || isHovered;

  const navItemClass = (isActive: boolean) => `
    w-full flex items-center rounded-lg transition-colors overflow-hidden
    ${isActive ? 'bg-accent-blue-light text-accent-blue-primary font-semibold' : 'text-brand-gray-600 hover:text-brand-gray-900 hover:bg-brand-gray-50 font-medium'}
    ${isExpanded ? 'px-4 py-2.5 gap-3' : 'justify-center py-3'}
  `;

  const renderView = () => {
    switch(currentView) {
      case 'dashboard': return <DashboardView />;
      case 'quotes': return <QuotesView />;
      case 'crm': return <CRMView />;
      case 'settings': return <SettingsView />;
      default: return <DashboardView />;
    }
  };

  const getViewTitle = () => {
    switch(currentView) {
      case 'dashboard': return 'Dashboard';
      case 'quotes': return 'Quotes';
      case 'crm': return 'CRM';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen flex bg-brand-bg text-brand-gray-900 font-sans selection:bg-accent-blue-light">
      {/* Sidebar */}
      <aside 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`bg-brand-surface border-r border-brand-gray-200 flex flex-col hidden md:flex shrink-0 transition-all duration-300 ease-in-out relative z-20 ${isExpanded ? 'w-64' : 'w-20'}`}
      >
        <div className="h-20 border-b border-brand-gray-200 flex items-center justify-between px-5 shrink-0 overflow-hidden">
          <div className={`flex flex-col gap-1 transition-opacity duration-300 ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden'}`}>
            <img 
              src="https://i.postimg.cc/qMfYpmQR/prospermanulogo.png" 
              alt="Prosper Manufacturing" 
              className="h-10 object-contain origin-left"
            />
            <span className="text-[10px] text-brand-gray-500 uppercase tracking-widest font-bold whitespace-nowrap">Nexus Platform</span>
          </div>
          
          {!isExpanded && (
            <div className="w-full flex justify-center items-center">
              <div className="w-10 h-10 bg-accent-blue-primary text-white font-bold flex items-center justify-center rounded-lg text-lg">
                P
              </div>
            </div>
          )}

          {isExpanded && (
            <button 
              onClick={() => setIsLocked(!isLocked)}
              className="text-brand-gray-400 hover:text-brand-gray-900 transition-colors ml-2 shrink-0"
            >
              {isLocked ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
            </button>
          )}
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={navItemClass(currentView === 'dashboard')}
          >
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            {isExpanded && <span className="text-sm whitespace-nowrap">Dashboard</span>}
          </button>
          <button 
            onClick={() => setCurrentView('quotes')}
            className={navItemClass(currentView === 'quotes')}
          >
            <FileText className="w-5 h-5 shrink-0" />
            {isExpanded && <span className="text-sm whitespace-nowrap">Quotes</span>}
          </button>
          <button 
            onClick={() => setCurrentView('crm')}
            className={navItemClass(currentView === 'crm')}
          >
            <Users className="w-5 h-5 shrink-0" />
            {isExpanded && <span className="text-sm whitespace-nowrap">CRM</span>}
          </button>
          <button 
            onClick={() => setCurrentView('settings')}
            className={navItemClass(currentView === 'settings')}
          >
            <Settings className="w-5 h-5 shrink-0" />
            {isExpanded && <span className="text-sm whitespace-nowrap">Settings</span>}
          </button>
        </nav>

        <div className="p-4 border-t border-brand-gray-200">
          <button className={`w-full flex items-center rounded-lg transition-colors text-brand-gray-600 hover:text-brand-gray-900 hover:bg-brand-gray-50 ${isExpanded ? 'px-4 py-2.5 gap-3' : 'justify-center py-3'}`}>
            <LogOut className="w-5 h-5 shrink-0" />
            {isExpanded && <span className="text-sm font-medium whitespace-nowrap">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-brand-bg">
        {/* Top Nav */}
        <header className="h-16 border-b border-brand-gray-200 px-6 flex items-center justify-between shrink-0 bg-brand-surface/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm text-brand-gray-500">
            <span className="hover:text-brand-gray-900 cursor-pointer transition-colors">{getViewTitle()}</span>
            {currentView === 'quotes' && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span className="text-brand-gray-900 font-medium">RFQ-2026-089</span>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-brand-gray-50 border border-brand-gray-200 rounded-full pl-9 pr-4 py-1.5 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors w-64"
              />
            </div>
            <button className="p-2 text-brand-gray-500 hover:text-brand-gray-900 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-blue-primary rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-brand-gray-100 border border-brand-gray-200 flex items-center justify-center text-sm font-medium text-brand-gray-900">
              JD
            </div>
          </div>
        </header>

        {/* Scrollable Canvas */}
        <div className="flex-1 overflow-auto p-6 lg:p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
