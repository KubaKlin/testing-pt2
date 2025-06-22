import getUsersWithPosts from './getUsersWithPosts.js';
import { getUsers } from '../getUsers/getUsers.js';
import { getPosts } from '../getPosts/getPosts.js';

jest.mock('../getUsers/getUsers.js', () => ({
  getUsers: jest.fn(),
}));

jest.mock('../getPosts/getPosts.js', () => ({
  getPosts: jest.fn(),
}));

describe('The getUsersWithPosts function', () => {
  beforeEach(() => {
    getUsers.mockResolvedValue([
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
        },
      },
      {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.com',
        address: {
          street: 'Victor Plains',
          suite: 'Suite 879',
          city: 'Wisokyburgh',
          zipcode: '90566-7771',
        },
      },
    ]);

    getPosts.mockResolvedValue([
      {
        userId: 1,
        id: 1,
        title: 'Hello world 1',
        body: 'Lorem Ipsum',
      },
      {
        userId: 1,
        id: 2,
        title: 'Hello world 2',
        body: 'Lorem Ipsum 2',
      },
      {
        userId: 2,
        id: 3,
        title: 'User 2 Post',
        body: 'User 2 content',
      },
    ]);
  });

  it('should successfully combine users with their posts', async () => {
    const result = await getUsersWithPosts();

    expect(result[0]).toEqual({
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
      },
      posts: [
        {
          userId: 1,
          id: 1,
          title: 'Hello world 1',
          body: 'Lorem Ipsum',
        },
        {
          userId: 1,
          id: 2,
          title: 'Hello world 2',
          body: 'Lorem Ipsum 2',
        },
      ],
    });

    expect(result[1]).toEqual({
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.com',
      address: {
        street: 'Victor Plains',
        suite: 'Suite 879',
        city: 'Wisokyburgh',
        zipcode: '90566-7771',
      },
      posts: [
        {
          userId: 2,
          id: 3,
          title: 'User 2 Post',
          body: 'User 2 content',
        },
      ],
    });
  });

  it('should call getUsers and getPosts functions', async () => {
    await getUsersWithPosts();

    expect(getUsers).toHaveBeenCalled();
    expect(getPosts).toHaveBeenCalled();
  });

  it('should return users with empty posts arrays when users have no posts', async () => {
    getUsers.mockResolvedValue([
      {
        id: 3,
        name: 'User Without Posts',
        username: 'NoPostsUser',
        email: 'nopost@example.com',
      },
    ]);
    getPosts.mockResolvedValue([]);

    const result = await getUsersWithPosts();

    expect(result[0]).toEqual({
      id: 3,
      name: 'User Without Posts',
      username: 'NoPostsUser',
      email: 'nopost@example.com',
      posts: [],
    });
  });

  it('should return an empty array when both users and posts are empty', async () => {
    getUsers.mockResolvedValue([]);
    getPosts.mockResolvedValue([]);

    const result = await getUsersWithPosts();

    expect(result).toEqual([]);
  });

  it('should throw an error when getUsers responds with an error', async () => {
    getUsers.mockImplementation(() => {
      throw new Error('Failed to fetch users');
    });

    await expect(getUsersWithPosts()).rejects.toThrow(
      'Failed to fetch users with posts: Failed to fetch users',
    );
  });

  it('should throw an error when getPosts responds with an error', async () => {
    getPosts.mockImplementation(() => {
      throw new Error('Failed to fetch posts');
    });

    await expect(getUsersWithPosts()).rejects.toThrow(
      'Failed to fetch users with posts: Failed to fetch posts',
    );
  });

  it('should throw an error when both getUsers and getPosts respond with errors', async () => {
    getUsers.mockImplementation(() => {
      throw new Error('Network error');
    });

    await expect(getUsersWithPosts()).rejects.toThrow(
      'Failed to fetch users with posts: Network error',
    );
  });
});
