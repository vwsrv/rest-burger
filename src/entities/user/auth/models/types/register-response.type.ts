/**
 * {
 *   "success": true,
 *   "user": {
 *     "email": "",
 *     "name": ""
 *   },
 *   "accessToken": "Bearer ...",
 *   "refreshToken": ""
 * }
 */

export type TRegisterResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};
