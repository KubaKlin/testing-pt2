async function getPhotos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/photos');
  if (!response.ok) {
    throw new Error('Something went wrong when fetching posts');
  }
  return response.json();
}

export default getPhotos;
