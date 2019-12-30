import nanoid from 'nanoid'
import config from 'config'
import { isUri } from 'valid-url'
import { ServerError } from '../ServerError'
import { Response } from "lib/UrlProcessor/UrlProcessor";

export function isValidUri(url: string) {
    if (!isUri(url)) {
        throw new ServerError(100, `"${url}" is not a valid URL string!`)
    }
}

export function createShortUrl(url: string): Response {
    isValidUri(url)

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

