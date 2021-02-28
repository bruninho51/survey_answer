import schemas from "./schemas";
import paths from "./paths";
import components from "./components";

export default {
  openapi: "3.0.0",
  info: {
    title: "Survey Answer API",
    description: "API para cadastro de questionários",
    version: "1.0.0"
  },
  tags: [{
    name: "Auth"
  }, {
    name: "Me"
  }, {
    name: "User"
  }, {
    name: "Survey"
  }, {
    name: "Answer"
  }],
  paths,
  schemas,
  components
};