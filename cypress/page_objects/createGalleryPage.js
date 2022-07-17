/// <reference types="Cypress" />

class CreateGalleryPage {

    get pageHeading() {
        return cy.get('h1');
    }

    get titleInput() {
        return cy.get('#title');
    }

    get descriptionInput() {
        return cy.get('#description');
    }

    get imageInput() {
        return cy.get('.form-control').last();
    }

    get addImageButton() {
        return cy.get('button').eq(2);
    }

    get submitButton() {
        return cy.get('.btn').first();
    }

    get cancelButton() {
        return cy.get('.btn').last();
    }

    get validationMessage() {
        return cy.get('p');
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

    createGallery(title, description, imageUrl) {
        this.titleInput.type(title);
        this.descriptionInput.type(description);
        this.imageInput.type(imageUrl);
        this.submitButton.click();
    }

    createGalleryWithoutTitle(description, imageUrl) {
        this.descriptionInput.type(description);
        this.imageInput.type(imageUrl);
        this.submitButton.click();
    }

    createGalleryWithoutDescription(title, imageUrl) {
        this.titleInput.type(title);
        this.imageInput.type(imageUrl);
        this.submitButton.click();
    }

    createGalleryWithTwoPhotos(title, description, image1, image2) {
        this.titleInput.type(title);
        this.descriptionInput.type(description);
        this.imageInput.type(image1);
        this.addImageButton.click();
        this.imageInput.type(image2);
        this.submitButton.click();
    }
}

export const createGalleryPage = new CreateGalleryPage();