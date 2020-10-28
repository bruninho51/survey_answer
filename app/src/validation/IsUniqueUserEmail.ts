import { ValidationOptions, registerDecorator } from "class-validator";
import { IUserRepository } from "../repository/UserRepository";
import Container from "typedi";

export function IsUniqueUserEmail(options?: ValidationOptions) {
  return (object: Object, propertyName: string) : void => {
    registerDecorator({
      name: "IsUniqueUserEmail",
      target: object.constructor,
      propertyName,
      options,
      validator: {
        async validate(email: string): Promise<boolean> {
          const repo : IUserRepository = Container.get("user.repository");
          const emailExists : boolean = await repo.emailExists(email);
          return !emailExists;
        },
        defaultMessage() {
          return "Email is not available. Enter another email.";
        }
      },
      async: true
    });
  };
}