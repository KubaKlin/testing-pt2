import getAlbums from '../getAlbums/getAlbums';

export async function getAlbumsSortedByTitle() {
  try {
    const photos = await getAlbums();

    return photos.sort((firstAlbum, secondAlbum) => {
      return secondAlbum.title.length - firstAlbum.title.length;
    });
  } catch {
    return [];
  }
}