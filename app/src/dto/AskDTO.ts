import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class AskDTO {
    
    @IsString()
    public id : string;

    @IsString()
    @IsNotEmpty()
    public title : string;

    @IsString()
    @IsNotEmpty()
    public type: string;

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    public order : number;

    @IsBoolean()
    @IsNotEmpty()
    public required : boolean;

    @IsOptional()
    @IsBoolean()
    public multipleSelect: boolean;

    @IsOptional()
    @IsString({each: true})
    public options: Array<string>;

}