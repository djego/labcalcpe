import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProfitSharingCalculator from './ProfitSharingCalculator';

const mockProps = {
  sueldoBasico: '3000',
  setSueldoBasico: vi.fn(),
};

describe('ProfitSharingCalculator', () => {
  it('renders calculator title and description', () => {
    render(<ProfitSharingCalculator {...mockProps} />);
    
    expect(screen.getByText('Calculadora de Utilidades')).toBeInTheDocument();
    expect(screen.getByText('Participación en las utilidades de la empresa')).toBeInTheDocument();
  });

  it('shows warning when no basic salary is provided', () => {
    const propsWithoutSalary = { ...mockProps, sueldoBasico: '' };
    render(<ProfitSharingCalculator {...propsWithoutSalary} />);
    
    expect(screen.getByText(/Ingresa tu sueldo básico/)).toBeInTheDocument();
  });

  it('updates months worked correctly', () => {
    render(<ProfitSharingCalculator {...mockProps} />);
    
    const monthsInput = screen.getByDisplayValue('12');
    fireEvent.change(monthsInput, { target: { value: '10' } });
    
    expect(monthsInput).toHaveValue(10);
  });

  it('updates annual company income', () => {
    render(<ProfitSharingCalculator {...mockProps} />);
    
    const incomeInput = screen.getByPlaceholderText('Renta bruta anual de la empresa');
    fireEvent.change(incomeInput, { target: { value: '1000000' } });
    
    expect(incomeInput).toHaveValue(1000000);
  });

  it('shows different industry percentages', () => {
    render(<ProfitSharingCalculator {...mockProps} />);
    
    const select = screen.getByDisplayValue('8% - Empresas Industriales');
    expect(select).toBeInTheDocument();
    
    fireEvent.change(select, { target: { value: '10' } });
    expect(select).toHaveValue('10');
  });

  it('calculates profit sharing when all data is provided', () => {
    render(<ProfitSharingCalculator {...mockProps} />);
    
    // Add company income to trigger calculation
    const incomeInput = screen.getByPlaceholderText('Renta bruta anual de la empresa');
    fireEvent.change(incomeInput, { target: { value: '1000000' } });
    
    // Should show calculation results
    expect(screen.getByText('Estimación de Utilidades')).toBeInTheDocument();
  });

  it('shows profit sharing information section', () => {
    render(<ProfitSharingCalculator {...mockProps} />);
    
    expect(screen.getByText('¿Cómo funcionan las utilidades?')).toBeInTheDocument();
    expect(screen.getByText(/Se pagan cuando la empresa obtiene ganancias/)).toBeInTheDocument();
  });

  it('shows estimation disclaimer', () => {
    render(<ProfitSharingCalculator {...mockProps} />);
    
    // Add company income to show results
    const incomeInput = screen.getByPlaceholderText('Renta bruta anual de la empresa');
    fireEvent.change(incomeInput, { target: { value: '1000000' } });
    
    expect(screen.getByText(/Este es un cálculo estimado simplificado/)).toBeInTheDocument();
  });
});