import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { validate as modelValidate } from "class-validator";
import { IAskModel } from "./AskModel";
import { ISurveyModel } from "./SurveyModel";

export interface IAnswerModel {
    getId() : string;
    setId(id : string) : IAnswerModel;
    getSurvey(): ISurveyModel;
    setSurvey(survey: ISurveyModel): IAnswerModel;
    getAsk(): IAskModel;
    setAsk(ask: IAskModel): IAnswerModel;
    getValue(): string;
    setValue(value: string): IAnswerModel;
    validate(): Promise<any>;
}

export default class AnswerModel implements IAnswerModel {

    @IsOptional()
    @IsString()
    private id : string;

    @IsNotEmpty()
    private survey : ISurveyModel;

    @IsNotEmpty()
    private ask: IAskModel;

    @IsString()
    private value: string;

    getId(): string {
      return this.id;
    }
    
    setId(id: string): IAnswerModel {
      this.id = id;
      return this;
    }

    getSurvey(): ISurveyModel {
      return this.survey;
    }

    setSurvey(survey: ISurveyModel): IAnswerModel {
      this.survey = survey;
      return this;
    }

    getAsk(): IAskModel {
      return this.ask;
    }
    
    setAsk(ask: IAskModel): IAnswerModel {
      this.ask = ask;
      return this;
    }

    getValue(): string {
      return this.value;
    }
    setValue(value: string): IAnswerModel {
      this.value = value;
      return this;
    }
    
    validate(): Promise<any> {
      return modelValidate(this);
    }
}