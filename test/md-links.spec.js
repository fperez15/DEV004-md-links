import {api} from '../api.js'

describe('existPath', () => {
  it('should return true if the path exist', () => {
    expect(api.existPath('C:\Users\Francis\OneDrive\Escritorio\Laboratoria\DEV004-md-links')).toBe(true)
  });
  it('should return false if the path does not exist', () => {
    expect(api.existPath('C:\Users\Francis\OneDrive\Escritorio\Laboratoria\DEV04')).toBe(false)
  });
});



