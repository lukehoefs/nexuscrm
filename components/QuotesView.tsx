'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { 
  UploadCloud, 
  AlertCircle,
  CheckCircle2,
  Download,
  Eye,
  EyeOff,
  Edit2,
  Save
} from 'lucide-react';

// Mock Data
const rateCard = {
  baseMaterialCost: 12.50,
  unitPrice: 28.00,
};

const initialItems = [
  { id: 1, partName: 'Titanium Bracket Assembly', description: 'Grade 5 Titanium, CNC Milled, Anodized Finish', sku: 'TB-9942-A', quantity: 1500, material: 'Titanium Grade 5', process: 'CNC Milling' },
  { id: 2, partName: 'Carbon Fiber Housing', description: 'High-modulus carbon fiber, compression molded', sku: 'CF-102-X', quantity: 500, material: 'Carbon Fiber', process: 'Molding' },
  { id: 3, partName: 'Aluminum Heat Sink', description: '6061 Aluminum, extruded, black anodized', sku: 'AL-440-HS', quantity: 3000, material: 'Aluminum 6061', process: 'Extrusion' },
];

const defaultNotes = `### Project Overview
We are pleased to submit this quotation for the Q3 Production Run of the Falcon 9 Program. 

**Key Deliverables:**
* High-precision CNC milled titanium brackets.
* Compression molded carbon fiber housings.
* Extruded aluminum heat sinks with black anodized finish.

*Note: Lead time is currently estimated at 6-8 weeks from receipt of PO.*`;

