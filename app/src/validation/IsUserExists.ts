import { ValidationOptions, registerDecorator } from "class-validator";
import { IUserRepository } from "../repository/UserRepository";
import Container from "typedi";
import { IUserModel } from "../model/UserModel";

export function IsUserExists(options?: ValidationOptions) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: "IsUserExists",
            target: object.constructor,
            propertyName,
            options,
            validator: {
                async validate(id: string): Promise<boolean> {
                    let repo : IUserRepository = Container.get('user.repository');
                    let userExists : IUserModel = await repo.getById(id);
                    return !!userExists;
                },
                defaultMessage() {
                    return 'User isn\'t exists. Please, check the owner id.';
                }
            },
            async: true
        });
    }
}