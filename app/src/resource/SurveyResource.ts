import { ISurveyModel } from "../model/SurveyModel";

export class SurveyResource {

    private links : Array<Object> = [];
    private survey : ISurveyModel;

    constructor(survey : ISurveyModel) {
        
        this.survey = survey;
        this.survey.setOwner(this.survey.getOwner().setPassword(null));
        this.createLinks();
    }

    private createLinks() {

        this.links.push(
            {
                type: "GET",
                rel: "self",
                uri: process.env.BASE_URL + "/survey/" + this.survey.getId()
            }
        );
    }
}