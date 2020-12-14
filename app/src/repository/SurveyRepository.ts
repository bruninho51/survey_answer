import Db from "../service/db/Db";
import { ISurveyFactory } from "../service/factory/SurveyFactory";
import { Inject, Service } from "typedi";
import { PagingOptions } from "../contracts/PageOptions";
import { ISurveyModel } from "../model/SurveyModel";
import { ObjectID } from "mongodb";

export interface ISurveyRepository {
    save(survey : ISurveyModel) : Promise<ISurveyModel>;
    getById(id: string) : Promise<ISurveyModel>;
    countAll() : Promise<number>;
    getAll(options : PagingOptions) : Promise<Array<ISurveyModel>>;
    getByAskId(askId: string): Promise<ISurveyModel>;
}

@Service("survey.repository")
export default class SurveyRepository implements ISurveyRepository {

    @Inject("survey.factory")
    private surveyFactory : ISurveyFactory;

    async save(survey : ISurveyModel) : Promise<ISurveyModel> {
      await Db.connect();
      const db = Db.getDb();
      const collection = db.collection("Surveys");

      const result = await collection.insertOne(
        this.surveyFactory.createMongoMap(survey));

      const surveyUpToDate : ISurveyModel = this.surveyFactory.createByMongoMap(result.ops[0]);

      return surveyUpToDate;
    }

    async getById(id: string) : Promise<ISurveyModel> {

      await Db.connect();
      const db = Db.getDb();
      const collection = db.collection("Surveys");

      try {

        const result = await collection.findOne({ _id: new ObjectID(id) });
        if (result) {
          return this.surveyFactory.createByMongoMap(result);
        }

        return null;

      } catch (err) {
        return null;
      }
    }

    async countAll() : Promise<number> {
      await Db.connect();
      const db = Db.getDb();
      const collection = db.collection("Surveys");

      return collection.countDocuments();
    }

    async getAll({ limit = 10, page = 1 } : PagingOptions) : Promise<Array<ISurveyModel>> {
      const skip : number = (page - 1) * limit;

      await Db.connect();
      const db = Db.getDb();
      const collection = db.collection("Surveys");

      const surveysList : Array<ISurveyModel> = [];

      try {
        const result = await collection.find({}, { limit, skip });
        if (result) {
          const arrResult = await result.toArray();
          arrResult.forEach(mongoMap => {
            surveysList.push(
              this.surveyFactory.createByMongoMap(mongoMap));
          });
        }

        return surveysList;
      } catch (err) {
        return surveysList;
      }
    }

    async getByAskId(askId: string): Promise<ISurveyModel> {
      await Db.connect();
      const db = Db.getDb();
      const collection = db.collection("Surveys");

      try {
        //{ stock : { $elemMatch : { country : "01", "warehouse.code" : "02" } } }
        const result = await collection.findOne({ asks: { $elemMatch: { _id: new ObjectID(askId) } } });
        //const result = await collection.findOne({ asks:  [{ _id: new ObjectID(askId) }] });
        if (result) {
          return this.surveyFactory.createByMongoMap(result);
        }

        return null;

      } catch (err) {
        return null;
      }
    }
}