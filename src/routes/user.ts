import express from 'express'

import controller from '../controllers/user'
import {verifyToken} from "../auth/verifyToken";
const router = express.Router()

router.post('/' , controller.saveUser)
router.get('/',verifyToken ,controller.getUserData)
router.put('/', verifyToken, controller.updateUser)

export = router
