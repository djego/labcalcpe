import React, { useState } from 'react';
import { Coins, Calendar, Info } from 'lucide-react';

interface CTSCalculation {
  sueldoBase: number;
  gratificacionProporcional: number;
  remuneracionComputable: number;
  mesesTrabajados: number;
  cts: number;
}

const CTSCalculator: React.FC = () => {
  const [sueldo, setSueldo] = useState<string>('');
  const [meses, setMeses] = useState<string>('12');
  const [gratificacion, setGratificacion] = useState<string>('');
  const [calculation, setCalculation] = useState<CTSCalculation | null>(null);

  const calcularCTS = () => {
    const sueldoBase = parseFloat(sueldo);
    const mesesTrabajados = parseFloat(meses);
    const gratif = parseFloat(gratificacion) || sueldoBase; // Si no ingresa gratificación, usa el sueldo base

    if (!sueldoBase || !mesesTrabajados || sueldoBase <= 0 || mesesTrabajados <= 0) return;

    // Calcular 1/6 de la gratificación promedio
    const gratificacionProporcional = gratif / 6;
    
    // Remuneración computable = Sueldo + 1/6 de gratificación
    const remuneracionComputable = sueldoBase + gratificacionProporcional;
    
    // CTS = (Remuneración computable × meses trabajados) / 12
    const cts = (remuneracionComputable * mesesTrabajados) / 12;

    setCalculation({
      sueldoBase,
      gratificacionProporcional,
      remuneracionComputable,
      mesesTrabajados,
      cts
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-green-100 p-2 rounded-lg">
            <Coins className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Calculadora de CTS</h2>
            <p className="text-gray-600">Compensación por Tiempo de Servicios</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sueldo Básico Mensual (S/)
              </label>
              <input
                type="number"
                value={sueldo}
                onChange={(e) => setSueldo(e.target.value)}
                placeholder="Ingresa tu sueldo básico"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gratificación Promedio (S/)
              </label>
              <input
                type="number"
                value={gratificacion}
                onChange={(e) => setGratificacion(e.target.value)}
                placeholder="Opcional - se usará el sueldo básico"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
              <p className="text-xs text-gray-500 mt-1">Si no ingresa, se usará el sueldo básico</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meses Trabajados
              </label>
              <input
                type="number"
                min="1"
                max="12"
                value={meses}
                onChange={(e) => setMeses(e.target.value)}
                placeholder="12"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
              <p className="text-xs text-gray-500 mt-1">Para período completo: 12 meses</p>
            </div>

            <button
              onClick={calcularCTS}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              Calcular CTS
            </button>
          </div>

          {calculation && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-600" />
                Resultado del Cálculo
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-gray-700">Sueldo Básico:</span>
                  <span className="font-semibold text-gray-900">S/ {calculation.sueldoBase.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-gray-700">1/6 de Gratificación:</span>
                  <span className="font-semibold text-gray-900">S/ {calculation.gratificacionProporcional.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-700">Remuneración Computable:</span>
                  <span className="font-semibold text-blue-800">S/ {calculation.remuneracionComputable.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-gray-700">Meses Trabajados:</span>
                  <span className="font-semibold text-gray-900">{calculation.mesesTrabajados}</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-green-100 rounded-lg border-2 border-green-200">
                  <span className="text-green-800 font-medium">CTS Total:</span>
                  <span className="font-bold text-xl text-green-800">S/ {calculation.cts.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Depósitos:</strong> El CTS se deposita en mayo y noviembre (50% cada vez)
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 bg-green-50 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Info className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="text-sm text-green-800">
              <p className="font-medium mb-1">¿Cómo funciona el CTS?</p>
              <ul className="list-disc list-inside space-y-1 text-green-700">
                <li>Se deposita 2 veces al año: mayo y noviembre</li>
                <li>Equivale a 1 sueldo anual (sueldo + 1/6 de gratificación)</li>
                <li>Se calcula proporcionalmente por meses trabajados</li>
                <li>Es intangible (solo puedes retirar hasta 50% en casos específicos)</li>
                <li>Genera intereses en tu cuenta CTS</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTSCalculator;