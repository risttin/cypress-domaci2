/// <reference types="Cypress" />

class RegisterPage {

    get firstNameInput() {
        return cy.get('#first-name');
    }

    get validationMessage() {
        return cy.get('p');
    }

    get lastNameInput() {
        return cy.get('#last-name');
    }

    get emailInput() {
        return cy.get('#email')
    }

    get passwordInput() {
        return cy.get('#password')
    }

    get passwordConfirmationInput() {
        return cy.get('#password-confirmation')
    }

    get checkbox() {
        return cy.get(':checkbox')
    }

    get submitButton() {
        return cy.get('button')
    }

    registerNewUser(firstName, lastName, email, password) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.passwordConfirmationInput.type(password);
        this.checkbox.check();
        this.submitButton.click();
    }

    registerNewUserWithoutFirstName(lastName, email, password) {
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.passwordConfirmationInput.type(password);
        this.checkbox.check();
        this.submitButton.click();
    }

    registerNewUserWithoutLastName(firstName, email, password) {
        this.firstNameInput.type(firstName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.passwordConfirmationInput.type(password);
        this.checkbox.check();
        this.submitButton.click();
    }

    registerNewUserWithoutEmail(firstName, lastName, password) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.passwordInput.type(password);
        this.passwordConfirmationInput.type(password);
        this.checkbox.check();
        this.submitButton.click();
    }

    registerNewUseWithoutPassword(firstName, lastName, email, password) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordConfirmationInput.type(password);
        this.checkbox.check();
        this.submitButton.click();
    }

    registerNewUserWithoutPasswordConfirmation(firstName, lastName, email, password) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.checkbox.check();
        this.submitButton.click();
    }

    registerNewUserWithoutCheckbox(firstName, lastName, email, password) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.passwordConfirmationInput.type(password);
        this.submitButton.click();
    }

    registerNewUserWithWrongConfirmedPassword(firstName, lastName, email, password, confirmedPassword) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.passwordConfirmationInput.type(confirmedPassword);
        this.checkbox.check();
        this.submitButton.click();
    }
}

export const registerPage = new RegisterPage();