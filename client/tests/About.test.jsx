import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";
import About from "../src/Pages/About";
import React from "react";

describe("About Component", () => {
  it("renders the About component with h1", () => {
    renderWithProviders(<About />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/About Aleef/i);
  });

  it("contains mission statement", () => {
    renderWithProviders(<About />);
    expect(screen.getByText(/Our Mission/i)).toBeInTheDocument();
  });

  it("displays Ariam Al Hasani as Lead Developer", () => {
    renderWithProviders(<About />);
    expect(screen.getByText(/Ariam Al Hasani/i)).toBeInTheDocument();
    expect(screen.getByText(/Lead Developer & Designer/i)).toBeInTheDocument();
  });

  it("displays Anwar Al Daeri as Web Developer", () => {
    renderWithProviders(<About />);
    expect(screen.getByText(/Anwar Al Daeri/i)).toBeInTheDocument();
    expect(screen.getByText(/Web Developer/i)).toBeInTheDocument();
  });
});
