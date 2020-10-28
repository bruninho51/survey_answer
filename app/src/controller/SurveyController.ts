import { Authorized, Body, Get, InternalServerError, JsonController, OnUndefined, Param, Post, QueryParam } from "routing-controllers";
import { ISurveyFactory } from "../service/factory/SurveyFactory";
import { Inject } from "typedi";
import { RegisterSurveyDTO } from "../dto/RegisterSurveyDTO";
import { ISurveyModel } from "../model/SurveyModel";
import { AskDTO } from "../dto/AskDTO";

import { IAskFactory } from "../service/factory/AskModelFactory";
import { SurveyResource } from "../resource/SurveyResource";
import { HttpSurveyNotFoundException, InvalidAskTypeException } from "../exception";
import { HttpInvalidAskTypeException } from "../exception";
import { IUserRepository } from "../repository/UserRepository";
import { ISurveyRepository } from "../repository/SurveyRepository";
import HttpSurveyNotFoundError from "../exception/http/HttpSurveyNotFoundException";
import { SurveysResource } from "../resource/SurveysResource";

@JsonController("/survey")
export class SurveyController {

    @Inject("survey.factory")
    private surveyFactory : ISurveyFactory;

    @Inject("survey.repository")
    private surveyRepository : ISurveyRepository;

    @Inject("user.repository")
    private userRepository : IUserRepository;

    @Inject("ask.factory")
    private askFactory : IAskFactory;

    @Post()
    async cadSurvey(@Body() surveyDTO: RegisterSurveyDTO) : Promise<SurveyResource> {
        
      const surveyModel : ISurveyModel = this.surveyFactory.create().populate(surveyDTO);
        
      surveyModel.setOwner(await this.userRepository.getById(surveyDTO.owner.id));

      try {
        surveyModel.setAsks(surveyDTO.asks.map((askDTO : AskDTO) => {
          return this.askFactory.create(askDTO.type).populate(askDTO);
        }));
            
        return new SurveyResource(
          await this.surveyRepository.save(surveyModel));

      } catch (e) {
        if (e instanceof InvalidAskTypeException) {
          throw new HttpInvalidAskTypeException();
        } else {
          throw new InternalServerError("An error ocurred on save survey.");
        }
      }
    }

    @Get("/:id")
    @Authorized()
    @OnUndefined(HttpSurveyNotFoundError)
    async getSurvey(@Param("id") id : string) : Promise<SurveyResource> {
      const survey : ISurveyModel = await this.surveyRepository.getById(id);
      if (survey) return new SurveyResource(survey);
    }

    @Get("/")
    @Authorized()
    @OnUndefined(HttpSurveyNotFoundException)
    async getAllSurveys(@QueryParam("page") page  = 1, @QueryParam("limit") limit  = 10) : Promise<SurveysResource> {
      const surveysList : Array<ISurveyModel> = await this.surveyRepository.getAll({ page, limit });
      const count : number = await this.surveyRepository.countAll();

      return new SurveysResource(surveysList, { limit, page }, count);
    }
}