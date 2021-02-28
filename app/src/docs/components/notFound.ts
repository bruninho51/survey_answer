export const notFound = {
  description: "Objeto Não Encontrado",
  content: {
    "application/json": {
      schema: {
        $ref: "#/schemas/error"
      }
    }
  }
};