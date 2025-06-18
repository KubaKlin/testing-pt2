async function getAlbums() {
  const response = await fetch('https://jsonplaceholder.typicode.com/albums');
  if (!response.ok) {
    throw new Error('Something went wrong when fetching posts');
  }
  return response.json();
}

export default getAlbums;
