import ShortUrl from '../models/shortUrl';
import generateShortCode from '../utils/generateShortCode';
import logger from "../utils/logger";

//Create Short URL
const createShortUrl = async (url: string) => { // usare req.body.url
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

        const data = await shortUrl.save();
        logger.info(`Created short url`)
        return data

    } catch (error) {
        logger.error(`Error creating short URL: ${error}`);
        throw error;
    }
}

//Retrieve Original URL
const retrieveUrl = async (shortCode: string) => { // usare req.param.shortCode
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
const updateShortUrl = async (shortCode: string, url: string) => { // usare req.param.shortCode, req.body.url
    try {

        const newUrl: string = url // comprobare que no sea undefinde en el controlador

        const result = await ShortUrl.findOneAndUpdate(
            { shortCode },
            { url: newUrl },
            { new: true }
        )

        return result

    } catch (error) {
        logger.error(`Error updating the new URL: ${error}`);
        throw error;
    }
}

//Delete Short URL
const delateShortUrl = async (shortCode: string) => { //usare req.param.shortCode
    try {

        const result = await ShortUrl.deleteOne({ shortCode })

        return result

    } catch (error) {
        logger.error(`Error traying to delate the shorturl (${shortCode}: ${error})`)
        throw error
    }
}

//Get URL Statistics
const urlStatistics = async (shortCode: string) => { //usare req.param.shortCode
    try {

        const result = await ShortUrl.findOne({ shortCode })

        return result

    } catch (error) {
        logger.error(`Error traying to acces to accesCount: ${error})`)
        throw error
    }
}

export default { createShortUrl, retrieveUrl, updateShortUrl, delateShortUrl, urlStatistics }