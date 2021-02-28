export const surveyErrorValidationSchema = {
  type: "object",
  properties: {
    name: {
      type: "string"
    },
    message: {
      type: "string"
    },
    stack: {
      type: "string"
    },
    errors: {
      type: "array",
      items: {
        type: "object",
        properties: {
          target: {
            $ref: "#/schemas/surveyParams"
          },
          value: {
            type: "string"
          },
          property: {
            type: "string"
          },
          constraints: {
            type: "object",
            properties: {
              constraintName: {
                type: "string"
              }
            }
          }
        }
      }
    }
  }
};