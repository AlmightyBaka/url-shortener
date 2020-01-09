import config from 'config'
import { Tedis, TedisPool } from 'tedis'
import { ServerError } from "../ServerError";

// альтернативный вариант написания модуля Redis: ООП-стиль с использованием Class и инкапсулированием
// всей логики внутри класса. В данном случае я решил использовать функциональный стиль и
// подключение Redis в global state, так как в маленьком приложении простота важнее и
// позволяет более простое использование Redis.

let pool: TedisPool
export async function ConnectRedis(): Promise<void> {
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
}

export async function CloseRedis(): Promise<void> {
    if (pool === undefined) {
        throw new ServerError(200, `Error connecting to Redis: use ConnectRedis() first!`)
    }
    try {
        pool.release()
    } catch (err) {
        throw new ServerError(200, `Error closing Redis: ${err.message}`)
    }
}

export async function redisExecute(callback: (redis: Tedis) => Promise<any>): Promise<any> {
    if (pool === undefined) {
        throw new ServerError(200, `Error connecting to Redis: use ConnectRedis() first!`)
    }
    try {
        const tedis = await pool.getTedis()

        const result = await callback(tedis)

        pool.putTedis(tedis)

        return result
    } catch (err) {
        throw new ServerError(200, `Error executing in Redis: ${err.message}`)
    }
}