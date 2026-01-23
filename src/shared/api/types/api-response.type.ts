/**
 * Базовый тип для ответов API с полями success и message
 * {
 *   "success": true,
 *   "message": "Operation successful"
 * }
 */

export type TBaseResponse = {
  success: boolean;
  message: string;
};
