import { Service } from "typedi";
import { IUserModel } from "../../model/UserModel";
import UserModel from "../../model/UserModel";

export interface IUserFactory {
    create() : IUserModel;
}

@Service('user.factory')
export class UserFactory implements IUserFactory {

    create() : IUserModel {
        return new UserModel();
    }
}