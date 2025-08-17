# 🐦 Twitter-like Social Media Backend

A **Twitter-inspired backend** built with **Node.js, Express, and MongoDB**.  
Features include **user authentication**, **tweet management (CRUD, replies, hashtags)**, and **like/unlike functionality**, all with clean API documentation.

---

## 🚀 Features

- 🔐 **User Authentication** – Signup, Signin, JWT-based authentication.
- 📝 **Tweet Management** – Create, update, delete, fetch tweets & replies.
- #️⃣ **Hashtags** – Search tweets by hashtag with dynamic hashtag handling.
- ❤️ **Like/Unlike Tweets** – Toggle likes on tweets.
- 👤 **User Profile** – Manage user data & fetch tweets by user.

---

## 📂 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Token)
- **Validation & Middlewares:** Custom middlewares for request validation and authorization

---

## ⚙️ Installation & Setup

1. Clone the repository:

   ```bash
   git clone
   cd twitter-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and configure:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

4. Run the server:
   ```bash
   npm start
   ```

---

## 📌 API Endpoints

### 👤 User Routes

| Method | Endpoint                     | Description                       |
| ------ | ---------------------------- | --------------------------------- |
| POST   | `/api/v1/users/signup`       | Signup new user                   |
| POST   | `/api/v1/users/signin`       | Signin user (JWT)                 |
| GET    | `/api/v1/users/`             | Get all users                     |
| GET    | `/api/v1/users/?search=name` | Search users by name and username |
| GET    | `/api/v1/users/me`           | Get current user (auth)           |
| GET    | `/api/v1/users/:id`          | Get user by ID                    |
| PATCH  | `/api/v1/users/:id`          | Update user (auth)                |
| DELETE | `/api/v1/users/:id`          | Delete user (auth)                |

### 🐦 Tweet Routes

| Method | Endpoint                         | Description                |
| ------ | -------------------------------- | -------------------------- |
| POST   | `/api/v1/tweets/`                | Create tweet (auth)        |
| GET    | `/api/v1/tweets/`                | Get all tweets             |
| GET    | `/api/v1/tweets/:id`             | Get tweet by ID            |
| DELETE | `/api/v1/tweets/:id`             | Delete tweet (auth)        |
| PATCH  | `/api/v1/tweets/:id`             | Update tweet (auth)        |
| POST   | `/api/v1/tweets/:id/replies`     | Reply to a tweet (auth)    |
| GET    | `/api/v1/tweets/:id/replies`     | Get all replies of a tweet |
| GET    | `/api/v1/tweets/user/:id`        | Get all tweets by a user   |
| GET    | `/api/v1/tweets/search/:hashtag` | Search tweets by hashtag   |
| POST   | `/api/v1/tweets/:id/like`        | Like a tweet (auth)        |
| POST   | `/api/v1/tweets/:id/unlike`      | Unlike a tweet (auth)      |

---

## 🔑 Request Examples

### Signup

```http
POST /api/v1/users/signup

Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "mypassword",
  "name": "John Doe",
  "bio": "I'm a developer",
}
```

### Create Tweet

```http
POST /api/v1/tweets/

Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "content": "Hello Twitter Clone! #firstTweet",
  "media": {
               "url": "https://example.com/image.jpg",
               "type": "image"
            }
}
```

---

## 🛠️ Future Improvements

- **Reply Management**: Support deleting and updating reply tweets.
- **User Relationships**: Implement follow/unfollow functionality with follower/following lists.
- **Tweet Engagement**: Fetch all likes of a tweet for better engagement analytics.
- **Nested Replies**: Enable multi-level threaded conversations for better discussions.
- **Trending Hashtags**: Add trending hashtag discovery with frequency-based ranking.

---

## 👨‍💻 Author

**Hitesh Rathi**  
📧 rathihitesh2002@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/hitesh-rathi-91a6a7197) • [GitHub](https://github.com/HiteshRathi02)
