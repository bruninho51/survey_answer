import { Service, Inject } from "typedi";
import Db from "../service/db/Db";
import { IUserModel } from "../model/UserModel";
import { IUserFactory } from "../service/factory/UserModelFactory";
import { ObjectID } from "mongodb";
import { PagingOptions } from "../contracts/PageOptions";

export interface IUserRepository {
    save(user : IUserModel) : Promise<IUserModel>;
    getById(id: string) : Promise<IUserModel>;
    countAll() : Promise<number>;
    getAll(options : PagingOptions) : Promise<Array<IUserModel>>;
    update(user : IUserModel) : Promise<IUserModel>;
    emailExists(email : string) : Promise<boolean>;
    usernameExists(username : string) : Promise<boolean>;
    getByUsernameAndPassword(username : string, password : string) : Promise<IUserModel>;
}

@Service('user.repository')
export default class UserRepository implements IUserRepository {

    @Inject('user.factory')
    private userFactory : IUserFactory;

    async save(user : IUserModel) : Promise<IUserModel> {
        await Db.connect();
        let db = Db.getDb();
        let collection = db.collection('Users');
        
        let result = await collection.insertOne(
            this.userFactory.createMongoMap(user));

        user.setId(result.ops[0]._id.toString());

        return user;
    }

    async getById(id: string) : Promise<IUserModel> {
        
        await Db.connect();
        let db = Db.getDb();
        let collection = db.collection('Users');

        try {

            let result = await collection.findOne({ _id: new ObjectID(id) });
            if (result) {
                return this.userFactory.createByMongoMap(result);
            }

            return null;

        } catch (err) {
            return null;
        }

    }

    async countAll() : Promise<number> {
        await Db.connect();
        let db = Db.getDb();
        let collection = db.collection('Users');

        return collection.countDocuments();
    }

    async getAll({ limit = 10, page = 1 } : PagingOptions) : Promise<Array<IUserModel>> {
       
        let skip : number = (page - 1) * limit;

        await Db.connect();
        let db = Db.getDb();
        let collection = db.collection('Users');

        let usersList : Array<IUserModel> = [];

        try {
            let result = await collection.find({}, { limit, skip });
            if (result) {
                let arrResult = await result.toArray();
                arrResult.forEach(mongoMap => {
                    usersList.push(
                        this.userFactory.createByMongoMap(mongoMap));
                });
            }
    
            return usersList;
        } catch (err) {
            return usersList;
        }
    }

    async update(user : IUserModel): Promise<IUserModel> {
        throw new Error('not implemented yet');
    }

    async emailExists(email : string) : Promise<boolean> {
        await Db.connect();
        let db = Db.getDb();
        let collection = db.collection('Users');
        let res = await collection.findOne({ email });

        return !!res;
    }

    async usernameExists(username : string) : Promise<boolean> {
        await Db.connect();
        let db = Db.getDb();
        let collection = db.collection('Users');
        let res = await collection.findOne({ username });
        
        return !!res;
    }

    async getByUsernameAndPassword(username : string, password : string) : Promise<IUserModel> {
        await Db.connect();
        let db = Db.getDb();
        let collection = db.collection('Users');
        let result = await collection.findOne({ username, password });
        if (result) {
            return this.userFactory.createByMongoMap(result);
        }

        return null;
    }
}