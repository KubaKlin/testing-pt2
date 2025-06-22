import getRandomMonth from './getRandomMonth';
import { getRandomNumberInRange } from './getRandomNumberInRange';

jest.mock('./getRandomNumberInRange', () => ({
  getRandomNumberInRange: jest.fn(),
}));

describe('the getRandomMonth function', () => {
  describe('when calling the function', () => {
    beforeEach(() => {
      getRandomNumberInRange.mockReturnValue(0);
    });

    it('should call getRandomNumberInRange with correct arguments', () => {
      getRandomMonth();

      expect(getRandomNumberInRange).toHaveBeenCalledWith(0, 11);
    });
  });

  describe('when getRandomNumberInRange returns 0', () => {
    beforeEach(() => {
      getRandomNumberInRange.mockReturnValue(0);
    });

    it('should return January', () => {
      const result = getRandomMonth();

      expect(result).toBe('January');
    });
  });

  describe('when getRandomNumberInRange returns 11', () => {
    beforeEach(() => {
      getRandomNumberInRange.mockReturnValue(11);
    });

    it('should return December', () => {
      const result = getRandomMonth();

      expect(result).toBe('December');
    });
  });
});
