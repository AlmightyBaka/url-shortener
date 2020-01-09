import nanoid from 'nanoid'
import config from 'config'
import { ServerError } from '../ServerError'
import { Response } from './UrlProcessor'
import { redisExecute } from "../Data/Redis"

const hostname = `http://${config.get('Server.host')}:${config.get('Server.port')}`

export function getUrlObject(url: string): URL {
    try {
        return new URL(url)
    } catch (err) {
        throw new ServerError(100, `"${url}" is not a valid URL string!`)
    }
}

async function idExists(id: string): Promise<boolean> {
    return await redisExecute(async (redis) => {
        return !!(await redis.exists(id))
    })
}

export async function createShortUrl(fullUrl: URL): Promise<Response> {
    const id = nanoid(5)

    // create new url entry in Redis
    await redisExecute(async (redis) => {
        const result = await redis.hmset(id, { fullUrl: fullUrl.href, visits: 0 })
        if (result !== "OK") {
            throw new ServerError(200, 'Could not insert URL to Redis')
        }
    })

    return {
        result: {
            shortUrl: `${hostname}/${id}`,
            fullUrl: fullUrl.href,
            visits: 0,
        },
    }
}

export async function getFullUrl (shortUrlObj: URL): Promise<Response> {
    // cutting unnecessary slash symbol from the result of URL.pathname
    const id = shortUrlObj.pathname.substring(1)

    // check if id exists
    if (!(await idExists(id))) {
        throw new ServerError(101, `short URL (${id}) is not linked to a full URL; create one first`)
    }

    // get data from Redis by id
    const result = await redisExecute(async (redis) => {
        const result = await redis.hgetall(id)

        // check if object exists at id
        if (Object.keys(result).length === 0) {
            throw new ServerError(201, `URL with ID of (${id}) not exists in Redis`)
        }

        // increment visits
        const visits = await redis.hincrby(id, 'visits', 1)

        return { ...result, visits }
    })

    return {
        result: {
            shortUrl: shortUrlObj.href,
            fullUrl: result.fullUrl,
            visits: result.visits,
        },
    }
};
