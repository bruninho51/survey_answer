import { Authorized, Body, InternalServerError, JsonController, Post } from "routing-controllers";
import { IAnswerFactory } from "../service/factory/AnswerModelFactory";
import { Inject } from "typedi";
import { AnswerDTO } from "../dto/AnswerDTO";
import { IAnswerModel } from "../model/AnswerModel";
import { IAnswerRepository } from "../repository/AnswerRepository";
import { AnswerResource } from "../resource/AnswerResource";

@JsonController("/answer")
export class AnswerController {

    @Inject("answer.factory")
    private answerFactory : IAnswerFactory;

    @Inject("answer.repository")
    private answerRepository: IAnswerRepository;

    @Post("/")
    async cadAnswer(@Body() answerDTO: AnswerDTO) : Promise<AnswerResource> {
      // Em vez de fazer da forma atual, você pode salvar na collection Answers o Survey com uma propriedade value
      // em cada ask + id do usuário que respondeu
      const answerModel : IAnswerModel = await this.answerFactory.create(answerDTO.askId, answerDTO.value);
      console.log(answerModel);
      try {
        return new AnswerResource(await this.answerRepository.save(answerModel));
      } catch (error) {
        console.log(error);
        throw new InternalServerError("An error ocurred on save answer.");
      }
    }
}