export const invalidUserData = {
  description: "Dados Inválidos",
  content: {
    "application/json": {
      schema: {
        $ref: "#/schemas/userErrorValidation"
      }
    }
  }
};