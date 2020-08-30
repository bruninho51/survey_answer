import * as dotenv from "dotenv";
import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import Db from "./service/db/Db";

dotenv.config({ path: '/app/.env' });

Container.set('db', new Db);
useContainer(Container);
const app = createExpressServer({
  controllers: [__dirname + "/controller/*.ts"],
  middlewares: [__dirname + "/middlewares/*.ts"]
});

app.listen(8080);