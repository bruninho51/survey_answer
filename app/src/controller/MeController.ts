import { Authorized, CurrentUser, Get, JsonController } from "routing-controllers";
import { UserResource } from "../resource/UserResource";
import { IUserModel } from "../model/UserModel";

@JsonController("/me")
export class MeController {

  @Get("/")
  @Authorized()
  async getMe(@CurrentUser({ required: true }) user: IUserModel) : Promise<UserResource> {
    return new UserResource(user);
  }
}