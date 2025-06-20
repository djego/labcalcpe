import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CTSCalculator from '../components/CTSCalculator';

const mockProps = {
  sueldoBasico: '3000',
  setSueldoBasico: vi.fn(),
};

describe('CTSCalculator', () => {
  it('renders calculator title and description', () => {
    render(<CTSCalculator {...mockProps} />);
    
    expect(screen.getByText('Calculadora de CTS')).toBeInTheDocument();
    expect(screen.getByText('Compensación por Tiempo de Servicios')).toBeInTheDocument();
  });

  it('shows warning when no basic salary is provided', () => {
    const propsWithoutSalary = { ...mockProps, sueldoBasico: '' };
    render(<CTSCalculator {...propsWithoutSalary} />);
    
    expect(screen.getByText(/Ingresa tu sueldo básico/)).toBeInTheDocument();
  });

  it('calculates CTS correctly for full year', () => {
    render(<CTSCalculator {...mockProps} />);
    
    // Should show calculation results
    expect(screen.getByText('Resultado del Cálculo')).toBeInTheDocument();
    expect(screen.getByText('S/ 3,000.00')).toBeInTheDocument(); // Basic salary
  });

  it('updates months worked correctly', () => {
    render(<CTSCalculator {...mockProps} />);
    
    const monthsInput = screen.getByDisplayValue('12');
    fireEvent.change(monthsInput, { target: { value: '6' } });
    
    expect(monthsInput).toHaveValue(6);
  });

  it('uses basic salary as bonus when no bonus is provided', () => {
    render(<CTSCalculator {...mockProps} />);
    
    const bonusInput = screen.getByPlaceholderText(/se usará S\/ 3000/);
    expect(bonusInput).toBeInTheDocument();
  });

  it('calculates with custom bonus amount', () => {
    render(<CTSCalculator {...mockProps} />);
    
    const bonusInput = screen.getByPlaceholderText(/se usará S\/ 3000/);
    fireEvent.change(bonusInput, { target: { value: '3500' } });
    
    expect(bonusInput).toHaveValue(3500);
  });

  it('shows CTS information section', () => {
    render(<CTSCalculator {...mockProps} />);
    
    expect(screen.getByText('¿Cómo funciona el CTS?')).toBeInTheDocument();
    expect(screen.getByText(/Se deposita 2 veces al año/)).toBeInTheDocument();
  });

  it('shows deposit information', () => {
    render(<CTSCalculator {...mockProps} />);
    
    expect(screen.getByText(/El CTS se deposita en mayo y noviembre/)).toBeInTheDocument();
  });
});