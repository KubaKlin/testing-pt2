import { getAlbumsSortedByTitle } from './getAlbumsSortedByTitle.js';
import { getAlbums } from '../getAlbums/getAlbums.js';

jest.mock('../getAlbums/getAlbums.js', () => ({
  getAlbums: jest.fn(),
}));

describe('the getAlbumsSortedByTitle function', () => {
  describe('when albums are available', () => {
    beforeEach(() => {
      getAlbums.mockResolvedValue([
        {
          albumId: 1,
          id: 1,
          title: 'accusamus beatae ad facilis cum similique qui sunt',
        },
        {
          albumId: 1,
          id: 2,
          title: 'reprehenderit est deserunt velit ipsam',
        },
        {
          albumId: 1,
          id: 3,
          title: 'officia porro iure quia iusto qui ipsa ut modi',
        },
        {
          albumId: 1,
          id: 4,
          title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
        },
        {
          albumId: 1,
          id: 5,
          title: 'natus nisi omnis corporis facere molestiae rerum in',
        },
      ]);
    });

    it('should fetch and sort albums by title length in descending order', async () => {
      const result = await getAlbumsSortedByTitle();

      expect(getAlbums).toHaveBeenCalled();
      expect(result).toHaveLength(5);

      // Check that the longest title is first
      expect(result[0].title).toBe(
        'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
      );
      expect(result[0].title.length).toBe(60);

      // Check that the shortest title is last
      expect(result[result.length - 1].title).toBe(
        'reprehenderit est deserunt velit ipsam',
      );
      expect(result[result.length - 1].title.length).toBe(38);
    });

    it('should return albums sorted correctly with specific order', async () => {
      const result = await getAlbumsSortedByTitle();

      const expectedTitleLengths = [60, 51, 50, 46, 38];
      const actualTitleLengths = result.map((album) => album.title.length);

      expect(actualTitleLengths).toEqual(expectedTitleLengths);
    });
  });

  describe('when albums array is empty', () => {
    beforeEach(() => {
      getAlbums.mockResolvedValue([]);
    });

    it('should return an empty array', async () => {
      const result = await getAlbumsSortedByTitle();

      expect(getAlbums).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('when albums have identical title lengths', () => {
    beforeEach(() => {
      getAlbums.mockResolvedValue([
        {
          albumId: 1,
          id: 1,
          title: 'short title one',
        },
        {
          albumId: 1,
          id: 2,
          title: 'short title two',
        },
      ]);
    });

    it('should handle identical lengths correctly', async () => {
      const result = await getAlbumsSortedByTitle();

      expect(result).toHaveLength(2);
      expect(result[0].title.length).toBe(result[1].title.length);
    });
  });

  describe('when getAlbums throws an error', () => {
    beforeEach(() => {
      getAlbums.mockImplementation(() => {
        throw new Error('Network error');
      });
    });

    it('should return empty array', async () => {
      const result = await getAlbumsSortedByTitle();

      expect(getAlbums).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});
