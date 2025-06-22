import getRandomMonth from './getRandomMonth';
import { getRandomNumberInRange } from '../getRandomNumberInRange/getRandomNumberInRange';

jest.mock('../getRandomNumberInRange/getRandomNumberInRange', () => ({
  getRandomNumberInRange: jest.fn(),
}));

describe('The getRandomMonth function', () => {
  beforeEach(() => {
    getRandomNumberInRange.mockReturnValue(0);
  });

  it('should call getRandomNumberInRange with correct arguments (0, 11)', () => {
    getRandomMonth();

    expect(getRandomNumberInRange).toHaveBeenCalledWith(0, 11);
  });

  it('should return January when getRandomNumberInRange returns 0', () => {
    const result = getRandomMonth();

    expect(result).toBe('January');
    expect(getRandomNumberInRange).toHaveBeenCalledWith(0, 11);
  });

  it('should return December when getRandomNumberInRange returns 11', () => {
    getRandomNumberInRange.mockReturnValue(11);

    const result = getRandomMonth();

    expect(result).toBe('December');
    expect(getRandomNumberInRange).toHaveBeenCalledWith(0, 11);
  });

  it('should verify arguments for all month indices', () => {
    const testIndices = [0, 5, 11]; // January, June, December
    const expectedResults = ['January', 'June', 'December'];

    testIndices.forEach((index, i) => {
      getRandomNumberInRange.mockReturnValue(index);
      
      const result = getRandomMonth();
      
      expect(result).toBe(expectedResults[i]);
      expect(getRandomNumberInRange).toHaveBeenCalledWith(0, 11);
    });
  });
}); 