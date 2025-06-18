import { getAlbumsSortedByTitle } from './getAlbumsSortedByTitle.js';
import getAlbums from '../getAlbums/getAlbums.js';

jest.mock('../getAlbums/getAlbums.js');

const mockGetAlbums = getAlbums;

describe('getAlbumsSortedByTitle function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockAlbums = [
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
    }
  ];

  it('should successfully fetch and sort albums by title length in descending order', async () => {
    mockGetAlbums.mockResolvedValue(mockAlbums);

    const result = await getAlbumsSortedByTitle();

    expect(mockGetAlbums).toHaveBeenCalledTimes(1);

    expect(result).toHaveLength(5);
    
    // Check that the longest title is first
    expect(result[0].title).toBe('culpa odio esse rerum omnis laboriosam voluptate repudiandae');
    expect(result[0].title.length).toBe(60);
    
    // Check that the shortest title is last
    expect(result[result.length - 1].title).toBe('reprehenderit est deserunt velit ipsam');
    expect(result[result.length - 1].title.length).toBe(38);
  });

  it('should return albums sorted correctly with specific order', async () => {
    mockGetAlbums.mockResolvedValue(mockAlbums);

    const result = await getAlbumsSortedByTitle();

    const expectedTitleLengths = [60, 51, 50, 46, 38];
    const actualTitleLengths = result.map(album => album.title.length);

    expect(actualTitleLengths).toEqual(expectedTitleLengths);
  });

  it('should handle empty albums array', async () => {
    mockGetAlbums.mockResolvedValue([]);

    const result = await getAlbumsSortedByTitle();

    expect(mockGetAlbums).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  it('should handle albums with identical title lengths', async () => {
    const albumsWithSameLengthTitles = [
      {
        albumId: 1,
        id: 1,
        title: 'short title one',
      },
      {
        albumId: 1,
        id: 2,
        title: 'short title two',
      }
    ];

    mockGetAlbums.mockResolvedValue(albumsWithSameLengthTitles);

    const result = await getAlbumsSortedByTitle();

    expect(result).toHaveLength(2);
    expect(result[0].title.length).toBe(result[1].title.length);
  });

  it('should return empty array when getAlbums throws an error', async () => {
    const errorMessage = 'Network error';
    mockGetAlbums.mockRejectedValue(new Error(errorMessage));

    const result = await getAlbumsSortedByTitle();

    expect(mockGetAlbums).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });
}); 