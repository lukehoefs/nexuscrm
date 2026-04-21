'use client';

import { useState } from 'react';
import { Save, User, Building, CreditCard, Bell, Shield } from 'lucide-react';

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="max-w-[1440px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-header font-bold text-brand-gray-900 tracking-tight">Settings</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-accent-blue-light text-accent-blue-primary' : 'text-brand-gray-600 hover:bg-brand-gray-50 hover:text-brand-gray-900'}`}
            >
              <User className="w-4 h-4" /> Profile
            </button>
            <button 
              onClick={() => setActiveTab('company')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'company' ? 'bg-accent-blue-light text-accent-blue-primary' : 'text-brand-gray-600 hover:bg-brand-gray-50 hover:text-brand-gray-900'}`}
            >
              <Building className="w-4 h-4" /> Company Details
            </button>
            <button 
              onClick={() => setActiveTab('ratecard')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'ratecard' ? 'bg-accent-blue-light text-accent-blue-primary' : 'text-brand-gray-600 hover:bg-brand-gray-50 hover:text-brand-gray-900'}`}
            >
              <CreditCard className="w-4 h-4" /> Rate Card & Pricing
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'notifications' ? 'bg-accent-blue-light text-accent-blue-primary' : 'text-brand-gray-600 hover:bg-brand-gray-50 hover:text-brand-gray-900'}`}
            >
              <Bell className="w-4 h-4" /> Notifications
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-accent-blue-light text-accent-blue-primary' : 'text-brand-gray-600 hover:bg-brand-gray-50 hover:text-brand-gray-900'}`}
            >
              <Shield className="w-4 h-4" /> Security
            </button>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-brand-surface border border-brand-gray-200 rounded-[16px] p-6 lg:p-8 shadow-sm">
          
          {activeTab === 'profile' && (
            <div className="space-y-8 max-w-2xl">
              <div>
                <h2 className="text-lg font-header font-semibold text-brand-gray-900">Personal Information</h2>
                <p className="text-sm text-brand-gray-500 mt-1">Update your personal details and contact information.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">First Name</label>
                  <input type="text" defaultValue="John" className="w-full bg-white border border-brand-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">Last Name</label>
                  <input type="text" defaultValue="Doe" className="w-full bg-white border border-brand-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors shadow-sm" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">Email Address</label>
                  <input type="email" defaultValue="j.doe@prospermfg.com" className="w-full bg-white border border-brand-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors shadow-sm" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">Role</label>
                  <input type="text" defaultValue="Sales Engineer" disabled className="w-full bg-brand-gray-50 border border-brand-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-gray-500 cursor-not-allowed" />
                </div>
              </div>

              <div className="pt-6 border-t border-brand-gray-200 flex justify-end">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-accent-blue-primary text-white rounded-lg hover:bg-accent-blue-hover transition-colors text-sm font-medium shadow-sm">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'ratecard' && (
            <div className="space-y-8 max-w-3xl">
              <div>
                <h2 className="text-lg font-header font-semibold text-brand-gray-900">Rate Card & Pricing Rules</h2>
                <p className="text-sm text-brand-gray-500 mt-1">Configure base material costs, machine rates, and global margin thresholds.</p>
              </div>

              {/* Material Costs */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-brand-gray-900 border-b border-brand-gray-200 pb-2">Material Base Costs (per kg)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">Titanium Grade 5</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-400 text-sm">$</span>
                      <input type="number" defaultValue="45.00" className="w-full bg-white border border-brand-gray-200 rounded-lg pl-7 pr-4 py-2 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors shadow-sm font-mono" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">Aluminum 6061</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-400 text-sm">$</span>
                      <input type="number" defaultValue="4.50" className="w-full bg-white border border-brand-gray-200 rounded-lg pl-7 pr-4 py-2 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors shadow-sm font-mono" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">Carbon Fiber</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-400 text-sm">$</span>
                      <input type="number" defaultValue="32.00" className="w-full bg-white border border-brand-gray-200 rounded-lg pl-7 pr-4 py-2 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors shadow-sm font-mono" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Machine Rates */}
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-medium text-brand-gray-900 border-b border-brand-gray-200 pb-2">Machine Rates (per hour)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">5-Axis CNC</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-400 text-sm">$</span>
                      <input type="number" defaultValue="120.00" className="w-full bg-white border border-brand-gray-200 rounded-lg pl-7 pr-4 py-2 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors shadow-sm font-mono" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">3-Axis CNC</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-400 text-sm">$</span>
                      <input type="number" defaultValue="85.00" className="w-full bg-white border border-brand-gray-200 rounded-lg pl-7 pr-4 py-2 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors shadow-sm font-mono" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">Injection Molding</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-400 text-sm">$</span>
                      <input type="number" defaultValue="150.00" className="w-full bg-white border border-brand-gray-200 rounded-lg pl-7 pr-4 py-2 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors shadow-sm font-mono" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Margin Thresholds */}
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-medium text-brand-gray-900 border-b border-brand-gray-200 pb-2">Margin Thresholds</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">Target Margin (%)</label>
                    <div className="relative">
                      <input type="number" defaultValue="35" className="w-full bg-white border border-brand-gray-200 rounded-lg px-4 py-2 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors shadow-sm font-mono" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-gray-400 text-sm">%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">Warning Threshold (%)</label>
                    <div className="relative">
                      <input type="number" defaultValue="25" className="w-full bg-white border border-brand-gray-200 rounded-lg px-4 py-2 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors shadow-sm font-mono" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-gray-400 text-sm">%</span>
                    </div>
                    <p className="text-[10px] text-brand-gray-500 mt-1">Margins below this trigger a "Requires Override" warning.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-brand-gray-200 flex justify-end">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-accent-blue-primary text-white rounded-lg hover:bg-accent-blue-hover transition-colors text-sm font-medium shadow-sm">
                  <Save className="w-4 h-4" /> Save Pricing Rules
                </button>
              </div>
            </div>
          )}

          {activeTab === 'company' && (
            <div className="space-y-8 max-w-2xl">
              <div>
                <h2 className="text-lg font-header font-semibold text-brand-gray-900">Company Details</h2>
                <p className="text-sm text-brand-gray-500 mt-1">Manage your organization's profile and billing information.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">Company Name</label>
                  <input type="text" defaultValue="Prosper Manufacturing" className="w-full bg-white border border-brand-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors shadow-sm" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">Billing Address</label>
                  <input type="text" defaultValue="123 Industrial Pkwy, Suite 100" className="w-full bg-white border border-brand-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">City</label>
                  <input type="text" defaultValue="Detroit" className="w-full bg-white border border-brand-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">State / Province</label>
                  <input type="text" defaultValue="MI" className="w-full bg-white border border-brand-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">Postal Code</label>
                  <input type="text" defaultValue="48201" className="w-full bg-white border border-brand-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">Country</label>
                  <input type="text" defaultValue="United States" className="w-full bg-white border border-brand-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors shadow-sm" />
                </div>
              </div>

              <div className="pt-6 border-t border-brand-gray-200 flex justify-end">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-accent-blue-primary text-white rounded-lg hover:bg-accent-blue-hover transition-colors text-sm font-medium shadow-sm">
                  <Save className="w-4 h-4" /> Save Company Details
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-8 max-w-2xl">
              <div>
                <h2 className="text-lg font-header font-semibold text-brand-gray-900">Notifications</h2>
                <p className="text-sm text-brand-gray-500 mt-1">Manage how and when you receive alerts.</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between py-3 border-b border-brand-gray-100">
                  <div>
                    <h3 className="text-sm font-medium text-brand-gray-900">New Quote Requests</h3>
                    <p className="text-xs text-brand-gray-500 mt-0.5">Receive an email when a client submits a new RFQ.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-brand-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent-blue-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-blue-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-brand-gray-100">
                  <div>
                    <h3 className="text-sm font-medium text-brand-gray-900">Quote Approvals</h3>
                    <p className="text-xs text-brand-gray-500 mt-0.5">Get notified when a quote is approved by a client.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-brand-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent-blue-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-blue-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-brand-gray-100">
                  <div>
                    <h3 className="text-sm font-medium text-brand-gray-900">Margin Alerts</h3>
                    <p className="text-xs text-brand-gray-500 mt-0.5">Alerts when a quote falls below the target margin threshold.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-brand-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent-blue-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-blue-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-brand-gray-100">
                  <div>
                    <h3 className="text-sm font-medium text-brand-gray-900">Weekly Summary</h3>
                    <p className="text-xs text-brand-gray-500 mt-0.5">Receive a weekly email summary of pipeline and win rates.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-brand-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent-blue-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-blue-primary"></div>
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-brand-gray-200 flex justify-end">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-accent-blue-primary text-white rounded-lg hover:bg-accent-blue-hover transition-colors text-sm font-medium shadow-sm">
                  <Save className="w-4 h-4" /> Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8 max-w-2xl">
              <div>
                <h2 className="text-lg font-header font-semibold text-brand-gray-900">Security Settings</h2>
                <p className="text-sm text-brand-gray-500 mt-1">Manage your password and security preferences.</p>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-brand-gray-900 border-b border-brand-gray-200 pb-2">Change Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-white border border-brand-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors shadow-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-white border border-brand-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors shadow-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">Confirm New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-white border border-brand-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors shadow-sm" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <h3 className="text-sm font-medium text-brand-gray-900 border-b border-brand-gray-200 pb-2">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="text-sm font-medium text-brand-gray-900">Enable 2FA</h4>
                      <p className="text-xs text-brand-gray-500 mt-0.5">Add an extra layer of security to your account.</p>
                    </div>
                    <button className="px-4 py-2 bg-brand-gray-100 text-brand-gray-700 rounded-lg hover:bg-brand-gray-200 transition-colors text-sm font-medium">
                      Set Up
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-brand-gray-200 flex justify-end">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-accent-blue-primary text-white rounded-lg hover:bg-accent-blue-hover transition-colors text-sm font-medium shadow-sm">
                  <Save className="w-4 h-4" /> Update Security
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
