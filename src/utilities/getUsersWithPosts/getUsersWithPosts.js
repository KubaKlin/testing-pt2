import getUsers from '../getUsers/getUsers';
import getPosts from '../getPosts/getPosts';

const getUsersWithPosts = async () => {
  try {
    const [users, posts] = await Promise.all([getUsers(), getPosts()]);

    const postsByUserId = posts.reduce((postsMap, post) => {
      const { userId } = post;
      if (!postsMap[userId]) {
        postsMap[userId] = [];
      }
      postsMap[userId].push(post);
      return postsMap;
    }, {});

    return users.map((user) => ({
      ...user,
      posts: postsByUserId[user.id] || [],
    }));
  } catch (error) {
    throw new Error(`Failed to fetch users with posts: ${error.message}`);
  }
};

export default getUsersWithPosts;
