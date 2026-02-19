import { SELECTORS } from '../support/selectors';

describe('DND Burger constructor', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get(SELECTORS.ingredientList).should('be.visible');
    cy.get(SELECTORS.ingredientCard).first().as('firstIngredient');
    cy.get(SELECTORS.constructorDropZone).as('dropZone');
  });

  it('Should replace ingredient from list to constructor', () => {
    cy.get('@firstIngredient').drag('@dropZone');
    cy.get('@dropZone').should(($zone) => {
      const text = $zone.text();
      const hasBun = text.includes('верх') || text.includes('снизу');
      const hasFilling = !text.includes('Перетащите начинку из левого контейнера');
      if (!(hasBun || hasFilling)) {
        throw new Error('В конструкторе должна появиться булка или начинка');
      }
    });
  });
});
