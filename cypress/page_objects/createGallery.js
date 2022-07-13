/// <reference types="Cypress" />

class CreateGalleryPage {

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

    get titleInput() {
        return cy.get('#title');
    }

    get describeInput() {
        return cy.get('#description');
    }

    get firstImageInput() {
        return cy.get('.form-control').eq([2]);
    }

    get addImageButton() {
        return cy.get('button').eq([2]);
    }

    get submitButton() {
        return cy.get('.btn').eq([0]);
    }

    get cancelButton() {
        return cy.get('.btn').eq([1])
    }

    get deleteFirstUrl() {
        return cy.get('.fas').eq([0]);
    }

    get moveFirstUrlUp() {
        return cy.get('.fas').eq([1]);
    }

    get secondImageInput() {
        return cy.get('.form-control').eq([3]);
    }

    get moveFirstUrlDown() {
        return cy.get('.fas').eq([2]);
    }

    get deleteSecondUrl() {
        return cy.get('.fas').eq([3]);
    }

    get moveSecondUrlUp() {
        return cy.get('.fas').eq([4]);
    }

    get moveSecondUrlDown() {
        return cy.get('.fas').eq([5]);
    }
}

export const createGalleryPage = new CreateGalleryPage();