export const surveysPath = {
  get: {
    security: [{
      bearerAuth: [] as any[]
    }],
    tags: ["Survey"],
    summary: "API para obtenção dos questionários",
    responses: {
      200: {
        description: "Sucesso",
        content: {
          "application/json": {
            schema: {
              $ref: "#/schemas/surveysResponse"
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
    tags: ["Survey"],
    summary: "API para o cadastro de questionários",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/surveyParams"
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
        $ref: "#/components/invalidSurveyData"
      },
      401: {
        $ref: "#/components/badRequest"
      }
    }
  }
};