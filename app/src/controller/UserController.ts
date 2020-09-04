import { Get, Param, JsonController, OnUndefined, QueryParam, Post, Body, InternalServerError } from "routing-controllers";
import { Inject } from "typedi";
import { IUserRepository } from "../repository/UserRepository";
import { IUserModel } from "../model/UserModel";
import { UserNotFoundException } from "../exception";
import { UserResource } from "../resource/UserResource";
import { UsersResource } from "../resource/UsersResource";
import { UserFactory } from "../service/factory/UserModelFactory";
import { UserDTO } from "../dto/UserDTO";

@JsonController("/user")
export class UserController {

    @Inject('user.repository')
    private userRepository : IUserRepository;

    @Inject('user.factory')
    private userFactory : UserFactory;

    @Get('/')
    async getAllUsers(@QueryParam('page') page : number = 1, @QueryParam('limit') limit : number = 10) {
        let usersList : Array<IUserModel> = await this.userRepository.getAll({ page, limit });
        let count : number = await this.userRepository.countAll();

        return new UsersResource(usersList, { limit, page }, count);
    }

    @Get('/:id')
    @OnUndefined(UserNotFoundException)
    async getUser(@Param('id') id : string) {
        let user : IUserModel = await this.userRepository.getById(id);
        return new UserResource(user);
    }

    @Post('/')
    async cadUser(@Body() userDTO : UserDTO) { // Criar DTO
        let userModel : IUserModel = this.userFactory.create().populate(userDTO);
        try {
            let newUser : IUserModel = await this.userRepository.save(userModel);
            return newUser;
        } catch (error) {
            throw new InternalServerError("An error ocurred on save user.");
        }
    }

}