import nanoid from 'nanoid'
import config from 'config'
import { ServerError } from '../ServerError'
import { Response } from "lib/UrlProcessor/UrlProcessor";

export function isValidUrl(url: string): URL {
    try {
        return new URL(url)
    } catch (err) {
        throw new ServerError(100, `"${url}" is not a valid URL string!`)
    }
}

export function createShortUrl(url: string): Response {
    isValidUrl(url)

    return {
        result: {
            shortUrl: `http://${config.get('Server.host')}:${config.get(
                'Server.port'
            )}/${nanoid(5)}`,
            fullUrl: url,
            visits: 0,
        },
    }
}

// export function getFullUrl (url: string): Response {
//     return {
//         result: {
//             shortUrl: url,
//             fullUrl: getFullUrl() ?? undefined,
//             visits: getVisits() ?? undefined,
//         }
//     }
// };

