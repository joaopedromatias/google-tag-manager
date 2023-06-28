import sanitize from '../util/sanitize'

describe('sanitize()', () => {
  it('should return a sanitized string', () => {
    const string = '     tEsTiNg \n gô    '

    const result = sanitize(string)

    expect(result).toBe('testing---go')
  })
})
