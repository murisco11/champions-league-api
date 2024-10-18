import { PLayerModel } from "../models/player-model"
import db from "../db";
import { QueryError, QueryResult, ResultSetHeader, RowDataPacket } from "mysql2";
import { StatisticsModel } from "../models/statistics-model";

export const insertPlayer = async (player: PLayerModel) => {
    return new Promise((res, rej) => {
        db.query(`
            CREATE TABLE IF NOT EXISTS players (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                club VARCHAR(100) NOT NULL,
                nationality VARCHAR(50) NOT NULL,
                position VARCHAR(50) NOT NULL,
                overall INT NOT NULL,
                pace INT NOT NULL,
                shooting INT NOT NULL,
                passing INT NOT NULL,
                dribbling INT NOT NULL,
                defending INT NOT NULL,
                physical INT NOT NULL
            )`, (err: QueryError) => {
            if (err) {
                return rej(err)
            }

            db.query(`
                    INSERT INTO players (name, club, nationality, position, overall, pace, shooting, passing, dribbling, defending, physical)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    player.name,
                    player.club,
                    player.nationality,
                    player.position,
                    player.overall,
                    player.pace,
                    player.shooting,
                    player.passing,
                    player.dribbling,
                    player.defending,
                    player.physical
                ],
                (err: QueryError | any, result: any) => {
                    if (err) {
                        return rej(err)
                    }
                    res(result)
                }
            )
        }
        )
    })
}

export const deleteOnePlayer = async (id: number): Promise<ResultSetHeader> => {
    return new Promise((res, rej) => {
        db.query(
            `
            DELETE FROM players WHERE id = ?
            `,
            [id],
            (err: QueryError | null, result: ResultSetHeader) => {
                if (err) {
                    rej(err)
                } else {
                    res(result)
                }
            }
        )
    })
}

export const findPlayerById = async (id: number): Promise<PLayerModel> => {
    return new Promise((res, rej) => {
        db.query(
            `
            SELECT * FROM players
            WHERE id = ?
            `, 
            [id],
            (err: QueryError | null, result: RowDataPacket[]) => {
                if (err) {
                    return rej(err)
                } else if (result && result.length > 0) {
                    const player: PLayerModel = result[0] as PLayerModel
                    res(player)
                } else {
                    rej(new Error('Player not found'))
                }
            }
        )
    })
}

export const findAllPlayers = async (): Promise<PLayerModel[]> => {
    return new Promise((res, rej) => {
        db.query(`
            SELECT * FROM players
            `,
            (err: QueryError, results: RowDataPacket) => {
                if (err) {
                    return rej(err)
                }
                if (Array.isArray(results)) {
                    res(results as PLayerModel[])
                } else {
                    res([])
                }
            })
    })
}


export const findAndModifyPlayer = async (id: number, statistics: StatisticsModel): Promise<ResultSetHeader> => {
    return new Promise((res, rej) => {
        db.query(`
            UPDATE players
            SET overall = ?, 
            defending = ?, 
            dribbling = ?, 
            pace = ?, 
            passing = ?, 
            physical = ?, 
            shooting = ?
            WHERE id = ?;
            `,
            [statistics.overall, statistics.defending, statistics.dribbling, statistics.pace, statistics.passing, statistics.physical, statistics.shooting, id],
            (err: QueryError | null, result: ResultSetHeader) => {
                if (err) {
                    rej(err)
                } else {
                    res(result)
                }
            }
        )
    })
}

export const teamPlayersFind = async (team: string): Promise<PLayerModel[]> => {
    console.log("REPOSITORY: O time inserido foi", team)
    return new Promise((res, rej) => {
        db.query(
            `
            SELECT * FROM players
            WHERE club = ?
            `, 
            [team],
            (err: QueryError | null, result: RowDataPacket[]) => {
                if (err) {
                    return rej(err)
                }
                res(result as PLayerModel[])
            }
        )
    })
}