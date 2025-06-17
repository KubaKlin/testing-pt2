import getUsersWithPosts from './getUsersWithPosts.js';
import getUsers from '../getUsers/getUsers.js';
import getPosts from '../getPosts/getPosts.js';

jest.mock('../getUsers/getUsers.js');
jest.mock('../getPosts/getPosts.js');

const mockGetUsers = getUsers;
const mockGetPosts = getPosts;

describe('getUsersWithPosts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUsers = [
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
  ];

  const mockPosts = [
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
  ];

  it('should successfully combine users with their posts', async () => {
    mockGetUsers.mockResolvedValue(mockUsers);
    mockGetPosts.mockResolvedValue(mockPosts);

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

  it('should handle users with no posts', async () => {
    const usersWithNoPosts = [
      {
        id: 3,
        name: 'User Without Posts',
        username: 'NoPostsUser',
        email: 'nopost@example.com',
      },
    ];

    mockGetUsers.mockResolvedValue(usersWithNoPosts);
    mockGetPosts.mockResolvedValue([]);

    const result = await getUsersWithPosts();

    expect(result[0]).toEqual({
      id: 3,
      name: 'User Without Posts',
      username: 'NoPostsUser',
      email: 'nopost@example.com',
      posts: [],
    });
  });

  it('should handle empty users and posts arrays', async () => {
    mockGetUsers.mockResolvedValue([]);
    mockGetPosts.mockResolvedValue([]);

    const result = await getUsersWithPosts();

    expect(result).toEqual([]);
  });

  it('should call getUsers and getPosts functions', async () => {
    mockGetUsers.mockResolvedValue(mockUsers);
    mockGetPosts.mockResolvedValue(mockPosts);

    await getUsersWithPosts();

    expect(mockGetUsers).toHaveBeenCalledTimes(1);
    expect(mockGetPosts).toHaveBeenCalledTimes(1);
  });

  it('should handle getUsers error', async () => {
    const errorMessage = 'Failed to fetch users';
    mockGetUsers.mockRejectedValue(new Error(errorMessage));
    mockGetPosts.mockResolvedValue(mockPosts);

    await expect(getUsersWithPosts()).rejects.toThrow(
      `Failed to fetch users with posts: ${errorMessage}`,
    );
  });

  it('should handle getPosts error', async () => {
    const errorMessage = 'Failed to fetch posts';
    mockGetUsers.mockResolvedValue(mockUsers);
    mockGetPosts.mockRejectedValue(new Error(errorMessage));

    await expect(getUsersWithPosts()).rejects.toThrow(
      `Failed to fetch users with posts: ${errorMessage}`,
    );
  });

  it('should handle both getUsers and getPosts errors', async () => {
    const errorMessage = 'Network error';
    mockGetUsers.mockRejectedValue(new Error(errorMessage));
    mockGetPosts.mockRejectedValue(new Error(errorMessage));

    await expect(getUsersWithPosts()).rejects.toThrow(
      `Failed to fetch users with posts: ${errorMessage}`,
    );
  });
});
