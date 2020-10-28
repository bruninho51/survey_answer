export default class InvalidAskTypeException extends Error {
  constructor() {
    super("Invalid ask type.");
  }
}