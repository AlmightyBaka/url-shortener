import * as request from 'request-promise-native'
import * as program from 'commander'
import { serverUrl, launchServer } from './lib/Server/server'

program.name('url-shortener')

program.command('server')
.description('Launch an API endpoint for getting URLs')
.action(() => {
    launchServer()
})

program.command('* <url>')
.description('Get a full or shortened version of URL, depending on the input')
.action(async (url) => {
    const req = await request.get({
        uri: `http://${serverUrl}/url`,
        body: { url },
        json: true // Automatically stringifies the body to JSON
    })

    console.log(req)
})

program.parse(process.argv)