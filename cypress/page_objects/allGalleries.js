/// <reference types="Cypress" />

class AllGalleriesPage {

    get allGalleries() {
        return cy.get('.nav-link').eq([0]);
    }

    get myGalleries() {
        return cy.get('.nav-link').eq([1]);
    }

    get createGallery() {
        return cy.get('.nav-link').eq([2]);
    }

    get logout() {
        return cy.get('.nav-link').eq([3]);
    }

    get searchInput() {
        return cy.get('.form-control');
    }

    get searchButton() {
        return cy.get('button').eq([0]);
    }

    get loadButton() {
        return cy.get('button').eq([1]);
    }

    get specificGallery() {
        return cy.get('a[href="/galleries/161"]');
    }

    get specificAuthor() {
        return cy.get('a[href="/authors/89"]');
    }
    
    get firstGallery() {
        return cy.get('.box-title').eq([0]);
    }

    get firstAuthor() {
        return cy.get('.box-title').eq([1]);
    }
}

export const allGalleriesPage = new AllGalleriesPage();