import express from "express";
const router = express.Router()
import urlController from '../controllers/shortUrl.controllers'

//Create Short URL => POST

router.post('/shorten', urlController.createShortUrl)

//Retrieve Original URL => GET
router.get('/shorten/:shortCode', urlController.retrieveUrl)

//Update Short URL => UPDATE
router.put('/shorten/:shortCode', urlController.updateShortUrl)

//Delete Short URL => DELETE
router.delete('/shorten/:shortCode', urlController.delateShortUrl)

//Get URL Statistics => GET
router.get('/shorten/:shortCode/stats', urlController.urlStatistics)

export default router