import { HttpError } from "routing-controllers";

export default class HttpTokenExpiredExeception extends HttpError {
  constructor() {
    super(401, "token expired.");
  }
}