import { Inject, Service } from "typedi";
import { ISurveyModel } from "../../model/SurveyModel";
import { ObjectID } from "mongodb";
import { IUserModel } from "../../model/UserModel";
import SurveyAnswerModel, { ISurveyAnswerModel } from "../../model/SurveyAnswerModel";
import { ISurveyFactory } from "./SurveyFactory";
import { IUserFactory } from "./UserModelFactory";

export interface ISurveyAnswerModelFactory {
    create(survey: ISurveyModel, answeredByUser: IUserModel): ISurveyAnswerModel;
    createMongoMap(surveyAnswerModel : ISurveyAnswerModel) : Object;
    createByMongoMap(mongoMap: any): ISurveyAnswerModel;
}

@Service("surveyAnswer.factory")
export class SurveyAnswerFactory implements ISurveyAnswerModelFactory {

  @Inject("survey.factory")
  private surveyFactory : ISurveyFactory;

  @Inject("user.factory")
  private userFactory : IUserFactory;

  create(survey: ISurveyModel, answeredByUser: IUserModel): ISurveyAnswerModel {

    const surveyAnswerModel = new SurveyAnswerModel();
    surveyAnswerModel.setSurvey(survey);
    surveyAnswerModel.setAnsweredByUser(answeredByUser);

    return surveyAnswerModel;
  }

  createMongoMap(surveyAnswerModel : ISurveyAnswerModel) : Object {
    const answeredByUser: any = this.userFactory.createMongoMap(surveyAnswerModel.getAnsweredByUser());
    answeredByUser.password = null;
    return {
      _id: new ObjectID(surveyAnswerModel.getId()) ?? new ObjectID(),
      survey: this.surveyFactory.createSurveyAnsweredMongoMap(surveyAnswerModel.getSurvey()),
      answeredByUser: answeredByUser
    };
  }

  createByMongoMap(mongoMap: any): ISurveyAnswerModel {

    const surveyAnswer = new SurveyAnswerModel();
    surveyAnswer.setId(mongoMap._id.toString());
    surveyAnswer.setSurvey(this.surveyFactory.createSurveyAnsweredByMongoMap(mongoMap.survey));
    surveyAnswer.setAnsweredByUser(this.userFactory.createByMongoMap(mongoMap.answeredByUser));

    return surveyAnswer;
  }

}