import express from 'express';
import './db/connect'
import urlRouter from './routes/shortUrl.routes'

const app = express()
app.use(express.json());

app.use('/', urlRouter)

export default app