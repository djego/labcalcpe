import React, { useState, useEffect } from 'react';
import { Gift, Star, Info } from 'lucide-react';

interface BonusCalculation {
  sueldoBase: number;
  mesesTrabajados: number;
  gratificacionJulio: number;
  gratificacionNavidad: number;
  total: number;
}

interface Props {
  sueldoBasico: string;
  setSueldoBasico: (value: string) => void;
}

const BonusCalculator: React.FC<Props> = ({ sueldoBasico }) => {
  const [mesesJulio, setMesesJulio] = useState<string>('6');
  const [mesesNavidad, setMesesNavidad] = useState<string>('6');
  const [calculation, setCalculation] = useState<BonusCalculation | null>(null);

  const calcularGratificaciones = () => {
    const sueldoBase = parseFloat(sueldoBasico);
    const mesesJ = parseFloat(mesesJulio);
    const mesesN = parseFloat(mesesNavidad);

    if (!sueldoBase || sueldoBase <= 0) return;

    // Gratificación de Fiestas Patrias (enero - junio)
    const gratificacionJulio = (sueldoBase * mesesJ) / 6;
    
    // Gratificación de Navidad (julio - diciembre)
    const gratificacionNavidad = (sueldoBase * mesesN) / 6;
    
    const total = gratificacionJulio + gratificacionNavidad;

    setCalculation({
      sueldoBase,
      mesesTrabajados: mesesJ + mesesN,
      gratificacionJulio,
      gratificacionNavidad,
      total
    });
  };

  // Auto-calculate when values change
  useEffect(() => {
    if (sueldoBasico) {
      calcularGratificaciones();
    }
  }, [sueldoBasico, mesesJulio, mesesNavidad]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-orange-100 p-2 rounded-lg">
            <Gift className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Calculadora de Gratificaciones</h2>
            <p className="text-gray-600">Fiestas Patrias y Navidad</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {!sueldoBasico && (
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Ingresa tu sueldo básico</strong> en la parte superior para comenzar los cálculos.
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meses Trabajados (Enero - Junio)
                </label>
                <input
                  type="number"
                  min="0"
                  max="6"
                  value={mesesJulio}
                  onChange={(e) => setMesesJulio(e.target.value)}
                  placeholder="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
                <p className="text-xs text-gray-500 mt-1">Para Fiestas Patrias</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meses Trabajados (Julio - Diciembre)
                </label>
                <input
                  type="number"
                  min="0"
                  max="6"
                  value={mesesNavidad}
                  onChange={(e) => setMesesNavidad(e.target.value)}
                  placeholder="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
                <p className="text-xs text-gray-500 mt-1">Para Navidad</p>
              </div>
            </div>
          </div>

          {calculation && sueldoBasico && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="h-5 w-5 mr-2 text-orange-600" />
                Resultado del Cálculo
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-gray-700">Sueldo Básico:</span>
                  <span className="font-semibold text-gray-900">S/ {calculation.sueldoBase.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-700">Gratificación Fiestas Patrias:</span>
                  <span className="font-semibold text-blue-800">S/ {calculation.gratificacionJulio.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-purple-700">Gratificación Navidad:</span>
                  <span className="font-semibold text-purple-800">S/ {calculation.gratificacionNavidad.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-orange-100 rounded-lg border-2 border-orange-200">
                  <span className="text-orange-800 font-medium">Total Gratificaciones:</span>
                  <span className="font-bold text-xl text-orange-800">S/ {calculation.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Fiestas Patrias:</strong> Se paga en julio (período enero-junio)
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-800">
                    <strong>Navidad:</strong> Se paga en diciembre (período julio-diciembre)
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 bg-orange-50 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Info className="h-5 w-5 text-orange-600 mt-0.5" />
            <div className="text-sm text-orange-800">
              <p className="font-medium mb-1">¿Cómo funcionan las gratificaciones?</p>
              <ul className="list-disc list-inside space-y-1 text-orange-700">
                <li>Son 2 al año: Fiestas Patrias (julio) y Navidad (diciembre)</li>
                <li>Equivalen a 1 sueldo cada una si trabajaste todo el semestre</li>
                <li>Se calculan proporcionalmente por meses trabajados</li>
                <li>También están afectas a descuentos (AFP/ONP)</li>
                <li>Incluyen asignación familiar si corresponde</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BonusCalculator;