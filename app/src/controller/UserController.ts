import { Get, Param, JsonController, OnUndefined, QueryParam, Post, Body, InternalServerError, Authorized } from "routing-controllers";
import { Inject } from "typedi";
import { IUserRepository } from "../repository/UserRepository";
import { IUserModel } from "../model/UserModel";
import { UserResource } from "../resource/UserResource";
import { UsersResource } from "../resource/UsersResource";
import { UserFactory } from "../service/factory/UserModelFactory";
import { RegisterUserDTO } from "../dto/RegisterUserDTO";
import { HttpUserNotFoundException } from "../exception";
import { IEmailSender } from "../service/messaging/emailSender";

@JsonController("/user")
export class UserController {

    @Inject("user.repository")
    private userRepository : IUserRepository;

    @Inject("user.factory")
    private userFactory : UserFactory;

    @Inject("email.sender")
    private emailSender: IEmailSender

    @Post("/")
    @Authorized()
    async cadUser(@Body() userDTO : RegisterUserDTO) : Promise<UserResource> {
      const userModel : IUserModel = this.userFactory.create().populate(userDTO);
      try {
        const savedUser = await this.userRepository.save(userModel);
        this.emailSender.sendCreatedUserConfirmation(savedUser);
        return new UserResource(savedUser);
      } catch (error) {
        throw new InternalServerError("An error ocurred on save user.");
      }
    }

    @Get("/:id")
    @Authorized()
    @OnUndefined(HttpUserNotFoundException)
    async getUser(@Param("id") id : string) : Promise<UserResource> {
      const user : IUserModel = await this.userRepository.getById(id);
      if (user) return new UserResource(user);
    }

    @Get("/")
    @Authorized()
    async getAllUsers(@QueryParam("page") page  = 1, @QueryParam("limit") limit  = 10) : Promise<UsersResource> {
      const usersList : Array<IUserModel> = await this.userRepository.getAll({ page, limit });
      const count : number = await this.userRepository.countAll();

      return new UsersResource(usersList, { limit, page }, count);
    }

}