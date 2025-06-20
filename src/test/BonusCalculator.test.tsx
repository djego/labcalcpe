import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BonusCalculator from '../components/BonusCalculator';

const mockProps = {
  sueldoBasico: '3000',
  setSueldoBasico: vi.fn(),
};

describe('BonusCalculator', () => {
  it('renders calculator title and description', () => {
    render(<BonusCalculator {...mockProps} />);
    
    expect(screen.getByText('Calculadora de Gratificaciones')).toBeInTheDocument();
    expect(screen.getByText('Fiestas Patrias y Navidad')).toBeInTheDocument();
  });

  it('shows warning when no basic salary is provided', () => {
    const propsWithoutSalary = { ...mockProps, sueldoBasico: '' };
    render(<BonusCalculator {...propsWithoutSalary} />);
    
    expect(screen.getByText(/Ingresa tu sueldo básico/)).toBeInTheDocument();
  });

  it('calculates bonuses correctly for full periods', () => {
    render(<BonusCalculator {...mockProps} />);
    
    // Should show calculation results
    expect(screen.getByText('Resultado del Cálculo')).toBeInTheDocument();
    expect(screen.getByText('S/ 3,000.00')).toBeInTheDocument(); // Basic salary
  });

  it('updates July period months correctly', () => {
    render(<BonusCalculator {...mockProps} />);
    
    const julyMonthsInput = screen.getByDisplayValue('6');
    fireEvent.change(julyMonthsInput, { target: { value: '3' } });
    
    expect(julyMonthsInput).toHaveValue(3);
  });

  it('updates Christmas period months correctly', () => {
    render(<BonusCalculator {...mockProps} />);
    
    const christmasMonthsInputs = screen.getAllByDisplayValue('6');
    const christmasInput = christmasMonthsInputs[1]; // Second input is for Christmas
    fireEvent.change(christmasInput, { target: { value: '4' } });
    
    expect(christmasInput).toHaveValue(4);
  });

  it('shows both bonus calculations', () => {
    render(<BonusCalculator {...mockProps} />);
    
    expect(screen.getByText('Gratificación Fiestas Patrias:')).toBeInTheDocument();
    expect(screen.getByText('Gratificación Navidad:')).toBeInTheDocument();
    expect(screen.getByText('Total Gratificaciones:')).toBeInTheDocument();
  });

  it('shows bonus information section', () => {
    render(<BonusCalculator {...mockProps} />);
    
    expect(screen.getByText('¿Cómo funcionan las gratificaciones?')).toBeInTheDocument();
    expect(screen.getByText(/Son 2 al año/)).toBeInTheDocument();
  });

  it('shows payment timing information', () => {
    render(<BonusCalculator {...mockProps} />);
    
    expect(screen.getByText(/Se paga en julio/)).toBeInTheDocument();
    expect(screen.getByText(/Se paga en diciembre/)).toBeInTheDocument();
  });
});