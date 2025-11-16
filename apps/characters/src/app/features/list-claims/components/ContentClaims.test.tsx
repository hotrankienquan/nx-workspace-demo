import React from 'react';

import { render, screen } from "@testing-library/react";
import ContentClaims from "./ContentClaims";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import { ContentClaimsProps, IListClaims } from '../types/interface/list-claims';

const renderWithRouter = (ui: React.ReactNode) =>
  render(<BrowserRouter future={{ 
    v7_relativeSplatPath: true, 
  }}>{ui}</BrowserRouter>);

describe("ContentClaims component", () => {
  const baseProps: ContentClaimsProps = {
    loading: false,
    activeCategory: "Motor",
    claims: [],
    error: null,
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

    const props: ContentClaimsProps = {
      claims:[],
      activeCategory:'Motor',
      error: null,
      loading:false
    }

    render(<ContentClaims {...props} />);

    expect(
      screen.getByText(/No instructions found for the category: Motor./i)
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

    const props: ContentClaimsProps = {
      loading: false,
      activeCategory: "Motor",
      claims: claims,
      error: null,
    };
    renderWithRouter(<ContentClaims {...props} />);

    // Titles
    expect(screen.getByText(/AIOI Motor Claims/i)).toBeInTheDocument();
    expect(screen.getByText(/Corporate Risk Motor Claim with Policy/i)).toBeInTheDocument();

    // Descriptions
    expect(screen.getByText(/Motor Insurance hiihi moto record2/i)).toBeInTheDocument();

    const link = screen.getByRole("link", {
      name: /AIOI Motor Claims Motor Insurance/i,
    });
    expect(link).toHaveAttribute("href", "/detail-claims/m1");

  });
});
