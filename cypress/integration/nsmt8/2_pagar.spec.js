import { Given, Then } from "cypress-cucumber-preprocessor/steps";

Given('que estoy en modal de compra de paquetes', function () {
    cy.get('#show-offers-form').should('be.visible')
});

Given('Selecciono {string}', function (string) {
    cy.get('#edit-offers-pay > .radio-buttons > :nth-child(2) > .option').click()
});

Given('hago clic en botón pagar', function () {
    cy.get('#show-offers-form > #btn-payment-form').click()
});

Then('se debe redireccionar a {string} mas el token', function (string) {
    cy.url().should('include', string)
    cy.screenshot()   
});