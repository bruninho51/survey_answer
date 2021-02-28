import { ISurveyAnswerModel } from "../model/SurveyAnswerModel";

export class SurveyAnswerResource {

    private links : Array<Object> = [];
    private surveyAnswer : ISurveyAnswerModel;

    constructor(surveyAnswer : ISurveyAnswerModel) {
        
      this.surveyAnswer = surveyAnswer;
      this.createLinks();
    }

    private createLinks() {

      this.links.push(
        {
          type: "GET",
          rel: "self",
          uri: process.env.BASE_URL + "/answer/" + this.surveyAnswer.getId()
        }
      );
    }
}