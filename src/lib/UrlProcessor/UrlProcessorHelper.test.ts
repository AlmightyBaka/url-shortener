import { isValidUrl } from "./UrlProcessorHelper";

describe('UrlProcessorHelper', () => {
    describe('isValidUri', () => {
        it('runs with valid URL', () => {
            expect(() => isValidUrl('http://google.com')).not.toThrow()
        })

        it('runs with valid URL', () => {
            expect(() => isValidUrl('http')).toThrow()
        })
    })
})
