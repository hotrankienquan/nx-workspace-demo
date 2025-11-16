import React from 'react';

import { render, screen } from "@testing-library/react";
import ContentClaims from "./ContentClaims";
import { BrowserRouter } from "react-router-dom";
import { DETAIL_CLAIMS_PATH } from "../utils/constants";
import '@testing-library/jest-dom';
import { ContentClaimsProps, IListClaims } from '../types/interface/list-claims';

const renderWithRouter = (ui: React.ReactNode) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe("ContentClaims component", () => {
  const baseProps: ContentClaimsProps = {
    loading: false,
    activeCategory: "Motor",
    claims: [],
    error: { name: "", message: "" },
  };

  test("renders loading state", () => {
    renderWithRouter(<ContentClaims {...baseProps} loading={true} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getByText(/Loading claims for Motor/i)).toBeInTheDocument();
  });

  test("renders error state", () => {
    const error = { message: "Something went wrong", name: "error name" };
    renderWithRouter(<ContentClaims {...baseProps} error={error} />);
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  test("renders empty claims state", () => {
    renderWithRouter(<ContentClaims {...baseProps} />);
    expect(
      screen.getByText(/No instructions found for the category: Cars/i)
    ).toBeInTheDocument();
  });

  test("renders claims list", () => {
    const claims: IListClaims[] = [
      {
        id: 'm1',
        category: 'Motor',
        title: 'AIOI Motor Claims',
        description: 'Motor Insurance',
      },
      {
        id: 'm2',
        category: 'Motor',
        title: 'Corporate Risk Motor Claim with Policy',
        description: 'Motor Insurance hiihi moto record2',
      },
    ];
    renderWithRouter(<ContentClaims {...baseProps} claims={claims} />);

    // Titles
    expect(screen.getByText("AIOI Motor Claims")).toBeInTheDocument();
    expect(screen.getByText("Corporate Risk Motor Claim with Policy")).toBeInTheDocument();

    // Descriptions
    expect(screen.getByText("Motor Insurance")).toBeInTheDocument();
    expect(screen.getByText("Motor Insurance hiihi moto record2")).toBeInTheDocument();

    // Links
    const link = screen.getByRole("link", { name: /AIOI Motor Claims/i });
    expect(link).toHaveAttribute("href", `${DETAIL_CLAIMS_PATH}/m1`);
  });
});
