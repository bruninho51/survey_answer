export const surveyResponseSchema = {
  type: "object",
  properties: {
    links: {
      type: "array",
      items: {
        type: "object",
        properties: {
          type: {
            type: "string"
          },
          rel: {
            type: "string"
          },
          url: {
            type: "string"  
          }
        }
      }
    },
    survey: {
      $ref: "#/schemas/survey"
    }
  }
};