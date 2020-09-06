import { IsNotEmpty, IsDate, IsEmail, Length } from "class-validator";
import { Type } from "class-transformer";
import { IsUniqueUserEmail } from "../validation/IsUniqueUserEmail";
import { IsUniqueUsername } from "../validation/IsUniqueUsername";

export class UserDTO {

    public id : string;

    @IsNotEmpty()
    public name: string;

    public lastName: string;

    @IsDate()
    @Type(() => Date)
    public dateOfBirth: Date;

    @IsEmail()
    @IsUniqueUserEmail()
    public email: string;

    public picture: Blob;

    public pictureUrl: string;

    @IsNotEmpty()
    @IsUniqueUsername()
    public username: string;

    @Length(8)
    public password: string;
}