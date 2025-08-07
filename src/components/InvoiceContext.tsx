import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface InvoiceItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Invoice {
  id: string;
  number: string;
  client: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  date: string;
  dueDate: string;
  notes: string;
}

interface InvoiceContextType {
  invoices: Invoice[];
  addInvoice: (invoice: Omit<Invoice, 'id'>) => void;
  updateInvoice: (id: string, updates: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  getInvoice: (id: string) => Invoice | undefined;
  generateInvoiceNumber: () => string;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const useInvoices = () => {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error('useInvoices must be used within an InvoiceProvider');
  }
  return context;
};

interface InvoiceProviderProps {
  children: ReactNode;
}

export const InvoiceProvider: React.FC<InvoiceProviderProps> = ({ children }) => {
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const savedInvoices = localStorage.getItem('invoicely_invoices');
    if (savedInvoices) {
      return JSON.parse(savedInvoices);
    }
    return [
      {
        id: '1',
        number: 'INV-001',
        client: {
          name: 'Acme Corp',
          email: 'billing@acmecorp.com',
          address: '123 Business St, City, State 12345',
          phone: '+1 (555) 123-4567'
        },
        items: [
          {
            id: '1',
            name: 'Web Development',
            description: 'Custom website development',
            quantity: 1,
            price: 325000,
            total: 325000
          }
        ],
        subtotal: 325000,
        tax: 32500,
        total: 357500,
        status: 'paid',
        date: '2024-01-15',
        dueDate: '2024-01-30',
        notes: 'Thank you for your business!'
      },
      {
        id: '2',
        number: 'INV-002',
        client: {
          name: 'Tech Solutions',
          email: 'accounts@techsolutions.com',
          address: '456 Tech Ave, Innovation City, TC 67890',
          phone: '+1 (555) 987-6543'
        },
        items: [
          {
            id: '1',
            name: 'Mobile App Development',
            description: 'iOS and Android app development',
            quantity: 1,
            price: 234000,
            total: 234000
          }
        ],
        subtotal: 234000,
        tax: 23400,
        total: 257400,
        status: 'sent',
        date: '2024-01-20',
        dueDate: '2024-02-05',
        notes: 'Payment due within 15 days'
      }
    ];
  });

  const addInvoice = (invoiceData: Omit<Invoice, 'id'>) => {
    const newInvoice: Invoice = {
      ...invoiceData,
      id: Date.now().toString()
    };
    const updatedInvoices = [...invoices, newInvoice];
    setInvoices(updatedInvoices);
    localStorage.setItem('invoicely_invoices', JSON.stringify(updatedInvoices));
  };

  const updateInvoice = (id: string, updates: Partial<Invoice>) => {
    const updatedInvoices = invoices.map(invoice => 
      invoice.id === id ? { ...invoice, ...updates } : invoice
    );
    setInvoices(updatedInvoices);
    localStorage.setItem('invoicely_invoices', JSON.stringify(updatedInvoices));
  };

  const deleteInvoice = (id: string) => {
    const updatedInvoices = invoices.filter(invoice => invoice.id !== id);
    setInvoices(updatedInvoices);
    localStorage.setItem('invoicely_invoices', JSON.stringify(updatedInvoices));
  };

  const getInvoice = (id: string) => {
    return invoices.find(invoice => invoice.id === id);
  };

  const generateInvoiceNumber = () => {
    const nextNumber = invoices.length + 1;
    return `INV-${nextNumber.toString().padStart(3, '0')}`;
  };

  const value = {
    invoices,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoice,
    generateInvoiceNumber
  };

  return (
    <InvoiceContext.Provider value={value}>
      {children}
    </InvoiceContext.Provider>
  );
};