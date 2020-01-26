import { processUrl } from './lib/UrlProcessor/UrlProcessor'
import * as program from 'commander'
// import launchServer from './lib/Server/server'

// (async () => {
//     const result = await processUrl('http://localhost:4000/t_yWW')
//     // const result = await processUrl('https://google')
//     console.log(result)
//     return
// })()

program.name('url-shortener')

program.command('server')
.description('Launch an API endpoint for getting URLs')
.action(() => {
    console.log('server')
    // launchServer()
})

program.command('* <url>')
.description('Get a full or shortened version of URL, depending on the input')
.action(async (url) => {
    const result = await processUrl(url)
    console.log(result)
})

program.parse(process.argv)