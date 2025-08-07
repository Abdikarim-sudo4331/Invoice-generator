import React from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import { InvoiceProvider } from './components/InvoiceContext';
import { InventoryProvider } from './components/InventoryContext';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  
  return user ? <Dashboard /> : <LoginPage />;
};

function App() {
  return (
    <AuthProvider>
      <InvoiceProvider>
        <InventoryProvider>
          <AppContent />
        </InventoryProvider>
      </InvoiceProvider>
    </AuthProvider>
  );
}

export default App;