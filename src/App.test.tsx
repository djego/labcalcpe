import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
describe("App", () => {
  it("renders main header", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Calculadora Laboral Perú")).toBeInTheDocument();
    expect(screen.getByText("Herramientas para cálculos laborales")).toBeInTheDocument();
  });

  it("renders shared salary input", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Sueldo Básico Mensual (S/)")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ingresa tu sueldo básico una vez"),
    ).toBeInTheDocument();
  });

  it("renders all navigation tabs", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Sueldo Líquido")).toBeInTheDocument();
    expect(screen.getByText("CTS")).toBeInTheDocument();
    expect(screen.getByText("Gratificaciones")).toBeInTheDocument();
    expect(screen.getByText("Utilidades")).toBeInTheDocument();
    expect(screen.getByText("Vacaciones")).toBeInTheDocument();
  });

  it("switches between tabs correctly", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const ctsTab = screen.getByText("CTS");
    fireEvent.click(ctsTab);

    expect(screen.getByText("Calculadora de CTS")).toBeInTheDocument();
  });

  it("updates shared salary input", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const salaryInput = screen.getByPlaceholderText("Ingresa tu sueldo básico una vez");
    fireEvent.change(salaryInput, { target: { value: "3000" } });

    expect(salaryInput).toHaveValue(3000);
    expect(screen.getByText("S/ 3,000")).toBeInTheDocument();
  });

  it("shows salary confirmation when entered", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const salaryInput = screen.getByPlaceholderText("Ingresa tu sueldo básico una vez");
    fireEvent.change(salaryInput, { target: { value: "3000" } });

    expect(screen.getByText("Se usará en todos los cálculos")).toBeInTheDocument();
  });

  it("renders footer information", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(/Calculadora Laboral Perú - Herramienta para cálculos laborales/),
    ).toBeInTheDocument();
    expect(screen.getByText(/Los cálculos son referenciales/)).toBeInTheDocument();
  });

  it("starts with net salary calculator active", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Calculadora de Sueldo Líquido")).toBeInTheDocument();
  });
});
