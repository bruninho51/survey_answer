import * as dotenv from "dotenv";
import "reflect-metadata";
import { createExpressServer, useContainer, Action } from "routing-controllers";
import { Container } from "typedi";
import Db from "./service/db/Db";
import jwt from "jsonwebtoken";

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
      if (jwt.verify(token, process.env.SECRET)) {
        return true;
      }
    }

    return false;
  }
});

app.listen(8080);