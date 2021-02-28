import {
  badRequest,
  unauthorized,
  invalidUserData,
  invalidSurveyData,
  notFound,
  invalidAnswerData
} from "./components/";
import { apiKeyAuthSchema } from "./schemas/apiKeyAuthSchema";
      
export default {
  securitySchemes: {
    bearerAuth: apiKeyAuthSchema
  },
  "badRequest": badRequest,
  "unauthorized": unauthorized,
  "invalidUserData": invalidUserData,
  "invalidSurveyData": invalidSurveyData,
  "invalidAnswerData": invalidAnswerData,
  "notFound": notFound
};