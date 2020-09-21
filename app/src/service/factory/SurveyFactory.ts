import { Service } from "typedi";
import SurveyModel, { ISurveyModel } from "../../model/SurveyModel";

export interface ISurveyFactory {
    create() : ISurveyModel;
}

@Service('survey.factory')
export class SurveyFactory implements ISurveyFactory {

    create() : ISurveyModel {
        return new SurveyModel();
    }
}