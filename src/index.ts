import yargs from 'yargs'
import { processUrl } from "./lib/UrlProcessor/UrlProcessor";

// (async () => {
//     const result = await processUrl('http://localhost:4000/t_yWW')
//     // const result = await processUrl('https://google')
//     console.log(result)
//     return
// })()

yargs.command('set [url]', 'Get a shortened version of URL'
    , (yargs) => {
        yargs.positional('url', {
            describe: 'URL to be shortened',
            type: 'string',
        })
    }, async (args) => {
        const result = await processUrl(args.url as string)
        console.log(result)
    })
.demandOption(['url'], 'Please provide an URL')

yargs.command('get [url]', 'Get original version of URL'
    , (yargs) => {
        yargs.positional('url', {
            describe: 'URL to get original of',
            type: 'string',
        })
    }, async (args) => {
        const result = await processUrl(args.url as string)
        console.log(result)
    })
.demandOption(['url'], 'Please provide an URL')

yargs.help()
.argv