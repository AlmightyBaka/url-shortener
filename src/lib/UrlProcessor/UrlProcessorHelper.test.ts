import { createShortUrl, getFullUrl, getUrlObject } from './UrlProcessorHelper'
import { CloseRedis, ConnectRedis, redisExecute } from "../Data/Redis";
import { ServerError } from "../ServerError";
import config from 'config'

describe('UrlProcessorHelper', () => {
    describe('getUrlObject()', () => {
        it('runs with valid URL', () => {
            expect(() => getUrlObject('http://google.com')).not.toThrow()
        })

        it('runs with invalid URL', () => {
            expect(() => getUrlObject('http')).toThrow()
        })
    })

    describe('createShortUrl()', () => {
        beforeAll(async () => {
            await ConnectRedis()
        })

        afterAll(async () => {
            await CloseRedis()
        })

        it('runs', () => {
            expect(() => createShortUrl(new URL('http://google'))).not.toThrow()
        })

        it('makes short URL from valid input', async () => {
            const response = await createShortUrl(new URL('http://google'))
            expect(response).toHaveProperty('result')
            expect(response).not.toHaveProperty('error')

            const result = response.result
            expect(result).toHaveProperty('shortUrl')
            expect(result).toHaveProperty('fullUrl')
            expect(result?.fullUrl).toBe('http://google/')
            expect(result).toHaveProperty('visits')
        })
    })

    describe('getFullUrl()', () => {
        const hostname = `http://${config.get('Server.host')}:${config.get('Server.port')}`
        const testId = 't_yWW'

        beforeAll(async () => {
            await ConnectRedis()

            // setting up test object
            await redisExecute(async (redis) => {
                const result = await redis.hmset(testId, { fullUrl: 'https://google/', visits: 0 })
                if (result !== "OK") {
                    throw new ServerError(200, 'Could not insert URL to Redis')
                }
            })
        })

        afterAll(async () => {
            await CloseRedis()
        })

        it('runs', () => {
            expect(() => getFullUrl(new URL(`${hostname}/${testId}`))).not.toThrow()
        })

        it('gets full URL from valid input', async () => {
            const response = await getFullUrl(new URL(`${hostname}/${testId}`))
            expect(response).toHaveProperty('result')
            expect(response).not.toHaveProperty('error')

            const result = response.result
            expect(result).toHaveProperty('shortUrl')
            expect(result).toHaveProperty('fullUrl')
            expect(result?.fullUrl).toBe('https://google/')
            expect(result).toHaveProperty('visits')
        })
    })
})
