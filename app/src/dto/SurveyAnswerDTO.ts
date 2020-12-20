import { Type } from "class-transformer";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { AskAnswerDTO } from "./AskAnswerDTO";

export class SurveyAnswerDTO {

    @IsNotEmpty()
    @IsString()
    public surveyId : string;

    @IsNotEmpty()
    @Type(() => AskAnswerDTO)
    @ValidateNested({ each: true })
    public answers : AskAnswerDTO[];
}