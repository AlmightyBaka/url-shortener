import config from 'config'
import { createShortUrl, isValidUrl } from './UrlProcessorHelper'

export type Result = {
    result?: {
        shortUrl?: string,
        fullUrl?: string,
        visits?: number,
    }
}

export type Error = {
    error?: {
        code: number,
        message: string,
        status: string,
    },
}

export interface Response extends Result, Error {}

export function processUrl(url: string): Response {
    try {
        isValidUrl(url)
        const urlObj = new URL(url)

        if (urlObj.hostname === config.get('Server.host')) {
            // return getFullUrl(url)
            return createShortUrl(url)
        } else {
            return createShortUrl(url)
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
