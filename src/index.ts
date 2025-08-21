import express, { Request, Response, NextFunction } from 'express';
import logger from './utils/logger';
import config from './utils/config';
import './db/connect';
import ShortUrl from './models/shortUrl';
import generateShortCode from './utils/generateShortCode';

const app = express()

app.use(express.json());


app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Hola Mundo" })
});

console.log(generateShortCode())

/*
app.get('/shorter', (req, res) => {
    const shortUrl = new ShortUrl({
        url: "https://example.com",
        shortCode: "othman"
    })

    shortUrl
        .save()
        .then(result => {
            logger.info(`Url saved in the BD`)
        })
        .catch(error => {
            logger.error(`Url NOT saved: ${error}`)
        })
})
*/

