import { processUrl } from "../UrlProcessor/UrlProcessor";
import { ServerError } from "../ServerError";

export async function getFullUrl(req: any, res: any) {
    if (!req.body?.url) {
        throw new ServerError(100, `"URL is missing!`)
    }

    const result = await processUrl(req.body.url)

    res.json(result)
}