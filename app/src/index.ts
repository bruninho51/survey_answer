import * as dotenv from "dotenv";
import "reflect-metadata";
import { createExpressServer, useContainer, Action, InternalServerError } from "routing-controllers";
import { Container } from "typedi";
import Db from "./service/db/Db";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import HttpTokenExpiredExeception from "./exception/http/HttpTokenExpiredException";
import { IUserRepository } from "./repository/UserRepository";
import { IUserModel } from "./model/UserModel";

dotenv.config({ path: '/app/.env' });

Container.set('db', new Db);
useContainer(Container);
const app = createExpressServer({
  controllers: [__dirname + "/controller/*.ts"],
  middlewares: [__dirname + "/middlewares/*.ts"],
  authorizationChecker: async (action: Action, roles: string[]) => {

    const rawToken = action.request.headers["authorization"];
    if (rawToken && rawToken.startsWith('Bearer ')) {

      const token = rawToken.slice(7, rawToken.length);
      try {
        const decoded: any = jwt.verify(token, process.env.SECRET)
        if (decoded) {
          const repository : IUserRepository = Container.get('user.repository');
          action.request.me = repository.getById(decoded.id);
          return true;
        }
      } catch (e) {
        if (e instanceof TokenExpiredError) {
          throw new HttpTokenExpiredExeception();
        } else {
          throw new InternalServerError("An error occurred while trying to read the token: " + e);
        }
      }
    }

    return false;
  },
  currentUserChecker: (action: Action) : IUserModel => action.request.me
});

app.listen(8080);