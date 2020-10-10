import { IUserFactory } from "../service/factory/UserModelFactory";
import { Inject, Service } from "typedi";
import usersSeed from "./users";
import surveysSeed from "./surveys";
import { IUserRepository } from "../repository/UserRepository";
import { IUserModel } from "../model/UserModel";
import Db from "../service/db/Db";
import { ISurveyModel } from "../model/SurveyModel";
import { ISurveyFactory } from "../service/factory/SurveyFactory";
import { ISurveyRepository } from "../repository/SurveyRepository";

@Service('seed')
export default class Seed {

  @Inject('user.factory')
  private userFactory : IUserFactory;

  @Inject('survey.factory')
  private surveyFactory : ISurveyFactory;

  @Inject('user.repository')
  private userRepository : IUserRepository;

  @Inject('survey.repository')
  private surveyRepository : ISurveyRepository;

  generate () {
    new Promise(async (resolve, reject) => {
      await Db.connect();

      try {
        await Db.dropCollection('Users');
        console.log("Users collection has been deleted.");
        const users = usersSeed();
        users.map((userMap: any) => {
          let user : IUserModel = this.userFactory.createByMongoMap(userMap);
          this.userRepository.save(user);
        });

        surveysSeed(users[0]).map((surveyMap : any) => {
          let surveyModel : ISurveyModel = this.surveyFactory.createByMongoMap(surveyMap);
          this.surveyRepository.save(surveyModel);
        });

      } catch (err) {
        console.log("Seed error: " + err.toString());
      }
    });
  }
}