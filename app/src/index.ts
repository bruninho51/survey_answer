import * as dotenv from "dotenv";
import "reflect-metadata";
import { createExpressServer, useContainer, Action, InternalServerError } from "routing-controllers";
import { Container } from "typedi";
import Db from "./service/db/Db";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import HttpTokenExpiredExeception from "./exception/http/HttpTokenExpiredException";

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
        if (jwt.verify(token, process.env.SECRET)) {
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
  }
});

app.listen(8080);