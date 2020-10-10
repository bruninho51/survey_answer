import { Service } from "typedi";
import { IUserModel } from "../../model/UserModel";
import UserModel from "../../model/UserModel";
import { ObjectID } from "mongodb";

export interface IUserFactory {
    create() : IUserModel;
    createMongoMap(userModel : IUserModel) : Object;
    createByMongoMap(mongoMap : any) : IUserModel;
}

@Service('user.factory')
export class UserFactory implements IUserFactory {

    create() : IUserModel {
        return new UserModel();
    }

    createByMongoMap(mongoMap : any) : IUserModel {
        let userModel : IUserModel = this.create().populate({ ...mongoMap, id: mongoMap._id.toString() });
        return userModel;
    }

    createMongoMap(userModel : IUserModel) : Object {
        return {
            _id: new ObjectID(userModel.getId()) ?? new ObjectID(),
            name: userModel.getName(),
            lastName: userModel.getLastName(),
            dateOfBirth: userModel.getDateOfBirth(),
            email: userModel.getEmail(),
            pictureUrl: userModel.getPictureUrl(),
            username: userModel.getUsername(),
            password: userModel.getPassword()
        };
    }
}