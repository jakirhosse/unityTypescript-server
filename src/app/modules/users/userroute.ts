import express from 'express'
import { UserControllers } from './user.controller'

const router = express.Router()

router.post('/users', UserControllers.createUser)
router.get('/users', UserControllers.getAllUsers)
router.get('/users/:id', UserControllers.getSingleUser)
router.delete('/users/:id', UserControllers.deleteUser)
router.patch('/users/:id', UserControllers.updateUser)

export const UserRoutes = router