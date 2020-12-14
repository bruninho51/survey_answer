import { Service, Inject } from "typedi";
import Db from "../service/db/Db";
import { IAnswerModel } from "../model/AnswerModel";
import { IAnswerFactory } from "../service/factory/AnswerModelFactory";

export interface IAnswerRepository {
    save(answer : IAnswerModel) : Promise<IAnswerModel>;
}

@Service("answer.repository")
export default class AnswerRepository implements IAnswerRepository {

    @Inject("answer.factory")
    private answerFactory : IAnswerFactory;

    async save(answer : IAnswerModel) : Promise<IAnswerModel> {
      await Db.connect();
      const db = Db.getDb();
      const collection = db.collection("Answers");
        
      const result = await collection.insertOne(
        this.answerFactory.createMongoMap(answer));

      answer.setId(result.ops[0]._id.toString());

      return answer;
    }
}