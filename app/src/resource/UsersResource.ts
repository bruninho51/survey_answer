import { UserResource } from "./UserResource";
import { IUserModel } from "../model/UserModel";
import { PagingOptions } from "../contracts/PageOptions";

export class UsersResource {

    private links : Array<Object> = [];
    private page : Object = {};
    private users : Array<UserResource> = [];

    constructor(users : Array<IUserModel>, { limit = 10, page = 1 } : PagingOptions, totalUsers : number) {

        let $this = this;
        users.forEach(function (user : IUserModel) {
            $this.users.push(new UserResource(user));
        });
        this.createLinks();

        let size = this.users.length;
        this.createPage({ limit, page }, totalUsers, size);
    }

    private createLinks() {

        this.links.push(
                {
                    type: "POST",
                    rel: "cad_user",
                    href: process.env.BASE_URL + `/user`
                }
        );
    }

    private createPage({ limit = 10, page = 1 } : PagingOptions, totalUsers: number, size : number) {

        let lastPage : number = Math.ceil(totalUsers / 10);

        this.page = {
            totalPages: lastPage,
            number: page,
            size: size,
            first: {
                href: process.env.BASE_URL + `/user/?page=1&limit=${limit}`
            },
            prev: {
                href: page != 1 ? process.env.BASE_URL + `/user/?page=${page - 1}&limit=${limit}` : null
            },
            self: {
                href: process.env.BASE_URL + `/user/?page=${page}&limit=${limit}`
            },
            next: {
                href: page < lastPage ? process.env.BASE_URL + `/user/?page=${page + 1}&limit=${limit}` : null
            },
            last: {
                href: process.env.BASE_URL + `/user/?page=${lastPage}&limit=${limit}`
            }
        };
    }
}