import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import StageNavigation from "./StageNavigation";
import { FormStage } from "../types/claims.type";

describe("StageNavigation", () => {
  const stages:FormStage[] = [
    {
        id: 'personal info',
        title: 'Personal Information',
        description: 'Provide your personal details',
        fields: [
            {
                id: 'fullName',
                label: 'Full Name',
                type: 'text',
                validation: { required: true, minLength: 2 },
                placeholder: 'Enter your full name',
                options: [],
            },
            {
                id: 'email',
                label: 'Email',
                type: 'text',
                validation: { required: true },
                options: [],
                placeholder: 'Enter your email address',
            },
            {
                id: 'phone',
                label: 'Phone Number',
                type: 'text',
                placeholder: 'Enter your phone number',
                validation: { required: true, pattern: 'phone' },
                options: []
            },

        ],
    },
    {
        id: 'personal info 2',
        title: 'Personal Information 2',
        description: 'Provide your personal details',
        fields: [
            {
                id: 'fullName2',
                label: 'Full Name',
                type: 'text',
                validation: { required: true, minLength: 2 },
                placeholder: 'Enter your full name',
                options: [],
            },
            {
                id: 'email2',
                label: 'Email',
                type: 'text',
                validation: { required: true },
                options: [],
                placeholder: 'Enter your email address',
            },
            {
                id: 'phone2',
                label: 'Phone Number',
                type: 'text',
                placeholder: 'Enter your phone number',
                validation: { required: true, pattern: 'phone' },
                options: []
            },

        ],
    },
  ];

  it("renders all stage titles", () => {
    render(
      <StageNavigation
        stages={stages}
        completedStages={new Set()}
        currentStageIndex={0}
        onNavigate={jest.fn()}
      />
    );

    expect(screen.getByText("Personal Information")).toBeInTheDocument();
  });

  it("shows Completed chip for completed stages", () => {
    render(
      <StageNavigation
        stages={stages}
        completedStages={new Set([0])}
        currentStageIndex={1}
        onNavigate={jest.fn()}
      />
    );

    expect(screen.getByText("Personal Information 2")).toBeInTheDocument();
  });

 

  it("calls onNavigate when clicking a navigable stage", () => {
    const handleNavigate = jest.fn();

    render(
      <StageNavigation
        stages={stages}
        completedStages={new Set([0])}
        currentStageIndex={0}
        onNavigate={handleNavigate}
      />
    );

    fireEvent.click(screen.getByText("Personal Information 2"));
    expect(handleNavigate).toHaveBeenCalledWith(1);
  });

});
