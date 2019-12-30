import nanoid from 'nanoid'
import config from 'config'
import { ServerError } from '../ServerError'
import { Response } from './UrlProcessor'

const hostname = `http://${config.get('Server.host')}:${config.get(
    'Server.port'
)}`

export function isValidUrl(url: string): URL {
    try {
        return new URL(url)
    } catch (err) {
        throw new ServerError(100, `"${url}" is not a valid URL string!`)
    }
}

export function createShortUrl(fullUrl: string): Response {
    isValidUrl(fullUrl)

    const id = nanoid(5)
    const shortUrl = `${hostname}/${id}`

    return {
        result: {
            shortUrl,
            fullUrl,
            visits: 0,
        },
    }
}

// export function getFullUrl (shortUrl: string): Response {
//     return {
//         result: {
//             shortUrl: url,
//             fullUrl: getFullUrl() ?? undefined,
//             visits: getVisits() ?? undefined,
//         }
//     }
// };
