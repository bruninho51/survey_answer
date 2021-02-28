export const accessTokenSchema = {
  type: "object",
  properties: {
    accessToken: {
      type: "string"
    },
    token: {
      type: "string"
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