export const mePath = {
  get: {
    tags: ["Me"],
    summary: "API para obter os dados do usuário logado",
    responses: {
      200: {
        description: "Sucesso",
        content: {
          "application/json": {
            schema: {
              $ref: "#/schemas/user"
            }
          }
        }
      },
      401: {
        $ref: "#/components/badRequest"
      }
    }
  }
};