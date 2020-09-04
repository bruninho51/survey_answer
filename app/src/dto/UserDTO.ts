import { IsNotEmpty, IsDate, IsEmail, Length } from "class-validator";
import { Type } from "class-transformer";

export class UserDTO {

    public id : string;

    @IsNotEmpty()
    public name: string;

    public lastName: string;

    @IsDate()
    @Type(() => Date)
    public dateOfBirth: Date;

    @IsEmail()
    public email: string;

    public picture: Blob;

    public pictureUrl: string;

    @IsNotEmpty()
    public username: string;

    @Length(8)
    public password: string;
}