import {
  accessTokenSchema,
  authParamsSchema,
  errorSchema,
  userSchema,
  userErrorValidationSchema,
  surveyErrorValidationSchema,
  userResponseSchema,
  usersResponseSchema,
  surveyResponseSchema,
  surveySchema,
  surveysResponseSchema,
  answerSchema,
  answerErrorValidationSchema
} from "./schemas/";

export default {
  accessToken: accessTokenSchema,
  authParams: authParamsSchema,
  error: errorSchema,
  userParams: userSchema,
  userResponse: userResponseSchema,
  userErrorValidation: userErrorValidationSchema,
  surveyErrorValidation: surveyErrorValidationSchema,
  answerErrorValidation: answerErrorValidationSchema,
  usersResponse: usersResponseSchema,
  surveyResponse: surveyResponseSchema,
  surveysResponse: surveysResponseSchema,
  survey: surveySchema,
  surveyParams: surveySchema,
  answerParams: answerSchema
};