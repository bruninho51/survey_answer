import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { AskDTO } from "./AskDTO";
import { UserIdDTO } from "./UserIdDTO";

export class RegisterSurveyDTO {

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
    @Type(() => UserIdDTO)
    @ValidateNested({ each: true })
    public owner : UserIdDTO;

    @IsNotEmpty()
    @Type(() => AskDTO)
    @ValidateNested({ each: true })
    public asks : Array<AskDTO>;
}