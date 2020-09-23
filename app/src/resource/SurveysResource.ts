import { SurveyResource } from "./SurveyResource";
import { PagingOptions } from "../contracts/PageOptions";
import { ISurveyModel } from "../model/SurveyModel";

export class SurveysResource {

    private links : Array<Object> = [];
    private page : Object = {};
    private surveys : Array<SurveyResource> = [];

    constructor(surveys : Array<ISurveyModel>, { limit = 10, page = 1 } : PagingOptions, totalSurveys : number) {

        let $this = this;
        surveys.forEach(function (survey : ISurveyModel) {
            $this.surveys.push(new SurveyResource(survey));
        });
        this.createLinks();

        let size = this.surveys.length;
        this.createPage({ limit, page }, totalSurveys, size);
    }

    private createLinks() {

        this.links.push(
                {
                    type: "POST",
                    rel: "cad_survey",
                    href: process.env.BASE_URL + `/survey`
                }
        );
    }

    private createPage({ limit = 10, page = 1 } : PagingOptions, totalSurveys: number, size : number) {

        let lastPage : number = Math.ceil(totalSurveys / 10);

        this.page = {
            totalPages: lastPage,
            number: page,
            size: size,
            first: {
                href: process.env.BASE_URL + `/survey/?page=1&limit=${limit}`
            },
            prev: {
                href: page != 1 ? process.env.BASE_URL + `/survey/?page=${page - 1}&limit=${limit}` : null
            },
            self: {
                href: process.env.BASE_URL + `/survey/?page=${page}&limit=${limit}`
            },
            next: {
                href: page < lastPage ? process.env.BASE_URL + `/survey/?page=${page + 1}&limit=${limit}` : null
            },
            last: {
                href: process.env.BASE_URL + `/survey/?page=${lastPage}&limit=${limit}`
            }
        };
    }
}