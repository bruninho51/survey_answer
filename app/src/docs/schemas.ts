import {
  accessTokenSchema,
  authParamsSchema,
  errorSchema,
  userSchema,
  errorValidationSchema,
  userResponseSchema,
  usersResponseSchema
} from "./schemas/";

export default {
  accessToken: accessTokenSchema,
  authParams: authParamsSchema,
  error: errorSchema,
  userParams: userSchema,
  userResponse: userResponseSchema,
  errorValidation: errorValidationSchema,
  usersResponse: usersResponseSchema
};