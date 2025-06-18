import getAlbums from '../getAlbums/getAlbums';
import getPhotos from '../getPhotos/getPhotos';

const getAlbumsWithPhotos = async () => {
  try {
    const [albums, photos] = await Promise.all([getAlbums(), getPhotos()]);

    const photosByAlbumId = photos.reduce((photosMap, photo) => {
      const { albumId } = photo;
      if (!photosMap[albumId]) {
        photosMap[albumId] = [];
      }
      photosMap[albumId].push(photo);
      return photosMap;
    }, {});

    return albums.map((album) => ({
      ...album,
      photos: photosByAlbumId[album.id] || [],
    }));
  } catch (error) {
    throw new Error(`Failed to fetch albums with photos: ${error.message}`);
  }
};

export default getAlbumsWithPhotos;
