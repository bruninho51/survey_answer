import { Authorized, CurrentUser, Get, JsonController } from "routing-controllers";
import { UserResource } from "../resource/UserResource";
import { IUserModel } from "../model/UserModel";

@JsonController("/me")
export class MeController {

    @Get("/")
    @Authorized()
    getMe(@CurrentUser({ required: true }) user: IUserModel) {
        return new UserResource(user);
    }
}