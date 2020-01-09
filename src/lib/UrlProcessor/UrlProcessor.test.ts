import { processUrl } from './UrlProcessor'

describe('UrlProcessor', () => {
    describe('processUrl()', () => {
        it('runs', () => {
            expect(() => processUrl('http://google')).not.toThrow()
        })

        it('makes short URL from valid input', async () => {
            const response = await processUrl('http://google/')
            expect(response).toHaveProperty('result')
            expect(response).not.toHaveProperty('error')

            const result = response.result
            expect(result).toHaveProperty('shortUrl')
            expect(result).toHaveProperty('fullUrl')
            expect(result?.fullUrl).toBe('http://google/')
            expect(result).toHaveProperty('visits')
        })

        it('returns error from invalid input', async () => {
            const response = await processUrl('http')
            expect(response).toHaveProperty('error')

            const error = response.error
            expect(error?.code).toBe(100)
            expect(error?.message).toBe(`"http" is not a valid URL string!`)
        })
    })
})
