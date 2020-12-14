import { Inject, Service } from "typedi";
import { IAskModel } from "../../model/AskModel";
import { ISurveyModel } from "../../model/SurveyModel";
import { ISurveyRepository } from "../../repository/SurveyRepository";
import { IAnswerModel } from "../../model/AnswerModel";
import AnswerModel from "../../model/AnswerModel";
import { ObjectID } from "mongodb";
import { ISurveyFactory } from "./SurveyFactory";
import { IAskFactory } from "./AskModelFactory";

export interface IAnswerFactory {
    create(askId: string, value: string) : Promise<IAnswerModel>;
    createMongoMap(answerModel : IAnswerModel) : Object;
}

@Service("answer.factory")
export class AnswerFactory implements IAnswerFactory {

    @Inject("survey.repository")
    private surveyRepository : ISurveyRepository;

    @Inject("survey.factory")
    private surveyFactory : ISurveyFactory;

    @Inject("ask.factory")
    private askFactory : IAskFactory;

    async create(askId: string, value: string): Promise<IAnswerModel> {

      const survey: ISurveyModel = await this.surveyRepository.getByAskId(askId);
      if (survey) {
        const answer: IAnswerModel = new AnswerModel();
        answer.setSurvey(survey);
        answer.setAsk(survey.getAsks().find((ask: IAskModel) => ask.getId() === askId));
        answer.setValue(value);

        return answer;
      }

      return null;
    }

    createMongoMap(answerModel : IAnswerModel) : Object {
      return {
        _id: new ObjectID(answerModel.getId()) ?? new ObjectID(),
        value: answerModel.getValue(),
        ask: this.askFactory.createMongoMap(answerModel.getAsk()),
        survey: this.surveyFactory.createMongoMap(answerModel.getSurvey())
      };
    }

}