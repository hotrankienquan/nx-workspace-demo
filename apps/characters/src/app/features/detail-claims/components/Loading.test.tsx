import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loading from "./Loading";

describe("Loading component", () => {
  it("renders a circular progress indicator", () => {
    render(<Loading />);

    // MUI CircularProgress renders with role="progressbar"
    const progress = screen.getByRole("progressbar");
    expect(progress).toBeInTheDocument();
  });

  
});
