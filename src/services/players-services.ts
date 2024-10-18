import { PLayerModel } from "../models/player-model"
import { StatisticsModel } from "../models/statistics-model"
import * as PlayerRepository from "../repositories/players-repository"
import { badRequest, sucessful, noContent, ok } from "../utils/http-helper"
import { ResultSetHeader } from 'mysql2'

export const getPlayerService = async () => {
    const data = await PlayerRepository.findAllPlayers()
    let response: any

    if (data) {
        response = await ok(data)
    } else {
        response = await noContent()
    }

    return response
}

export const getPlayersByIdService = async (id: number) => {
    const data = await PlayerRepository.findPlayerById(id)
    let response: any


    if (data) {
        response = await ok(data)
    } else {
        response = await noContent()
    }

    return response
}

export const createPlayerService = async (player: PLayerModel) => {
    let response: any

    if (Object.keys(player).length !== 0) {
        await PlayerRepository.insertPlayer(player)

        response = sucessful()
    } else {
        response = badRequest()
    }

    return response
}

export const deletePlayerService = async (id: number) => {
    let response: any


    const data: ResultSetHeader = await PlayerRepository.deleteOnePlayer(id)

    if (data && data.affectedRows > 0) {
        response = sucessful()
    } else {
        response = await badRequest()
    }

    return response
}

export const updatePlayerService = async (id: number, statistics: StatisticsModel) => {
    const data = await PlayerRepository.findAndModifyPlayer(id, statistics)

    let response: any


    if (data && data.affectedRows > 0) {
        response = sucessful()
    } else {
        response = await badRequest()
    }

    return response
}

export const teamPlayersService = async (team: string) => {
    console.log("SERVICE: O time inserido foi", team)
    const data = await PlayerRepository.teamPlayersFind(team)
    let response: any


    if (data) {
        response = await ok(data)
    } else {
        response = await noContent()
    }

    return response
}