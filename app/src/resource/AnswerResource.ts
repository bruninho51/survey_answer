import { IAnswerModel } from "../model/AnswerModel";

export class AnswerResource {

    private links : Array<Object> = [];
    private answer : IAnswerModel;

    constructor(answer : IAnswerModel) {

      this.answer = answer;
      this.createLinks();
    }

    private createLinks() {

      this.links.push(
        {
          type: "GET",
          rel: "self",
          uri: process.env.BASE_URL + "/answer/" + this.answer.getId()
        }, 
        {
          type: "PUT",
          rel: "self",
          uri: process.env.BASE_URL + "/answer/" + this.answer.getId()
        }
      );
    }
}