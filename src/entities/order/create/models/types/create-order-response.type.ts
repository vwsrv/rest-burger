/**
 * {
 *   "name": "Краторный метеоритный бургер",
 *   "order": {
 *       "number": 6257
 *   },
 *   "success": true
 * }
 */

export type TCreateOrderResponse = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};
