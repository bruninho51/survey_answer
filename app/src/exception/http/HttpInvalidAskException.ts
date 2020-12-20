import { HttpError } from "routing-controllers";

export default class HttpInvalidAskException extends HttpError {
  constructor() {
    super(400, "Invalid ask.");
  }
}