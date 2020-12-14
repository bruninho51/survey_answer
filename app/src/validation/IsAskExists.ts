import { ValidationOptions, registerDecorator } from "class-validator";
import { ISurveyRepository } from "../repository/SurveyRepository";
import Container from "typedi";
import { ISurveyModel } from "../model/SurveyModel";

export function IsAskExists(options?: ValidationOptions) {
  return (object: Object, propertyName: string) : void => {
    registerDecorator({
      name: "IsAskExists",
      target: object.constructor,
      propertyName,
      options,
      validator: {
        async validate(askId: string): Promise<boolean> {
          const repo : ISurveyRepository = Container.get("survey.repository");
          const surveyExists : ISurveyModel = await repo.getByAskId(askId);
          return !!surveyExists;
        },
        defaultMessage() {
          return "Ask is not available.";
        }
      },
      async: true
    });
  };
}