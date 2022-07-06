import { BandRepository } from "../business/BandRepository";
import { Band } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";


export class BandDatabase extends BaseDatabase implements BandRepository {

  private static TABLE_NAME = "LAMA_BANDAS"

  public async createBand(
    band: Band
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: band.id,
          name: band.name,
          music_genre: band.musicGenre,
          responsible: band.responsible
        })
        .into(BandDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}