import { IsBoolean, IsNotEmpty, IsString, MinLength } from "class-validator";
import { AskDTO } from "../dto/AskDTO";
import AskModel, { IAskModel } from "./AskModel";

export interface IAskSelectModel extends IAskModel {
    getOptions() : Array<string>;
    setOptions(options : Array<string>) : IAskSelectModel;
    addOption(option : string) : IAskSelectModel;
    getMultipleSelect() : boolean;
    setMultipleSelect(multipleSelect : boolean) : IAskSelectModel;
}

export default class AskSelectModel extends AskModel implements IAskSelectModel {
    
    @MinLength(1)
    @IsString({each: true})
    private options : Array<string>;

    @IsNotEmpty()
    @IsBoolean()
    private multipleSelect : boolean;

    constructor() {
        super();
        this.options = [];
        this.multipleSelect = false;
    }
    
    getMultipleSelect(): boolean {
        return this.multipleSelect;
    }

    setMultipleSelect(multipleSelect: boolean): IAskSelectModel {
        multipleSelect && (this.multipleSelect = multipleSelect);
        return this;
    }

    getOptions(): Array<string> {
        return this.options;
    }
    
    setOptions(options: Array<string>): IAskSelectModel {
        options && (this.options = options);
        return this;
    }

    addOption(option: string): IAskSelectModel {
        option && this.options.push(option);
        return this;
    }

    populate(askDTO: AskDTO): IAskModel {
        super.populate(askDTO);
        this.setOptions(askDTO.options);
        this.setMultipleSelect(askDTO.multipleSelect);

        return this;
    }

}