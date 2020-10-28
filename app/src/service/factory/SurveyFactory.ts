import { ObjectID } from "mongodb";
import { IAskModel } from "../../model/AskModel";
import AskSelectModel from "../../model/AskSelectModel";
import { Inject, Service } from "typedi";
import SurveyModel, { ISurveyModel } from "../../model/SurveyModel";
import { IUserFactory } from "./UserModelFactory";
import { IAskFactory } from "./AskModelFactory";

export interface ISurveyFactory {
    create() : ISurveyModel;
    createMongoMap(surveyModel : ISurveyModel) : Object;
    createByMongoMap(mongoMap : any) : ISurveyModel;
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
        .setAsks([
          ...mongoMap.asks.map((askMap : any) => {
            const askModel : IAskModel = this.askFactory.create(askMap.type);
            // poderia usar o populate para evitar o if
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
          })
        ]);
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
        asks: [
          ...surveyModel.getAsks().map((askModel : IAskModel) => {
            if (askModel instanceof AskSelectModel) {
              return {
                _id: new ObjectID(askModel.getId()) ?? new ObjectID(),
                title: askModel.getTitle(),
                multipleSelect: askModel.getMultipleSelect(),
                options: askModel.getOptions(),
                type: askModel.getType(),
                order: askModel.getOrder(),
                required: askModel.getRequired()
              };
            } else {
              return {
                _id: new ObjectID(askModel.getId()) ?? new ObjectID(),
                title: askModel.getTitle(),
                type: askModel.getType(),
                order: askModel.getOrder(),
                required: askModel.getRequired()
              };
            }
          })
        ]
      };
    }
}