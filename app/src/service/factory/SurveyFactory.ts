import { ObjectID } from "mongodb";
import { IAskModel } from "../../model/AskModel";
import { Inject, Service } from "typedi";
import SurveyModel, { ISurveyModel } from "../../model/SurveyModel";
import { IUserFactory } from "./UserModelFactory";
import { IAskFactory } from "./AskModelFactory";

export interface ISurveyFactory {
    create() : ISurveyModel;
    createMongoMap(surveyModel : ISurveyModel) : Object;
    createByMongoMap(mongoMap : any) : ISurveyModel;
    createSurveyAnsweredByMongoMap(mongoMap: any): ISurveyModel;
    createSurveyAnsweredMongoMap(surveyModel: ISurveyModel): Object;
}

@Service("survey.factory")
export class SurveyFactory implements ISurveyFactory {

    @Inject("user.factory")
    private userFactory : IUserFactory;

    @Inject("ask.factory")
    private askFactory : IAskFactory;

    create() : ISurveyModel {
      return new SurveyModel();
    }

    createByMongoMap(mongoMap : any) : ISurveyModel {
      return this.create()
        .setId(mongoMap._id.toString())
        .setName(mongoMap.name)
        .setDescription(mongoMap.description)
        .setExpiration(new Date(mongoMap.expiration))
        .setOwner(this.userFactory.createByMongoMap(mongoMap.owner))
        .setAsks([ ...mongoMap.asks.map((askMap : any) => this.askFactory.createByMongoMap(askMap)) ]);
    }

    createSurveyAnsweredByMongoMap(mongoMap: any): ISurveyModel {
      const surveyModel = this.createByMongoMap(mongoMap)
        .setAsks([ ...mongoMap.asks.map((askMap : any) => this.askFactory.createAskAnsweredByMongoMap(askMap)) ]);
      return surveyModel;
    }

    createMongoMap(surveyModel : ISurveyModel): Object {
        
      return {
        _id: new ObjectID(surveyModel.getId()) ?? new ObjectID(),
        name: surveyModel.getName(),
        description: surveyModel.getDescription(),
        expiration: surveyModel.getExpiration(),
        owner: {
          _id: new ObjectID(surveyModel.getOwner().getId()),
          name: surveyModel.getOwner().getName(),
          lastName: surveyModel.getOwner().getLastName(),
          dateOfBirth: surveyModel.getOwner().getDateOfBirth(),
          email: surveyModel.getOwner().getEmail(),
          pictureUrl: surveyModel.getOwner().getPictureUrl(),
          username: surveyModel.getOwner().getUsername()
        },
        asks: [ ...surveyModel.getAsks().map((askModel : IAskModel) => this.askFactory.createMongoMap(askModel)) ]
      };
    }

    createSurveyAnsweredMongoMap(surveyModel: ISurveyModel): Object {
      return Object.assign(this.createMongoMap(surveyModel), {
        asks: [ ...surveyModel.getAsks().map((askModel : IAskModel) => this.askFactory.createAskAnsweredMongoMap(askModel)) ]
      });
    }
}