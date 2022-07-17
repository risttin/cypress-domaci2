/// <reference types="Cypress" />

import { allGalleriesPage } from '../page_objects/allGalleriesPage.js';
import { createGalleryPage } from '../page_objects/createGalleryPage.js'
import { loggedInNavigationBar } from '../page_objects/loggedInNavigationBar.js';
import { loginPage } from "../page_objects/loginPage";
 

const faker = require('@faker-js/faker')

describe('Create Gallery Test', () => {

    let validEmail = 'testMarko1@test.com';
    let validPassword = 'test1234';

    let validGalleryData = {
        title: faker.random.words(1),
        twoCharTitle: faker.random.alphaNumeric(2),
        twoFiftyFiveChars: faker.random.alphaNumeric(255),
        unicodeTitle: 'Чемпрес',
        oneCharDescription: faker.random.alphaNumeric(1),
        oneThousandChars: faker.random.alphaNumeric(1000),
        description: faker.random.words(2),
        unicodeDescription: 'ヒノキ',
        imageUrl: 'https://www.cypress.io/static/cypress-io-logo-social-share-8fb8a1db3cdc0b289fad927694ecb415.png',
        pngImage: 'https://miro.medium.com/max/1200/1*1iXZEdAGJkPsyGcpuOzwYQ.png'
    }

    let invalidGalleryData = {
        oneChar: faker.random.alphaNumeric(1),
        twoFiftySixChars: faker.random.alphaNumeric(256),
        oneThousandOneChars: faker.random.alphaNumeric(1001),
        noExtensionImage: 'https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80',
        nonExistingImage: 'https://www.cypress.io/',
        gifImage: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif',
        pdfImage: 'http://www.africau.edu/images/default/sample.pdf'
    }

    beforeEach('Login Data', () => {
        cy.visit('/login');
        loginPage.login(validEmail, validPassword);
        cy.url().should('not.include', '/login');
        cy.visit('create')
    })

    it('Confirm that the Page Loaded', () => {
        cy.url().should('contain', 'gallery-app');
        createGalleryPage.pageHeading.should('be.visible')
            .and('have.text', 'Create Gallery');
    })

    it('Create a Gallery without Providing Any Data', () => {
        createGalleryPage.submitButton.click();
        cy.url().should('include', 'create');
    })

    it('Create a Gallery without Providing a Title', () => {
        createGalleryPage.titleInput.should('exist');
        createGalleryPage.createGalleryWithoutTitle(validGalleryData.description, validGalleryData.imageUrl);
        cy.url().should('include', 'create');
    })

    it('Create a Gallery by Putting Whitespace into the Title Field', () => {
        createGalleryPage.titleInput.should('exist');
        createGalleryPage.createGallery(' ', validGalleryData.description, validGalleryData.imageUrl);
        createGalleryPage.validationMessage.should('exist')
            .and('be.visible')
            .and('have.text', 'The title field is required.')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)');
        cy.url().should('include', 'create');
    })

    it('Create a Gallery by Putting 1 Char into the Title Field', () => {
        createGalleryPage.titleInput.should('exist');
        createGalleryPage.createGallery(invalidGalleryData.oneChar, validGalleryData.description, validGalleryData.imageUrl);
        createGalleryPage.validationMessage.should('exist')
            .and('be.visible')
            .and('have.text', 'The title must be at least 2 characters.')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)');
        cy.url().should('include', 'create');
    })

    it('Create a Gallery by Putting 256 Char into the Title Field', () => {
        createGalleryPage.titleInput.should('exist');
        createGalleryPage.createGallery(invalidGalleryData.twoFiftySixChars, validGalleryData.description, validGalleryData.imageUrl);
        createGalleryPage.validationMessage.should('exist')
            .and('be.visible')
            .and('have.text', 'The title may not be greater than 255 characters.')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)');
        cy.url().should('include', 'create');
    })

    it('Create a Gallery by Putting 1001 Char into the Description Field', () => {
        createGalleryPage.descriptionInput.should('exist');
        createGalleryPage.createGallery(validGalleryData.title, invalidGalleryData.oneThousandOneChars, validGalleryData.imageUrl);
        createGalleryPage.validationMessage.should('exist')
            .and('be.visible')
            .and('have.text', 'The description may not be greater than 1000 characters.')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)');
        cy.url().should('include', 'create');
    })

    it('Create a Gallery with Image that Has No Extension', () => {
        createGalleryPage.createGallery(validGalleryData.title, validGalleryData.description, invalidGalleryData.noExtensionImage);
        createGalleryPage.validationMessage.should('exist')
            .and('be.visible')
            .and('have.text', 'Wrong format of image')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)');
        cy.url().should('include', '/create');
    })

    it('Create a Gallery with Non-Existing Image', () => {
        createGalleryPage.createGallery(validGalleryData.title, validGalleryData.description, invalidGalleryData.nonExistingImage);
        createGalleryPage.validationMessage.should('exist')
            .and('be.visible')
            .and('have.text', 'Wrong format of image')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)');
        cy.url().should('include', '/create');
    })

    it('Create a Gallery with .gif Image Extension', () => {
        createGalleryPage.createGallery(validGalleryData.title, validGalleryData.description, invalidGalleryData.gifImage);
        createGalleryPage.validationMessage.should('exist')
            .and('be.visible')
            .and('have.text', 'Wrong format of image')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)');
        cy.url().should('include', '/create');
    })

    it('Create a Gallery with .pdf Extension', () => {
        createGalleryPage.createGallery(validGalleryData.title, validGalleryData.description, invalidGalleryData.pdfImage);
        createGalleryPage.validationMessage.should('exist')
            .and('be.visible')
            .and('have.text', 'Wrong format of image')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)');
        cy.url().should('include', '/create')
    })

    it('Create a Gallery Not Logged In', () => {
        loggedInNavigationBar.Logout.click();
        cy.url().should('include', '/login');
        loginPage.loginPageHeading.should('be.visible')
            .and('have.text', 'Please login');
    })

    it('Create a Gallery with a Description', () => {
        let title = validGalleryData.title;
        createGalleryPage.createGallery(validGalleryData.title, validGalleryData.description, validGalleryData.imageUrl);
        cy.url().should('not.include', '/create');
        allGalleriesPage.galleryCard.first().find('a').first().click();
        cy.url().should('contain', 'galleries');
        createGalleryPage.pageHeading.should('be.visible')
            .and('have.text', title);
    })

    it('Create a Gallery with Two Photos', () => {
        let title = validGalleryData.title;
        createGalleryPage.createGalleryWithTwoPhotos(validGalleryData.title, validGalleryData.description, validGalleryData.imageUrl, validGalleryData.pngImage);
        cy.url().should('not.include', '/create');
        allGalleriesPage.galleryCard.first().find('a').first().click();
        cy.url().should('contain', 'galleries');
        createGalleryPage.pageHeading.should('be.visible')
            .and('have.text', title);
    })

    it('Create a Gallery with Two Chars Title', () => {
        let title = validGalleryData.twoCharTitle;
        createGalleryPage.createGallery(validGalleryData.twoCharTitle, validGalleryData.description, validGalleryData.imageUrl);
        cy.url().should('not.include', '/create');
        allGalleriesPage.galleryCard.first().find('a').first().click();
        cy.url().should('contain', 'galleries');
        createGalleryPage.pageHeading.should('be.visible')
            .and('have.text', title);
    })

    /* //Ne znam kako da pristupim galeriji, s obzirom da nece da klikne na title

    it('Create a Gallery with 255 Chars Title', () => {
        let title = validGalleryData.twoFiftyFiveChars;
        createGalleryPage.createGallery(validGalleryData.twoFiftyFiveChars, validGalleryData.description, validGalleryData.imageUrl);
        cy.url().should('not.include', '/create');
        allGalleriesPage.galleryCard.first().find('a').first().click();
        cy.url().should('contain', 'galleries');
        createGalleryPage.pageHeading.should('be.visible')
            .and('have.text', title);
    })

    */

    it('Create a Gallery with 1 Chars Description', () => {
        let title = validGalleryData.title;
        createGalleryPage.createGallery(validGalleryData.title, validGalleryData.oneCharDescription, validGalleryData.imageUrl);
        cy.url().should('not.include', '/create');
        allGalleriesPage.galleryCard.first().find('a').first().click();
        cy.url().should('contain', 'galleries');
        createGalleryPage.pageHeading.should('be.visible')
            .and('have.text', title);
    })

    it('Create a Gallery with 1000 Chars Description', () => {
        let title = validGalleryData.title;
        createGalleryPage.createGallery(validGalleryData.title, validGalleryData.oneThousandChars, validGalleryData.imageUrl);
        cy.url().should('not.include', '/create');
        allGalleriesPage.galleryCard.first().find('a').first().click();
        cy.url().should('contain', 'galleries');
        createGalleryPage.pageHeading.should('be.visible')
            .and('have.text', title);
    })

    it('Create a Gallery with Unicode Chars', () => {
        createGalleryPage.createGallery(validGalleryData.unicodeTitle, validGalleryData.unicodeDescription, validGalleryData.pngImage);
        cy.url().should('not.include', '/create');
        allGalleriesPage.galleryCard.first().find('a').first().click();
        cy.url().should('contain', 'galleries');
        createGalleryPage.pageHeading.should('be.visible')
            .and('have.text', validGalleryData.unicodeTitle);
    })

    it('Create a Gallery with .png Image Extension', () => {
        let title = validGalleryData.title;
        createGalleryPage.createGallery(validGalleryData.title, validGalleryData.description, validGalleryData.pngImage);
        cy.url().should('not.include', '/create');
        allGalleriesPage.galleryCard.first().find('a').first().click();
        cy.url().should('contain', 'galleries');
        createGalleryPage.pageHeading.should('be.visible')
            .and('have.text', title);
    })

})