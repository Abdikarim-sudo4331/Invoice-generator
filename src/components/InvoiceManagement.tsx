import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Printer,
  Send,
  DollarSign
} from 'lucide-react';
import { useInvoices, Invoice, InvoiceItem } from './InvoiceContext';
import { useInventory } from './InventoryContext';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { Client } from './ClientManagement';

const InvoiceManagement: React.FC = () => {
  const { invoices, addInvoice, updateInvoice, deleteInvoice, generateInvoiceNumber } = useInvoices();
  const { items: inventoryItems } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [companyLogo, setCompanyLogo] = useState<string>(() => {
    return localStorage.getItem('trakvo_company_logo') || '';
  });
  const [availableClients] = useState<Client[]>([
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
    }
  ]);
  const [formData, setFormData] = useState({
    selectedClientId: '',
    stage: 'draft' as 'draft' | 'final',
    client: {
      name: '',
      email: '',
      address: '',
      phone: ''
    },
    items: [] as InvoiceItem[],
    dueDate: '',
    notes: ''
  });

  const handleClientSelect = (clientId: string) => {
    const selectedClient = availableClients.find(c => c.id === clientId);
    if (selectedClient) {
      setFormData({
        ...formData,
        selectedClientId: clientId,
        client: {
          name: selectedClient.name,
          email: selectedClient.email,
          address: selectedClient.address,
          phone: selectedClient.phone
        }
      });
    }
  };

  const filteredInvoices = invoices.filter(invoice =>
    invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const addItemToInvoice = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      name: '',
      description: '',
      quantity: 1,
      price: 0,
      total: 0
    };
    setFormData({
      ...formData,
      items: [...formData.items, newItem]
    });
  };

  const updateInvoiceItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    if (field === 'quantity' || field === 'price') {
      updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].price;
    }
    
    setFormData({ ...formData, items: updatedItems });
  };

  const removeInvoiceItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index)
    });
  };

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { subtotal, tax, total } = calculateTotals();
    
    if (editingInvoice) {
      // Update existing invoice
      const updatedInvoice: Invoice = {
        ...editingInvoice,
        stage: formData.stage,
        client: formData.client,
        items: formData.items,
        subtotal,
        tax,
        total,
        dueDate: formData.dueDate,
        notes: formData.notes
      };
      updateInvoice(editingInvoice.id, updatedInvoice);
      setEditingInvoice(null);
    } else {
      // Create new invoice
      const newInvoice: Omit<Invoice, 'id'> = {
        number: generateInvoiceNumber(),
        stage: formData.stage,
        client: formData.client,
        items: formData.items,
        subtotal,
        tax,
        total,
        status: 'draft',
        date: new Date().toISOString().split('T')[0],
        dueDate: formData.dueDate,
        notes: formData.notes
      };
      addInvoice(newInvoice);
    }
    setShowCreateForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      selectedClientId: '',
      stage: 'draft',
      client: { name: '', email: '', address: '', phone: '' },
      items: [],
      dueDate: '',
      notes: ''
    });
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setFormData({
      selectedClientId: '',
      stage: invoice.stage,
      client: invoice.client,
      items: invoice.items,
      dueDate: invoice.dueDate,
      notes: invoice.notes
    });
    setShowCreateForm(true);
  };
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const logoData = event.target?.result as string;
        setCompanyLogo(logoData);
        localStorage.setItem('trakvo_company_logo', logoData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrintInvoice = (invoice: Invoice) => {
    const printContent = `
      <html>
        <head>
          <title>Invoice ${invoice.number} - Trakvo Pro</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 2px solid #4f46e5; padding-bottom: 20px; }
            .company-name { font-size: 28px; font-weight: bold; color: #4f46e5; }
            .invoice-title { font-size: 24px; font-weight: bold; }
            .invoice-number { font-size: 18px; color: #666; }
            .client-info, .invoice-details { margin: 20px 0; }
            .client-info h3, .invoice-details h3 { margin-bottom: 10px; color: #333; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 30px 0; }
            table { width: 100%; border-collapse: collapse; margin: 30px 0; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #f8f9fa; font-weight: bold; }
            .text-right { text-align: right; }
            .totals { margin-top: 20px; }
            .totals table { width: 300px; margin-left: auto; }
            .total-row { font-weight: bold; background-color: #f8f9fa; }
            .notes { margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px; }
            .footer { margin-top: 50px; text-align: center; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              ${companyLogo ? `<img src="${companyLogo}" alt="Company Logo" style="max-height: 60px; margin-bottom: 10px;">` : ''}
              <div class="company-name">Trakvo Pro</div>
              <div>Professional Invoice Management</div>
            </div>
            <div style="text-align: right;">
              <div class="invoice-title">INVOICE</div>
              <div class="invoice-number">${invoice.number}</div>
            </div>
          </div>
          
          <div class="info-grid">
            <div class="client-info">
              <h3>Bill To:</h3>
              <div><strong>${invoice.client.name}</strong></div>
              <div>${invoice.client.address}</div>
              <div>Email: ${invoice.client.email}</div>
              <div>Phone: ${invoice.client.phone}</div>
            </div>
            
            <div class="invoice-details">
              <h3>Invoice Details:</h3>
              <div><strong>Invoice Date:</strong> ${new Date(invoice.date).toLocaleDateString()}</div>
              <div><strong>Due Date:</strong> ${new Date(invoice.dueDate).toLocaleDateString()}</div>
              <div><strong>Status:</strong> ${invoice.status.toUpperCase()}</div>
              <div><strong>Stage:</strong> ${invoice.stage.toUpperCase()}</div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th class="text-right">Unit Price</th>
                <th class="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              ${invoice.items.map(item => `
                <tr>
                  <td>
                    <strong>${item.name}</strong>
                    ${item.description ? `<br><small>${item.description}</small>` : ''}
                  </td>
                  <td>${item.quantity}</td>
                  <td class="text-right">$${item.price.toFixed(2)}</td>
                  <td class="text-right">${formatCurrency(item.price).replace('KSh ', '')}</td>
                  <td class="text-right">${formatCurrency(item.total).replace('KSh ', '')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="totals">
            <table>
              <tr>
                <td><strong>Subtotal:</strong></td>
                <td class="text-right">${formatCurrency(invoice.subtotal)}</td>
              </tr>
              <tr>
                <td><strong>Tax (10%):</strong></td>
                <td class="text-right">${formatCurrency(invoice.tax)}</td>
              </tr>
              <tr class="total-row">
                <td><strong>Total:</strong></td>
                <td class="text-right"><strong>${formatCurrency(invoice.total)}</strong></td>
              </tr>
            </table>
          </div>
          
          ${invoice.notes ? `
            <div class="notes">
              <h3>Notes:</h3>
              <p>${invoice.notes}</p>
            </div>
          ` : ''}
          
          <div class="footer">
            <p>Thank you for your business!</p>
            <p>Generated by Trakvo Pro - Professional Invoice Management</p>
          </div>
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

  const totalRevenue = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0);
  const pendingAmount = invoices.filter(inv => inv.status === 'sent' || inv.status === 'in-progress').reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Invoice Management</h2>
          <p className="text-gray-600 mt-1">Create, manage, and track your invoices with draft and final stages</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <button className="flex items-center px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
            <Filter size={18} className="mr-2" />
            Filter
          </button>
          <button className="flex items-center px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
            <Download size={18} className="mr-2" />
            Export
          </button>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center px-3 md:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
          >
            <Plus size={18} className="mr-2" />
            <span className="hidden sm:inline">New Invoice</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Invoices</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(invoices.length)}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Amount</p>
             <p className="text-xl md:text-2xl font-bold text-gray-900">{formatCurrency(pendingAmount)}</p>
            </div>
            <Send className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Company Logo Upload */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Company Logo</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
            id="logo-upload"
          />
          <label
            htmlFor="logo-upload"
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer text-sm"
          >
            <Plus size={16} className="mr-2" />
            Upload Logo
          </label>
        </div>
        {companyLogo && (
          <div className="flex items-center space-x-4">
            <img src={companyLogo} alt="Company Logo" className="h-16 w-auto object-contain border rounded" />
            <button
              onClick={() => {
                setCompanyLogo('');
                localStorage.removeItem('trakvo_company_logo');
              }}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Remove Logo
            </button>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search invoices by number or client name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Invoice</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Stage</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Client</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Amount</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Due Date</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{invoice.number}</p>
                      <p className="text-xs md:text-sm text-gray-600">{new Date(invoice.date).toLocaleDateString()}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      invoice.stage === 'final' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {invoice.stage.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{invoice.client.name}</p>
                      <p className="text-xs md:text-sm text-gray-600 truncate max-w-[150px]">{invoice.client.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{formatCurrency(invoice.total)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {invoice.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-1">
                      <button 
                        onClick={() => setViewingInvoice(invoice)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handlePrintInvoice(invoice)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                      >
                        <Printer size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditInvoice(invoice)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                        disabled={invoice.stage === 'final'}
                        title={invoice.stage === 'final' ? 'Final invoices cannot be edited' : 'Edit invoice'}
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => deleteInvoice(invoice.id)}
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

      {/* Create Invoice Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingInvoice ? 'Edit Invoice' : 'Create New Invoice'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Client Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Stage</label>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({...formData, stage: e.target.value as 'draft' | 'final'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  >
                    <option value="draft">Draft (Editable)</option>
                    <option value="final">Final (Locked)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Client</label>
                  <select
                    value={formData.selectedClientId}
                    onChange={(e) => handleClientSelect(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select a client or enter manually</option>
                    {availableClients.map(client => (
                      <option key={client.id} value={client.id}>
                        {client.name} - {client.company}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">Client Information</h4>
              </div>

              {/* Client Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                  <input
                    type="text"
                    value={formData.client.name}
                    onChange={(e) => setFormData({...formData, client: {...formData.client, name: e.target.value}})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.client.email}
                    onChange={(e) => setFormData({...formData, client: {...formData.client, email: e.target.value}})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={formData.client.address}
                    onChange={(e) => setFormData({...formData, client: {...formData.client, address: e.target.value}})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.client.phone}
                    onChange={(e) => setFormData({...formData, client: {...formData.client, phone: e.target.value}})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Invoice Items */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-medium text-gray-900">Invoice Items</h4>
                  <button
                    type="button"
                    onClick={addItemToInvoice}
                    className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Item
                  </button>
                </div>
                
                {formData.items.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-2 mb-3 items-end">
                    <div className="col-span-4">
                      <input
                        type="text"
                        placeholder="Item name"
                        value={item.name}
                        onChange={(e) => updateInvoiceItem(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
                        required
                      />
                    </div>
                    <div className="col-span-3">
                      <input
                        type="text"
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => updateInvoiceItem(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
                      />
                    </div>
                    <div className="col-span-1">
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => updateInvoiceItem(index, 'quantity', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        value={item.price}
                        onChange={(e) => updateInvoiceItem(index, 'price', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
                        required
                      />
                    </div>
                    <div className="col-span-1">
                      <div className="px-3 py-2 text-sm font-medium text-gray-900">
                        KSh {item.total.toFixed(2)}
                      </div>
                    </div>
                    <div className="col-span-1">
                      <button
                        type="button"
                        onClick={() => removeInvoiceItem(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              {formData.items.length > 0 && (
                <div className="border-t pt-4">
                  <div className="flex justify-end">
                    <div className="w-64 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>KSh {calculateTotals().subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax (10%):</span>
                        <span>KSh {calculateTotals().tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total:</span>
                        <span>KSh {calculateTotals().total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Due Date and Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                >
                  {editingInvoice ? 'Update Invoice' : 'Create Invoice'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setEditingInvoice(null);
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

      {/* View Invoice Modal */}
      {viewingInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Invoice {viewingInvoice.number}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePrintInvoice(viewingInvoice)}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  <Printer size={16} className="mr-2" />
                  Print
                </button>
                <button
                  onClick={() => setViewingInvoice(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Client Information</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div><strong>{viewingInvoice.client.name}</strong></div>
                    <div>{viewingInvoice.client.email}</div>
                    <div>{viewingInvoice.client.address}</div>
                    <div>{viewingInvoice.client.phone}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Invoice Details</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div><strong>Stage:</strong> <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      viewingInvoice.stage === 'final' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {viewingInvoice.stage.toUpperCase()}
                    </span></div>
                    <div><strong>Date:</strong> {new Date(viewingInvoice.date).toLocaleDateString()}</div>
                    <div><strong>Due Date:</strong> {new Date(viewingInvoice.dueDate).toLocaleDateString()}</div>
                    <div><strong>Status:</strong> <span className={\`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(viewingInvoice.status)}`}>
                      {viewingInvoice.status.toUpperCase()}
                    </span></div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Items</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-2 text-sm font-medium text-gray-900">Description</th>
                        <th className="text-left px-4 py-2 text-sm font-medium text-gray-900">Qty</th>
                        <th className="text-right px-4 py-2 text-sm font-medium text-gray-900">Price</th>
                        <th className="text-right px-4 py-2 text-sm font-medium text-gray-900">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {viewingInvoice.items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-2">
                            <div className="font-medium text-gray-900">{item.name}</div>
                            {item.description && <div className="text-sm text-gray-600">{item.description}</div>}
                          </td>
                          <td className="px-4 py-2 text-gray-900">{item.quantity}</td>
                          <td className="px-4 py-2 text-right text-gray-900">KSh {item.price.toFixed(2)}</td>
                          <td className="px-4 py-2 text-right text-gray-900">{formatCurrency(item.price)}</td>
                          <td className="px-4 py-2 text-right font-medium text-gray-900">{formatCurrency(item.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="w-64 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(viewingInvoice.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>{formatCurrency(viewingInvoice.tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>{formatCurrency(viewingInvoice.total)}</span>
                  </div>
                </div>
              </div>
              
              {viewingInvoice.notes && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                  <p className="text-sm text-gray-600">{viewingInvoice.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceManagement;