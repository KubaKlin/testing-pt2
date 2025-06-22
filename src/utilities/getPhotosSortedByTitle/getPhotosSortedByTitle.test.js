import { getPhotosSortedByTitle } from './getPhotosSortedByTitle.js';
import { getPhotos } from '../getPhotos/getPhotos.js';

jest.mock('../getPhotos/getPhotos.js', () => ({
  getPhotos: jest.fn(),
}));

describe('The getPhotosSortedByTitle function', () => {
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

  it('should successfully fetch and sort photos by title length in descending order', async () => {
    const result = await getPhotosSortedByTitle();

    expect(getPhotos).toHaveBeenCalled();
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

  it('should return photos sorted correctly with specific order', async () => {
    const result = await getPhotosSortedByTitle();

    const expectedTitleLengths = [60, 51, 50, 46, 38];
    const actualTitleLengths = result.map((photo) => photo.title.length);

    expect(actualTitleLengths).toEqual(expectedTitleLengths);
  });

  it('should handle empty photos array', async () => {
    getPhotos.mockResolvedValue([]);

    const result = await getPhotosSortedByTitle();

    expect(getPhotos).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('should handle photos with identical title lengths', async () => {
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

    const result = await getPhotosSortedByTitle();

    expect(result).toHaveLength(2);
    expect(result[0].title.length).toBe(result[1].title.length);
  });

  it('should return empty array when getPhotos throws an error', async () => {
    getPhotos.mockImplementation(() => {
      throw new Error('Network error');
    });

    const result = await getPhotosSortedByTitle();

    expect(getPhotos).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
