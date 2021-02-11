import express from 'express'
const app = express()

import config from './utils/config'
import logger from './utils/logger'
import cors from 'cors'

app.use(cors())

export default app
