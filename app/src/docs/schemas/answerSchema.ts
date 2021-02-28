export const answerSchema = {
  type: "object",
  properties: {
    surveyId: {
      type: "string"
    },
    answers: {
      type: "array",
      items: {
        type: "object",
        properties: {
          askId: {
            type: "string"
          },
          value: {
            type: "string"
          }
        }
      }
    }
  }
};