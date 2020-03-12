import express from 'express'
import config from 'config'
import { getFullUrl } from "./paths"

export const serverUrl: string = `${config.get('Server.host')}:${config.get('Server.port')}`

export function launchServer() {
    const app = express()

    app.use(express.json())
    // error handling
    app.use((err: any, _: any, res: any, next: any) => {
        console.log(err)
        res.json = JSON.stringify(err)
        next(err)
    })

    app.get("/url", getFullUrl)

    app.listen(config.get('Server.port'), () => {
        console.log(`Server running on ${serverUrl}`)
    })
}
