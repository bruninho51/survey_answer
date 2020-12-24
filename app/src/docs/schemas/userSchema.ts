export const userSchema = {
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
};