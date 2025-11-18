import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SidebarInstruct from "./SidebarInstruct";
import { CategoryType } from "../types/types";

describe("SidebarInstruct", () => {
  it("renders the categories heading", () => {
    const mockSetActiveCategory = jest.fn();
    render(<SidebarInstruct setActiveCategory={mockSetActiveCategory} />);

    expect(screen.getByText(/Categories/i)).toBeInTheDocument();
  });

  it("renders all category links", () => {
    const mockSetActiveCategory = jest.fn();
    render(<SidebarInstruct setActiveCategory={mockSetActiveCategory} />);

    expect(screen.getByText("Motor")).toBeInTheDocument();
  });

  it("calls setActiveCategory with correct category when clicked", () => {
    const mockSetActiveCategory = jest.fn();
    render(<SidebarInstruct setActiveCategory={mockSetActiveCategory} />);

    fireEvent.click(screen.getByText("Motor"));
    expect(mockSetActiveCategory).toHaveBeenCalledWith("Motor" as CategoryType);

  });
});
