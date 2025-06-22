import { getPhotos } from '../getPhotos/getPhotos';

export async function getPhotosSortedByTitle() {
  try {
    const photos = await getPhotos();

    return photos.sort((firstPhoto, secondPhoto) => {
      return secondPhoto.title.length - firstPhoto.title.length;
    });
  } catch {
    return [];
  }
}
