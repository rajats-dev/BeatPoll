# 🎵 BeatPoll 🎶✨

## 🌎 Overview 🎧🎶🎨

BeatPoll a collaborative music streaming application for creator.

## 🎶 How It Works? 🎵✨🚀

1. **User Authentication 🔑**

   - Users log in using their Google account via NextAuth.
   - Authentication ensures only verified users can create and manage streams.

2. **Creating a Stream 🎨**

   - After logging in, a creator can set up a new streams.
   - Page will contains a playlist of songs and a "Now Playing" section.

3. **Adding Songs 🎶**

   - Creators can take a Youtube url and paste it to add songs input.
   - The added songs are displayed in the playlist.

4. **Real-time Updates ⚡**

   - WebSockets (Socket.io) keep all users updated in real-time.
   - Any changes to the stream votes, list of playlist or "Now Playing" section reflect instantly via socket.

5. **Playing Music ▶️**

   - Songs are played using the embedded YouTube player.
   - The "Now Playing" section updates dynamically.

6. **Syncing Across Users 🔄**

   - All users connected to a stream see the same playback status.
   - Changes like song additions or playback controls are synchronized.

7. **User Interaction 🎤**

   - Future enhancements may include chat, reactions, or requests.

## ✨ Features 🎵🔥🎉

- **Google Authentication**: Users can log in using their Google account.
- **Stream Creation**: Creators can set up their own music streaming pages.
- **Song Management**: Users can add songs to their pages.
- **Now Playing**: Displays the currently playing song.
- **Real-time Updates**: Powered by WebSockets to keep all users in sync.
- **YouTube Integration**: Supports embedding and playing songs from YouTube.

## 🛠️ Tech Stack 🚀💡🎨

### 🖥️ Frontend (Web) ⚛️🎨🛜

Built with Next.js and React:

- **Framework:** Next.js (App Router)
- **State Management:** Zustand
- **UI:** TailwindCSS, Radix UI, Lucide React
- **Authentication:** NextAuth.js (Google OAuth)
- **WebSockets:** Socket.io-client
- **YouTube Embedding:** React Lite YouTube Embed, YouTube Player
- **Notifications:** React Toastify

#### 📦 Web Dependencies 📜📥🔗

```json
  "@radix-ui/react-dialog": "^1.1.6",
  "@radix-ui/react-slot": "^1.1.2",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "lucide-react": "^0.479.0",
  "next": "^15.2.1",
  "next-auth": "^4.24.11",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-icons": "^5.5.0",
  "react-lite-youtube-embed": "^2.4.0",
  "react-toastify": "^11.0.5",
  "socket.io-client": "^4.8.1",
  "tailwind-merge": "^3.0.2",
  "tailwindcss-animate": "^1.0.7",
  "youtube-player": "^5.6.0",
  "zustand": "^5.0.3"
```

### 🖥️ Backend (Server) 🚀📡🔐

Built with Express.js and Socket.io:

- **Framework:** Express.js
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JSON Web Token (JWT)
- **Real-time Communication:** WebSockets (Socket.io)
- **Environment Variables Management:** dotenv
- **Validation:** Zod
- **YouTube API Integration:** youtube-search-api

#### 📦 Server Dependencies 🔗📜📥

```json
  "@prisma/client": "^6.4.1",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "express": "^4.19.2",
  "jsonwebtoken": "^9.0.2",
  "prisma": "^6.4.1",
  "socket.io": "^4.8.1",
  "tsc-watch": "^6.2.1",
  "ws": "^8.18.1",
  "youtube-search-api": "^1.2.2",
  "zod": "^3.24.2"
```

#### 🛠️ Dev Dependencies ⚙️📜💻

```json
  "@types/cors": "^2.8.17",
  "@types/express": "^4.17.21",
  "@types/jsonwebtoken": "^9.0.9",
  "@types/node": "^20.14.11",
  "@types/ws": "^8.18.0",
  "concurrently": "^8.2.2",
  "nodemon": "^3.1.4",
  "typescript": "^5.5.3"
```

## ⚙️ Installation 📥🛠️📌

### 📌 Prerequisites 🏗️🔍🖥️

- Node.js (latest LTS version recommended)
- PostgreSQL database

### 🚀 Setup 🔧📜⚡

1. Clone the repository: 🖥️💾📂
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```
2. Install dependencies for both frontend and backend: 📦📥💻

   ```sh
   # Install frontend dependencies
   cd web
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. Set up environment variables in a `.env` file for the web & server: 🌱🔑📜

   Server

   ```env
   PORT=8000
   CLIENT_URL=http://localhost:3000
   Server_URL=http://localhost:8000
   JWT_SECRET=sgdugg3324234zddfcsafcdsafbasyd793sadfs2y649
   NODE_ENV=development
   DATABASE_URL="postgresql://as_owner:npg_wojx0Q6FaiUpep-still/neondb?sslmode=require"
   ```

   Web

   ```env
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_secret_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. Run the development servers: 🚀🖥️⚡

   ```sh
   # Start the backend server
   cd server
   npm run dev

   # Start the frontend server
   cd ../web
   npm run dev
   ```

## 🌐 Deployment 🚀☁️🛠️

You can deploy the frontend on Vercel and the backend on Render or any cloud provider supporting Node.js. 🌍☁️📡

## 🤝 Contributing 🎉📝🔄

Contributions are welcome! Feel free to open issues and pull requests. 🚀🔥📜

## 📜 License ⚖️📝✅

This project is licensed under the MIT License. 🔓📃💡
