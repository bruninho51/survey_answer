export const userPath = {
  get: {
    security: [{
      bearerAuth: [] as any[]
    }],
    tags: ["User"],
    summary: "API para obtenção de usuário pelo id",
    parameters: [{
      in: "path",
      name: "id",
      required: true,
      schema: {
        type: "string"
      }
    }],
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
      },
      404: {
        $ref: "#/components/notFound"
      }
    }
  }
};