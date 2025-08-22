import { set } from 'mongoose';
import ShortUrl from '../models/shortUrl';
import generateShortCode from '../utils/generateShortCode';
import logger from "../utils/logger";

//Create Short URL
export const createShortUrl = async (url: string) => { // usare req.body.url
    try {

        let shortCode: string | undefined = generateShortCode()

        while (true) {
            const exists = await ShortUrl.findOne({ shortCode })
            if (!exists) break;
            logger.warn(`Duplicate short code detected: ${shortCode}`);
        }

        const shortUrl = new ShortUrl({
            url: url,
            shortCode: shortCode
        })

        await shortUrl.save();

    } catch (error) {
        logger.error(`Error creating short URL: ${error}`);
        throw error;
    }
}

//Retrieve Original URL
export const retrieveUrl = async (shortCode: string) => { // usare req.param.shortCode
    try {

        const result = await ShortUrl.findOneAndUpdate(
            { shortCode },
            { $inc: { accessCount: 1 } },
            { new: true }
        )

        return result;


    } catch (error) {
        logger.error(`Error serching for the previus URL: ${error}`);
        throw error;
    }
}

//Update Short URL
export const updateShortUrl = async (shortCode: string, url: string) => { // usare req.param.shortCode, req.body.url
    try {

        const newUrl: string = url // comprobare que no sea undefinde en el controlador

        const result = await ShortUrl.findOneAndUpdate(
            { shortCode },
            { url: newUrl },
            { new: true }
        )

        return result

    } catch (error) {

    }
}

//Delete Short URL
export const delateShortUrl = async () => {

}

//Get URL Statistics
export const UrlStatistics = async () => {

}