import Db from "../service/db/Db";
import { Inject, Service } from "typedi";
import { ISurveyAnswerModel } from "../model/SurveyAnswerModel";
import { ISurveyAnswerModelFactory } from "../service/factory/SurveyAnswerModelFactory";

export interface ISurveyAnswerRepository {
    save(surveyAnswer: ISurveyAnswerModel): Promise<ISurveyAnswerModel>;
}

@Service("surveyAnswer.repository")
export default class SurveyAnswerRepository implements ISurveyAnswerRepository {

    @Inject("surveyAnswer.factory")
    private surveyAnswerFactory : ISurveyAnswerModelFactory;

    async save(surveyAnswer: ISurveyAnswerModel): Promise<ISurveyAnswerModel> {
      await Db.connect();
      const db = Db.getDb();
      const collection = db.collection("Answers");

      const surveyAnswerMongoMap = this.surveyAnswerFactory.createMongoMap(surveyAnswer);

      const result = await collection.insertOne(surveyAnswerMongoMap);

      const surveyAnswerUpToDate: ISurveyAnswerModel = this.surveyAnswerFactory.createByMongoMap(result.ops[0]);

      return surveyAnswerUpToDate;
    }
}