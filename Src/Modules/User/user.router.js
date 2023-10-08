import {Router} from 'express'
import * as userController from './user.controller.js'
import * as userValidators from './user.validation.js'
import { endpoint } from './user.endpoint.js'
const router = Router()


router.post("signup",auth(endpoint.signup),userValidators.signUp ,userController.signUp)
router.post("login",userValidators.logIn ,userController.logIn)
router.post("logout",auth(endpoint.logout),userValidators.logOut ,userController.logOut)
router.post("changepassword",auth(endpoint.change),userValidators.changePassword ,userController.changePassword)






export default router