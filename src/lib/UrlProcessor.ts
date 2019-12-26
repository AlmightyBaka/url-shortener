import nanoid from 'nanoid'
import { isUri } from 'valid-url'

type Result = {
    shortUrl?: string;
    fullUrl?: string;
    visits?: number,
}

type Error = {
    error: {
        code: number,
        status: string,
    }
}

export type Response = Result | Error

export function processUrl(url: string): Response {
    if (!isUri(url)) {
        return {
            error: {
                code: 0,
                status: `"${url}" is not an URL string!`
            }
        }
    }

    return {
        shortUrl: `http://localhost:${4000}/${nanoid(5)}`,
        fullUrl: url,
        visits: 0,
    }
}
