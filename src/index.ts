import express, { Request, Response, NextFunction } from 'express';
import logger from './utils/logger';
import config from './utils/config';
import './db/connect';
import ShortUrl from './models/shortUrl';
import generateShortCode from './utils/generateShortCode';
import { createShortUrl, retrieveUrl } from './services/shortUrl.service'

const app = express()

app.use(express.json());


app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Hola Mundo" })
});

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

createShortUrl('https://www.google.com')
    .then(() => console.log('SHORT URL CREADA CORRECTAMENTE'))
    .catch(err => console.error('ERROR:', err));


retrieveUrl('xd5149')
    .then(() => console.log('URL RETRIVED CORRECTAMENTE'))
    .catch((err) => console.error(`Error: ${err}`))