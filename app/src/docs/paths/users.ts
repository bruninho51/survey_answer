export const usersPath = {
  get: {
    security: [{
      bearerAuth: [] as any[]
    }],
    tags: ["User"],
    summary: "API para obtenção dos usuários",
    responses: {
      200: {
        description: "Sucesso",
        content: {
          "application/json": {
            schema: {
              $ref: "#/schemas/usersResponse"
            }
          }
        }
      },
      401: {
        $ref: "#/components/badRequest"
      }
    }
  },
  post: {
    security: [{
      bearerAuth: [] as any[]
    }],
    tags: ["User"],
    summary: "API para o cadastro de usuários",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/userParams"
          }
        }
      }
    },
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
      400: {
        $ref: "#/components/invalidUserData"
      },
      401: {
        $ref: "#/components/badRequest"
      }
    }
  }
};