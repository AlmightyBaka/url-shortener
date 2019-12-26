import { processUrl } from "./UrlProcessor"

describe('UrlProcessor', () => {
    it('runs', () => {
        expect(processUrl('http://google'))
    })

    it('makes short URL from valid input', () => {
        const result = processUrl('http://google')
        expect(result).not.toHaveProperty('error')
        expect(result).toHaveProperty('shortUrl')
        expect(result).toHaveProperty('fullUrl')
        expect(result.fullUrl).toBe('http://google')
        expect(result).toHaveProperty('visits')
    })

    it('returns error from invalid input', () => {
        const result = processUrl('http')
        expect(result).toHaveProperty('error')
        expect(result?.error?.code).toBe(0)
        expect(result?.error?.status).toBe( `"http" is not an URL string!`)
    })
})
