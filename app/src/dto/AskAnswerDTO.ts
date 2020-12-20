import { IsNotEmpty, IsString } from "class-validator";
import { IsAskExists } from "../validation/IsAskExists";
export class AskAnswerDTO {

    @IsString()
    @IsNotEmpty()
    @IsAskExists()
    public askId: string

    @IsString()
    @IsNotEmpty()
    public value: string
}