import { Db as MongoDb, MongoClient } from "mongodb";
import { Service } from "typedi";

@Service("db")
export default class Db {
    private static client : MongoClient;
    private static readonly connectionString = process.env.MONGO_CONNECTION_STRING;
    private static readonly dbName = process.env.MONGO_DB_NAME;

    public static async connect() : Promise<void> {
      try {
        if (!this.client) {
          console.info(`connect: Conectando em ${this.connectionString}.`);
          this.client = await MongoClient.connect(this.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
          console.info(`connect: Conectado em ${this.connectionString}.`);
        }
      } catch (err) {
        console.error(err);
      }
    }

    public static getDb() : MongoDb {
      if (this.client) {
        console.info(`Acessando db ${this.dbName}.`);
        return this.client.db(this.dbName);
      } else {
        console.info("getDb: Db não encontrado.");
        return undefined;
      }
    }

    public static async dropCollection(collectionName: string) : Promise<void> {

      if (this.client) {
        const collections = (await this.client.db(this.dbName).listCollections().toArray()).map(collection => collection.name);
        if (collections.includes(collectionName)) {
          await this.client.db(this.dbName).dropCollection(collectionName);
        }
      } else {
        throw new Error("dropCollection: Db não encontrado");
      }
    }

    public static close() : void {
      if (this.client) {
        this.client.close()
          .then(() => this.client = null)
          .catch(err => console.error(err));
      } else {
        console.info("close: Conexão não existente.");
      }
    }
}