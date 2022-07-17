/// <reference types="Cypress" />

class LoggedInNavigationBar {

    get AllGalleriesPage() {
        return cy.get('.nav-link').first();
    }

    get MyGalleries() {
        return cy.get('.nav-link').eq(1);
    }

    get CreateGallery() {
        return cy.get('.nav-link').eq(2);
    }

    get Logout() {
        return cy.get('.nav-link').last();
    }
}

export const loggedInNavigationBar = new LoggedInNavigationBar();