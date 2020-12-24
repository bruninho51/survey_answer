export const userSchema = {
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
    user: {
      type: "object",
      properties: {
        id: {
          type: "string"
        },
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