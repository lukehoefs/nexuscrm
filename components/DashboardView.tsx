'use client';

import { 
  TrendingUp, 
  Users, 
  FileText, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 40000, margin: 24 },
  { name: 'Feb', revenue: 30000, margin: 22 },
  { name: 'Mar', revenue: 55000, margin: 28 },
  { name: 'Apr', revenue: 45000, margin: 26 },
  { name: 'May', revenue: 60000, margin: 31 },
  { name: 'Jun', revenue: 85000, margin: 34 },
];

const recentActivity = [
  { id: 1, action: 'Quote RFQ-2026-089 viewed', client: 'Stratos Aerospace', time: '10m ago', type: 'view' },
  { id: 2, action: 'New RFQ uploaded', client: 'Apex Dynamics', time: '1h ago', type: 'upload' },
  { id: 3, action: 'Quote RFQ-2026-088 approved', client: 'Nova Tech', time: '3h ago', type: 'approve' },
  { id: 4, action: 'Margin override requested', client: 'Quantum Systems', time: '5h ago', type: 'alert' },
];

export default function DashboardView() {
  return (
    <div className="max-w-[1440px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-header font-bold text-brand-gray-900 tracking-tight">Dashboard</h1>
        <div className="text-sm text-brand-gray-500">Last updated: Today, 10:42 AM</div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Pipeline" 
          value="$1.24M" 
          trend="+14.5%" 
          isPositive={true} 
          icon={<DollarSign className="w-5 h-5 text-accent-blue-primary" />} 
        />
        <MetricCard 
          title="Active Quotes" 
          value="24" 
          trend="+3" 
          isPositive={true} 
          icon={<FileText className="w-5 h-5 text-accent-blue-primary" />} 
        />
        <MetricCard 
          title="Win Rate" 
          value="68%" 
          trend="-2.4%" 
          isPositive={false} 
          icon={<TrendingUp className="w-5 h-5 text-accent-blue-primary" />} 
        />
        <MetricCard 
          title="Avg Margin" 
          value="32.4%" 
          trend="+1.2%" 
          isPositive={true} 
          icon={<Users className="w-5 h-5 text-accent-blue-primary" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-brand-surface border border-brand-gray-200 rounded-[16px] p-6 shadow-sm">
          <h2 className="text-lg font-header font-semibold text-brand-gray-900 mb-6">Revenue & Margin Trends</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0F172A', fontWeight: 500 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-brand-surface border border-brand-gray-200 rounded-[16px] p-6 shadow-sm">
          <h2 className="text-lg font-header font-semibold text-brand-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-accent-blue-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium text-brand-gray-900">{activity.action}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-brand-gray-600">{activity.client}</span>
                    <span className="text-xs text-brand-gray-400">• {activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-medium text-accent-blue-primary hover:text-accent-blue-hover transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, isPositive, icon }: { title: string, value: string, trend: string, isPositive: boolean, icon: React.ReactNode }) {
  return (
    <div className="bg-brand-surface border border-brand-gray-200 rounded-[16px] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-brand-gray-500">{title}</h3>
        <div className="p-2 bg-accent-blue-light rounded-lg">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold text-brand-gray-900 font-mono">{value}</div>
        <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-accent-green' : 'text-accent-red'}`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {trend}
        </div>
      </div>
    </div>
  );
}
