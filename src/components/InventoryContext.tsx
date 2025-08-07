import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  sku: string;
  category: string;
  quantity: number;
  price: number;
  cost: number;
  supplier: string;
  lastUpdated: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

interface InventoryContextType {
  items: InventoryItem[];
  addItem: (item: Omit<InventoryItem, 'id' | 'lastUpdated'>) => void;
  updateItem: (id: string, updates: Partial<InventoryItem>) => void;
  deleteItem: (id: string) => void;
  getItem: (id: string) => InventoryItem | undefined;
  getLowStockItems: () => InventoryItem[];
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

interface InventoryProviderProps {
  children: ReactNode;
}

export const InventoryProvider: React.FC<InventoryProviderProps> = ({ children }) => {
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Wireless Headphones',
      description: 'Premium noise-cancelling wireless headphones',
      sku: 'WH-001',
      category: 'Electronics',
      quantity: 25,
      price: 25999,
      cost: 15600,
      supplier: 'TechSupply Co.',
      lastUpdated: '2024-01-15',
      status: 'in-stock'
    },
    {
      id: '2',
      name: 'Bluetooth Speaker',
      description: 'Portable waterproof Bluetooth speaker',
      sku: 'BS-002',
      category: 'Electronics',
      quantity: 8,
      price: 11699,
      cost: 7150,
      supplier: 'AudioTech Ltd.',
      lastUpdated: '2024-01-20',
      status: 'low-stock'
    },
    {
      id: '3',
      name: 'USB-C Cable',
      description: 'High-speed USB-C charging cable 6ft',
      sku: 'UC-003',
      category: 'Accessories',
      quantity: 0,
      price: 3249,
      cost: 1040,
      supplier: 'Cable Solutions',
      lastUpdated: '2024-01-18',
      status: 'out-of-stock'
    },
    {
      id: '4',
      name: 'Laptop Stand',
      description: 'Adjustable aluminum laptop stand',
      sku: 'LS-004',
      category: 'Accessories',
      quantity: 15,
      price: 10399,
      cost: 5850,
      supplier: 'Office Supplies Inc.',
      lastUpdated: '2024-01-22',
      status: 'in-stock'
    }
  ]);

  const addItem = (itemData: Omit<InventoryItem, 'id' | 'lastUpdated'>) => {
    const newItem: InventoryItem = {
      ...itemData,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString().split('T')[0],
      status: itemData.quantity > 10 ? 'in-stock' : itemData.quantity > 0 ? 'low-stock' : 'out-of-stock'
    };
    setItems(prev => [...prev, newItem]);
  };

  const updateItem = (id: string, updates: Partial<InventoryItem>) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, ...updates, lastUpdated: new Date().toISOString().split('T')[0] };
        updatedItem.status = updatedItem.quantity > 10 ? 'in-stock' : updatedItem.quantity > 0 ? 'low-stock' : 'out-of-stock';
        return updatedItem;
      }
      return item;
    }));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const getItem = (id: string) => {
    return items.find(item => item.id === id);
  };

  const getLowStockItems = () => {
    return items.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock');
  };

  const value = {
    items,
    addItem,
    updateItem,
    deleteItem,
    getItem,
    getLowStockItems
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};