# VoxMeet – Video Conferencing Platform

### Live Demo

https://voxmeetfrontend.onrender.com
### GitHub Repository

https://github.com/Ashra-Ansari/VoxMeet

---

## 📌 Overview

**VoxMeet** is a full-stack video conferencing platform that allows users to connect through real-time video and audio communication.

The application uses **WebRTC** for peer-to-peer media communication and **Socket.IO** for real-time signaling and communication between participants.

VoxMeet also provides features such as screen sharing, in-meeting chat, meeting history, participant management, and media controls, creating a complete virtual meeting experience.

---

## ✨ Features

* 🔐 User registration and authentication
* 🎥 Real-time video conferencing
* 🎤 Mute and unmute microphone
* 📷 Turn camera on/off
* 🖥️ Screen sharing
* 💬 Real-time chat during meetings
* 👥 Participant management
* 🕒 Meeting history
* 🔄 Real-time signaling using Socket.IO
* 🌐 Peer-to-peer communication using WebRTC
* 📱 Responsive user interface

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js
* Socket.IO
* socket.io-client

### Database

* MongoDB
* Mongoose
* MongoDB Atlas

### Real-Time Communication

* WebRTC
* Socket.IO

### Tools

* Git & GitHub
* VS Code
* Thunder Client
* Render

---

## 🧠 How VoxMeet Works

VoxMeet uses two important technologies for real-time communication:

### WebRTC

**WebRTC (Web Real-Time Communication)** is responsible for establishing peer-to-peer connections between participants.

It handles:

* Camera and microphone streams
* Audio/video transmission
* Screen sharing
* Peer-to-peer media communication

Instead of continuously sending the actual video stream through the backend server, WebRTC allows participants to communicate directly with each other whenever the connection can be established.

### Socket.IO

Socket.IO is used for **real-time signaling and communication** between the clients and server.

It helps participants exchange the information required to establish a WebRTC connection, such as:

* Joining a meeting
* User/participant information
* WebRTC offer
* WebRTC answer
* ICE candidates
* Meeting chat messages

### Simplified Flow

```text
User A
  │
  │ WebRTC Media
  ▼
User B

      ▲
      │
      │ Signaling
      │
      ▼
 Socket.IO Server
```

The Socket.IO server helps the users exchange connection information, while WebRTC handles the actual audio/video communication.

---

## 🔐 Authentication & Security

VoxMeet includes authentication to protect user-specific functionality.

Security-related implementations include:

* User authentication
* Protected application routes
* Password handling
* Environment variables for sensitive configuration
* MongoDB connection string stored in `.env`
* `.env` excluded from Git using `.gitignore`
* Server-side validation and error handling

Sensitive configuration values are not hardcoded into the source code.

---


## ⚙️ Local Setup

Follow the steps below to run VoxMeet locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Ashra-Ansari/VoxMeet.git
```

Move into the project directory:

```bash
cd VoxMeet
```

---

### 2. Setup Backend

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
```

Then start the backend:

```bash
npm run dev
```

---

### 3. Setup Frontend

Open another terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The Vite development server will provide the local frontend URL in the terminal.

---

## 🗄️ Database Setup

VoxMeet uses **MongoDB** as its database and **MongoDB Atlas** for cloud database hosting.

To run the project locally:

1. Create a MongoDB Atlas cluster.
2. Create a database user.
3. Configure the required network access.
4. Copy the MongoDB connection string.
5. Add it to the backend `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
```

The connection string should **not** be committed to GitHub.

---

## 🚀 Deployment

VoxMeet is deployed using **Render**.

### Frontend

The React/Vite frontend is deployed as a Render Static Site.

Build command:

```bash
npm install && npm run build
```

Publish directory:

```text
dist
```

### Backend

The Node.js/Express backend is deployed as a Render Web Service.

The MongoDB connection string is configured through Render's environment variables rather than being stored directly in the source code.

---

## 🔄 Real-Time Communication

One of the main learning areas of VoxMeet was implementing real-time communication.

The project combines:

**Socket.IO → Signaling + real-time events**

**WebRTC → Audio/video peer-to-peer communication**

This combination allows VoxMeet to support real-time meetings while keeping signaling logic separate from the actual media transmission.

---

## 💡 Why I Built VoxMeet

I built VoxMeet to go beyond traditional CRUD-based applications and gain practical experience with **real-time communication technologies**.

The project gave me an opportunity to explore **WebRTC**, which was a new concept for me, and understand how modern video conferencing applications establish and manage real-time communication.

---

## 👩‍💻 Author

**Ashra Ansari**

Recent Information Technology graduate focused on Full-Stack Web Development and building practical real-world applications.

### Connect with me

* GitHub: https://github.com/Ashra-Ansari
* LinkedIn: https://www.linkedin.com/in/ashra-ansari-1749312a1/

---

## ⭐ If you found this project useful

Feel free to explore the repository, try the live application, or connect with me to discuss the project.
