import getAlbumsWithPhotos from './getAlbumsWithPhotos.js';
import getAlbums from '../getAlbums/getAlbums.js';
import getPhotos from '../getPhotos/getPhotos.js';

jest.mock('../getAlbums/getAlbums.js');
jest.mock('../getPhotos/getPhotos.js');

const mockGetAlbums = getAlbums;
const mockGetPhotos = getPhotos;

describe('getAlbumsWithPhotos function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockAlbums = [
    {
      userId: 1,
      id: 1,
      title: 'quidem molestiae enim'
    },
    {
      userId: 1,
      id: 2,
      title: 'sunt qui excepturi placeat culpa'
    },
    {
      userId: 2,
      id: 3,
      title: 'omnis laborum odio'
    }
  ];

  const mockPhotos = [
    {
      albumId: 1,
      id: 1,
      title: 'accusamus beatae ad facilis cum similique qui sunt',
      url: 'https://via.placeholder.com/600/92c952',
      thumbnailUrl: 'https://via.placeholder.com/150/92c952'
    },
    {
      albumId: 1,
      id: 2,
      title: 'reprehenderit est deserunt velit ipsam',
      url: 'https://via.placeholder.com/600/771796',
      thumbnailUrl: 'https://via.placeholder.com/150/771796'
    },
    {
      albumId: 2,
      id: 3,
      title: 'officia porro iure quia iusto qui ipsa ut modi',
      url: 'https://via.placeholder.com/600/24f355',
      thumbnailUrl: 'https://via.placeholder.com/150/24f355'
    },
    {
      albumId: 3,
      id: 4,
      title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
      url: 'https://via.placeholder.com/600/d32776',
      thumbnailUrl: 'https://via.placeholder.com/150/d32776'
    }
  ];

  it('should successfully combine albums with their photos', async () => {
    mockGetAlbums.mockResolvedValue(mockAlbums);
    mockGetPhotos.mockResolvedValue(mockPhotos);

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
          thumbnailUrl: 'https://via.placeholder.com/150/92c952'
        },
        {
          albumId: 1,
          id: 2,
          title: 'reprehenderit est deserunt velit ipsam',
          url: 'https://via.placeholder.com/600/771796',
          thumbnailUrl: 'https://via.placeholder.com/150/771796'
        }
      ]
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
          thumbnailUrl: 'https://via.placeholder.com/150/24f355'
        }
      ]
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
          thumbnailUrl: 'https://via.placeholder.com/150/d32776'
        }
      ]
    });
  });

  it('should handle albums with no photos', async () => {
    const albumsWithNoPhotos = [
      {
        userId: 1,
        id: 4,
        title: 'Album Without Photos'
      }
    ];

    mockGetAlbums.mockResolvedValue(albumsWithNoPhotos);
    mockGetPhotos.mockResolvedValue([]);

    const result = await getAlbumsWithPhotos();

    expect(result[0]).toEqual({
      userId: 1,
      id: 4,
      title: 'Album Without Photos',
      photos: []
    });
  });

  it('should handle empty albums and photos arrays', async () => {
    mockGetAlbums.mockResolvedValue([]);
    mockGetPhotos.mockResolvedValue([]);

    const result = await getAlbumsWithPhotos();

    expect(result).toEqual([]);
  });

  it('should call getAlbums and getPhotos functions', async () => {
    mockGetAlbums.mockResolvedValue(mockAlbums);
    mockGetPhotos.mockResolvedValue(mockPhotos);

    await getAlbumsWithPhotos();

    expect(mockGetAlbums).toHaveBeenCalledTimes(1);
    expect(mockGetPhotos).toHaveBeenCalledTimes(1);
  });

  it('should handle getAlbums error', async () => {
    const errorMessage = 'Failed to fetch albums';
    mockGetAlbums.mockRejectedValue(new Error(errorMessage));
    mockGetPhotos.mockResolvedValue(mockPhotos);

    await expect(getAlbumsWithPhotos()).rejects.toThrow(
      `Failed to fetch albums with photos: ${errorMessage}`
    );
  });

  it('should handle getPhotos error', async () => {
    const errorMessage = 'Failed to fetch photos';
    mockGetAlbums.mockResolvedValue(mockAlbums);
    mockGetPhotos.mockRejectedValue(new Error(errorMessage));

    await expect(getAlbumsWithPhotos()).rejects.toThrow(
      `Failed to fetch albums with photos: ${errorMessage}`
    );
  });
}); 