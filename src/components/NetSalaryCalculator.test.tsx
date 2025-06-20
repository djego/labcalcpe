import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NetSalaryCalculator from './NetSalaryCalculator';

const mockProps = {
  sueldoBasico: '3000',
  setSueldoBasico: vi.fn(),
};

describe('NetSalaryCalculator', () => {
  it('renders calculator title and description', () => {
    render(<NetSalaryCalculator {...mockProps} />);
    
    expect(screen.getByText('Calculadora de Sueldo Líquido')).toBeInTheDocument();
    expect(screen.getByText('Calcula tu sueldo después de descuentos')).toBeInTheDocument();
  });

  it('shows warning when no basic salary is provided', () => {
    const propsWithoutSalary = { ...mockProps, sueldoBasico: '' };
    render(<NetSalaryCalculator {...propsWithoutSalary} />);
    
    expect(screen.getByText(/Ingresa tu sueldo básico/)).toBeInTheDocument();
  });

  it('calculates net salary correctly with AFP', () => {
    render(<NetSalaryCalculator {...mockProps} />);
    
    // Should show calculation results
    expect(screen.getByText('Resultado del Cálculo')).toBeInTheDocument();
    expect(screen.getByText('S/ 3,000.00')).toBeInTheDocument(); // Gross salary
  });

  it('switches between AFP and ONP correctly', () => {
    render(<NetSalaryCalculator {...mockProps} />);
    
    const onpRadio = screen.getByLabelText(/ONP \(Sistema Nacional\)/);
    fireEvent.click(onpRadio);
    
    expect(onpRadio).toBeChecked();
  });

  it('updates AFP percentage when changed', () => {
    render(<NetSalaryCalculator {...mockProps} />);
    
    const afpInput = screen.getByDisplayValue('10.23');
    fireEvent.change(afpInput, { target: { value: '11.50' } });
    
    expect(afpInput).toHaveValue(11.5);
  });

  it('calculates income tax for high salaries', () => {
    const highSalaryProps = { ...mockProps, sueldoBasico: '10000' };
    render(<NetSalaryCalculator {...highSalaryProps} />);
    
    // Should show income tax deduction for salaries above 7 UIT/12
    expect(screen.getByText(/Impuesto a la Renta/)).toBeInTheDocument();
  });

  it('shows information section', () => {
    render(<NetSalaryCalculator {...mockProps} />);
    
    expect(screen.getByText('Información importante:')).toBeInTheDocument();
    expect(screen.getByText(/El Impuesto a la Renta aplica/)).toBeInTheDocument();
  });
});