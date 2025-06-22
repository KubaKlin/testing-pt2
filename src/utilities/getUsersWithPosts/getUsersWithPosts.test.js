import getUsersWithPosts from './getUsersWithPosts.js';
import { getUsers } from '../getUsers/getUsers.js';
import { getPosts } from '../getPosts/getPosts.js';

jest.mock('../getUsers/getUsers.js', () => ({
  getUsers: jest.fn(),
}));

jest.mock('../getPosts/getPosts.js', () => ({
  getPosts: jest.fn(),
}));

describe('the getUsersWithPosts function', () => {
  describe('when both users and posts are available', () => {
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

    it('should call getUsers function', async () => {
      await getUsersWithPosts();

      expect(getUsers).toHaveBeenCalled();
    });

    it('should call getPosts function', async () => {
      await getUsersWithPosts();

      expect(getPosts).toHaveBeenCalled();
    });
  });

  describe('when users have no posts', () => {
    beforeEach(() => {
      getUsers.mockResolvedValue([
        {
          id: 3,
          name: 'User Without Posts',
          username: 'NoPostsUser',
          email: 'nopost@example.com',
        },
      ]);
      getPosts.mockResolvedValue([]);
    });

    it('should return users with empty posts arrays', async () => {
      const result = await getUsersWithPosts();

      expect(result[0]).toEqual({
        id: 3,
        name: 'User Without Posts',
        username: 'NoPostsUser',
        email: 'nopost@example.com',
        posts: [],
      });
    });
  });

  describe('when both users and posts are empty', () => {
    beforeEach(() => {
      getUsers.mockResolvedValue([]);
      getPosts.mockResolvedValue([]);
    });

    it('should return an empty array', async () => {
      const result = await getUsersWithPosts();

      expect(result).toEqual([]);
    });
  });

  describe('when getUsers responds with an error', () => {
    beforeEach(() => {
      getUsers.mockImplementation(() => {
        throw new Error('Failed to fetch users');
      });
    });

    it('should throw an error', async () => {
      await expect(getUsersWithPosts()).rejects.toThrow(
        'Failed to fetch users with posts: Failed to fetch users',
      );
    });
  });

  describe('when getPosts responds with an error', () => {
    beforeEach(() => {
      getPosts.mockImplementation(() => {
        throw new Error('Failed to fetch posts');
      });
    });

    it('should throw an error', async () => {
      await expect(getUsersWithPosts()).rejects.toThrow(
        'Failed to fetch users with posts: Failed to fetch posts',
      );
    });
  });
});
