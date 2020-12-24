export const badRequestInvalidData = {
  description: "Dados Inválidos",
  content: {
    "application/json": {
      schema: {
        $ref: "#/schemas/errorValidation"
      }
    }
  }
};