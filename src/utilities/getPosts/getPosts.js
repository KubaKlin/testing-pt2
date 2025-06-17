async function getPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Something went wrong when fetching posts');
  }
  return response.json();
}

export default getPosts;
