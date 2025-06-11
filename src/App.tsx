import React, { useState } from 'react';
import { Calculator, Coins, Gift, Calendar, Banknote, Users } from 'lucide-react';
import SueldoLiquido from './components/SueldoLiquido';
import CTSCalculator from './components/CTSCalculator';
import GratificacionCalculator from './components/GratificacionCalculator';
import UtilidadesCalculator from './components/UtilidadesCalculator';
import VacacionesCalculator from './components/VacacionesCalculator';

function App() {
  const [activeTab, setActiveTab] = useState('sueldo');

  const tabs = [
    { id: 'sueldo', label: 'Sueldo Líquido', icon: Calculator },
    { id: 'cts', label: 'CTS', icon: Coins },
    { id: 'gratificacion', label: 'Gratificaciones', icon: Gift },
    { id: 'utilidades', label: 'Utilidades', icon: Banknote },
    { id: 'vacaciones', label: 'Vacaciones', icon: Calendar },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'sueldo':
        return <SueldoLiquido />;
      case 'cts':
        return <CTSCalculator />;
      case 'gratificacion':
        return <GratificacionCalculator />;
      case 'utilidades':
        return <UtilidadesCalculator />;
      case 'vacaciones':
        return <VacacionesCalculator />;
      default:
        return <SueldoLiquido />;
    }
  };

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
                <h1 className="text-xl font-bold text-gray-900">Calculadora Laboral Perú</h1>
                <p className="text-sm text-gray-600">Herramientas para cálculos laborales</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveComponent()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Calculadora Laboral Perú - Herramienta para cálculos laborales según normativa peruana
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Los cálculos son referenciales. Consulte con un especialista para casos específicos.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;