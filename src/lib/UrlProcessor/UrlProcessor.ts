import config from 'config'
import { createShortUrl, getFullUrl, getUrlObject } from './UrlProcessorHelper'
import { CloseRedis, ConnectRedis } from "../Data/Redis"

export type Result = {
    result?: {
        shortUrl: string
        fullUrl: string
        visits: number
    }
}

export type Error = {
    error?: {
        code: number
        message: string
        status: string
    }
}

export interface Response extends Result, Error {}

export async function processUrl(url: string): Promise<Response> {
    try {
        const urlObj = getUrlObject(url)

        await ConnectRedis()
        if (urlObj.hostname === config.get('Server.host')) {
            return await getFullUrl(urlObj)
        } else {
            return await createShortUrl(urlObj)
        }
    } catch (err) {
        return {
            error: {
                code: err.code ?? 500,
                message: err.message,
                status: err.stack,
            },
        }
    } finally {
        await CloseRedis()
    }
}
