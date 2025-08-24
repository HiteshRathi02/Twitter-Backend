# Twitter Clone API Documentation

## Base URL

```
https://twitter-backend-ukqd.onrender.com/api/v1
```

---

## 👤 User Endpoints

### 1. POST /users/signup

**Description:** Register a new user in the database.

**Request Body:**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "mypassword123",
  "bio": "I'm a developer",
  "name": "John Doe"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Successfully completed",
  "data": {
    "_id": "64a1b2c3d4e5f6789012345",
    "username": "john_doe",
    "email": "john@example.com",
    "bio": "I'm a developer",
    "name": "John Doe",
    "followersCount": 0,
    "followingCount": 0,
    "tweets": [],
    "createdAt": "2023-07-02T10:30:00.000Z",
    "updatedAt": "2023-07-02T10:30:00.000Z"
  },
  "error": {}
}
```

### 2. POST /users/signin

**Description:** Sign in an existing user and get JWT token.

**Request Body:**

```json
{
  "username": "john_doe", // OR "email": "john@example.com"
  "password": "mypassword123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Successfully completed",
  "data": {
    "user": {
      "id": "64a1b2c3d4e5f6789012345",
      "username": "john_doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "message": "User signed in successfully"
  },
  "error": {}
}
```

### 3. GET /users/

**Description:** Get all users or search users by name/username.

**Query Parameters:**

- `search` (optional): Search term to filter users by name or username

**Examples:**

- `/users/` - Get all users
- `/users/?search=john` - Search users with "john" in name or username

**Response:**

```json
{
  "success": true,
  "message": "Successfully completed",
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789012345",
      "username": "john_doe",
      "email": "john@example.com",
      "bio": "I'm a developer",
      "name": "John Doe",
      "followersCount": 0,
      "followingCount": 0,
      "tweets": [],
      "createdAt": "2023-07-02T10:30:00.000Z",
      "updatedAt": "2023-07-02T10:30:00.000Z"
    }
  ],
  "error": {}
}
```

### 4. GET /users/me

**Description:** Get current authenticated user details.

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "success": true,
  "message": "Successfully completed",
  "data": {
    "_id": "64a1b2c3d4e5f6789012345",
    "username": "john_doe",
    "email": "john@example.com",
    "bio": "I'm a developer",
    "name": "John Doe",
    "followersCount": 0,
    "followingCount": 0,
    "tweets": [],
    "createdAt": "2023-07-02T10:30:00.000Z",
    "updatedAt": "2023-07-02T10:30:00.000Z"
  },
  "error": {}
}
```

### 5. GET /users/:id

**Description:** Get user details by user ID.

**Parameters:**

- `id`: User ID (MongoDB ObjectId)

**Response:**

```json
{
  "success": true,
  "message": "Successfully completed",
  "data": {
    "_id": "64a1b2c3d4e5f6789012345",
    "username": "john_doe",
    "email": "john@example.com",
    "bio": "I'm a developer",
    "name": "John Doe",
    "followersCount": 0,
    "followingCount": 0,
    "tweets": [],
    "createdAt": "2023-07-02T10:30:00.000Z",
    "updatedAt": "2023-07-02T10:30:00.000Z"
  },
  "error": {}
}
```

### 6. PATCH /users/:id

**Description:** Update user details (only name and bio allowed).

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Parameters:**

