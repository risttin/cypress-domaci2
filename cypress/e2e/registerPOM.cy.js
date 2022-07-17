/// <reference types="Cypress" />

import { allGalleriesPage } from '../page_objects/allGalleriesPage.js'
import { registerPage } from '../page_objects/registerPage.js'


const faker = require('@faker-js/faker')

describe('Register Page', () => {

    let fakeUser = {
        randomFirstName: faker.name.firstName(),
        randomLastName: faker.name.lastName(),
        randomEmail: faker.internet.email(),
        randomPassword: faker.internet.password(10, true, /[A-Z]/, '1'),
        whitespaceRandomPassword: faker.internet.password(8, true , /[A-Z]/, '1 '),
        onlyNumbersPassword: '12345678',       //faker.random.numeric(8) -  > faker.random.numeric is not a function
        twoFiftyFiveChars: faker.random.alphaNumeric(255),
        oneChar: faker.random.alphaNumeric(1),
        unocodeChars: 'まる子',
        specialCharsFirstName: 'Marko-Marko',
        specialCharsLastName: 'O\'Connor'
    }

    let invalidFakeUser = {
        twoFiftySixChars: faker.random.alphaNumeric(256)
    }
  
    beforeEach('', () => {
        cy.visit('/register');
        cy.url().should('contains', '/register')
        fakeUser.randomEmail = faker.internet.email();
    })

    it('Register Without Providing Data', () => {
        registerPage.submitButton.click();
        cy.url().should('include', '/register');
    })

    it('Register without Providing First Name', () => {
        registerPage.registerNewUserWithoutFirstName(fakeUser.randomLastName, fakeUser.randomEmail, fakeUser.randomPassword);
        registerPage.firstNameInput.should('exist')
        cy.url().should('include', '/register')
    })

    it('Register by Providing Whitespace into First Name', () => {
        registerPage.registerNewUser(' ', fakeUser.randomLastName, fakeUser.randomEmail, fakeUser.randomPassword);
        registerPage.firstNameInput.should('exist');
        registerPage.validationMessage.should('exist')
            .and('be.visible')
            .and('have.text', 'The first name field is required.')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.class', 'alert')
        cy.url().should('contain', '/register');
    })

    it('Register by Putting 256 Chars in First Name', () => {
        registerPage.registerNewUser(invalidFakeUser.twoFiftySixChars, fakeUser.randomLastName, fakeUser.randomEmail, fakeUser.randomPassword);
        cy.url().should('contain', '/register')
    })

    it('Register without Providing Last Name', () => {
        registerPage.registerNewUserWithoutLastName(fakeUser.randomFirstName, fakeUser.randomEmail, fakeUser.randomPassword);
        registerPage.lastNameInput.should('exist')
        cy.url().should('include', '/register')
    })

    it('Register by Providing Whitespace into Last Name', () => {
        registerPage.registerNewUser(fakeUser.randomFirstName, ' ', fakeUser.randomEmail, fakeUser.randomPassword);
        registerPage.lastNameInput.should('exist');
        registerPage.validationMessage.should('exist')
            .and('be.visible')
            .and('have.text', 'The last name field is required.')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
        cy.url().should('contain', '/register');
    })

    it('Register by Putting 256 Chars in Last Name', () => {
        registerPage.registerNewUser(fakeUser.randomFirstName, invalidFakeUser.twoFiftySixChars, fakeUser.randomEmail, fakeUser.randomPassword);
        cy.url().should('contain', '/register')
    })

    it('Register without Providing Email', () => {
        registerPage.registerNewUserWithoutEmail(fakeUser.randomFirstName, fakeUser.randomLastName, fakeUser.randomPassword);
        registerPage.emailInput.should('exist')
        cy.url().should('include', '/register')
    })

    it('Register by Providing Whitespace into Email', () => {
        registerPage.registerNewUser(fakeUser.randomFirstName, fakeUser.randomLastName, ' ', fakeUser.randomPassword);
        registerPage.emailInput.should('exist');
        cy.url().should('contain', '/register');
    })

    it('Register By Providing Invalid Email', () => {
        registerPage.registerNewUser(fakeUser.randomFirstName, fakeUser.randomLastName, 'test@test', fakeUser.randomPassword);
        registerPage.emailInput.should('exist');
        registerPage.validationMessage.should('exist')
            .and('be.visible')
            .and('have.text', 'The email must be a valid email address.')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
        cy.url().should('contain', '/register');
    })

    it('Register By Providing an Already Existing Email', () => {
        registerPage.registerNewUser(fakeUser.randomFirstName, fakeUser.randomLastName, 'testMarko1@test.com', fakeUser.randomPassword);
        registerPage.emailInput.should('exist');
        registerPage.validationMessage.should('exist')
            .and('be.visible')
            .and('have.text', 'The email has already been taken.')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
        cy.url().should('contain', '/register');
    })

    it('Register without Providing \'@\' into Email', () => {
        registerPage.registerNewUser(fakeUser.randomFirstName, fakeUser.randomLastName, 'testtest.com', fakeUser.randomPassword);
        registerPage.emailInput.should('exist');
        cy.url().should('contain', '/register');
    })

    it('Register without Providing Username into Email', () => {
        registerPage.registerNewUser(fakeUser.randomFirstName, fakeUser.randomLastName, '@test.com', fakeUser.randomPassword);
        registerPage.emailInput.should('exist');
        cy.url().should('contain', '/register');
    })

    it('Register without Providing Domain into Email', () => {
        registerPage.registerNewUser(fakeUser.randomFirstName, fakeUser.randomLastName, 'test@test.', fakeUser.randomPassword);
        registerPage.emailInput.should('exist');
        cy.url().should('contain', '/register');
    })

    it('Register without Providing Password', () => {
        registerPage.registerNewUseWithoutPassword(fakeUser.randomFirstName, fakeUser.randomLastName, fakeUser.randomEmail, fakeUser.randomPassword);
        registerPage.passwordInput.should('exist')
        cy.url().should('include', '/register')
    })

    it('Register by Providing Short Password', () => {
        registerPage.registerNewUser(fakeUser.randomFirstName, fakeUser.randomLastName, fakeUser.randomEmail, 'test1');
        registerPage.passwordInput.should('exist');
        registerPage.validationMessage.should('exist')
            .and('be.visible')
            .and('have.text', 'The password must be at least 8 characters.')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
        cy.url().should('contain', '/register');
    })

    it('Register by Providing Password without Numbers', () => {
        registerPage.registerNewUser(fakeUser.randomFirstName, fakeUser.randomLastName, fakeUser.randomEmail, 'testtest');
        registerPage.passwordInput.should('exist');
        registerPage.validationMessage.should('exist')
            .and('be.visible')
            .and('have.text', 'The password format is invalid.')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
        cy.url().should('contain', '/register');
    })

    it('Register without Providing Confirmed Password', () => {
        registerPage.registerNewUserWithoutPasswordConfirmation(fakeUser.randomFirstName, fakeUser.randomLastName, fakeUser.randomEmail, fakeUser.randomPassword);
        registerPage.passwordInput.should('exist')
        cy.url().should('include', '/register')
    })

    it('Register by Providing Different Password into Password Confirmation Field', () => {
        registerPage.registerNewUserWithWrongConfirmedPassword(fakeUser.randomFirstName, fakeUser.randomLastName, fakeUser.randomEmail, fakeUser.randomPassword, 'test1');
        registerPage.passwordInput.should('exist');
        registerPage.validationMessage.should('exist')
            .and('be.visible')
            .and('have.text', 'The password confirmation does not match.')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
        cy.url().should('contain', '/register');
    })

    it('Register without Checking Checkbox', () => {
        registerPage.registerNewUserWithoutCheckbox(fakeUser.randomFirstName, fakeUser.randomLastName, fakeUser.randomEmail, fakeUser.randomPassword);
        registerPage.validationMessage.should('exist')
            .and('be.visible')
            .and('have.text', 'The terms and conditions must be accepted.')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
        cy.url().should('contain', '/register')
    })

    it('Register by Putting 255 Chars in First Name', () => {
        registerPage.registerNewUser(fakeUser.twoFiftyFiveChars, fakeUser.randomLastName, fakeUser.randomEmail, fakeUser.randomPassword);
        cy.url().should('not.include', '/register')
        allGalleriesPage.allGalleriesHeading.should('be.visible').and('have.text', 'All Galleries');
    })

    it('Register by Putting 255 Chars in Last Name', () => {
        registerPage.registerNewUser(fakeUser.randomFirstName, fakeUser.twoFiftyFiveChars, fakeUser.randomEmail, fakeUser.randomPassword);
        cy.url().should('not.include', '/register')
        allGalleriesPage.allGalleriesHeading.should('be.visible').and('have.text', 'All Galleries');
    })

    it('Register by Putting 1 Char in First Name', () => {
        registerPage.registerNewUser(fakeUser.oneChar, fakeUser.randomLastName, fakeUser.randomEmail, fakeUser.randomPassword);
        cy.url().should('not.include', '/register')
        allGalleriesPage.allGalleriesHeading.should('be.visible').and('have.text', 'All Galleries');
    })

    it('Register by Putting 1 Char in Last Name', () => {
        registerPage.registerNewUser(fakeUser.randomFirstName, fakeUser.oneChar, fakeUser.randomEmail, fakeUser.randomPassword);
        cy.url().should('not.include', '/register')
        allGalleriesPage.allGalleriesHeading.should('be.visible').and('have.text', 'All Galleries');
    })

    it('Register by Putting Unicode Chars in First Name', () => {
        registerPage.registerNewUser(fakeUser.unocodeChars, fakeUser.randomLastName, fakeUser.randomEmail, fakeUser.randomPassword);
        cy.url().should('not.include', '/register')
        allGalleriesPage.allGalleriesHeading.should('be.visible').and('have.text', 'All Galleries');
    })

    it('Register by Putting Unicode Chars in Last Name', () => {
        registerPage.registerNewUser(fakeUser.randomFirstName, fakeUser.unocodeChars, fakeUser.randomEmail, fakeUser.randomPassword);
        cy.url().should('not.include', '/register')
        allGalleriesPage.allGalleriesHeading.should('be.visible').and('have.text', 'All Galleries');
    })

    it('Register by Putting Special Chars in First Name', () => {
        registerPage.registerNewUser(fakeUser.specialCharsFirstName, fakeUser.randomLastName, fakeUser.randomEmail, fakeUser.randomPassword);
        cy.url().should('not.include', '/register')
        allGalleriesPage.allGalleriesHeading.should('be.visible').and('have.text', 'All Galleries');
    })

    it('Register by Putting Special Chars in Last Name', () => {
        registerPage.registerNewUser(fakeUser.randomFirstName, fakeUser.specialCharsLastName, fakeUser.randomEmail, fakeUser.randomPassword);
        cy.url().should('not.include', '/register')
        allGalleriesPage.allGalleriesHeading.should('be.visible').and('have.text', 'All Galleries');
    })

    it('Register by Putting Whitespace Into the Password Field', () => {
        registerPage.registerNewUser(fakeUser.randomFirstName, fakeUser.randomLastName, fakeUser.randomEmail, fakeUser.whitespaceRandomPassword);
        cy.url().should('not.include', '/register')
        allGalleriesPage.allGalleriesHeading.should('be.visible').and('have.text', 'All Galleries');
    })

    it('Register by Only Numbers Into the Password Field', () => {
        registerPage.registerNewUser(fakeUser.randomFirstName, fakeUser.randomLastName, fakeUser.randomEmail, fakeUser.onlyNumbersPassword);
        cy.url().should('not.include', '/register')
        allGalleriesPage.allGalleriesHeading.should('be.visible').and('have.text', 'All Galleries');
    })

})