/// <reference types="Cypress" />

import { allGalleriesPage } from "../page_objects/allGalleriesPage";
import { loginPage } from "../page_objects/loginPage";

describe('All Galleries Page Test', () => {

    let validEmail = 'testMarko1@test.com';
    let validPassword = 'test1234';

    beforeEach('Login Data', () => {
        cy.visit('/login');
        loginPage.login(validEmail, validPassword);
        cy.url().should('not.include', '/login');
    })

    it('Whitespace in the Search Input Field', () => {
        allGalleriesPage.searchInput.type(' ');
        allGalleriesPage.filterButton.click();
        allGalleriesPage.galleryCard.should('have.length', 10)
    })

    it('Confirm That the Page Loaded', () => {
        cy.url().should('contain', 'gallery-app');
        allGalleriesPage.allGalleriesHeading.should('be.visible')
            .and('have.text', 'All Galleries');
        allGalleriesPage.galleryCard.should('be.visible')
            .and('have.length', 10);
    })

    it('Test Pagination', () => {
        allGalleriesPage.galleryCard.should('have.length', 10);
        allGalleriesPage.loadMoreButton.click();
        allGalleriesPage.galleryCard.should('have.length', 20);
        cy.url().should('contain', 'gallery-app');
    })

    it('Test Search', () => {
        let searchTest = 'rty';
        allGalleriesPage.searchInput.type('rty');
        allGalleriesPage.filterButton.click();
        allGalleriesPage.galleryCard.should('have.length', 1);
        allGalleriesPage.galleryCard.find('h2').invoke('text').should('contain', 'rty')
        cy.url().should('contain', 'gallery-app');
    })

    it('Test Redirection to the Single Gallery Page', () => {  
        allGalleriesPage.galleryCard
            .first()
            .find('a')
            .first()
            .click();
        cy.url().should('contain', 'galleries');
        cy.get('textarea').should('be.visible')
            .and('have.value', '');
    })

    it('Test Redirection to the Single Author Page', () => {  
        allGalleriesPage.galleryCard
            .first()
            .find('a')
            .last()
            .click();
        cy.url().should('contain', 'authors');
    })
})