import { Router } from 'express'
import { UserController } from './controllers/UserController'

const router = Router()

const userController = new UserController()

router.post('/users', userController.create)
router.get('/users', userController.ready)
router.get('/users/:email', userController.readyByEmail)
router.delete('/users/:email', userController.delete)
router.put('/users/:email', userController.update)

export { router }