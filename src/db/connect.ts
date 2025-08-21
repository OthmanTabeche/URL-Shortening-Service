import mongoose from "mongoose";
import logger from '../utils/logger';
import config from '../utils/config';

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
    .then(result => {
        logger.info("conected to mongoDB")
    })
    .catch(error => {
        logger.error(`error conecting to mongoDb: ${error}`)
    });
