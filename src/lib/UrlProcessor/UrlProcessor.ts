import config from 'config'
import { createShortUrl, isValidUrl } from './UrlProcessorHelper'

export type Result = {
    result?: {
        shortUrl?: string
        fullUrl?: string
        visits?: number
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
        isValidUrl(url)
        const urlObj = new URL(url)

        if (urlObj.hostname === config.get('Server.host')) {
            // return await getFullUrl(url)
            return await createShortUrl(url)
        } else {
            return await createShortUrl(url)
        }
    } catch (err) {
        return {
            error: {
                code: err.code ?? 500,
                message: err.message,
                status: err.stack,
            },
        }
    }
}
