import React from 'react';
import { Users, DollarSign } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  sueldoBasico?: string;
  setSueldoBasico?: (value: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, sueldoBasico, setSueldoBasico }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Calculadora Laboral Perú
                </h1>
                <p className="text-sm text-gray-600">
                  Herramientas para cálculos laborales
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Shared Sueldo Básico Input */}
      {sueldoBasico !== undefined && setSueldoBasico && (
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1 max-w-md">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sueldo Básico Mensual (S/)
                </label>
                <input
                  type="number"
                  value={sueldoBasico}
                  onChange={(e) => setSueldoBasico(e.target.value)}
                  placeholder="Ingresa tu sueldo básico una vez"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              {sueldoBasico && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-green-600">S/ {parseFloat(sueldoBasico).toLocaleString()}</span>
                  <p className="text-xs text-gray-500">Se usará en todos los cálculos</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {children}

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Calculadora Laboral Perú - Herramienta para cálculos laborales según
              normativa peruana
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Los cálculos son referenciales. Consulte con un especialista para casos
              específicos.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;