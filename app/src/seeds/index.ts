import { IUserFactory } from "../service/factory/UserModelFactory";
import { Inject, Service } from "typedi";
import usersSeed from "./users";
import { IUserRepository } from "../repository/UserRepository";
import { IUserModel } from "../model/UserModel";
import Db from "../service/db/Db";

@Service('seed')
export default class Seed {

  @Inject('user.factory')
  private userFactory : IUserFactory;

  @Inject('user.repository')
  private userRepository : IUserRepository;

  generate () {
    new Promise(async (resolve, reject) => {
      await Db.connect();

      try {
        await Db.dropCollection('Users');
        console.log("Users collection has been deleted.");
        usersSeed().map((userMap: any) => {
          let user : IUserModel = this.userFactory.createByMongoMap(userMap);
          this.userRepository.save(user).then(() => {
            console.log("User created successfully!");
          });
        });
      } catch (err) {
        console.log("Seed error: " + err.toString());
      }
    });
  }
}