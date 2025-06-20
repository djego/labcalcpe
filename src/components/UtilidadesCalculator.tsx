import React, { useState, useEffect } from 'react';
import { Banknote, TrendingUp, Info } from 'lucide-react';

interface UtilidadesCalculation {
  sueldoBase: number;
  mesesTrabajados: number;
  rentaAnual: number;
  porcentajeParticipacion: number;
  utilidades: number;
}

interface Props {
  sueldoBasico: string;
  setSueldoBasico: (value: string) => void;
}

const UtilidadesCalculator: React.FC<Props> = ({ sueldoBasico }) => {
  const [meses, setMeses] = useState<string>('12');
  const [rentaAnual, setRentaAnual] = useState<string>('');
  const [porcentaje, setPorcentaje] = useState<string>('8');
  const [calculation, setCalculation] = useState<UtilidadesCalculation | null>(null);

  const calcularUtilidades = () => {
    const sueldoBase = parseFloat(sueldoBasico);
    const mesesTrabajados = parseFloat(meses);
    const renta = parseFloat(rentaAnual);
    const porcentajeParticipacion = parseFloat(porcentaje);

    if (!sueldoBase || !mesesTrabajados || !renta || !porcentajeParticipacion) return;
    if (sueldoBase <= 0 || mesesTrabajados <= 0 || renta <= 0 || porcentajeParticipacion <= 0) return;

    // Calcular utilidades básicas
    // Fórmula: (Renta anual × % participación × meses trabajados × sueldo del trabajador) / (12 × suma total de sueldos de todos los trabajadores)
    // Simplificado: se asume que el trabajador participa proporcionalmente
    const participacionTotal = (renta * porcentajeParticipacion) / 100;
    const utilidades = (participacionTotal * mesesTrabajados * sueldoBase) / (12 * sueldoBase); // Simplificado para un trabajador

    setCalculation({
      sueldoBase,
      mesesTrabajados,
      rentaAnual: renta,
      porcentajeParticipacion,
      utilidades
    });
  };

  // Auto-calculate when values change
  useEffect(() => {
    if (sueldoBasico && rentaAnual) {
      calcularUtilidades();
    }
  }, [sueldoBasico, meses, rentaAnual, porcentaje]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Banknote className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Calculadora de Utilidades</h2>
            <p className="text-gray-600">Participación en las utilidades de la empresa</p>
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
                Meses Trabajados en el Año
              </label>
              <input
                type="number"
                min="1"
                max="12"
                value={meses}
                onChange={(e) => setMeses(e.target.value)}
                placeholder="12"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Renta Anual de la Empresa (S/)
              </label>
              <input
                type="number"
                value={rentaAnual}
                onChange={(e) => setRentaAnual(e.target.value)}
                placeholder="Renta bruta anual de la empresa"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
              <p className="text-xs text-gray-500 mt-1">Información proporcionada por la empresa</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Porcentaje de Participación (%)
              </label>
              <select
                value={porcentaje}
                onChange={(e) => setPorcentaje(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              >
                <option value="8">8% - Empresas Industriales</option>
                <option value="10">10% - Empresas Mineras</option>
                <option value="5">5% - Empresas Pesqueras</option>
                <option value="5">5% - Telecomunicaciones</option>
                <option value="5">5% - Empresas Comerciales</option>
              </select>
            </div>
          </div>

          {calculation && sueldoBasico && rentaAnual && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                Estimación de Utilidades
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-gray-700">Tu Sueldo Mensual:</span>
                  <span className="font-semibold text-gray-900">S/ {calculation.sueldoBase.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-gray-700">Meses Trabajados:</span>
                  <span className="font-semibold text-gray-900">{calculation.mesesTrabajados}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-700">Renta Anual Empresa:</span>
                  <span className="font-semibold text-blue-800">S/ {calculation.rentaAnual.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                  <span className="text-indigo-700">% Participación:</span>
                  <span className="font-semibold text-indigo-800">{calculation.porcentajeParticipacion}%</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-purple-100 rounded-lg border-2 border-purple-200">
                  <span className="text-purple-800 font-medium">Utilidades Estimadas:</span>
                  <span className="font-bold text-xl text-purple-800">S/ {calculation.utilidades.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Nota:</strong> Este es un cálculo estimado simplificado. El monto real depende del total de trabajadores y sus sueldos.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 bg-purple-50 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Info className="h-5 w-5 text-purple-600 mt-0.5" />
            <div className="text-sm text-purple-800">
              <p className="font-medium mb-1">¿Cómo funcionan las utilidades?</p>
              <ul className="list-disc list-inside space-y-1 text-purple-700">
                <li>Se pagan cuando la empresa obtiene ganancias</li>
                <li>El porcentaje varía según el sector de la empresa</li>
                <li>Se reparten proporcionalmente entre todos los trabajadores</li>
                <li>Se pagan hasta 30 días después de presentar la declaración anual</li>
                <li>Están exoneradas del Impuesto a la Renta hasta 18 UIT</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilidadesCalculator;