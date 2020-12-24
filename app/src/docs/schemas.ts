import {
  accessTokenSchema,
  authParamsSchema,
  errorSchema,
  userSchema,
  errorValidationSchema,
  userResponseSchema
} from "./schemas/";

export default {
  accessToken: accessTokenSchema,
  authParams: authParamsSchema,
  error: errorSchema,
  userParams: userSchema,
  userResponse: userResponseSchema,
  errorValidation: errorValidationSchema
};