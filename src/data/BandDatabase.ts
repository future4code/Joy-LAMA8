import { BaseDatabase } from "./BaseDatabase";


export class BandDatabase extends BaseDatabase {

  private static TABLE_NAME = "LAMA_BANDAS"

  public async createBand(
    id: string,
    name: string,
    musicGenre: string,
    responsible: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          musicGenre,
          responsible
        })
        .into(BandDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}