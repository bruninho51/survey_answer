export const unauthorized = {
  description: "Acesso Negado",
  content: {
    "application/json": {
      schema: {
        $ref: "#/schemas/error"
      }
    }
  }
};