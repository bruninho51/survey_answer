export const surveyPath = {
  get: {
    tags: ["Survey"],
    summary: "API para obtenção de um questionário pelo id",
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
              $ref: "#/schemas/surveyResponse"
            }
          }
        }
      },
      400: {
        $ref: "#/components/badRequest"
      },
      404: {
        $ref: "#/components/notFound"
      }
    }
  }
};