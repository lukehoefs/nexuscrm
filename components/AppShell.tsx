'use client';

import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Users,
  Search,
  Bell,
  PanelLeftClose,
  PanelLeft,
  Camera,
} from 'lucide-react';

export type AppShellKey = 'dashboard' | 'quotes' | 'crm' | 'settings' | 'capture';

const NAV_ITEMS: Array<{
  key: AppShellKey;
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
}> = [
  { key: 'dashboard', label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { key: 'quotes', label: 'Quotes', href: '/?view=quotes', icon: FileText },
  { key: 'crm', label: 'CRM', href: '/?view=crm', icon: Users },
  { key: 'capture', label: 'Capture', href: '/capture', icon: Camera },
  { key: 'settings', label: 'Settings', href: '/?view=settings', icon: Settings },
];

export default function AppShell({
  activeKey,
  title,
  children,
}: {
  activeKey: AppShellKey;
  title: ReactNode;
  children: ReactNode;
}) {
  const [isLocked, setIsLocked] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = isLocked || isHovered;

  const navItemClass = (isActive: boolean) => `
    w-full flex items-center rounded-lg transition-colors overflow-hidden
    ${isActive ? 'bg-accent-blue-light text-accent-blue-primary font-semibold' : 'text-brand-gray-600 hover:text-brand-gray-900 hover:bg-brand-gray-50 font-medium'}
    ${isExpanded ? 'px-4 py-2.5 gap-3' : 'justify-center py-3'}
  `;

  return (
    <div className="min-h-screen flex bg-brand-bg text-brand-gray-900 font-sans selection:bg-accent-blue-light">
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
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.key} href={item.href} className={navItemClass(activeKey === item.key)}>
                <Icon className="w-5 h-5 shrink-0" />
                {isExpanded && <span className="text-sm whitespace-nowrap">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-brand-gray-200">
          <button className={`w-full flex items-center rounded-lg transition-colors text-brand-gray-600 hover:text-brand-gray-900 hover:bg-brand-gray-50 ${isExpanded ? 'px-4 py-2.5 gap-3' : 'justify-center py-3'}`}>
            <LogOut className="w-5 h-5 shrink-0" />
            {isExpanded && <span className="text-sm font-medium whitespace-nowrap">Sign Out</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-brand-bg">
        <header className="h-16 border-b border-brand-gray-200 px-6 flex items-center justify-between shrink-0 bg-brand-surface/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm text-brand-gray-500">{title}</div>

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

        <div className="flex-1 overflow-auto p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
