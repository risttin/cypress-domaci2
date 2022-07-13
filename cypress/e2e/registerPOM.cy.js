/// <reference types="Cypress" />

import { registerPage } from '../page_objects/registerPage.js'

const faker = require('@faker-js/faker')

describe('Register Page', () => {

  let fakeUser = {
      randomFirstName: faker.name.firstName(),
      randomLastName: faker.name.lastName(),
      randomEmail: faker.internet.email(),
      randomPassword: faker.internet.password(10, true, /[A-Z]/, '1')
  }
  
  before('', () => {
      cy.visit('/register');
      cy.url().should('contains', '/register')
  })

  it('Register with Valid Data', () => {
      registerPage.registerNewUser(fakeUser.randomFirstName, fakeUser.randomLastName, fakeUser.randomEmail, fakeUser.randomPassword);
      cy.url().should('not.contain', '/register')
  })

})