import { IsEmail, IsDate, Length, IsNotEmpty, validate as modelValidate } from "class-validator";

export interface IUserModel {
    getId() : string;
    setId(id : string) : IUserModel;
    getName() : string;
    setName(name : string) : IUserModel;
    getLastName() : string;
    setLastName(lastName : string) : IUserModel;
    getDateOfBirth() : Date;
    setDateOfBirth(dateOfBirth : Date) : IUserModel;
    getEmail() : string;
    setEmail(email : string) : IUserModel;
    getPicture() : Blob;
    setPicture(picture : Blob) : IUserModel;
    getPictureUrl() : string;
    setPictureUrl(pictureUrl : string) : IUserModel;
    getUsername() : string;
    setUsername(username : string) : IUserModel;
    getPassword() : string;
    setPassword(password : string) : IUserModel;
    validate() : Promise<any>;
}

export default class UserModel implements IUserModel {

    private id : string;

    @IsNotEmpty()
    private name: string;

    private lastName: string;

    @IsDate()
    private dateOfBirth: Date;

    @IsEmail()
    private email: string;

    private picture: Blob;

    private pictureUrl: string;

    @IsNotEmpty()
    private username: string;

    @Length(8)
    private password: string;

    getId() : string {
        return this.id;
    }

    setId(id : string) : IUserModel {
        this.id = id;
        return this;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): IUserModel {
        this.name = name;
        return this;
    }

    getLastName(): string {
        return this.lastName;
    }

    setLastName(lastName: string): IUserModel {
        this.lastName = lastName;
        return this;
    }

    getDateOfBirth(): Date {
        return this.dateOfBirth;
    }

    setDateOfBirth(dateOfBirth: Date): IUserModel {
        this.dateOfBirth = dateOfBirth;
        return this;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(email: string): IUserModel {
        this.email = email;
        return this;
    }

    getPicture(): Blob {
        return this.picture;
    }
    
    setPicture(picture: Blob): IUserModel {
        this.picture = picture;
        return this;
    }

    getPictureUrl() : string {
        return this.pictureUrl;
    }

    setPictureUrl(pictureUrl : string) : IUserModel {
        this.pictureUrl = pictureUrl;
        return this;
    }

    getUsername(): string {
        return this.username;
    }

    setUsername(username: string): IUserModel {
        this.username = username;
        return this;
    }

    getPassword(): string {
        return this.password;
    }

    setPassword(password: string): IUserModel {
        this.password = password;
        return this;
    }

    validate(): Promise<any> {
        return modelValidate(this);
    }
}