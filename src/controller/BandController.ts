import { BandBusiness } from "../business/BandBusiness";
import { Request, Response } from "express";
import { BandInputDTO } from "../model/Band";

export class BandController {
  constructor(private bandBusiness: BandBusiness){}

  async createBandController(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string

      const { name, musicGenre, responsible } = req.body

      const band: BandInputDTO = {
        name,
        musicGenre,
        responsible,
        token
      }

      await this.bandBusiness.createBand(band)

      res.status(201).send({ message: "Banda registrada com sucesso"})
    } catch (err: any) {
      res.status(err.statusCode).send(err.message)
    }
  }
}