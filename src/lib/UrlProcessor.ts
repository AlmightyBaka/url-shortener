import nanoid from 'nanoid'
import { isUri } from 'valid-url'
import config from 'config'

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
            code: 0,
            status: `"${url}" is not a valid URL string!`
        }
    }

    return {
        shortUrl: `http://${config.get('Server.host')}:${config.get('Server.port')}/${nanoid(5)}`,
        fullUrl: url,
        visits: 0,
    }
}
