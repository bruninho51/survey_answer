import AskSelectModel from "../../model/AskSelectModel";
import { Service } from "typedi";
import AskModel, { IAskModel } from "../../model/AskModel";
import { AskTypeModel } from "../../model/AskTypeModel";
import { InvalidAskTypeException } from "../../exception";

export interface IAskFactory {
    create(askType: string) : IAskModel;
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
}