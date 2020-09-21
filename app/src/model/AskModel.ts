import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { validate as modelValidate } from "class-validator";
import { AskDTO } from "../dto/AskDTO";

export interface IAskModel {
    getId() : string;
    setId(id : string) : IAskModel;
    getTitle() : string;
    setTitle(title : string) : IAskModel;
    getType() : string;
    setType(type : string) : IAskModel;
    getRequired(): boolean;
    setRequired(required: boolean): IAskModel;
    getOrder() : number;
    setOrder(order : number) : IAskModel;
    validate() : Promise<any>;
    populate(askDTO : AskDTO) : IAskModel;
}

export default class AskModel implements IAskModel {

    @IsOptional()
    @IsString()
    private id : string;

    @IsNotEmpty()
    @IsString()
    private title : string;

    @IsNotEmpty()
    @IsString()
    private type: string;

    @IsNotEmpty()
    @IsBoolean()
    private required: boolean;

    @Min(1)
    @IsNotEmpty()
    @IsInt()
    private order : number;

    getId(): string {
        return this.id;
    }
    
    setId(id: string): IAskModel {
        this.id = id;
        return this;
    }

    getTitle(): string {
        return this.title;
    }

    setTitle(title: string): IAskModel {
        this.title = title;
        return this;
    }

    getType(): string {
        return this.type;
    }
    
    setType(type: string): IAskModel {
        this.type = type;
        return this;
    }

    setRequired(required: boolean): IAskModel {
        this.required = required;
        return this;
    }

    getRequired(): boolean {
        return this.required;
    }

    getOrder(): number {
        return this.order;
    }
    
    setOrder(order: number): IAskModel {
        this.order = order;
        return this;
    }
    
    validate(): Promise<any> {
        return modelValidate(this);
    }

    populate(askDTO: AskDTO): IAskModel {
        this.setId(askDTO.id);
        this.setTitle(askDTO.title);
        this.setType(askDTO.type);
        this.setRequired(askDTO.required);
        this.setOrder(askDTO.order);

        return this;
    }
    
}