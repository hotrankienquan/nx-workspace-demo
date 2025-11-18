import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorClaimsComp from "./ErrorClaimsComp";

describe("ErrorClaimsComp", () => {
  it("renders the error alert with correct message", () => {
    //Given
    render(<ErrorClaimsComp />);
    //When and Then
    expect(
      screen.getByText(/Fail to load claim form\. Please try again later/i)
    ).toBeInTheDocument();
    //When
    const alert = screen.getByRole("alert");
    //Then
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass("MuiAlert-standardError");
  });
});
