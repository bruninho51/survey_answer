import { HttpError } from "routing-controllers";

export default class HttpInvalidAskTypeException extends HttpError {
  constructor() {
    super(400, "Invalid ask type.");
  }
}