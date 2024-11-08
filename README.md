
# My First Expo Project

This project is my first Expo application, developed as part of a tutorial. The app integrates with Appwrite for backend services, including authentication, database management, and file storage. It enables user registration, video posting, saving posts, and more.

## About This Project

This project was created as part of a tutorial to learn how to build a mobile application using Expo and integrate it with Appwrite. Through this project, I learned how to handle user authentication, manage data with a backend database, upload files, and build an interactive user interface with Expo.

## Features

- **User Authentication**: Register and log in with email and password.
- **User Profiles**: Store user data like usernames and avatars.
- **Video Posts**: Upload videos with titles, prompts, and thumbnails.
- **Save and Retrieve Favorites**: Save posts to favorites and retrieve them later.
- **File Uploads**: Handle video and image uploads with Appwrite's storage.
- **Session Management**: Log in and out of sessions.
  
## Prerequisites

- Node.js and npm
- Expo CLI (`npm install -g expo-cli`)
- An Appwrite backend set up with configured database, storage, and authentication.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```

2. Navigate to the project directory:
   ```bash
   cd your-repo-name
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables by creating a `.env` file in the project root:
   ```plaintext
   APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   APPWRITE_PROJECT_ID=your_project_id
   APPWRITE_DATABASE_ID=your_database_id
   APPWRITE_USER_COLLECTION_ID=your_user_collection_id
   APPWRITE_VIDEO_COLLECTION_ID=your_video_collection_id
   APPWRITE_STORAGE_ID=your_storage_id
   ```

5. Start the Expo server:
   ```bash
   expo start
   ```

## Project Structure

This project contains multiple functions to handle authentication, posts, file uploads, and more. Below is a breakdown of the main functions:

### Auth Functions

- **`createAccount(username, email, password)`**: Registers a new user, logs them in, and creates their profile in the database.
- **`signIn(email, password)`**: Logs in an existing user and creates a session.
- **`signOut()`**: Logs out the current session.

### User Profile Functions

- **`getAccount()`**: Retrieves the current user's account data.
- **`getCurrentUser()`**: Fetches the user's profile from the database.

### Post Functions

- **`createVideoPost(post)`**: Creates a new video post, including a title, thumbnail, and video file.
- **`getAllPosts()`**: Fetches all video posts.
- **`getLatestPosts()`**: Retrieves the latest 7 posts.
- **`getSearchResults(query)`**: Searches for posts by title.
- **`getUserPosts(userId)`**: Retrieves posts created by a specific user.
- **`getSavedPosts(userId)`**: Fetches posts saved by the user.
- **`deletePost(postId)`**: Deletes a specific post by ID.

### Save Functions

- **`toggleSave(videoId, userId)`**: Adds or removes a post from the user's saved list.

### File Functions

- **`uploadFile(file, type)`**: Uploads a file (video or image) to Appwrite storage and returns the file's URL.
- **`getFilePreview(fileId, type)`**: Retrieves a preview URL for the file based on type (video or image).

## Usage Examples

### 1. Registering a User

```javascript
await createAccount("john_doe", "john@example.com", "password123");
```

### 2. Logging In

```javascript
await signIn("john@example.com", "password123");
```

### 3. Creating a Video Post

```javascript
const post = {
  title: "My First Video",
  thumbnail: thumbnailFileObject,
  video: videoFileObject,
  prompt: "A short description",
  userId: "user_id",
};

await createVideoPost(post);
```

### 4. Saving and Unsaving a Post

```javascript
await toggleSave("video_id", "user_id");
```

### 5. Retrieving User's Saved Posts

```javascript
const savedPosts = await getSavedPosts("user_id");
```

## Appwrite Configuration

To run this project, set up an Appwrite backend with the following:

1. **Database**: Create collections for `users` and `videos`.
2. **Storage**: Create a storage bucket for file uploads (e.g., images and videos).
3. **Environment Variables**: Configure the `.env` file with your Appwrite settings as shown above.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request!

## License

This project is open-source under the MIT License.
