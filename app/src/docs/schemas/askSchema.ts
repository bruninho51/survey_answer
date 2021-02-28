export const askSchema = {
  type: "object",
  properties: {
    options: {
      type: "array",
      items: {
        type: "string"
      }
    },
    multipleSelect: {
      type: "boolean"
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
};