import { Get, Param, JsonController, OnUndefined, QueryParam } from "routing-controllers";
import { Inject } from "typedi";
import { IUserRepository } from "../repository/UserRepository";
import { IUserModel } from "../model/UserModel";
import { UserNotFoundException } from "../exception";
import { UserResource } from "../resource/UserResource";
import { UsersResource } from "../resource/UsersResource";

@JsonController("/user")
export class UserController {

    @Inject('user.repository')
    private userRepository : IUserRepository;

    @Get('/')
    async getAllUsers(@QueryParam('page') page : number = 1, @QueryParam('limit') limit : number = 10) {
        let usersList : Array<IUserModel> = await this.userRepository.getAllUsers({ page, limit });
        let count : number = await this.userRepository.countAllUsers();

        return new UsersResource(usersList, { limit, page }, count);
    }

    @Get('/:id')
    @OnUndefined(UserNotFoundException)
    async getUser(@Param('id') id : string) {
        let user : IUserModel = await this.userRepository.getUser(id);
        return new UserResource(user);
    }

}