import express from 'express'
import { TeamControllers } from './team.controller'

const router = express.Router()

router.post('/team', TeamControllers.createTeam)
router.get('/team/:id', TeamControllers.getSingleTeam)
router.get('/team', TeamControllers.getALLTeam)

export const TeamRoutes = router