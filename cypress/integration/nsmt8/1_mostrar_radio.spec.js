import { Given, Then } from "cypress-cucumber-preprocessor/steps"

Given('que estoy en el dashboard con una cuenta prepago', function () {
  cy.visit('/')
  cy.get('button#account-mobile-selector').click()
  cy.get('.nav > li > .icon_loginlogout').click()
  cy.fixture('usuario.json').as('usuario')
  cy.get('@usuario').then((usuario) => {
    cy.login(usuario.email, usuario.password)
  })
  cy.wait(10000)
  cy.get('[ng-click="activeBlock = !activeBlock"] > .view-more').click({ force: true })
  cy.contains('a', 'Prepago: (301) 690 3621').click()
  cy.wait(5000)
})

Given('que selecciono un paquete', function () {
  cy.get('[data-args-label="Paquete Básico"] > .large-2 > .container > .checkmark').click()
  cy.wait(1000)
})

Given('hago clic en compra', function () {
  cy.get('#btn-package').click()
  cy.wait(1000)
})

Then('se debe mostrar un modal el radio-button {string}', function (string) {
  cy.get('[for="edit-offers-pay-2"]').should('contain', string)
  cy.screenshot();
})
