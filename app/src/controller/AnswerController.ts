import { Authorized, Body, CurrentUser, InternalServerError, JsonController, Post } from "routing-controllers";
import { Inject } from "typedi";
import { IUserModel } from "../model/UserModel";
import { SurveyAnswerDTO } from "../dto/SurveyAnswerDTO";
import { ISurveyRepository } from "../repository/SurveyRepository";
import { HttpInvalidAskException } from "../exception";
import { AskAnswerModel } from "../model/AskModel";
import { SurveyResource } from "../resource/SurveyResource";
@JsonController("/answer")
export class AnswerController {

    @Inject("survey.repository")
    private surveyRepository: ISurveyRepository;

    @Post("/")
    @Authorized()
    async cadAnswer(@Body() answerDTO: SurveyAnswerDTO, @CurrentUser({ required: true }) user: IUserModel) : Promise<SurveyResource> {

      const { surveyId, answers } = answerDTO;

      const survey = await this.surveyRepository.getById(surveyId);

      for (const answer of answers) {
        const ask = survey.getAskById(answer.askId);
        if (!ask) {
          throw new HttpInvalidAskException();
        }

        const askAnswer = (new AskAnswerModel())
          .setValue(answer.value)
          .setAnsweredByUser(user);
        
        ask.setAnswer(askAnswer);
      }

      try {
        return new SurveyResource(await this.surveyRepository.saveAnswers(survey));
      } catch (error) {
        throw new InternalServerError("An error ocurred on save answers.");
      }
    }
}