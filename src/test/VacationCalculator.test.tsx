import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import VacationCalculator from '../components/VacationCalculator';

const mockProps = {
  sueldoBasico: '3000',
  setSueldoBasico: vi.fn(),
};

describe('VacationCalculator', () => {
  it('renders calculator title and description', () => {
    render(<VacationCalculator {...mockProps} />);
    
    expect(screen.getByText('Calculadora de Vacaciones')).toBeInTheDocument();
    expect(screen.getByText('Calcula tus días y monto de vacaciones')).toBeInTheDocument();
  });

  it('shows warning when no basic salary is provided', () => {
    const propsWithoutSalary = { ...mockProps, sueldoBasico: '' };
    render(<VacationCalculator {...propsWithoutSalary} />);
    
    expect(screen.getByText(/Ingresa tu sueldo básico/)).toBeInTheDocument();
  });

  it('calculates vacation correctly for full year', () => {
    render(<VacationCalculator {...mockProps} />);
    
    // Should show calculation results
    expect(screen.getByText('Resultado del Cálculo')).toBeInTheDocument();
    expect(screen.getByText('S/ 3,000.00')).toBeInTheDocument(); // Basic salary
    expect(screen.getByText('30.0 días')).toBeInTheDocument(); // Full year vacation days
  });

  it('updates months worked correctly', () => {
    render(<VacationCalculator {...mockProps} />);
    
    const monthsInput = screen.getByDisplayValue('12');
    fireEvent.change(monthsInput, { target: { value: '6' } });
    
    expect(monthsInput).toHaveValue(6);
  });

  it('calculates proportional vacation days', () => {
    render(<VacationCalculator {...mockProps} />);
    
    const monthsInput = screen.getByDisplayValue('12');
    fireEvent.change(monthsInput, { target: { value: '6' } });
    
    // Should show 15 days for 6 months (2.5 days per month)
    expect(screen.getByText('15.0 días')).toBeInTheDocument();
  });

  it('shows truncated vacation for incomplete year', () => {
    render(<VacationCalculator {...mockProps} />);
    
    const monthsInput = screen.getByDisplayValue('12');
    fireEvent.change(monthsInput, { target: { value: '8' } });
    
    // Should show truncated vacation message
    expect(screen.getByText(/Vacaciones Truncas/)).toBeInTheDocument();
  });

  it('shows vacation information section', () => {
    render(<VacationCalculator {...mockProps} />);
    
    expect(screen.getByText('¿Cómo funcionan las vacaciones?')).toBeInTheDocument();
    expect(screen.getByText(/Derecho a 30 días calendario/)).toBeInTheDocument();
  });

  it('shows vacation calculation breakdown', () => {
    render(<VacationCalculator {...mockProps} />);
    
    expect(screen.getByText('30 días calendario')).toBeInTheDocument();
    expect(screen.getByText('2.5 días por mes')).toBeInTheDocument();
  });
});