import { IUserModel } from "../model/UserModel";

export class AuthResource {

    private authenticated: boolean;
    private token: string;
    private user: IUserModel;
    
    constructor(user: IUserModel, token: string, authenticated: boolean) {
        this.authenticated = authenticated;
        this.token = token;

        user.setPassword(null);
        this.user = user;
    }
}