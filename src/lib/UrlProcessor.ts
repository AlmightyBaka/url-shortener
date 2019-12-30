import config from 'config'
import { createShortUrl } from './UrlProcessorHelper'
import {isUri} from "valid-url";
import {ServerError} from "./ServerError";

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
        if (!isUri(url)) {
            throw new ServerError(100, `"${url}" is not a valid URL string!`)
        }
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
                code: err.code,
                message: err.message,
                status: err.stack,
            },
        }
    }
}
