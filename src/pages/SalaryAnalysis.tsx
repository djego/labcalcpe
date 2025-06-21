import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowLeft, TrendingUp, Calculator, Info } from 'lucide-react';
import Layout from '../components/Layout';

interface SalaryData {
  basicSalary: number;
  netSalaryAFP: number;
  netSalaryONP: number;
  afpDeduction: number;
  onpDeduction: number;
  incomeTax: number;
}

const SalaryAnalysis: React.FC = () => {
  const [pensionSystem, setPensionSystem] = useState<'both' | 'afp' | 'onp'>('both');
  const [afpPercentage, setAfpPercentage] = useState<number>(10.23);

  const UIT_2024 = 5150;
  const LIMITE_RENTA = (7 * UIT_2024) / 12;

  const calculateNetSalary = (basicSalary: number, system: 'afp' | 'onp'): { net: number; deduction: number; tax: number } => {
    let deduction = 0;
    let incomeTax = 0;

    // Pension system deductions
    if (system === 'afp') {
      deduction = basicSalary * (afpPercentage / 100);
    } else {
      deduction = basicSalary * 0.13; // 13% ONP
    }

    // Income tax calculation
    if (basicSalary > LIMITE_RENTA) {
      const baseImponible = basicSalary - LIMITE_RENTA;
      if (baseImponible <= 5 * UIT_2024 / 12) {
        incomeTax = baseImponible * 0.08;
      } else if (baseImponible <= 20 * UIT_2024 / 12) {
        incomeTax = (5 * UIT_2024 / 12) * 0.08 + (baseImponible - 5 * UIT_2024 / 12) * 0.14;
      } else if (baseImponible <= 35 * UIT_2024 / 12) {
        incomeTax = (5 * UIT_2024 / 12) * 0.08 + (15 * UIT_2024 / 12) * 0.14 + (baseImponible - 20 * UIT_2024 / 12) * 0.17;
      } else if (baseImponible <= 45 * UIT_2024 / 12) {
        incomeTax = (5 * UIT_2024 / 12) * 0.08 + (15 * UIT_2024 / 12) * 0.14 + (15 * UIT_2024 / 12) * 0.17 + (baseImponible - 35 * UIT_2024 / 12) * 0.20;
      } else {
        incomeTax = (5 * UIT_2024 / 12) * 0.08 + (15 * UIT_2024 / 12) * 0.14 + (15 * UIT_2024 / 12) * 0.17 + (10 * UIT_2024 / 12) * 0.20 + (baseImponible - 45 * UIT_2024 / 12) * 0.30;
      }
    }

    const net = basicSalary - deduction - incomeTax;
    return { net, deduction, tax: incomeTax };
  };

  const chartData = useMemo(() => {
    const data: SalaryData[] = [];
    
    for (let salary = 1100; salary <= 40000; salary += 100) {
      const afpResult = calculateNetSalary(salary, 'afp');
      const onpResult = calculateNetSalary(salary, 'onp');
      
      data.push({
        basicSalary: salary,
        netSalaryAFP: afpResult.net,
        netSalaryONP: onpResult.net,
        afpDeduction: afpResult.deduction,
        onpDeduction: onpResult.deduction,
        incomeTax: afpResult.tax, // Same for both systems
      });
    }
    
    return data;
  }, [afpPercentage]);

  const formatCurrency = (value: number) => `S/ ${value.toLocaleString()}`;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{`Sueldo Básico: ${formatCurrency(label)}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="font-medium">
              {`${entry.name}: ${formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Volver a Calculadoras</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Análisis de Sueldos</h1>
              <p className="text-gray-600">Comparación de sueldo líquido vs básico por rangos salariales</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sistema de Pensiones a Mostrar
              </label>
              <select
                value={pensionSystem}
                onChange={(e) => setPensionSystem(e.target.value as 'both' | 'afp' | 'onp')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="both">Ambos Sistemas (AFP y ONP)</option>
                <option value="afp">Solo AFP</option>
                <option value="onp">Solo ONP</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Porcentaje AFP (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="8"
                max="15"
                value={afpPercentage}
                onChange={(e) => setAfpPercentage(parseFloat(e.target.value) || 10.23)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <p className="text-xs text-gray-500 mt-1">Rango típico: 8% - 15%</p>
            </div>

            <div className="flex items-end">
              <div className="bg-blue-50 p-4 rounded-lg w-full">
                <div className="flex items-center space-x-2 mb-2">
                  <Calculator className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Rango de Análisis</span>
                </div>
                <p className="text-sm text-blue-700">S/ 1,100 - S/ 40,000</p>
                <p className="text-xs text-blue-600">Incrementos de S/ 100</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Comparación: Sueldo Básico vs Sueldo Líquido
            </h2>
            <p className="text-gray-600">
              Visualiza cómo los descuentos afectan tu sueldo líquido en diferentes rangos salariales
            </p>
          </div>

          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="basicSalary" 
                  tickFormatter={formatCurrency}
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  tickFormatter={formatCurrency}
                  stroke="#6b7280"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                
                {/* Basic Salary Line (Reference) */}
                <Line
                  type="monotone"
                  dataKey="basicSalary"
                  stroke="#9ca3af"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Sueldo Básico"
                  dot={false}
                />
                
                {/* Net Salary Lines */}
                {(pensionSystem === 'both' || pensionSystem === 'afp') && (
                  <Line
                    type="monotone"
                    dataKey="netSalaryAFP"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name={`Sueldo Líquido AFP (${afpPercentage}%)`}
                    dot={false}
                  />
                )}
                
                {(pensionSystem === 'both' || pensionSystem === 'onp') && (
                  <Line
                    type="monotone"
                    dataKey="netSalaryONP"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Sueldo Líquido ONP (13%)"
                    dot={false}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Insights */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Puntos Clave del Análisis</h3>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Impuesto a la Renta:</strong> Comienza a aplicar desde S/ {LIMITE_RENTA.toLocaleString()} mensuales
                </p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Sistema ONP:</strong> Descuento fijo del 13% sobre el sueldo bruto
                </p>
              </div>
              
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-800">
                  <strong>Sistema AFP:</strong> Descuento variable según la AFP elegida ({afpPercentage}% actual)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Info className="h-5 w-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Consideraciones Importantes</h3>
            </div>
            
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Los cálculos no incluyen descuentos adicionales como préstamos o seguros opcionales</p>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Los porcentajes AFP varían entre entidades (Prima, Profuturo, Integra, Habitat)</p>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>El análisis está basado en la normativa tributaria vigente para 2024</p>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Consulte con un especialista para casos específicos o situaciones particulares</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalaryAnalysis;