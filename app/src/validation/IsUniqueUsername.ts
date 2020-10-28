import { ValidationOptions, registerDecorator } from "class-validator";
import { IUserRepository } from "../repository/UserRepository";
import Container from "typedi";

export function IsUniqueUsername(options?: ValidationOptions) {
  return (object: Object, propertyName: string) : void => {
    registerDecorator({
      name: "IsUniqueUsername",
      target: object.constructor,
      propertyName,
      options,
      validator: {
        async validate(username: string): Promise<boolean> {
          const repo : IUserRepository = Container.get("user.repository");
          const usernameExists : boolean = await repo.usernameExists(username);
          return !usernameExists;
        },
        defaultMessage() {
          return "Username is not available. Enter another username.";
        }
      },
      async: true
    });
  };
}