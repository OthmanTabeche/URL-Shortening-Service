import { Express, Request, Response } from "express";
import urlServices from "../services/shortUrl.service"
import validator from 'validator';

const createShortUrl = async (req: Request, res: Response) => {
    try {
        const url = req.body.url

        if (!validator.isURL(url, { protocols: ['http', 'https'], require_protocol: true })) {
            return res.status(400).json({ message: 'URL must be a valid HTTP/HTTPS URL' })
        } else if (!url) {
            return res.status(400).json({ message: 'URL is requiered' })
        }

        const data = await urlServices.createShortUrl(url)
        res.status(201).json(data)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const retrieveUrl = async (req: Request, res: Response) => {
    try {
        const shortCode = req.params.shortCode

        if (!shortCode) {
            return res.status(404).json({ message: 'Shortcode do not existe' })
        }

        const data = await urlServices.retrieveUrl(shortCode)

        if (!data) {
            return res.status(404).json({ message: 'Shortcode do not found in the DB' })
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const updateShortUrl = async (req: Request, res: Response) => {
    try {
        const shortCode = req.params.shortCode
        const url = req.body.url

        if (!url) {
            return res.status(400).json({ message: 'URL is requiered' })
        } else if (!validator.isURL(url, { protocols: ['http', 'https'], require_protocol: true })) {
            return res.status(400).json({ message: 'URL must be a valid HTTP/HTTPS URL' })
        } else if (!shortCode) {
            return res.status(404).json({ message: 'Shortcode do not existe' })
        }

        const data = await urlServices.updateShortUrl(shortCode, url)

        if (!data) {
            return res.status(404).json({ message: 'Shortcode do not found in the DB' })
        }

        res.status(200).json(data)

    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const delateShortUrl = async (req: Request, res: Response) => {
    try {
        const shortCode = req.params.shortCode

        if (!shortCode) {
            return res.status(404).json({ message: 'Shortcode do not existe' })
        }

        const data = await urlServices.delateShortUrl(shortCode)

        if (!data) {
            return res.status(404).json({ message: 'Shortcode do not found in the DB' })
        }

        if (data.deletedCount > 0) {
            res.status(204).send()
        } else {
            res.status(404).json({ message: 'Shortcode not found' })
        }

    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const urlStatistics = async (req: Request, res: Response) => {
    try {
        const shortCode = req.params.shortCode

        if (!shortCode) {
            return res.status(404).json({ message: 'Shortcode do not ex iste' })
        }

        const data = await urlServices.urlStatistics(shortCode)

        if (!data) {
            return res.status(404).json({ message: 'Shortcode do not found in the DB' })
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export default { createShortUrl, retrieveUrl, updateShortUrl, delateShortUrl, urlStatistics }