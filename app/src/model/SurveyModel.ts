import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { validate as modelValidate } from "class-validator";
import { RegisterSurveyDTO } from "../dto/RegisterSurveyDTO";
import { IAskModel } from "./AskModel";
import { IUserModel } from "./UserModel";

export interface ISurveyModel {
    getId() : string;
    setId(id : string) : ISurveyModel;
    getName() : string;
    setName(name : string) : ISurveyModel;
    getDescription() : string;
    setDescription(description : string) : ISurveyModel;
    getExpiration() : Date;
    setExpiration(expiration : Date) : ISurveyModel;
    getOwner() : IUserModel;
    setOwner(owner : IUserModel) : ISurveyModel;
    getAsks() : Array<IAskModel>;
    setAsks(asks : Array<IAskModel>) : ISurveyModel;
    addAsk(ask: IAskModel) : ISurveyModel;
    getAskById(askId: string): IAskModel; 
    validate() : Promise<any>;
    populate(surveyDTO : RegisterSurveyDTO) : ISurveyModel;
}

export default class SurveyModel implements ISurveyModel {

    @IsOptional()
    @IsString()
    private id : string;

    @IsNotEmpty()
    @IsString()
    private name : string;

    @IsNotEmpty()
    @IsString()
    private description : string;

    @IsDate()
    private expiration : Date;

    @IsNotEmpty()
    private owner : IUserModel;

    @IsNotEmpty()
    private asks : Array<IAskModel>;

    constructor() {
      this.asks = [];
    }

    getId(): string {
      return this.id;
    }

    setId(id: string): ISurveyModel {
      this.id = id;
      return this;
    }

    getName(): string {
      return this.name;
    }

    setName(name: string): ISurveyModel {
      this.name = name;
      return this;
    }

    getDescription(): string {
      return this.description;
    }

    setDescription(description: string): ISurveyModel {
      this.description = description;
      return this;
    }

    getExpiration(): Date {
      return this.expiration;
    }

    setExpiration(expiration: Date): ISurveyModel {
      this.expiration = expiration;
      return this;
    }

    getOwner(): IUserModel {
      return this.owner;
    }

    setOwner(owner: IUserModel): ISurveyModel {
      this.owner = owner;
      return this;
    }

    getAsks(): Array<IAskModel> {
      return this.asks;
    }

    setAsks(asks: Array<IAskModel>): ISurveyModel {
      this.asks = asks;
      return this;
    }

    addAsk(ask: IAskModel) : ISurveyModel {
      this.asks.push(ask);
      return this;
    }

    getAskById(askId: string): IAskModel {
      return this.asks.find(element => element.getId() === askId);
    }
    
    validate(): Promise<any> {
      return modelValidate(this);
    }

    populate(surveyDTO: RegisterSurveyDTO): ISurveyModel {
      this.setName(surveyDTO.name);
      this.setDescription(surveyDTO.description);
      this.setExpiration(surveyDTO.expiration);

      return this;
    }

}