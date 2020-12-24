export const userPath = {
  post: {
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
        $ref: "#/components/badRequestInvalidData"
      },
      401: {
        $ref: "#/components/badRequest"
      }
    }
  }
};