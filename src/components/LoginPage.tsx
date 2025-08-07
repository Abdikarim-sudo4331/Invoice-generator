import React, { useState } from 'react';
import { Mail, Lock, Chrome, Monitor, Loader2, Zap, BarChart3, FileText, Package } from 'lucide-react';
import { useAuth } from './AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginWithGoogle, loginWithMicrosoft, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 p-12 text-white relative overflow-hidden">
        {/* Floating Tech Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-16 opacity-20 animate-bounce">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
              <BarChart3 size={32} />
            </div>
          </div>
          <div className="absolute top-40 right-20 opacity-30 animate-pulse">
            <div className="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center">
              <Zap size={24} className="text-yellow-600" />
            </div>
          </div>
          <div className="absolute bottom-40 left-20 opacity-25 animate-bounce delay-300">
            <div className="w-14 h-14 bg-cyan-300 rounded-lg flex items-center justify-center">
              <FileText size={28} className="text-cyan-600" />
            </div>
          </div>
          <div className="absolute bottom-20 right-16 opacity-20 animate-pulse delay-500">
            <div className="text-6xl font-bold opacity-50">₹</div>
          </div>
          <div className="absolute top-1/2 left-1/4 opacity-15 animate-spin" style={{ animationDuration: '20s' }}>
            <div className="text-8xl">💼</div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-4">Invoicely Pro</h1>
            <p className="text-xl text-indigo-100 mb-8">Professional invoicing made effortless</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Zap className="text-yellow-300" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Lightning Fast</h3>
                <p className="text-indigo-100">Create invoices in seconds</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-green-300" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Smart Analytics</h3>
                <p className="text-indigo-100">Track payments and insights</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <FileText className="text-blue-300" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Professional Templates</h3>
                <p className="text-indigo-100">Beautiful, customizable designs</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Package className="text-purple-300" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Simple Inventory Management</h3>
                <p className="text-indigo-100">Track products and stock levels</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="lg:hidden mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoicely Pro</h1>
              <p className="text-gray-600">Professional invoicing made effortless</p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          {/* SSO Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={loginWithGoogle}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="animate-spin mr-2" size={18} />
              ) : (
                <Chrome className="mr-2" size={18} />
              )}
              Continue with Google
            </button>
            
            <button
              onClick={loginWithMicrosoft}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="animate-spin mr-2" size={18} />
              ) : (
                <Monitor className="mr-2" size={18} />
              )}
              Continue with Microsoft
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign up for free
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;