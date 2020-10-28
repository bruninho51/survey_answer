import { HttpError } from "routing-controllers";

export default class HttpSurveyNotFoundError extends HttpError {
  constructor() {
    super(404, "Survey not found!");
  }
}