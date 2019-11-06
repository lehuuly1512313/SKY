// src/__test__/function.test.js
import {sum} from '../function'

describe('Test function', () => {
    it('Sum', () => {
        expect(sum(1, 2)).toBe(3);
    })
})