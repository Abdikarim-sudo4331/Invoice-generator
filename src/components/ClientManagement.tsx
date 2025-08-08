import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Eye,
  Printer
} from 'lucide-react';
import { formatNumber } from '../utils/formatters';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  contactPerson: string;
  taxId: string;
  status: 'active' | 'inactive';
  totalInvoices: number;
  totalRevenue: number;
  lastInvoiceDate: string;
  createdDate: string;
  notes: string;
}

const ClientManagement: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(() => {
    const savedClients = localStorage.getItem('trakvo_clients');
    if (savedClients) {
      return JSON.parse(savedClients);
    }
    return [
      {
        id: '1',
        name: 'Acme Corporation',
        email: 'billing@acmecorp.com',
        phone: '+1 (555) 123-4567',
        address: '123 Business St, City, State 12345',
        company: 'Acme Corp',
        contactPerson: 'John Smith',
        taxId: 'TAX123456789',
        status: 'active',
        totalInvoices: 15,
        totalRevenue: 487500,
        lastInvoiceDate: '2024-01-15',
        createdDate: '2023-06-15',
        notes: 'Preferred client with excellent payment history'
      },
      {
        id: '2',
        name: 'Tech Solutions Inc',
        email: 'accounts@techsolutions.com',
        phone: '+1 (555) 987-6543',
        address: '456 Tech Ave, Innovation City, TC 67890',
        company: 'Tech Solutions Inc',
        contactPerson: 'Sarah Johnson',
        taxId: 'TAX987654321',
        status: 'active',
        totalInvoices: 8,
        totalRevenue: 234000,
        lastInvoiceDate: '2024-01-20',
        createdDate: '2023-09-10',
        notes: 'New client, requires NET 30 payment terms'
      },
      {
        id: '3',
        name: 'Global Enterprises',
        email: 'finance@globalent.com',
        phone: '+1 (555) 456-7890',
        address: '789 Corporate Blvd, Metro City, MC 54321',
        company: 'Global Enterprises LLC',
        contactPerson: 'Michael Chen',
        taxId: 'TAX456789123',
        status: 'inactive',
        totalInvoices: 3,
        totalRevenue: 125000,
        lastInvoiceDate: '2023-11-30',
        createdDate: '2023-08-20',
        notes: 'On hold - payment issues resolved'
      }
    ];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [viewingClient, setViewingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    company: '',
    contactPerson: '',
    taxId: '',
    notes: ''
  });

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClient) {
      const updatedClients = clients.map(client => 
        client.id === editingClient.id 
          ? { 
              ...client, 
              ...formData,
              status: 'active' as const
            }
          : client
      );
      setClients(updatedClients);
      localStorage.setItem('trakvo_clients', JSON.stringify(updatedClients));
      setEditingClient(null);
    } else {
      const newClient: Client = {
        ...formData,
        id: Date.now().toString(),
        status: 'active',
        totalInvoices: 0,
        totalRevenue: 0,
        lastInvoiceDate: '',
        createdDate: new Date().toISOString().split('T')[0]
      };
      const updatedClients = [...clients, newClient];
      setClients(updatedClients);
      localStorage.setItem('trakvo_clients', JSON.stringify(updatedClients));
    }
    resetForm();
    setShowAddForm(false);
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
      company: client.company,
      contactPerson: client.contactPerson,
      taxId: client.taxId,
      notes: client.notes
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this client?')) {
      const updatedClients = clients.filter(client => client.id !== id);
      setClients(updatedClients);
      localStorage.setItem('trakvo_clients', JSON.stringify(updatedClients));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      company: '',
      contactPerson: '',
      taxId: '',
      notes: ''
    });
  };

  const handlePrintClientList = () => {
    const printContent = `
      <html>
        <head>
          <title>Client List - Invoicely Pro</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .company-name { font-size: 24px; font-weight: bold; color: #4f46e5; }
            .report-title { font-size: 18px; margin: 10px 0; }
            .date { color: #666; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f8f9fa; font-weight: bold; }
            .status { padding: 4px 8px; border-radius: 4px; font-size: 12px; }
            .active { background-color: #d1fae5; color: #065f46; }
            .inactive { background-color: #f3f4f6; color: #374151; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-name">Invoicely Pro</div>
            <div class="report-title">Client List</div>
            <div class="date">Generated on: ${new Date().toLocaleDateString()}</div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Total Invoices</th>
                <th>Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              ${clients.map(client => `
                <tr>
                  <td>${client.name}</td>
                  <td>${client.company}</td>
                  <td>${client.email}</td>
                  <td>${client.phone}</td>
                  <td><span class="status ${client.status}">${client.status.toUpperCase()}</span></td>
                  <td>${client.totalInvoices}</td>
                  <td>KSh ${client.totalRevenue.toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const activeClients = clients.filter(c => c.status === 'active').length;
  const totalRevenue = clients.reduce((sum, client) => sum + client.totalRevenue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Client Management</h2>
          <p className="text-gray-600 mt-1">Manage your clients and their information</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <button 
            onClick={handlePrintClientList}
            className="flex items-center px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
          >
            <Printer size={18} className="mr-2" />
            <span className="hidden sm:inline">Print List</span>
            <span className="sm:hidden">Print</span>
          </button>
          <button className="flex items-center px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
            <Filter size={18} className="mr-2" />
            Filter
          </button>
          <button className="flex items-center px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
            <Download size={18} className="mr-2" />
            Export
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-3 md:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
          >
            <Plus size={18} className="mr-2" />
            <span className="hidden sm:inline">Add Client</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clients</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(clients.length)}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Clients</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(activeClients)}</p>
            </div>
            <Building className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">KSh {totalRevenue.toLocaleString()}</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search clients by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Client Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Client</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Company</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Contact</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Invoices</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Revenue</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{client.name}</p>
                      <p className="text-xs md:text-sm text-gray-600">{client.contactPerson}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{client.company}</td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail size={14} className="mr-1" />
                        <span className="truncate max-w-[150px]">{client.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone size={14} className="mr-1" />
                        <span>{client.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                      {client.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{formatNumber(client.totalInvoices)}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">KSh {client.totalRevenue.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-1">
                      <button 
                        onClick={() => setViewingClient(client)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEdit(client)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(client.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingClient ? 'Edit Client' : 'Add New Client'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax ID</label>
                  <input
                    type="text"
                    value={formData.taxId}
                    onChange={(e) => setFormData({...formData, taxId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                >
                  {editingClient ? 'Update Client' : 'Add Client'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingClient(null);
                    resetForm();
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Client Modal */}
      {viewingClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Client Details</h3>
              <button
                onClick={() => setViewingClient(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Name:</strong> {viewingClient.name}</div>
                    <div><strong>Company:</strong> {viewingClient.company}</div>
                    <div><strong>Contact Person:</strong> {viewingClient.contactPerson}</div>
                    <div><strong>Tax ID:</strong> {viewingClient.taxId}</div>
                    <div><strong>Status:</strong> 
                      <span className={`ml-2 inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(viewingClient.status)}`}>
                        {viewingClient.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Mail size={16} className="mr-2 text-gray-400" />
                      {viewingClient.email}
                    </div>
                    <div className="flex items-center">
                      <Phone size={16} className="mr-2 text-gray-400" />
                      {viewingClient.phone}
                    </div>
                    <div className="flex items-start">
                      <MapPin size={16} className="mr-2 text-gray-400 mt-0.5" />
                      <span>{viewingClient.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Business Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">{viewingClient.totalInvoices}</div>
                    <div className="text-sm text-gray-600">Total Invoices</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">KSh {viewingClient.totalRevenue.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total Revenue</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {viewingClient.lastInvoiceDate ? new Date(viewingClient.lastInvoiceDate).toLocaleDateString() : 'N/A'}
                    </div>
                    <div className="text-sm text-gray-600">Last Invoice</div>
                  </div>
                </div>
              </div>

              {viewingClient.notes && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">{viewingClient.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;