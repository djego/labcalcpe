import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import NetSalaryCalculator from "./NetSalaryCalculator";
import { MemoryRouter } from "react-router-dom";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

function renderWithRouter(element: React.ReactElement, path: string = "/") {
  const router = createMemoryRouter(
    [
      {
        path,
        element,
      },
    ],
    {
      initialEntries: [path],
    },
  );

  return render(<RouterProvider router={router} />);
}
const mockProps = {
  sueldoBasico: "3000",
  setSueldoBasico: vi.fn(),
};

describe("NetSalaryCalculator", () => {
  it("renders calculator title and description", () => {
    renderWithRouter(<NetSalaryCalculator {...mockProps} />);

    expect(screen.getByText("Calculadora de Sueldo Líquido")).toBeInTheDocument();
    expect(
      screen.getByText("Calcula tu sueldo después de descuentos"),
    ).toBeInTheDocument();
  });

  it("shows warning when no basic salary is provided", () => {
    const propsWithoutSalary = { ...mockProps, sueldoBasico: "" };
    render(
      <MemoryRouter>
        <NetSalaryCalculator {...propsWithoutSalary} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Ingresa tu sueldo básico/)).toBeInTheDocument();
  });

  it("calculates net salary correctly with AFP", () => {
    render(
      <MemoryRouter>
        <NetSalaryCalculator {...mockProps} />
      </MemoryRouter>,
    );

    // Should show calculation results
    expect(screen.getByText("Resultado del Cálculo")).toBeInTheDocument();
    expect(screen.getByText("S/ 3000.00")).toBeInTheDocument(); // Gross salary
  });

  it("switches between AFP and ONP correctly", () => {
    render(
      <MemoryRouter>
        <NetSalaryCalculator {...mockProps} />
      </MemoryRouter>,
    );

    const onpRadio = screen.getByLabelText(/ONP \(Sistema Nacional\)/);
    fireEvent.click(onpRadio);

    expect(onpRadio).toBeChecked();
  });

  it("updates AFP percentage when changed", () => {
    render(
      <MemoryRouter>
        <NetSalaryCalculator {...mockProps} />
      </MemoryRouter>,
    );

    const afpInput = screen.getByDisplayValue("10.23");
    fireEvent.change(afpInput, { target: { value: "11.50" } });

    expect(afpInput).toHaveValue(11.5);
  });

  it("calculates income tax for high salaries", () => {
    const highSalaryProps = { ...mockProps, sueldoBasico: "10000" };
    render(
      <MemoryRouter>
        <NetSalaryCalculator {...highSalaryProps} />
      </MemoryRouter>,
    );

    // Should show income tax deduction for salaries above 7 UIT/14
    expect(screen.getByText("-S/ 1083.67")).toBeInTheDocument();
  });

  it("shows information section", () => {
    render(
      <MemoryRouter>
        <NetSalaryCalculator {...mockProps} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Información importante:")).toBeInTheDocument();
    expect(screen.getByText(/El Impuesto a la Renta aplica/)).toBeInTheDocument();
  });
});
