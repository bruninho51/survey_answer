import AskSelectModel from "../../model/AskSelectModel";
import { Service } from "typedi";
import AskModel, { IAskModel } from "../../model/AskModel";
import { AskTypeModel } from "../../model/AskTypeModel";
import { InvalidAskTypeException } from "../../exception";
import { ObjectID } from "mongodb";

export interface IAskFactory {
    create(askType: string) : IAskModel;
    createMongoMap(askModel: IAskModel) : Object;
}

@Service("ask.factory")
export class AskFactory implements IAskFactory {

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
}