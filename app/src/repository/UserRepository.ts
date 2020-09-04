import { Service, Inject } from "typedi";
import Db from "../service/db/Db";
import { IUserModel } from "../model/UserModel";
import { IUserFactory } from "../service/factory/UserModelFactory";
import { ObjectID } from "mongodb";
import { PagingOptions } from "../contracts/PageOptions";
import { application } from "express";


export interface IUserRepository {
    save(user : IUserModel) : Promise<IUserModel>;
    getById(id: string) : Promise<IUserModel>;
    countAll() : Promise<number>;
    getAll(options : PagingOptions) : Promise<Array<IUserModel>>;
    update(user : IUserModel) : Promise<IUserModel>;
}

@Service('user.repository')
export default class UserRepository implements IUserRepository {

    @Inject('user.factory')
    private userFactory : IUserFactory;

    async save(user : IUserModel) : Promise<IUserModel> {
        await Db.connect();
        let db = Db.getDb();
        let collection = db.collection('Users');

        let result = await collection.insertOne({
            name: user.getName(),
            lastName: user.getLastName(),
            dateOfBirth: user.getDateOfBirth(),
            email: user.getEmail(),
            pictureUrl: user.getPictureUrl(),
            username: user.getUsername(),
            password: user.getPassword()
        });
        
        user.setId(result.ops[0]._id.toString());

        return user;
    }

    async getById(id: string) : Promise<IUserModel> {
        
        await Db.connect();
        let db = Db.getDb();
        let collection = db.collection('Users');

        let userModel : IUserModel;

        try {
            let result = await collection.findOne({ _id: new ObjectID(id) });

            if (result) {
                userModel = this.userFactory.create();
                userModel.setId(result._id.toString())
                    .setName(result.name)
                    .setLastName(result.lastName)
                    .setDateOfBirth(result.dateOfBirth)
                    .setEmail(result.email)
                    .setPictureUrl(result.picture)
                    .setUsername(result.username)
                    .setPassword(result.password);
            }
    
            return userModel;
        } catch (err) {
            return userModel;
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
                for (let i = 0; i < arrResult.length; i++) {
                    let result = arrResult[i];
                    let userModel : IUserModel = this.userFactory.create();
                    usersList.push(
                        userModel.setId(result._id.toString())
                            .setName(result.name)
                            .setLastName(result.lastName)
                            .setDateOfBirth(result.dateOfBirth)
                            .setEmail(result.email)
                            .setPictureUrl(result.picture)
                            .setUsername(result.username)
                            .setPassword(result.password));
                }
            }
    
            return usersList;
        } catch (err) {
            return usersList;
        }
    }

    async update(user : IUserModel): Promise<IUserModel> {
        return this.userFactory.create();
    }
}