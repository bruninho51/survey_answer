import { BodyParam, JsonController, Post } from "routing-controllers";
import { ISurveyFactory } from "../service/factory/SurveyFactory";
import { Inject } from "typedi";
import { SurveyDTO } from "../dto/SurveyDTO";
import { ISurveyModel } from "../model/SurveyModel";
import { IUserFactory } from "../service/factory/UserModelFactory";
import { AskDTO } from "../dto/AskDTO";

import { IAskFactory } from "../service/factory/AskModelFactory";
import { SurveyResource } from "../resource/SurveyResource";
import { InvalidAskTypeException } from "../exception";
import { HttpInvalidAskTypeException } from "../exception";

@JsonController("/survey")
export class SurveyController {

    @Inject('survey.factory')
    private surveyFactory : ISurveyFactory;

    @Inject('user.factory')
    private userFactory : IUserFactory;

    @Inject('ask.factory')
    private askFactory : IAskFactory;

    @Post()
    async cadSurvey(@BodyParam("survey") surveyDTO: SurveyDTO) {
        
        let surveyModel : ISurveyModel = this.surveyFactory.create().populate(surveyDTO);
        surveyModel.setOwner(this.userFactory.create().populate(surveyDTO.owner));

        try {
            surveyModel.setAsks(surveyDTO.asks.map((askDTO : AskDTO) => {
                return this.askFactory.create(askDTO.type).populate(askDTO);
            }));
        } catch (e) {
            if (e instanceof InvalidAskTypeException) {
                throw new HttpInvalidAskTypeException();
            } else {
                throw e;
            }
        }

        return new SurveyResource(surveyModel);
    }
}