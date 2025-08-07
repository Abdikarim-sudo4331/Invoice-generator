import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Bell, 
  Settings, 
  LogOut, 
  BarChart3, 
  DollarSign, 
  Clock, 
  Users,
  TrendingUp,
  Calendar,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Package
} from 'lucide-react';
import { useAuth } from './AuthContext';
import { useInvoices } from './InvoiceContext';
import { useInventory } from './InventoryContext';
import { formatCurrency, formatNumber } from '../utils/formatters';
import InventoryManagement from './InventoryManagement';
import InvoiceManagement from './InvoiceManagement';
import ClientManagement from './ClientManagement';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { invoices } = useInvoices();
  const { items: inventoryItems, getLowStockItems } = useInventory();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const lowStockItems = getLowStockItems();
  const totalRevenue = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0);
  const pendingPayments = invoices.filter(inv => inv.status === 'sent').reduce((sum, inv) => sum + inv.total, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const StatCard = ({ icon: Icon, title, value, change, color }: any) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{typeof value === 'number' ? formatCurrency(value) : value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <TrendingUp size={14} className="text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">{change}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Invoicely Pro</h1>
            <div className="hidden lg:flex items-center space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`font-medium ${activeTab === 'overview' ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('invoices')}
                className={`font-medium ${activeTab === 'invoices' ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Invoices
              </button>
              <button
                onClick={() => setActiveTab('inventory')}
                className={`font-medium ${activeTab === 'inventory' ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Inventory
              </button>
              <button
                onClick={() => setActiveTab('clients')}
                className={`font-medium ${activeTab === 'clients' ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Clients
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-32 md:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>
            <button className="hidden md:block p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Bell size={20} />
            </button>
            <button className="hidden md:block p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Settings size={20} />
            </button>
            <div className="flex items-center space-x-2 md:space-x-3 border-l pl-2 md:pl-4">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover"
              />
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-600">{user?.company}</p>
              </div>
              <button 
                onClick={logout}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex space-x-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${activeTab === 'overview' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${activeTab === 'invoices' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Invoices
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${activeTab === 'inventory' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Inventory
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${activeTab === 'clients' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Clients
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-4 md:p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={DollarSign}
                title="Total Revenue"
                value={totalRevenue}
                change="+12.5%"
                color="bg-gradient-to-r from-green-500 to-green-600"
              />
              <StatCard
                icon={FileText}
                title="Total Invoices"
                value={formatNumber(invoices.length)}
                change="+8.2%"
                color="bg-gradient-to-r from-blue-500 to-blue-600"
              />
              <StatCard
                icon={Clock}
                title="Pending Payments"
                value={pendingPayments}
                color="bg-gradient-to-r from-yellow-500 to-yellow-600"
              />
              <StatCard
                icon={Package}
                title="Low Stock Items"
                value={formatNumber(lowStockItems.length)}
                color="bg-gradient-to-r from-purple-500 to-purple-600"
              />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Invoices</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {invoices.slice(0, 5).map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <FileText size={20} className="text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{invoice.number}</p>
                          <p className="text-sm text-gray-600">{invoice.client.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{formatCurrency(invoice.total)}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'invoices' && (
          <InvoiceManagement />
        )}

        {activeTab === 'inventory' && (
          <InventoryManagement />
        )}

        {activeTab === 'clients' && (
          <ClientManagement />
        )}
      </main>
    </div>
  );
};

export default Dashboard;