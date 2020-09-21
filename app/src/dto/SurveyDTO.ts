import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { AskDTO } from "./AskDTO";
import { UserDTO } from "./UserDTO";

export class SurveyDTO {

    @IsString()
    public id : string;

    @IsNotEmpty()
    @IsString()
    public name : string;

    @IsNotEmpty()
    @IsString()
    public description : string;

    @IsDate()
    @Type(() => Date)
    public expiration : Date;

    @IsNotEmpty()
    @Type(() => UserDTO)
    @ValidateNested({ each: true })
    public owner : UserDTO;

    @IsNotEmpty()
    @Type(() => AskDTO)
    @ValidateNested({ each: true })
    public asks : Array<AskDTO>;
}