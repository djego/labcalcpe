import React, { useState, useEffect } from 'react';
import { Calendar, Sun, Info } from 'lucide-react';

interface VacacionesCalculation {
  sueldoBase: number;
  mesesTrabajados: number;
  diasVacaciones: number;
  montoVacaciones: number;
  vacacionesTruncas: number;
}

interface Props {
  sueldoBasico: string;
  setSueldoBasico: (value: string) => void;
}

const VacacionesCalculator: React.FC<Props> = ({ sueldoBasico }) => {
  const [meses, setMeses] = useState<string>('12');
  const [calculation, setCalculation] = useState<VacacionesCalculation | null>(null);

  const calcularVacaciones = () => {
    const sueldoBase = parseFloat(sueldoBasico);
    const mesesTrabajados = parseFloat(meses);

    if (!sueldoBase || !mesesTrabajados || sueldoBase <= 0 || mesesTrabajados <= 0) return;

    // Días de vacaciones por año: 30 días calendario
    const diasPorMes = 30 / 12; // 2.5 días por mes
    const diasVacaciones = diasPorMes * mesesTrabajados;
    
    // Monto de vacaciones = (sueldo / 30) * días de vacaciones
    const montoDiario = sueldoBase / 30;
    const montoVacaciones = montoDiario * diasVacaciones;
    
    // Vacaciones truncas (si no se completó el año)
    const vacacionesTruncas = mesesTrabajados < 12 ? montoVacaciones : 0;

    setCalculation({
      sueldoBase,
      mesesTrabajados,
      diasVacaciones,
      montoVacaciones,
      vacacionesTruncas
    });
  };

  // Auto-calculate when values change
  useEffect(() => {
    if (sueldoBasico) {
      calcularVacaciones();
    }
  }, [sueldoBasico, meses]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-teal-100 p-2 rounded-lg">
            <Calendar className="h-5 w-5 text-teal-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Calculadora de Vacaciones</h2>
            <p className="text-gray-600">Calcula tus días y monto de vacaciones</p>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              />
              <p className="text-xs text-gray-500 mt-1">Meses completos trabajados en el año</p>
            </div>
          </div>

          {calculation && sueldoBasico && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Sun className="h-5 w-5 mr-2 text-teal-600" />
                Resultado del Cálculo
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-gray-700">Sueldo Básico:</span>
                  <span className="font-semibold text-gray-900">S/ {calculation.sueldoBase.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-gray-700">Meses Trabajados:</span>
                  <span className="font-semibold text-gray-900">{calculation.mesesTrabajados}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-700">Días de Vacaciones:</span>
                  <span className="font-semibold text-blue-800">{calculation.diasVacaciones.toFixed(1)} días</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-teal-100 rounded-lg border-2 border-teal-200">
                  <span className="text-teal-800 font-medium">Monto de Vacaciones:</span>
                  <span className="font-bold text-xl text-teal-800">S/ {calculation.montoVacaciones.toFixed(2)}</span>
                </div>

                {calculation.vacacionesTruncas > 0 && (
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Vacaciones Truncas:</strong> S/ {calculation.vacacionesTruncas.toFixed(2)}
                      <br />
                      <span className="text-xs">Se pagan al término del contrato si no se tomaron las vacaciones</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 space-y-2">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>30 días calendario</strong> por año completo trabajado
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>2.5 días por mes</strong> trabajado (proporcional)
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 bg-teal-50 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Info className="h-5 w-5 text-teal-600 mt-0.5" />
            <div className="text-sm text-teal-800">
              <p className="font-medium mb-1">¿Cómo funcionan las vacaciones?</p>
              <ul className="list-disc list-inside space-y-1 text-teal-700">
                <li>Derecho a 30 días calendario por cada año completo de trabajo</li>
                <li>Se pueden acumular hasta 2 períodos vacacionales</li>
                <li>El trabajador puede vender hasta 15 días al empleador</li>
                <li>Si no se gozan, se pagan como "vacaciones truncas" al cese</li>
                <li>Se calculan en base al sueldo básico del mes anterior</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacacionesCalculator;