import AskSelectModel from "../../model/AskSelectModel";
import { Inject, Service } from "typedi";
import AskModel, { IAskModel, TypeAskAnswerModel } from "../../model/AskModel";
import { AskTypeModel } from "../../model/AskTypeModel";
import { InvalidAskTypeException } from "../../exception";
import { ObjectID } from "mongodb";
import { IUserFactory } from "./UserModelFactory";
import { AskAnswerModel } from "../../model/AskModel";
export interface IAskFactory {
    create(askType: string) : IAskModel;
    createMongoMap(askModel: IAskModel) : Object;
    createAskAnsweredMongoMap(askModel: IAskModel): Object;
    createAskAnsweredByMongoMap(askMap: any): IAskModel;
    createByMongoMap(askMap: any): IAskModel;
}

@Service("ask.factory")
export class AskFactory implements IAskFactory {

  @Inject("user.factory")
    private userFactory : IUserFactory;

  create(askType: string) : IAskModel {

    let askModel : IAskModel;

    switch(askType) {
    case AskTypeModel.DATE:
    case AskTypeModel.NUMBER:
    case AskTypeModel.TEXT:
      askModel = new AskModel();
      break;
    case AskTypeModel.SELECT:
      askModel = new AskSelectModel();
      break;
    default:
      throw new InvalidAskTypeException();
    }

    return askModel;
  }

  createMongoMap(askModel: IAskModel): Object {
    const askMap = (askModel instanceof AskSelectModel) ?
      {
        _id: new ObjectID(askModel.getId()) ?? new ObjectID(),
        title: askModel.getTitle(),
        multipleSelect: askModel.getMultipleSelect(),
        options: askModel.getOptions(),
        type: askModel.getType(),
        order: askModel.getOrder(),
        required: askModel.getRequired()
      } : {
        _id: new ObjectID(askModel.getId()) ?? new ObjectID(),
        title: askModel.getTitle(),
        type: askModel.getType(),
        order: askModel.getOrder(),
        required: askModel.getRequired()
      };

    return askMap;
  }

  createByMongoMap(askMap: any): IAskModel {
    const askModel : IAskModel = this.create(askMap.type);
    if (askModel instanceof AskSelectModel) {
      askModel.setMultipleSelect(askMap.multipleSelect)
        .setOptions(askMap.options)
        .setId(askMap._id.toString())
        .setTitle(askMap.title)
        .setType(askMap.type)
        .setOrder(askMap.order)
        .setRequired(askMap.required);
    } else {
      askModel
        .setId(askMap._id.toString())
        .setTitle(askMap.title)
        .setType(askMap.type)
        .setOrder(askMap.order)
        .setRequired(askMap.required);
    }

    return askModel;
  }

  createAskAnsweredByMongoMap(askMap: any): IAskModel {
    const askAnswerModel = new AskAnswerModel();
    askAnswerModel.setValue(askMap.answer.value);

    const askModel = this.createByMongoMap(askMap);
    askModel.setAnswer(askAnswerModel);

    return askModel;
  }

  createAskAnsweredMongoMap(askModel: IAskModel): Object {

    const answer: TypeAskAnswerModel = {
      value: askModel.getAnswer().getValue()
    };

    const askMap: any = Object.assign({ answer }, this.createMongoMap(askModel));

    return askMap;
  }
}