- `id`: User ID (must match authenticated user's ID)

**Request Body:**

```json
{
  "name": "John Smith",
  "bio": "Senior Developer"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Successfully completed",
  "data": {
    "_id": "64a1b2c3d4e5f6789012345",
    "username": "john_doe",
    "email": "john@example.com",
    "bio": "Senior Developer",
    "name": "John Smith",
    "followersCount": 0,
    "followingCount": 0,
    "tweets": [],
    "createdAt": "2023-07-02T10:30:00.000Z",
    "updatedAt": "2023-07-02T12:30:00.000Z"
  },
  "error": {}
}
```

### 7. DELETE /users/:id

**Description:** Delete user account.

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Parameters:**

- `id`: User ID (must match authenticated user's ID)

**Response:**

```json
{
  "success": true,
  "message": "Successfully completed",
  "data": {
    "_id": "64a1b2c3d4e5f6789012345",
    "username": "john_doe",
    "email": "john@example.com",
    "bio": "Senior Developer",
    "name": "John Smith"
  },
  "error": {}
}
```

---

## 🐦 Tweet Endpoints

### 1. POST /tweets/

**Description:** Create a new tweet.

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Request Body:**

```json
{
  "content": "Hello Twitter Clone! #firstTweet",
  "media": [
    {
      "url": "https://example.com/image.jpg",
      "type": "image"
    }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Successfully completed",
  "data": {
    "_id": "64a1b2c3d4e5f6789012346",
    "author": "64a1b2c3d4e5f6789012345",
    "content": "Hello Twitter Clone! #firstTweet",
    "media": [
      {
        "url": "https://example.com/image.jpg",
        "type": "image"
      }
    ],
    "likes": [],
    "replies": [],
    "createdAt": "2023-07-02T11:30:00.000Z",
    "updatedAt": "2023-07-02T11:30:00.000Z"
  },
  "error": {}
}
```

### 2. GET /tweets/

**Description:** Get all tweets (sorted by creation date, newest first).

**Response:**

```json
{
  "success": true,
  "message": "Successfully completed",
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789012346",
      "author": {
        "_id": "64a1b2c3d4e5f6789012345",
        "username": "john_doe",
        "name": "John Doe"
      },
      "content": "Hello Twitter Clone! #firstTweet",
      "media": [],
      "likes": [],
      "replies": [],
      "createdAt": "2023-07-02T11:30:00.000Z",
      "updatedAt": "2023-07-02T11:30:00.000Z"
    }
  ],
  "error": {}
}
```

### 3. GET /tweets/:id

**Description:** Get a specific tweet by ID.

**Parameters:**

- `id`: Tweet ID (MongoDB ObjectId)

**Response:**

```json
{
  "success": true,
  "message": "Successfully completed",
  "data": {
    "_id": "64a1b2c3d4e5f6789012346",
    "author": {
      "_id": "64a1b2c3d4e5f6789012345",
      "username": "john_doe",
      "name": "John Doe"
    },
    "content": "Hello Twitter Clone! #firstTweet",
    "media": [],
    "likes": [],
    "replies": [],
    "createdAt": "2023-07-02T11:30:00.000Z",
    "updatedAt": "2023-07-02T11:30:00.000Z"
  },
  "error": {}
}
```

### 4. DELETE /tweets/:id

**Description:** Delete a tweet (only by tweet author).

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Parameters:**

- `id`: Tweet ID (MongoDB ObjectId)

**Response:**

```json
{
  "success": true,
  "message": "Successfully completed",
  "data": {
    "_id": "64a1b2c3d4e5f6789012346",
    "author": "64a1b2c3d4e5f6789012345",
    "content": "Hello Twitter Clone! #firstTweet",
    "media": [],
    "likes": [],
    "replies": []
  },
  "error": {}
}
```

### 5. PATCH /tweets/:id

**Description:** Update a tweet (only by tweet author).

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Parameters:**

- `id`: Tweet ID (MongoDB ObjectId)

**Request Body:**

```json
{
  "content": "Updated tweet content #updated",
  "media": [
    {
      "url": "https://example.com/new-image.jpg",
      "type": "image"
    }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Successfully completed",
  "data": {
    "_id": "64a1b2c3d4e5f6789012346",
    "author": {
      "_id": "64a1b2c3d4e5f6789012345",
      "username": "john_doe",
      "name": "John Doe"
    },
    "content": "Updated tweet content #updated",
    "media": [
      {
        "url": "https://example.com/new-image.jpg",
        "type": "image"
      }
    ],
    "likes": [],
    "replies": [],
    "createdAt": "2023-07-02T11:30:00.000Z",
    "updatedAt": "2023-07-02T12:30:00.000Z"
  },
  "error": {}
}
```

### 6. POST /tweets/:id/replies

**Description:** Reply to a tweet.

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Parameters:**

- `id`: Parent tweet ID (MongoDB ObjectId)

**Request Body:**

```json
{
  "content": "This is a reply to your tweet!",
  "media": []
}
```

**Response:**

```json
{
  "success": true,
  "message": "Successfully completed",
  "data": {
    "_id": "64a1b2c3d4e5f6789012347",
    "author": "64a1b2c3d4e5f6789012345",
    "content": "This is a reply to your tweet!",
    "media": [],
    "likes": [],
    "replies": [],
    "createdAt": "2023-07-02T12:00:00.000Z",
    "updatedAt": "2023-07-02T12:00:00.000Z"
  },
  "error": {}
}
```

### 7. GET /tweets/:id/replies

**Description:** Get all replies of a tweet.

**Parameters:**

- `id`: Tweet ID (MongoDB ObjectId)

**Response:**

```json
{
  "success": true,
  "message": "Successfully completed",
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789012347",
      "author": "64a1b2c3d4e5f6789012345",
      "content": "This is a reply to your tweet!",
      "media": [],
      "likes": [],
      "replies": [],
      "createdAt": "2023-07-02T12:00:00.000Z",
      "updatedAt": "2023-07-02T12:00:00.000Z"
    }
  ],
  "error": {}
}
```

### 8. GET /tweets/user/:id

**Description:** Get all tweets by a specific user.

**Parameters:**

- `id`: User ID (MongoDB ObjectId)

**Response:**

```json
{
  "success": true,
  "message": "Successfully completed",
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789012346",
      "author": {
        "_id": "64a1b2c3d4e5f6789012345",
        "username": "john_doe",
        "name": "John Doe"
      },
      "content": "Hello Twitter Clone! #firstTweet",
      "media": [],
      "likes": [],
      "replies": [],
      "createdAt": "2023-07-02T11:30:00.000Z",
      "updatedAt": "2023-07-02T11:30:00.000Z"
    }
  ],
  "error": {}
}
```

### 9. GET /tweets/search/:hashtag

**Description:** Search tweets by hashtag.

**Parameters:**

- `hashtag`: Hashtag text (without # symbol)

**Example:** `/tweets/search/firstTweet` or `/tweets/search/javascript`

**Response:**

```json
{
  "success": true,
  "message": "Successfully completed",
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789012346",
      "author": {
        "_id": "64a1b2c3d4e5f6789012345",
        "username": "john_doe",
        "name": "John Doe"
      },
      "content": "Hello Twitter Clone! #firstTweet",
      "media": [],
      "likes": [],
      "replies": [],
      "createdAt": "2023-07-02T11:30:00.000Z",
      "updatedAt": "2023-07-02T11:30:00.000Z"
    }
  ],
  "error": {}
}
```

### 10. POST /tweets/:id/like

**Description:** Like a tweet.

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Parameters:**

- `id`: Tweet ID (MongoDB ObjectId)

**Response:**

```json
{
  "success": true,
  "message": "Successfully completed",
  "data": {
    "_id": "64a1b2c3d4e5f6789012346",
    "author": {
      "_id": "64a1b2c3d4e5f6789012345",
      "username": "john_doe",
      "name": "John Doe"
    },
    "content": "Hello Twitter Clone! #firstTweet",
    "media": [],
    "likes": ["64a1b2c3d4e5f6789012348"],
    "replies": [],
    "createdAt": "2023-07-02T11:30:00.000Z",
    "updatedAt": "2023-07-02T13:30:00.000Z"
  },
  "error": {}
}
```

### 11. POST /tweets/:id/unlike

**Description:** Unlike a previously liked tweet.

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Parameters:**

- `id`: Tweet ID (MongoDB ObjectId)

**Response:**

```json
{
  "success": true,
  "message": "Successfully completed",
  "data": {
    "_id": "64a1b2c3d4e5f6789012346",
    "author": {
      "_id": "64a1b2c3d4e5f6789012345",
      "username": "john_doe",
      "name": "John Doe"
    },
    "content": "Hello Twitter Clone! #firstTweet",
    "media": [],
    "likes": [],
    "replies": [],
    "createdAt": "2023-07-02T11:30:00.000Z",
    "updatedAt": "2023-07-02T13:35:00.000Z"
  },
  "error": {}
}
```

---

## Error Response Format

**Error Response:**

```json
{
  "success": false,
  "message": "Something went wrong",
  "data": {},
  "error": "Specific error message here"
}
```

**Common HTTP Status Codes:**

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Get your JWT token by signing in through the `/users/signin` endpoint.
