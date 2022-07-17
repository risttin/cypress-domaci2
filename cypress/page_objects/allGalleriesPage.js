/// <reference types="Cypress" />

class AllGalleriesPage {

    get allGalleriesHeading() {
        return cy.get('h1');
    }

    get searchInput() {
        return cy.get('input');
    }

    get filterButton() {
        return cy.get('button').first();   
    }

    get loadMoreButton() {
        return cy.get('button').last();    
    }

    get galleryCard() {
        return cy.get('.cell');
    }

    get galleryHeading() {
        return this.galleryCard.find('h2');
    }
}

export const allGalleriesPage = new AllGalleriesPage();