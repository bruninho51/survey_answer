export const mePath = {
  get: {
    security: [{
      bearerAuth: [] as any[]
    }],
    tags: ["Me"],
    summary: "API para obter os dados do usuário logado",
    responses: {
      200: {
        description: "Sucesso",
        content: {
          "application/json": {
            schema: {
              $ref: "#/schemas/userResponse"
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