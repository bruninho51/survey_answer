import {
  accessTokenSchema,
  authParamsSchema,
  errorSchema
} from "./schemas/";
  
export default {
  accessToken: accessTokenSchema,
  authParams: authParamsSchema,
  error: errorSchema
};