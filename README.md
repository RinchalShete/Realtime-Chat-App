# Chat App

A full-stack chat application built with Node.js and MongoDB, capable of running both locally and deployed on **Render**.

## 🌐 Live Demo

Access the deployed app here: [https://realtime-chat-app-obrg.onrender.com](https://realtime-chat-app-obrg.onrender.com)  

---

## 🛠️ Steps to run application locally

### 1. Clone the Repository

```bash
git clone https://github.com/RinchalShete/Realtime-Chat-App.git
```
```bash
cd Realtime-Chat-App
```

### 2. Set Up Environment Variables
Create a .env file inside the backend/ directory. Use the following template:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/chat_db?retryWrites=true&w=majority&appName=Cluster0
PORT=5001
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```
Add .env to your .gitignore file to avoid committing sensitive information.

### 3. Install Dependencies

#### Backend:

```bash
cd backend
npm install
```
#### Frontend:

```bash
cd frontend
npm install
```

### 4. Run the Application

Open two terminals and run:

#### In the first terminal (Backend):

```bash
cd backend
npm run dev
```

#### In the second terminal (Frontend):

```bash
cd frontend
npm run dev
```

---

## 🚀 Deployment on Render

You can deploy the app manually on Render:

Connect your GitHub repo to Render.

### Backend configuration:

#### Build command:

```bash
npm run build
```

#### Start command:

```bash
npm run start
```

#### Environment Variables:

Add all variables from your local .env except PORT and NODE_ENV (Render sets them automatically).
