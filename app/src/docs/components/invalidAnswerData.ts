export const invalidAnswerData = {
  description: "Dados Inválidos",
  content: {
    "application/json": {
      schema: {
        $ref: "#/schemas/answerErrorValidation"
      }
    }
  }
};