import express from 'express'
const app = express()

import config from './utils/config'
import logger from './utils/logger'
import cors from 'cors'
import middleware from './utils/middleware'

app.use(cors())
app.use(express.json())

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
