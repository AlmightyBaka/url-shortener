import config from 'config'
import { Tedis, TedisPool } from 'tedis'
import { ServerError } from "../ServerError";

let pool: TedisPool
try {
    pool = new TedisPool({
        host: config.get('Redis.host'),
        port: config.get('Redis.port'),
        // password: config.get('Redis.password'),
        timeout: 5000,
    })
} catch (err) {
    throw new ServerError(200, `Error connecting to Redis: ${err.message}`)
}

export async function redisExecute(callback: (redis: Tedis) => Promise<any>): Promise<any> {
    try {
        const tedis = await pool.getTedis()
        const result = await callback(tedis)

        tedis.close()
        pool.putTedis(tedis)

        return result
    } catch (err) {
        throw new ServerError(200, `Error executing in Redis: ${err.message}`)
    }
}