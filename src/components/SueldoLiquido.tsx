import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Info } from 'lucide-react';

interface SueldoCalculation {
  bruto: number;
  descuentoAFP: number;
  descuentoONP: number;
  impuestoRenta: number;
  liquido: number;
}

interface Props {
  sueldoBasico: string;
  setSueldoBasico: (value: string) => void;
}

const SueldoLiquido: React.FC<Props> = ({ sueldoBasico, setSueldoBasico }) => {
  const [tipoDescuento, setTipoDescuento] = useState<'afp' | 'onp'>('afp');
  const [porcentajeAFP, setPorcentajeAFP] = useState<string>('10.23');
  const [calculation, setCalculation] = useState<SueldoCalculation | null>(null);

  const UIT_2024 = 5150; // Unidad Impositiva Tributaria 2024
  const LIMITE_RENTA = (7 * UIT_2024) / 12; // 7 UIT anuales dividido entre 12 meses

  const calcularSueldoLiquido = () => {
    const bruto = parseFloat(sueldoBasico);
    if (!bruto || bruto <= 0) return;

    let descuentoAFP = 0;
    let descuentoONP = 0;
    let impuestoRenta = 0;

    // Descuentos por sistema de pensiones
    if (tipoDescuento === 'afp') {
      descuentoAFP = bruto * (parseFloat(porcentajeAFP) / 100);
    } else {
      descuentoONP = bruto * 0.13; // 13% ONP
    }

    // Impuesto a la Renta (5ta categoría)
    if (bruto > LIMITE_RENTA) {
      const baseImponible = bruto - LIMITE_RENTA;
      if (baseImponible <= 5 * UIT_2024 / 12) {
        impuestoRenta = baseImponible * 0.08; // 8%
      } else if (baseImponible <= 20 * UIT_2024 / 12) {
        impuestoRenta = (5 * UIT_2024 / 12) * 0.08 + (baseImponible - 5 * UIT_2024 / 12) * 0.14; // 14%
      } else if (baseImponible <= 35 * UIT_2024 / 12) {
        impuestoRenta = (5 * UIT_2024 / 12) * 0.08 + (15 * UIT_2024 / 12) * 0.14 + (baseImponible - 20 * UIT_2024 / 12) * 0.17; // 17%
      } else if (baseImponible <= 45 * UIT_2024 / 12) {
        impuestoRenta = (5 * UIT_2024 / 12) * 0.08 + (15 * UIT_2024 / 12) * 0.14 + (15 * UIT_2024 / 12) * 0.17 + (baseImponible - 35 * UIT_2024 / 12) * 0.20; // 20%
      } else {
        impuestoRenta = (5 * UIT_2024 / 12) * 0.08 + (15 * UIT_2024 / 12) * 0.14 + (15 * UIT_2024 / 12) * 0.17 + (10 * UIT_2024 / 12) * 0.20 + (baseImponible - 45 * UIT_2024 / 12) * 0.30; // 30%
      }
    }

    const liquido = bruto - descuentoAFP - descuentoONP - impuestoRenta;

    setCalculation({
      bruto,
      descuentoAFP,
      descuentoONP,
      impuestoRenta,
      liquido
    });
  };

  // Auto-calculate when sueldo changes
  useEffect(() => {
    if (sueldoBasico) {
      calcularSueldoLiquido();
    }
  }, [sueldoBasico, tipoDescuento, porcentajeAFP]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Calculator className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Calculadora de Sueldo Líquido</h2>
            <p className="text-gray-600">Calcula tu sueldo después de descuentos</p>
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
                Sistema de Pensiones
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="afp"
                    checked={tipoDescuento === 'afp'}
                    onChange={(e) => setTipoDescuento(e.target.value as 'afp')}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-gray-700">AFP (Sistema Privado)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="onp"
                    checked={tipoDescuento === 'onp'}
                    onChange={(e) => setTipoDescuento(e.target.value as 'onp')}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-gray-700">ONP (Sistema Nacional) - 13%</span>
                </label>
              </div>
            </div>

            {tipoDescuento === 'afp' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Porcentaje AFP (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={porcentajeAFP}
                  onChange={(e) => setPorcentajeAFP(e.target.value)}
                  placeholder="10.23"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <p className="text-xs text-gray-500 mt-1">Promedio aproximado: 10.23%</p>
              </div>
            )}
          </div>

          {calculation && sueldoBasico && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                Resultado del Cálculo
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-gray-700">Sueldo Bruto:</span>
                  <span className="font-semibold text-gray-900">S/ {calculation.bruto.toFixed(2)}</span>
                </div>
                
                {calculation.descuentoAFP > 0 && (
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-red-700">Descuento AFP:</span>
                    <span className="font-semibold text-red-800">-S/ {calculation.descuentoAFP.toFixed(2)}</span>
                  </div>
                )}
                
                {calculation.descuentoONP > 0 && (
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-red-700">Descuento ONP:</span>
                    <span className="font-semibold text-red-800">-S/ {calculation.descuentoONP.toFixed(2)}</span>
                  </div>
                )}
                
                {calculation.impuestoRenta > 0 && (
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-orange-700">Impuesto a la Renta:</span>
                    <span className="font-semibold text-orange-800">-S/ {calculation.impuestoRenta.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center p-4 bg-green-100 rounded-lg border-2 border-green-200">
                  <span className="text-green-800 font-medium">Sueldo Líquido:</span>
                  <span className="font-bold text-xl text-green-800">S/ {calculation.liquido.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Información importante:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>El Impuesto a la Renta aplica si tu sueldo anual supera 7 UIT (S/ {(7 * UIT_2024).toLocaleString()})</li>
                <li>Los porcentajes AFP varían según la entidad (Prima, Profuturo, Integra, Habitat)</li>
                <li>No incluye descuentos adicionales como préstamos o seguros opcionales</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SueldoLiquido;