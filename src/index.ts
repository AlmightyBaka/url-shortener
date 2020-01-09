import { processUrl } from "./lib/UrlProcessor/UrlProcessor";

(async () => {
    const result = await processUrl('http://localhost:4000/t_yWW')
    // const result = await processUrl('http://google')
    console.log(result)
    return
})()
