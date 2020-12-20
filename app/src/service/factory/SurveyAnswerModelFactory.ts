import { Inject, Service } from "typedi";
import { ISurveyModel } from "../../model/SurveyModel";
import { ISurveyRepository } from "../../repository/SurveyRepository";
import { IAskAnswerModel } from "../../model/AskAnswerModel";
import { ObjectID } from "mongodb";
import { IUserRepository } from "../../repository/UserRepository";
import { IUserModel } from "../../model/UserModel";
import SurveyAnswerModel, { ISurveyAnswerModel } from "../../model/SurveyAnswerModel";

export interface ISurveyAnswerModelFactory {
    create(surveyId: string, answers: IAskAnswerModel[], ownerId: string) : Promise<ISurveyAnswerModel>;
    createMongoMap(surveyAnswerModel : ISurveyAnswerModel) : Object;
}

@Service("surveyAnswer.factory")
export class SurveyAnswerFactory implements ISurveyAnswerModelFactory {

    @Inject("survey.repository")
    private surveyRepository : ISurveyRepository;

    @Inject("user.repository")
    private userRepository: IUserRepository;

    async create(surveyId: string, answers: IAskAnswerModel[], ownerId: string): Promise<ISurveyAnswerModel> {

      const survey: ISurveyModel = await this.surveyRepository.getById(surveyId);
      const owner: IUserModel = await this.userRepository.getById(ownerId);
      if (survey && owner) {
        const answer: ISurveyAnswerModel = new SurveyAnswerModel();
        answer.setSurvey(survey);
        answer.setOwner(owner);
        answer.setAsks(answers);

        return answer;
      }

      return null;
    }

    createMongoMap(surveyAnswerModel : ISurveyAnswerModel) : Object {
      return {
        _id: new ObjectID(surveyAnswerModel.getId()) ?? new ObjectID(),
        survey: surveyAnswerModel.getSurvey(),
        asks: surveyAnswerModel.getAsks()
      };
    }

}