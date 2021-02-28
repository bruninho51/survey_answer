export const answersPath = {
  post: {
    tags: ["Answer"],
    summary: "API para o cadastro de respostas",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/answerParams"
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
              $ref: "#/schemas/surveyResponse"
            }
          }
        }
      },
      400: {
        $ref: "#/components/invalidAnswerData"
      },
      401: {
        $ref: "#/components/badRequest"
      }
    }
  }
};