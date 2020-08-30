import { Service, Inject } from "typedi";
import Db from "../service/db/Db";
import { IUserModel } from "../model/UserModel";
import { IUserFactory } from "../service/factory/UserModelFactory";
import { ObjectID } from "mongodb";
import { Get, Param } from "routing-controllers";
import { PagingOptions } from "../contracts/PageOptions";


export interface IUserRepository {
    cadUser(user : IUserModel) : Promise<IUserModel>;
    getUser(id: string) : Promise<IUserModel>;
    countAllUsers() : Promise<number>;
    getAllUsers(options : PagingOptions) : Promise<Array<IUserModel>>;
    updateUser(user : IUserModel) : Promise<IUserModel>;
}

@Service('user.repository')
export default class UserRepository implements IUserRepository {

    @Inject('user.factory')
    private userFactory : IUserFactory;

    async cadUser(user : IUserModel) : Promise<IUserModel> {
        return this.userFactory.create();
    }

    @Get('/:id')
    async getUser(@Param('id') id: string) : Promise<IUserModel> {
        
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

    async countAllUsers() : Promise<number> {
        await Db.connect();
        let db = Db.getDb();
        let collection = db.collection('Users');

        return collection.countDocuments();
    }

    async getAllUsers({ limit = 10, page = 1 } : PagingOptions) : Promise<Array<IUserModel>> {
       
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
            console.error(err);
            return usersList;
        }
    }

    async updateUser(user : IUserModel): Promise<IUserModel> {
        return this.userFactory.create();
    }
}