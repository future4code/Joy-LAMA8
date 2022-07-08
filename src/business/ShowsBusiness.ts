import { invalidAuthenticatorData } from "../error/AuthenticatorError";
import { BaseError } from "../error/BaseError";
import { invalidShowDate, invalidToken } from "../error/InvalidInfos";
import { ShowsInputDTO } from "../model/Show";
import { Authenticator } from "../services/Authenticator";
import { ShowRepository } from "./ShowsRepository";

export class ShowsBusiness {
  constructor(private showsDataBase: ShowRepository) {}

//   async createShow(input: ShowsInputDTO) {
//     try {
//     } catch (error) {}
//   }

    async getShowByDate(date: string, token: string) {
        try {
            if (!token) {
                throw new invalidToken()
            }
            const authenticatorData = new Authenticator().getData(token)

            if (!authenticatorData.id) {
                throw new invalidAuthenticatorData()
            }
            const show = await this.showsDataBase.getShowsByDate(date)

            if (!show) {
                throw new invalidShowDate()
            }

            return show
        } catch (error: any) {
            throw new BaseError(error.statusCode, error.sqlMessage || error.message)
        }
    }
}
