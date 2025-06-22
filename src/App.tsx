import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Calculator, Coins, Gift, Calendar, Banknote } from "lucide-react";
import NetSalaryCalculator from "./components/NetSalaryCalculator";
import CTSCalculator from "./components/CTSCalculator";
import BonusCalculator from "./components/BonusCalculator";
import ProfitSharingCalculator from "./components/ProfitSharingCalculator";
import VacationCalculator from "./components/VacationCalculator";
import SalaryAnalysis from "./pages/SalaryAnalysis";
import Layout from "./components/Layout";

function HomePage() {
  const [activeTab, setActiveTab] = useState("sueldo");
  const [sueldoBasico, setSueldoBasico] = useState<string>("");

  const tabs = [
    { id: "sueldo", label: "Sueldo Líquido", icon: Calculator },
    { id: "cts", label: "CTS", icon: Coins },
    { id: "gratificacion", label: "Gratificaciones", icon: Gift },
    { id: "utilidades", label: "Utilidades", icon: Banknote },
    { id: "vacaciones", label: "Vacaciones", icon: Calendar },
  ];

  const renderActiveComponent = () => {
    const commonProps = {
      sueldoBasico,
      setSueldoBasico,
    };

    switch (activeTab) {
      case "sueldo":
        return <NetSalaryCalculator {...commonProps} />;
      case "cts":
        return <CTSCalculator {...commonProps} />;
      case "gratificacion":
        return <BonusCalculator {...commonProps} />;
      case "utilidades":
        return <ProfitSharingCalculator {...commonProps} />;
      case "vacaciones":
        return <VacationCalculator {...commonProps} />;
      default:
        return <NetSalaryCalculator {...commonProps} />;
    }
  };

  return (
    <Layout sueldoBasico={sueldoBasico} setSueldoBasico={setSueldoBasico}>
      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto md:flex-wrap md:overflow-visible">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
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
    </Layout>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/analysis" element={<SalaryAnalysis />} />
    </Routes>
  );
}

export default App;
