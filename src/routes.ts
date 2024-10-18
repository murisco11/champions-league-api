import { Router } from "express"
import { deletePlayer, getPlayers, getPlayersById, postPlayer, teamsPlayer, updatePlayer } from "./controllers/players-controller"

const router = Router()

router.get("/players", getPlayers)
router.get("/players/:id", getPlayersById)
router.post("/players", postPlayer)
router.delete("/players/:id", deletePlayer)
router.patch("/players/:id", updatePlayer)
router.get("/team", teamsPlayer)

export default router