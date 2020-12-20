import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { validate as modelValidate } from "class-validator";
import { ISurveyModel } from "./SurveyModel";
import { IUserModel } from "./UserModel";

export interface ISurveyAnswerModel {
    getId() : string;
    setId(id : string) : ISurveyAnswerModel;
    getSurvey(): ISurveyModel;
    setSurvey(survey: ISurveyModel): ISurveyAnswerModel;
    getAnsweredByUser(): IUserModel;
    setAnsweredByUser(user: IUserModel): ISurveyAnswerModel;
    validate() : Promise<any>;
}

export default class SurveyAnswerModel implements ISurveyAnswerModel {

    @IsOptional()
    @IsString()
    private id : string;

    @IsNotEmpty()
    private survey: ISurveyModel;

    @IsNotEmpty()
    private answeredByUser: IUserModel;

    getId(): string {
      return this.id;
    }

    setId(id: string): ISurveyAnswerModel {
      this.id = id;
      return this;
    }

    getSurvey(): ISurveyModel {
      return this.survey;
    }
    setSurvey(survey: ISurveyModel): ISurveyAnswerModel {
      this.survey = survey;
      return this;
    }
    getAnsweredByUser(): IUserModel {
      return this.answeredByUser;
    }
    setAnsweredByUser(user: IUserModel): ISurveyAnswerModel {
      this.answeredByUser = user;
      return this;
    }
    
    validate(): Promise<any> {
      return modelValidate(this);
    }

}