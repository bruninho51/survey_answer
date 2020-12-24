import * as dotenv from "dotenv";
import "reflect-metadata";
import { 
  createExpressServer,
  useContainer,
  Action,
  InternalServerError
} from "routing-controllers";
import { Container } from "typedi";
import Db from "./service/db/Db";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import HttpTokenExpiredExeception from "./exception/http/HttpTokenExpiredException";
import { IUserRepository } from "./repository/UserRepository";
import { IUserModel } from "./model/UserModel";
import Seed from "./seeds";
import * as swaggerUiExpress from "swagger-ui-express";
import docs from "./docs";

dotenv.config({ path: "/app/.env" });

Container.set("db", new Db);
useContainer(Container);

// generate seeds
if (process.env.NODE_ENV === "development") {
  const seed : Seed = Container.get("seed");
  Container.set("seed", new Seed);
  seed.generate();
}

const routingControllersOptions = {
  controllers: [__dirname + "/controller/*.ts"],
  middlewares: [__dirname + "/middlewares/*.ts"],
  authorizationChecker: async (action: Action, roles: string[]) => {

    const rawToken = action.request.headers["authorization"];
    if (rawToken && rawToken.startsWith("Bearer ")) {

      const token = rawToken.slice(7, rawToken.length);
      try {
        const decoded: any = jwt.verify(token, process.env.SECRET);
        if (decoded) {
          const repository : IUserRepository = Container.get("user.repository");
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
};

const app = createExpressServer(routingControllersOptions);

// Swagger
app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(docs));

app.listen(8080);