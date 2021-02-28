export const usersResponseSchema = {
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
    page: {
      type: "object",
      properties: {
        totalPages: {
          type: "number"
        },
        number: {
          type: "number"
        },
        size: {
          type: "number"
        },
        first: {
          type: "object",
          properties: {
            href: {
              type: "string"
            }
          }
        },
        prev: {
          type: "object",
          properties: {
            href: {
              type: "string"
            }
          }
        },
        self: {
          type: "object",
          properties: {
            href: {
              type: "string"
            }
          }
        },
        next: {
          type: "object",
          properties: {
            href: {
              type: "string"
            }
          }
        }
      }
    },
    users: {
      type: "array",
      items: {
        $ref: "#/schemas/userResponse"
      }
    }
  }
};