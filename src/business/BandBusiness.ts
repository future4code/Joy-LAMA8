import { BandDatabase } from "../data/BandDatabase";
import { invalidAuthenticatorData, invalidToken } from "../error/AuthenticatorError";
import { BaseError } from "../error/BaseError";
import { MissingFieldsToComplete } from "../error/MissingFieldsToComplete";
import { Band, BandInputDTO } from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { BandRepository } from "./BandRepository";

const idGenerator = new IdGenerator()
const hashManager = new HashManager()
const bandDatabase = new BandDatabase()
const authenticator = new Authenticator()

export class BandBusiness {
  constructor(private bandDatabse: BandRepository){}


  async createBand(inputBand: BandInputDTO) {

    const { name, musicGenre, responsible, token } = inputBand

    if(!token) {
      throw new invalidToken()
    }

    if(!name || !musicGenre || !responsible){
      throw new MissingFieldsToComplete()
    }

    const authenticatorData = authenticator.getData(token)

    if(!authenticatorData.id) {
      throw new invalidAuthenticatorData()
    }

    const id = idGenerator.generate()

    const newBand: Band ={
      id,
      name,
      musicGenre,
      responsible
    }

    await this.bandDatabse.createBand(newBand)
  }catch(error: any) {
    throw new BaseError(error.statusCode,error.sqlMessage || error.message);
  }
}
