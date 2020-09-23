import { Get, Param, JsonController, OnUndefined, QueryParam, Post, Body, InternalServerError, Authorized } from "routing-controllers";
import { Inject } from "typedi";
import { IUserRepository } from "../repository/UserRepository";
import { IUserModel } from "../model/UserModel";
import { UserResource } from "../resource/UserResource";
import { UsersResource } from "../resource/UsersResource";
import { UserFactory } from "../service/factory/UserModelFactory";
import { RegisterUserDTO } from "../dto/RegisterUserDTO";
import { HttpUserNotFoundException } from "../exception";

@JsonController("/user")
export class UserController {

    @Inject('user.repository')
    private userRepository : IUserRepository;

    @Inject('user.factory')
    private userFactory : UserFactory;

    @Post('/')
    @Authorized()
    async cadUser(@Body() userDTO : RegisterUserDTO) {
        let userModel : IUserModel = this.userFactory.create().populate(userDTO);
        try {
            return new UserResource(await this.userRepository.save(userModel));
        } catch (error) {
            throw new InternalServerError("An error ocurred on save user.");
        }
    }

    @Get('/:id')
    @Authorized()
    @OnUndefined(HttpUserNotFoundException)
    async getUser(@Param('id') id : string) {
        let user : IUserModel = await this.userRepository.getById(id);
        if (user) return new UserResource(user);
    }

    @Get('/')
    @Authorized()
    async getAllUsers(@QueryParam('page') page : number = 1, @QueryParam('limit') limit : number = 10) {
        let usersList : Array<IUserModel> = await this.userRepository.getAll({ page, limit });
        let count : number = await this.userRepository.countAll();

        return new UsersResource(usersList, { limit, page }, count);
    }

}