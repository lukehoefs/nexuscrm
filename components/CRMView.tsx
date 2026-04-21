'use client';

import { useState } from 'react';
import { Search, Filter, MoreHorizontal, Mail, Phone, ExternalLink, Plus, X } from 'lucide-react';

const initialClients = [
  { id: 1, name: 'Stratos Aerospace', contact: 'Sarah Jenkins', email: 's.jenkins@stratos.com', status: 'Negotiating', lastContact: '2 hours ago', value: '$124,500', quotes: 3 },
  { id: 2, name: 'Apex Dynamics', contact: 'Marcus Chen', email: 'm.chen@apex.io', status: 'New', lastContact: '1 day ago', value: '$45,000', quotes: 1 },
  { id: 3, name: 'Nova Tech', contact: 'Elena Rodriguez', email: 'elena@novatech.co', status: 'Closed Won', lastContact: '3 days ago', value: '$280,000', quotes: 5 },
  { id: 4, name: 'Quantum Systems', contact: 'David Kim', email: 'dkim@quantum.sys', status: 'Quoted', lastContact: '5 hours ago', value: '$89,200', quotes: 2 },
  { id: 5, name: 'Horizon Robotics', contact: 'Amanda Vance', email: 'amanda.v@horizon.ai', status: 'Viewed', lastContact: '10 mins ago', value: '$15,800', quotes: 1 },
];

export default function CRMView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clients, setClients] = useState(initialClients);

  const [newClient, setNewClient] = useState({
    name: '',
    contact: '',
    email: '',
    value: '',
  });

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    const client = {
      id: clients.length + 1,
      name: newClient.name,
      contact: newClient.contact,
      email: newClient.email,
      status: 'New',
      lastContact: 'Just now',
      value: newClient.value ? `$${newClient.value}` : '$0',
      quotes: 0,
    };
    setClients([client, ...clients]);
    setIsAddModalOpen(false);
    setNewClient({ name: '', contact: '', email: '', value: '' });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'New': return 'bg-brand-gray-100 text-brand-gray-600 border-brand-gray-200';
      case 'Quoted': return 'bg-accent-blue-light text-accent-blue-primary border-accent-blue-primary/20';
      case 'Viewed': return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'Negotiating': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'Closed Won': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'Closed Lost': return 'bg-red-50 text-red-600 border-red-200';
      default: return 'bg-brand-gray-100 text-brand-gray-600 border-brand-gray-200';
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-[1440px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-header font-bold text-brand-gray-900 tracking-tight">Client Relationships</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-accent-blue-primary text-white rounded-lg text-sm font-medium hover:bg-accent-blue-hover transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-brand-surface border border-brand-gray-200 rounded-[16px] p-4 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-400" />
          <input 
            type="text" 
            placeholder="Search clients, contacts, or emails..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-brand-gray-50 border border-brand-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex items-center">
            <Filter className="w-4 h-4 absolute left-3 text-brand-gray-400 pointer-events-none" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-9 pr-8 py-2 bg-white border border-brand-gray-200 text-brand-gray-700 rounded-lg hover:bg-brand-gray-50 transition-colors text-sm font-medium shadow-sm w-full sm:w-auto appearance-none focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Quoted">Quoted</option>
              <option value="Viewed">Viewed</option>
              <option value="Negotiating">Negotiating</option>
              <option value="Closed Won">Closed Won</option>
              <option value="Closed Lost">Closed Lost</option>
            </select>
          </div>
        </div>
      </div>

      {/* CRM Table */}
      <div className="bg-brand-surface border border-brand-gray-200 rounded-[16px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-brand-gray-200 bg-brand-gray-50">
                <th className="px-6 py-4 text-[11px] font-medium text-brand-gray-500 uppercase tracking-wider">Client / Contact</th>
                <th className="px-6 py-4 text-[11px] font-medium text-brand-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-medium text-brand-gray-500 uppercase tracking-wider">Last Activity</th>
                <th className="px-6 py-4 text-[11px] font-medium text-brand-gray-500 uppercase tracking-wider text-right">Pipeline Value</th>
                <th className="px-6 py-4 text-[11px] font-medium text-brand-gray-500 uppercase tracking-wider text-right">Quotes</th>
                <th className="px-6 py-4 text-[11px] font-medium text-brand-gray-500 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-gray-100">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-brand-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-gray-100 border border-brand-gray-200 flex items-center justify-center text-sm font-bold text-brand-gray-600">
                          {client.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-brand-gray-900">{client.name}</p>
                          <p className="text-xs text-brand-gray-500 mt-0.5">{client.contact}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(client.status)}`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-brand-gray-600">{client.lastContact}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-sm font-medium text-brand-gray-900 font-mono">{client.value}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-sm text-brand-gray-600">{client.quotes}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a href={`mailto:${client.email}`} className="p-1.5 text-brand-gray-400 hover:text-accent-blue-primary hover:bg-accent-blue-light rounded-md transition-colors" title="Email Client">
                          <Mail className="w-4 h-4" />
                        </a>
                        <a href={`tel:+15550000000`} className="p-1.5 text-brand-gray-400 hover:text-accent-blue-primary hover:bg-accent-blue-light rounded-md transition-colors" title="Call Client">
                          <Phone className="w-4 h-4" />
                        </a>
                        <button className="p-1.5 text-brand-gray-400 hover:text-brand-gray-900 hover:bg-brand-gray-100 rounded-md transition-colors" title="View Details">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-brand-gray-500 text-sm">
                    No clients found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-gray-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[16px] shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-brand-gray-100">
              <h2 className="text-lg font-header font-bold text-brand-gray-900">Add New Client</h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-brand-gray-400 hover:text-brand-gray-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddClient} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">Company Name</label>
                <input 
                  type="text" 
                  required
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  className="w-full bg-white border border-brand-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors shadow-sm" 
                  placeholder="e.g. Acme Corp"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">Primary Contact</label>
                <input 
                  type="text" 
                  required
                  value={newClient.contact}
                  onChange={(e) => setNewClient({...newClient, contact: e.target.value})}
                  className="w-full bg-white border border-brand-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors shadow-sm" 
                  placeholder="e.g. Jane Doe"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  className="w-full bg-white border border-brand-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors shadow-sm" 
                  placeholder="jane@acme.com"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-brand-gray-700 uppercase tracking-wider">Estimated Pipeline Value</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-400 text-sm">$</span>
                  <input 
                    type="number" 
                    value={newClient.value}
                    onChange={(e) => setNewClient({...newClient, value: e.target.value})}
                    className="w-full bg-white border border-brand-gray-200 rounded-lg pl-7 pr-4 py-2.5 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors shadow-sm font-mono" 
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-brand-gray-600 hover:text-brand-gray-900 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-accent-blue-primary text-white rounded-lg text-sm font-medium hover:bg-accent-blue-hover transition-colors shadow-sm"
                >
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
