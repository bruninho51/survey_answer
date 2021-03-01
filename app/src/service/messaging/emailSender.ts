import { Inject, Service } from "typedi";
import { IUserModel } from "../../model/UserModel";
import { IMessageSender } from "./messageSender";

export interface IEmailSender {
    sendCreatedUserConfirmation(user: IUserModel): void
}

@Service("email.sender")
export class EmailSender {

  @Inject("messaging.sender")
  private sender : IMessageSender;

  sendCreatedUserConfirmation(user: IUserModel) {
    user.setPassword(null);
    this.sender.send("surveyanswer.created-user", Buffer.from(JSON.stringify(user)));
  }
}
