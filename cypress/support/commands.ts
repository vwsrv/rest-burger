Cypress.Commands.add('getBySel', (selector: string, ...args: unknown[]) => {
  return cy.get(`[data-test="${selector}"]`, ...args);
});

Cypress.Commands.add('getBySelLike', (selector: string, ...args: unknown[]) => {
  return cy.get(`[data-test*="${selector}"]`, ...args);
});

export {};

/* eslint-disable @typescript-eslint/no-namespace -- расширение типов Cypress требует namespace */
/* eslint-disable @typescript-eslint/consistent-type-definitions -- declaration merging только с interface */
declare global {
  namespace Cypress {
    interface Chainable {
      getBySel(selector: string, ...args: unknown[]): Chainable<JQuery<HTMLElement>>;
      getBySelLike(selector: string, ...args: unknown[]): Chainable<JQuery<HTMLElement>>;
    }
  }
}
