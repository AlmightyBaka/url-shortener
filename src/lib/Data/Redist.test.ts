import { CloseRedis, ConnectRedis, redisExecute } from "../Data/Redis";

describe('Redis', () => {
    describe('createShortUrl()', () => {
        beforeAll(async () => {
            await ConnectRedis()
        })

        afterAll(async () => {
            await CloseRedis()
        })

        it('runs', async () => {
            expect(async () => redisExecute(async (redis) => {
                await redis.exists('key')
            })).not.toThrow()
        })
    })
})
