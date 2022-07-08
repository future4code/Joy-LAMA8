import { Request, Response } from "express";
import { ShowsBusiness } from "../business/ShowsBusiness";

export class ShowsController {
  constructor(private showBusiness: ShowsBusiness) {}

//   async createShows(req: Request, res: Response) {
//     try {
//     } catch (error) {}
//   }

  async getShowByDateController(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const { date } = req.params;

      const show = await this.showBusiness.getShowByDate(date, token);

      res.status(200).send(show);
    } catch (error: any) {
      res.status(error.statusCode).send(error.message);
    }
  }
}