export default function QuotesView() {
  const [items, setItems] = useState(initialItems);
  const [isUploading, setIsUploading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [viewMode, setViewMode] = useState<'client' | 'internal'>('internal');
  const [discounts, setDiscounts] = useState<Record<number, number>>({});
  const [notes, setNotes] = useState(defaultNotes);
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
    }, 1500);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, rateCard }),
      });
      const data = await response.json();
      if (data.success) {
        console.log('PDF exported successfully', data);
      }
    } catch (error) {
      console.error('Export failed', error);
    } finally {
      setIsExporting(false);
    }
  };

  const updateDiscount = (id: number, newRevenue: number, baseRevenue: number) => {
    setDiscounts(prev => ({
      ...prev,
      [id]: baseRevenue - newRevenue
    }));
  };

  // Calculations
  let subtotal = 0;
  let totalCost = 0;

  const calculatedItems = items.map(item => {
    const cost = item.quantity * rateCard.baseMaterialCost;
    const baseRevenue = item.quantity * rateCard.unitPrice;
    const discount = discounts[item.id] || 0;
    const revenue = baseRevenue - discount;
    const margin = revenue > 0 ? ((revenue - cost) / revenue) * 100 : 0;
    
    subtotal += revenue;
    totalCost += cost;

    return { ...item, cost, baseRevenue, revenue, margin };
  });

  const totalMargin = subtotal > 0 ? ((subtotal - totalCost) / subtotal) * 100 : 0;
  const isTotalMarginRed = totalMargin < 25;

  return (
    <div className="max-w-[1440px] mx-auto space-y-6">
      {/* Quote Header & Customer Info */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 bg-brand-surface border border-brand-gray-200 rounded-[16px] p-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-header font-bold text-brand-gray-900 tracking-tight mb-1">Aerospace Components Batch</h1>
          <div className="flex items-center gap-4 text-sm text-brand-gray-500">
            <span>Quote ID: <span className="text-brand-gray-900 font-mono">RFQ-2026-089</span></span>
            <span>•</span>
            <span>Date: <span className="text-brand-gray-900">Mar 23, 2026</span></span>
            <span>•</span>
            <span className="flex items-center gap-1 text-accent-amber"><AlertCircle className="w-3 h-3"/> Negotiating</span>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-x-12 gap-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-brand-gray-500 mb-1">Customer</p>
              <p className="text-sm font-medium text-brand-gray-900">Stratos Aerospace Inc.</p>
              <p className="text-sm text-brand-gray-600">Sarah Jenkins, VP Procurement</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-brand-gray-500 mb-1">Project Details</p>
              <p className="text-sm text-brand-gray-600">Q3 Production Run - Falcon 9 Program</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-brand-gray-200 text-brand-gray-700 rounded-[10px] hover:bg-brand-gray-50 transition-colors text-sm font-medium disabled:opacity-50 w-full md:w-auto shadow-sm"
          >
            <Download className={`w-4 h-4 ${isExporting ? 'animate-bounce' : ''}`} />
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-2 bg-accent-blue-primary text-white rounded-[10px] hover:bg-accent-blue-hover transition-colors text-sm font-medium w-full md:w-auto shadow-sm">
            <CheckCircle2 className="w-4 h-4" />
            Finalize Quote
          </button>
        </div>
      </div>

      {/* Quote Notes / Markdown Editor */}
      <div className="bg-brand-surface border border-brand-gray-200 rounded-[16px] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-header font-semibold text-brand-gray-900">Executive Summary</h2>
          <button 
            onClick={() => setIsEditingNotes(!isEditingNotes)}
            className="text-sm font-medium text-brand-gray-500 hover:text-accent-blue-primary flex items-center gap-2 transition-colors"
          >
            {isEditingNotes ? <><Save className="w-4 h-4"/> Save Notes</> : <><Edit2 className="w-4 h-4"/> Edit</>}
          </button>
        </div>
        {isEditingNotes ? (
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-48 bg-white border border-brand-gray-200 rounded-lg p-4 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors font-mono shadow-sm resize-y"
            placeholder="Write your quote notes here using Markdown..."
          />
        ) : (
          <div className="text-sm text-brand-gray-600 space-y-3 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-brand-gray-900 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mb-1 [&>strong]:font-semibold [&>strong]:text-brand-gray-900 [&>em]:italic">
            <ReactMarkdown>{notes}</ReactMarkdown>
          </div>
        )}
      </div>

      {/* Controls Row */}
      <div className="flex items-center justify-between mt-8 mb-2">
        <h2 className="text-xl font-header font-semibold text-brand-gray-900">Line Items</h2>
        
        {/* Internal Toggle */}
        <div className="flex items-center bg-brand-gray-50 border border-brand-gray-200 rounded-lg p-1">
          <button 
            onClick={() => setViewMode('client')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${viewMode === 'client' ? 'bg-white text-brand-gray-900 shadow-sm border border-brand-gray-200' : 'text-brand-gray-500 hover:text-brand-gray-700'}`}
          >
            <Eye className="w-3.5 h-3.5" /> Client View
          </button>
          <button 
            onClick={() => setViewMode('internal')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${viewMode === 'internal' ? 'bg-white text-brand-gray-900 shadow-sm border border-brand-gray-200' : 'text-brand-gray-500 hover:text-brand-gray-700'}`}
          >
            <EyeOff className="w-3.5 h-3.5" /> Internal View
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Left Column: Table & Upload */}
        <div className="xl:col-span-3 space-y-6">
          
          {/* Line Items Table Card */}
          <div className="bg-brand-surface border border-brand-gray-200 rounded-[16px] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-brand-gray-200 bg-brand-gray-50">
                    <th className="px-6 py-4 text-[11px] font-medium text-brand-gray-500 uppercase tracking-wider">Item / Description</th>
                    <th className="px-6 py-4 text-[11px] font-medium text-brand-gray-500 uppercase tracking-wider text-right">Qty</th>
                    {viewMode === 'internal' && (
                      <th className="px-6 py-4 text-[11px] font-medium text-brand-gray-500 uppercase tracking-wider text-right">Unit Cost</th>
                    )}
                    <th className="px-6 py-4 text-[11px] font-medium text-brand-gray-500 uppercase tracking-wider text-right">Unit Price</th>
                    <th className="px-6 py-4 text-[11px] font-medium text-brand-gray-500 uppercase tracking-wider text-right">Total</th>
                    {viewMode === 'internal' && (
                      <th className="px-6 py-4 text-[11px] font-medium text-brand-gray-500 uppercase tracking-wider text-right">Margin</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-gray-100">
                  {calculatedItems.map((item, idx) => {
                    const isRed = item.margin < 25;
                    return (
                      <tr key={item.id} className="hover:bg-brand-gray-50 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-brand-gray-900">{item.partName}</p>
                          <p className="text-xs text-brand-gray-500 mt-1">{item.description}</p>
                          <p className="text-[10px] text-brand-gray-400 font-mono mt-1">SKU: {item.sku}</p>
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-brand-gray-600">
                          {item.quantity.toLocaleString()}
                        </td>
                        
                        {viewMode === 'internal' && (
                          <td className="px-6 py-4 text-right text-sm text-brand-gray-500 font-mono">
                            ${(item.cost / item.quantity).toFixed(2)}
                          </td>
                        )}

                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end">
                            <div className="relative w-24">
                              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-brand-gray-400 text-sm">$</span>
                              <input 
                                type="number" 
                                className="w-full bg-white border border-brand-gray-200 hover:border-brand-gray-300 focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary rounded px-2 py-1 text-sm text-brand-gray-900 text-right outline-none transition-all font-mono shadow-sm"
                                value={(item.revenue / item.quantity).toFixed(2)}
                                onChange={(e) => {
                                  const newUnitPrice = Number(e.target.value);
                                  updateDiscount(item.id, newUnitPrice * item.quantity, item.baseRevenue);
                                }}
                              />
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-right text-sm font-medium text-brand-gray-900 font-mono">
                          ${item.revenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </td>

                        {viewMode === 'internal' && (
                          <td className="px-6 py-4 text-right">
                            <div className="flex flex-col items-end gap-1">
                              <span className={`text-sm font-bold font-mono ${isRed ? 'text-accent-red' : 'text-accent-green'}`}>
                                {item.margin.toFixed(1)}%
                              </span>
                              {isRed && (
                                <span className="text-[9px] uppercase tracking-wider text-accent-amber flex items-center gap-1">
                                  <AlertCircle className="w-2.5 h-2.5" /> Flagged
                                </span>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upload Area */}
          <div 
            className={`bg-brand-gray-50 border-2 border-dashed rounded-[16px] p-8 text-center transition-colors ${isUploading ? 'border-accent-blue-primary bg-accent-blue-light' : 'border-brand-gray-200 hover:border-accent-blue-primary'}`}
          >
            <UploadCloud className={`w-8 h-8 mx-auto mb-3 ${isUploading ? 'text-accent-blue-primary animate-bounce' : 'text-brand-gray-400'}`} />
            <p className="text-sm text-brand-gray-900 font-medium mb-1">
              {isUploading ? 'Processing RFQ...' : 'Drag & drop updated RFQ sheet here'}
            </p>
            <p className="text-xs text-brand-gray-500">
              Supports CSV, XLSX, PDF. Auto-maps columns using AI.
            </p>
            <button 
              onClick={handleUpload}
              disabled={isUploading}
              className="mt-4 px-4 py-2 text-xs font-medium text-brand-gray-700 bg-white border border-brand-gray-200 hover:bg-brand-gray-50 rounded-lg transition-colors shadow-sm"
            >
              Browse Files
            </button>
          </div>

        </div>

        {/* Right Column: Pricing Summary */}
        <div className="xl:col-span-1">
          <div className="bg-brand-surface border border-brand-gray-200 rounded-[16px] p-6 shadow-sm sticky top-24">
            <h3 className="text-sm font-medium text-brand-gray-500 uppercase tracking-wider mb-6">Pricing Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-brand-gray-600">Subtotal</span>
                <span className="text-sm text-brand-gray-900 font-mono">${subtotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              
              <AnimatePresence>
                {viewMode === 'internal' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex justify-between items-center py-2 border-t border-brand-gray-100">
                      <span className="text-sm text-brand-gray-500">Production Cost</span>
                      <span className="text-sm text-brand-gray-500 font-mono">${totalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-t border-brand-gray-100">
                      <span className="text-sm text-brand-gray-600">Gross Profit</span>
                      <span className="text-sm text-brand-gray-900 font-mono">${(subtotal - totalCost).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-t border-b border-brand-gray-100 mb-2">
                      <span className="text-sm text-brand-gray-600">Blended Margin</span>
                      <span className={`text-sm font-bold font-mono ${isTotalMarginRed ? 'text-accent-red' : 'text-accent-green'}`}>
                        {totalMargin.toFixed(1)}%
                      </span>
                    </div>
                    {isTotalMarginRed && (
                      <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-4 flex gap-2 items-start">
                        <AlertCircle className="w-4 h-4 text-accent-red shrink-0 mt-0.5" />
                        <p className="text-xs text-accent-red">Overall margin is below 25% threshold. Manager override required before finalizing.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between items-end pt-4 border-t border-brand-gray-200">
                <span className="text-sm font-medium text-brand-gray-900">Final Price</span>
                <span className="text-2xl font-bold text-accent-blue-primary font-mono">${subtotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-brand-gray-200">
              <p className="text-xs text-brand-gray-500 mb-3">Shareable Link</p>
              <div className="flex items-center gap-2 bg-brand-gray-50 border border-brand-gray-200 rounded-lg p-1.5">
                <input 
                  type="text" 
                  readOnly 
                  value="prospermfg.com/q/RFQ-2026-089" 
                  className="bg-transparent text-xs text-brand-gray-600 w-full outline-none px-2 font-mono"
                />
                <button className="px-3 py-1.5 bg-white border border-brand-gray-200 rounded-md text-xs font-medium text-brand-gray-700 hover:bg-brand-gray-50 transition-colors shadow-sm whitespace-nowrap">
                  Copy
                </button>
              </div>
              <div className="flex items-center gap-4 mt-4 text-[10px] text-brand-gray-500 uppercase tracking-wider">
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> Viewed 2x</span>
                <span>Last: 10m ago</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
