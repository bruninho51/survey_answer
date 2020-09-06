import { HttpError } from "routing-controllers";

export default class HttpUserNotFoundError extends HttpError {
    constructor() {
        super(404, "User not found!");
    }
}