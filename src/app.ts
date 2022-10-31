import express from 'express'
import { connect } from './DbConfig'
import userRoutes from './routes/user'
import bodyParser from 'body-parser'
import http from 'http'
const cors = require('cors');

require('dotenv').config({ path: process.cwd() + '/.env' })

const router = express()
router.use(cors());

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

connect()


router.use('/users', userRoutes)

const httpServer = http.createServer(router)

httpServer.listen(process.env.PORT, () => {
  console.log('server running')
})
