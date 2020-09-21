import { IsEmail, IsDate, Length, IsNotEmpty, validate as modelValidate, IsString, IsOptional } from "class-validator";
import { UserDTO } from "../dto/UserDTO";
import { IsUniqueUserEmail } from "../validation/IsUniqueUserEmail";
import { IsUniqueUsername } from "../validation/IsUniqueUsername";
import crypto from "crypto";

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
    populate(userDTO : UserDTO) : IUserModel;
}

export default class UserModel implements IUserModel {

    @IsOptional()
    @IsString()
    private id : string;

    @IsNotEmpty()
    @IsString()
    private name: string;

    @IsString()
    private lastName: string;

    @IsDate()
    private dateOfBirth: Date;

    @IsEmail()
    @IsUniqueUserEmail()
    private email: string;

    private picture: Blob;

    @IsString()
    private pictureUrl: string;

    @IsNotEmpty()
    @IsUniqueUsername()
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
        
        this.password = null;
        if (password) {
            const passwordHash = crypto.createHash('sha256')
            .update(process.env.SECRET + password)
            .digest('hex');
            this.password = passwordHash;
        }

        return this;
    }

    validate(): Promise<any> {
        return modelValidate(this);
    }

    populate(userDTO : UserDTO) : IUserModel {
        this.setId(userDTO.id);
        this.setName(userDTO.name);
        this.setLastName(userDTO.lastName);
        this.setDateOfBirth(userDTO.dateOfBirth);
        this.setEmail(userDTO.email);
        this.setPictureUrl(userDTO.pictureUrl);
        this.setUsername(userDTO.username);
        this.setPassword(userDTO.password);

        return this;
    }
}