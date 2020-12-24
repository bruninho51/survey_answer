export const authPath = {
  post: {
    tags: ["Auth"],
    summary: "API para autenticar usuário",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/authParams"
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
              $ref: "#/schemas/accessToken"
            }
          }
        }
      },
      400: {
        $ref: "#/components/badRequest"
      }
    }
  }
};