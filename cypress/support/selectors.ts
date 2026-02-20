export const DATA_TEST = {
  ingredientCard: '[data-test="ingredient-card"]',
  ingredientList: '[data-test="ingredient-list"]',
  constructorDropZone: '[data-test="constructor-drop-zone"]',
  fillingsList: '[data-test="fillings-list"]',
  constructorItem: '[data-test="constructor-item"]',
} as const;

export const SELECTORS = {
  ingredientCard: '[class*="card__list"] > div',
  ingredientList: '[class*="card__list"]',
  constructorDropZone: '[class*="burger_constructor"]',
  fillingsList: '[class*="fillings__list"]',
  constructorItem: '[class*="constructor_item"]',
} as const;
