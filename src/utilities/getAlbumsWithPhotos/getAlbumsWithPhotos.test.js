import getAlbumsWithPhotos from './getAlbumsWithPhotos.js';
import { getAlbums } from '../getAlbums/getAlbums.js';
import { getPhotos } from '../getPhotos/getPhotos.js';

jest.mock('../getAlbums/getAlbums.js', () => ({
  getAlbums: jest.fn(),
}));

jest.mock('../getPhotos/getPhotos.js', () => ({
  getPhotos: jest.fn(),
}));

describe('the getAlbumsWithPhotos function', () => {
  describe('when both albums and photos are available', () => {
    beforeEach(() => {
      getAlbums.mockResolvedValue([
        {
          userId: 1,
          id: 1,
          title: 'quidem molestiae enim',
        },
        {
          userId: 1,
          id: 2,
          title: 'sunt qui excepturi placeat culpa',
        },
        {
          userId: 2,
          id: 3,
          title: 'omnis laborum odio',
        },
      ]);

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
          albumId: 2,
          id: 3,
          title: 'officia porro iure quia iusto qui ipsa ut modi',
          url: 'https://via.placeholder.com/600/24f355',
          thumbnailUrl: 'https://via.placeholder.com/150/24f355',
        },
        {
          albumId: 3,
          id: 4,
          title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
          url: 'https://via.placeholder.com/600/d32776',
          thumbnailUrl: 'https://via.placeholder.com/150/d32776',
        },
      ]);
    });

    it('should successfully combine albums with their photos', async () => {
      const result = await getAlbumsWithPhotos();

      expect(result[0]).toEqual({
        userId: 1,
        id: 1,
        title: 'quidem molestiae enim',
        photos: [
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
        ],
      });

      expect(result[1]).toEqual({
        userId: 1,
        id: 2,
        title: 'sunt qui excepturi placeat culpa',
        photos: [
          {
            albumId: 2,
            id: 3,
            title: 'officia porro iure quia iusto qui ipsa ut modi',
            url: 'https://via.placeholder.com/600/24f355',
            thumbnailUrl: 'https://via.placeholder.com/150/24f355',
          },
        ],
      });

      expect(result[2]).toEqual({
        userId: 2,
        id: 3,
        title: 'omnis laborum odio',
        photos: [
          {
            albumId: 3,
            id: 4,
            title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
            url: 'https://via.placeholder.com/600/d32776',
            thumbnailUrl: 'https://via.placeholder.com/150/d32776',
          },
        ],
      });
    });

    it('should call getAlbums function', async () => {
      await getAlbumsWithPhotos();

      expect(getAlbums).toHaveBeenCalled();
    });

    it('should call getPhotos function', async () => {
      await getAlbumsWithPhotos();

      expect(getPhotos).toHaveBeenCalled();
    });
  });

  describe('when albums have no photos', () => {
    beforeEach(() => {
      getAlbums.mockResolvedValue([
        {
          userId: 1,
          id: 4,
          title: 'Album Without Photos',
        },
      ]);
      getPhotos.mockResolvedValue([]);
    });

    it('should return albums with empty photos arrays', async () => {
      const result = await getAlbumsWithPhotos();

      expect(result[0]).toEqual({
        userId: 1,
        id: 4,
        title: 'Album Without Photos',
        photos: [],
      });
    });
  });

  describe('when both albums and photos are empty', () => {
    beforeEach(() => {
      getAlbums.mockResolvedValue([]);
      getPhotos.mockResolvedValue([]);
    });

    it('should return an empty array', async () => {
      const result = await getAlbumsWithPhotos();

      expect(result).toEqual([]);
    });
  });

  describe('when getAlbums responds with an error', () => {
    beforeEach(() => {
      getAlbums.mockImplementation(() => {
        throw new Error('Failed to fetch albums');
      });
    });

    it('should throw an error', async () => {
      await expect(getAlbumsWithPhotos()).rejects.toThrow(
        'Failed to fetch albums with photos: Failed to fetch albums',
      );
    });
  });

  describe('when getPhotos responds with an error', () => {
    beforeEach(() => {
      getPhotos.mockImplementation(() => {
        throw new Error('Failed to fetch photos');
      });
    });

    it('should throw an error', async () => {
      await expect(getAlbumsWithPhotos()).rejects.toThrow(
        'Failed to fetch albums with photos: Failed to fetch photos',
      );
    });
  });
});
