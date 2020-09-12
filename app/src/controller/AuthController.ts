import { JsonController, Post, BodyParam, OnUndefined } from "routing-controllers";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Inject } from "typedi";
import { IUserRepository } from "../repository/UserRepository";
import { IUserModel } from "../model/UserModel";
import { HttpAuthenticationException } from "../exception";
import { AuthResource } from "../resource/AuthResource";


@JsonController("/auth")
export class AuthController {

    @Inject('user.repository')
    private repository : IUserRepository;

    @Post('/')
    @OnUndefined(HttpAuthenticationException)
    async getToken(@BodyParam('username') username : string, @BodyParam('password') password : string) {
        
        let passwordHash = crypto.createHash('sha256')
            .update(process.env.SECRET + password)
            .digest('hex');

        const user : IUserModel = await this.repository.getByUsernameAndPassword(username, passwordHash);

        if (user) {
            let token = jwt.sign({ id: user.getId() }, process.env.SECRET, {
                expiresIn: process.env.TOKEN_TIME
            });

            return new AuthResource(user, token, true);
        }

        return;
    }
}