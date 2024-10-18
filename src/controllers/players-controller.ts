import { Request, Response } from "express"
import { createPlayerService, deletePlayerService, getPlayersByIdService, getPlayerService, teamPlayersService, updatePlayerService } from "../services/players-services"
import { noContent } from "../utils/http-helper"
import { StatisticsModel } from "../models/statistics-model"

export const getPlayers = async (req: Request, res: Response) => {
    const httpResponse = await getPlayerService()
    console.log(httpResponse.body)
    res.status(httpResponse.statusCode).json(httpResponse.body)
}

export const getPlayersById = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const httpResponse = await getPlayersByIdService(id)

    res.status(httpResponse.statusCode).json(httpResponse.body)
}

export const postPlayer = async (req: Request, res: Response) => {

    const bodyValue = req.body
    const httpResponse = await createPlayerService(bodyValue)

    if (httpResponse) {
        res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
        const response = await noContent()
        res.status(response.statusCode).json(response.body)
    }
}

export const deletePlayer = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const httpResponse = await deletePlayerService(id)

    res.status(httpResponse.statusCode).json(httpResponse.body)
}

export const updatePlayer = async (req: Request, res:Response) => {
    const id = Number(req.params.id)

    const bodyValue: StatisticsModel = req.body
    
    const httpResponse = await updatePlayerService(id, bodyValue)

    res.status(httpResponse.statusCode).json(httpResponse.body)
}

export const teamsPlayer = async (req: Request, res: Response) => {
    const team = req.body.club

    const httpResponse = await teamPlayersService(team)

    res.status(httpResponse.statusCode).json(httpResponse.body)
}