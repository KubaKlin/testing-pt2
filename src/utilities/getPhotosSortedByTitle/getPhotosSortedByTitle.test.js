import { getPhotosSortedByTitle } from './getPhotosSortedByTitle.js';
import { getPhotos } from '../getPhotos/getPhotos.js';

jest.mock('../getPhotos/getPhotos.js', () => ({
  getPhotos: jest.fn(),
}));

describe('the getPhotosSortedByTitle function', () => {
  describe('when photos are available', () => {
    beforeEach(() => {
      getPhotos.mockResolvedValue([
        {
          albumId: 1,
          id: 1,
          title: 'accusamus beatae ad facilis cum similique qui sunt',
          url: 'https://via.placeholder.com/600/92c952',
          thumbnailUrl: 'https://via.placeholder.com/150/92c952',
        },
        {
          albumId: 1,
          id: 2,
          title: 'reprehenderit est deserunt velit ipsam',
          url: 'https://via.placeholder.com/600/771796',
          thumbnailUrl: 'https://via.placeholder.com/150/771796',
        },
        {
          albumId: 1,
          id: 3,
          title: 'officia porro iure quia iusto qui ipsa ut modi',
          url: 'https://via.placeholder.com/600/24f355',
          thumbnailUrl: 'https://via.placeholder.com/150/24f355',
        },
        {
          albumId: 1,
          id: 4,
          title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
          url: 'https://via.placeholder.com/600/d32776',
          thumbnailUrl: 'https://via.placeholder.com/150/d32776',
        },
        {
          albumId: 1,
          id: 5,
          title: 'natus nisi omnis corporis facere molestiae rerum in',
          url: 'https://via.placeholder.com/600/f66b97',
          thumbnailUrl: 'https://via.placeholder.com/150/f66b97',
        },
      ]);
    });

    describe('calling the function', () => {
      it('should call getPhotos', async () => {
        await getPhotosSortedByTitle();

        expect(getPhotos).toHaveBeenCalled();
      });
    });

    describe('returning the result', () => {
      it('should return correct number of photos', async () => {
        const result = await getPhotosSortedByTitle();

        expect(result).toHaveLength(5);
      });

      it('should return photos sorted correctly with specific order', async () => {
        const result = await getPhotosSortedByTitle();

        const expectedTitleLengths = [60, 51, 50, 46, 38];
        const actualTitleLengths = result.map((photo) => photo.title.length);

        expect(actualTitleLengths).toEqual(expectedTitleLengths);
      });
    });

    describe('checking the longest title', () => {
      it('should have the longest title first', async () => {
        const result = await getPhotosSortedByTitle();

        expect(result[0].title).toBe(
          'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
        );
      });
    });

    describe('checking the shortest title', () => {
      it('should have the shortest title last', async () => {
        const result = await getPhotosSortedByTitle();

        expect(result[result.length - 1].title).toBe(
          'reprehenderit est deserunt velit ipsam',
        );
      });
    });
  });

  describe('when photos array is empty', () => {
    beforeEach(() => {
      getPhotos.mockResolvedValue([]);
    });

    describe('returning the result', () => {
      it('should return an empty array', async () => {
        const result = await getPhotosSortedByTitle();

        expect(result).toEqual([]);
      });
    });
  });

  describe('when photos have identical title lengths', () => {
    beforeEach(() => {
      getPhotos.mockResolvedValue([
        {
          albumId: 1,
          id: 1,
          title: 'short title one',
          url: 'https://via.placeholder.com/600/1',
          thumbnailUrl: 'https://via.placeholder.com/150/1',
        },
        {
          albumId: 1,
          id: 2,
          title: 'short title two',
          url: 'https://via.placeholder.com/600/2',
          thumbnailUrl: 'https://via.placeholder.com/150/2',
        },
      ]);
    });

    describe('returning the result', () => {
      it('should return correct number of photos', async () => {
        const result = await getPhotosSortedByTitle();

        expect(result).toHaveLength(2);
      });

      it('should handle identical lengths correctly', async () => {
        const result = await getPhotosSortedByTitle();

        expect(result[0].title.length).toBe(result[1].title.length);
      });
    });
  });

  describe('when getPhotos throws an error', () => {
    beforeEach(() => {
      getPhotos.mockImplementation(() => {
        throw new Error('Network error');
      });
    });

    describe('calling the function', () => {
      it('should call getPhotos', async () => {
        await getPhotosSortedByTitle();

        expect(getPhotos).toHaveBeenCalled();
      });
    });

    describe('returning the result', () => {
      it('should return empty array', async () => {
        const result = await getPhotosSortedByTitle();

        expect(result).toEqual([]);
      });
    });
  });
});
