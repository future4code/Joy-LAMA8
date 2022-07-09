import express from "express"
import { BandBusiness } from "../business/BandBusiness"
import { BandController } from "../controller/BandController"
import { BandDatabase } from "../data/BandDatabase"


export const bandRouter = express.Router()

const bandDatabase = new BandDatabase()
const bandBusiness = new BandBusiness(bandDatabase)
const bandController = new BandController(bandBusiness)

bandRouter.post("/band", (req, res) => bandController.createBandController(req,res))
// bandRouter.get("/band/:id", (req, res) => bandController.getBandByIdController(req,res))