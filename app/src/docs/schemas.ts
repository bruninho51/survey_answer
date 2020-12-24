import {
  accessTokenSchema,
  authParamsSchema,
  errorSchema,
  userSchema
} from "./schemas/";

export default {
  accessToken: accessTokenSchema,
  authParams: authParamsSchema,
  error: errorSchema,
  user: userSchema
};