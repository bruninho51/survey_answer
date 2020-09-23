import { HttpError } from "routing-controllers";

export default class HttpUserNotFoundException extends HttpError {
    constructor() {
        super(404, "User not found!");
    }
}