describe('claims-e2e', () => {

  const extendedTimeout = { timeout: 8000 };

  beforeEach(() => {

    cy.visit('http://localhost:4200/remote1/detail-claims/m1');


    cy.contains('Claims Detail', extendedTimeout).should('be.visible');
    cy.contains('Claim ID: m1', extendedTimeout).should('be.visible');

  });

  it('should complete the entire claims form flow', () => {

    cy.contains('Personal Information').should('be.visible');

    cy.get('input[placeholder*="Enter your full name"]')
      .should('be.visible')
      .type('Nguyen Van A');

    cy.get('input[placeholder*="Email"], input[name="email"]')
      .should('be.visible')
      .type('nguyenvana@example.com');

    cy.get('input[placeholder*="Enter your phone number"]', extendedTimeout)
      .should('be.visible')
      .type('0901234567')
      .should('have.value', '0901234567');
      
    cy.contains('button', 'Save and continue', extendedTimeout)
      .should('be.visible')
      .click();
    cy.contains('Personal Information 2', extendedTimeout).should('be.visible');

    cy.get('#dropdown2').click();
    cy.contains('li', 'Vietnam', extendedTimeout).click();
    cy.get('input[name="radio2"][value="male"]')
      .should('exist')
      .check({ force: true })
      .should('be.checked');
    cy.get('input[placeholder*="Enter your phone number"], input[name="phone2"]')
      .should('be.visible')
      .type('0907654321')
      .should('have.value', '0907654321');

    cy.contains('button', 'Submit claim')
      .should('be.visible')
      .click();
  });


})