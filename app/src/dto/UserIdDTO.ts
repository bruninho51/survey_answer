import { IsNotEmpty } from "class-validator";
import { IsUserExists } from "../validation/IsUserExists";

export class UserIdDTO {

    @IsNotEmpty()
    @IsUserExists()
    public id : string;
}