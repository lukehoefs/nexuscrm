'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import AppShell, { type AppShellKey } from '@/components/AppShell';
import DashboardView from '@/components/DashboardView';
import QuotesView from '@/components/QuotesView';
import CRMView from '@/components/CRMView';
import SettingsView from '@/components/SettingsView';

type ViewState = 'dashboard' | 'quotes' | 'crm' | 'settings';

const VIEW_KEYS: ViewState[] = ['dashboard', 'quotes', 'crm', 'settings'];

function ProsperNexusInner() {
  const searchParams = useSearchParams();
  const viewParam = searchParams.get('view');
  const currentView: ViewState = useMemo(
    () => (VIEW_KEYS.includes(viewParam as ViewState) ? (viewParam as ViewState) : 'dashboard'),
    [viewParam],
  );

  const title = (
    <>
      <span className="hover:text-brand-gray-900 cursor-pointer transition-colors capitalize">
        {currentView}
      </span>
      {currentView === 'quotes' && (
        <>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-gray-900 font-medium">RFQ-2026-089</span>
        </>
      )}
    </>
  );

  return (
    <AppShell activeKey={currentView as AppShellKey} title={title}>
      {currentView === 'dashboard' && <DashboardView />}
      {currentView === 'quotes' && <QuotesView />}
      {currentView === 'crm' && <CRMView />}
      {currentView === 'settings' && <SettingsView />}
    </AppShell>
  );
}

export default function ProsperNexus() {
  return (
    <Suspense fallback={null}>
      <ProsperNexusInner />
    </Suspense>
  );
}
