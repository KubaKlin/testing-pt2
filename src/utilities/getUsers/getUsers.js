async function getUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Something went wrong when fetching posts');
  }
  return response.json();
}

export default getUsers;