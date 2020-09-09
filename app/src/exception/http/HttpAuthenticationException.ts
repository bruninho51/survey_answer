import { HttpError } from "routing-controllers";

export default class HttpAuthenticationException extends HttpError {
    constructor() {
        super(400, "Username or password is invalid.");
    }
}