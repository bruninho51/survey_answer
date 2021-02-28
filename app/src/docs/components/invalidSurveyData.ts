export const invalidSurveyData = {
  description: "Dados Inválidos",
  content: {
    "application/json": {
      schema: {
        $ref: "#/schemas/surveyErrorValidation"
      }
    }
  }
};