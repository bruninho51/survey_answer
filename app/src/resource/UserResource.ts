import { IUserModel } from "../model/UserModel";

export class UserResource {

    private links : Array<Object> = [];
    private user : IUserModel;

    constructor(user : IUserModel) {

      user.setPassword(null);
      this.user = user;
      this.createLinks();
    }

    private createLinks() {

      this.links.push(
        {
          type: "GET",
          rel: "self",
          href: process.env.BASE_URL + "/user/" + this.user.getId()
        }, 
        {
          type: "PUT",
          rel: "self",
          href: process.env.BASE_URL + "/user/" + this.user.getId()
        }
      );
    }
}