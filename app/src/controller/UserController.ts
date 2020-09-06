import { Get, Param, JsonController, OnUndefined, QueryParam, Post, Body, InternalServerError } from "routing-controllers";
import { Inject } from "typedi";
import { IUserRepository } from "../repository/UserRepository";
import { IUserModel } from "../model/UserModel";
import { UserResource } from "../resource/UserResource";
import { UsersResource } from "../resource/UsersResource";
import { UserFactory } from "../service/factory/UserModelFactory";
import { UserDTO } from "../dto/UserDTO";
import { HttpUserNotFoundException } from "../exception";

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
    @OnUndefined(HttpUserNotFoundException)
    async getUser(@Param('id') id : string) {
        let user : IUserModel = await this.userRepository.getById(id);
        return new UserResource(user);
    }

    @Post('/')
    async cadUser(@Body() userDTO : UserDTO) {
        // Criar decorator para validar se e-mail do usuário já existe
        let userModel : IUserModel = this.userFactory.create().populate(userDTO);
        try {
            let newUser : IUserModel = await this.userRepository.save(userModel);
            return new UserResource(newUser);
        } catch (error) {
            console.log(error);
            throw new InternalServerError("An error ocurred on save user.");
        }
    }

}