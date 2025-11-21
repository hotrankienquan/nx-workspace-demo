/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

class ClaimsPage {
    elements = {
        fullNameInput: () => cy.get('input[placeholder*="Enter your full name"]'),
        emailInput: () => cy.get('input[placeholder*="Email"], input[name="email"]'),
        phoneInput1: () => cy.get('input[placeholder*="Enter your phone number"]'),
        saveAndContinueBtn: () => cy.contains('button', 'Save and continue'),

        countryDropdown: () => cy.get('#dropdown2'),
        countryOption: (country: string) => cy.xpath(`//li[text()='${country}']`),
        genderRadio: (gender: string) => cy.get(`input[name="radio2"][value="${gender}"]`),
        phoneInput2: () => cy.get('input[placeholder*="Enter your phone number"], input[name="phone2"]'),
        submitBtn: () => cy.contains('button', 'Submit claim')
    };

    fillPersonalInfo(name: string, email: string, phone: string) {
        this.elements.fullNameInput().type(name);
        this.elements.emailInput().type(email);
        this.elements.phoneInput1().type(phone);
        this.elements.saveAndContinueBtn().click();
    }

    fillAdditionalInfo(country: string, gender: string, phone: string) {
        this.elements.countryDropdown().click();
        this.elements.countryOption(country).click();
        this.elements.genderRadio(gender).check({ force: true });
        this.elements.phoneInput2().type(phone);
        this.elements.submitBtn().click();
    }
}

export default new ClaimsPage();