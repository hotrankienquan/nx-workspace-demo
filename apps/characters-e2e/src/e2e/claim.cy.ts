import ClaimsPage from '../pages/claimPage';
import 'cypress-xpath';


describe('claims-e2e', () => {
  const extendedTimeout = { timeout: 8000 };

  beforeEach(() => {
    cy.visit('http://localhost:4200/remote1/detail-claims/m1');
    cy.contains('Claims Detail', extendedTimeout).should('be.visible');
    cy.contains('Claim ID: m1', extendedTimeout).should('be.visible');
  });

  it('should complete the entire claims form flow', () => {
    cy.contains('Personal Information').should('be.visible');

    ClaimsPage.fillPersonalInfo('Nguyen Van A', 'nguyenvana@example.com', '0901234567');

    cy.contains('Personal Information 2', extendedTimeout).should('be.visible');

    ClaimsPage.fillAdditionalInfo('Vietnam', 'male', '0907654321');
  });
});
