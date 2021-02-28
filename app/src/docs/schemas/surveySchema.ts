export const surveySchema = {
  type: "object",
  properties: {
    id: {
      type: "string"
    },
    name: {
      type: "string"
    },
    description: {
      type: "string"
    },
    expiration: {
      type: "string",
      format: "date-time"
    },
    asks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          options: {
            type: "array",
            required: false,
            items: {
              type: "string"
            }
          },
          multipleSelect: {
            type: "boolean",
            required: false
          },
          id: {
            type: "string"
          },
          title: {
            type: "string"
          },
          type: {
            type: "string"
          },
          order: {
            type: "integer"
          },
          required: {
            type: "boolean"
          }
        }
      }
    },
    owner: {
      type: "object",
      properties: {
        name: {
          type: "string"
        },
        lastName: {
          type: "string"
        },
        dateOfBirth: {
          type: "string",
          format: "date-time"
        },
        email: {
          type: "string",
          format: "email"
        },
        picture: {
          type: "string",
        },
        username: {
          type: "string"
        },
        password: {
          type: "string"
        }
      }
    }
  }
};