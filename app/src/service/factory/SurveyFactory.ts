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
}

@Service('survey.factory')
export class SurveyFactory implements ISurveyFactory {

    @Inject('user.factory')
    private userFactory : IUserFactory;

    @Inject('ask.factory')
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
                ...mongoMap.asks.map((askMap : any) : IAskModel => (
                    this.askFactory.create(askMap.type)
                        .setId(askMap._id.toString())
                        .setTitle(askMap.name)
                        .setType(askMap.type)
                        .setOrder(askMap.order)
                        .setRequired(askMap.required)
                ))
            ]);
    }

    createMongoMap(surveyModel : ISurveyModel): Object {
        
        return {
            _id: surveyModel.getId() ?? new ObjectID(),
            name: surveyModel.getName(),
            description: surveyModel.getDescription(),
            expiration: surveyModel.getExpiration(),
            owner: {
                _id: surveyModel.getOwner().getId(),
                name: surveyModel.getOwner().getName(),
                lastName: surveyModel.getOwner().getLastName(),
                dateOfBirth: surveyModel.getOwner().getDateOfBirth(),
                email: surveyModel.getOwner().getEmail(),
                pictureUrl: surveyModel.getOwner().getPictureUrl(),
                username: surveyModel.getOwner().getUsername()
            },
            asks: [
                ...surveyModel.getAsks().map((askModel : IAskModel) => ({
                    _id: askModel.getId() ?? new ObjectID(),
                    title: askModel.getTitle(),
                    type: askModel.getType(),
                    order: askModel.getOrder(),
                    required: askModel.getRequired()
                }))
            ]
        };
    }
}