import { Authorized, Body, CurrentUser, InternalServerError, JsonController, Post } from "routing-controllers";
import { Inject } from "typedi";
import { IUserModel } from "../model/UserModel";
import { SurveyAnswerDTO } from "../dto/SurveyAnswerDTO";
import { ISurveyRepository } from "../repository/SurveyRepository";
import { HttpInvalidAskException } from "../exception";
import { AskAnswerModel } from "../model/AskModel";
import { SurveyResource } from "../resource/SurveyResource";
import { ISurveyAnswerModelFactory } from "../service/factory/SurveyAnswerModelFactory";
import { ISurveyAnswerRepository } from "../repository/SurveyAnswerRepository";
import { SurveyAnswerResource } from "../resource/SurveyAnswerResource";
@JsonController("/answer")
export class AnswerController {

    @Inject("survey.repository")
    private surveyRepository: ISurveyRepository;

    @Inject("surveyAnswer.factory")
    private surveyAnswerFactory: ISurveyAnswerModelFactory;

    @Inject("surveyAnswer.repository")
    private surveyAnswerRepository: ISurveyAnswerRepository;

    @Post("/")
    @Authorized()
    async cadAnswer(@Body() answerDTO: SurveyAnswerDTO, @CurrentUser({ required: true }) user: IUserModel) : Promise<SurveyAnswerResource> {

      const { surveyId, answers } = answerDTO;

      const survey = await this.surveyRepository.getById(surveyId);

      for (const answer of answers) {
        const ask = survey.getAskById(answer.askId);
        if (!ask) {
          throw new HttpInvalidAskException();
        }

        const askAnswer = new AskAnswerModel();
        askAnswer.setValue(answer.value);
        
        ask.setAnswer(askAnswer);
      }

      const surveyAnswer = this.surveyAnswerFactory.create(survey, user);

      try {
        return new SurveyAnswerResource(await this.surveyAnswerRepository.save(surveyAnswer));
      } catch (error) {
        console.log(error.stack);
        throw new InternalServerError("An error ocurred on save answers.");
      }
    }
}