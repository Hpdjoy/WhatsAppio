# Chat-Wat 🔵

A responsive real-time chat application built with **React**, **Firebase Authentication**, **Cloud Firestore**, and **Firebase Storage**.

## Deployed Link
(https://joychat-a7410.web.app/)


## 🔥 Features

- Google Sign-In authentication
- Realtime chat support with Firebase Firestore
- Profile section to update:
  - Display picture (with live upload progress)
  - Name and status
- Responsive layout:
  - Mobile: full-screen views for chat and profile like WhatsApp
  - Desktop: chat panel and message window side-by-side

## 🛠 Tech Stack

- **Frontend**: React, Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Firebase Authentication, Firestore, Storage

## 📁 Project Structure

```
src/
├── components/
│   ├── Chat/              # Main chat window
│   ├── SidePanel/         # Chat user list panel
│   └── UserProfile/       # Profile editing screen
├── Context/
│   └── User/              # Global user context with update methods
├── firebaseconfig.js      # Firebase setup
├── App.js                 # Routing
└── main.jsx               # Root renderer
```

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/yourusername/chat-wat.git
cd chat-wat
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Firebase Setup
- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project
- Enable **Authentication > Google**
- Create a **Cloud Firestore** database
- Enable **Firebase Storage**

Replace values in `firebaseconfig.js`:
```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 4. Run the App
```bash
npm run dev
```
Visit `http://localhost:5173` in your browser.

## 📦 Build
```bash
npm run build
```

## 🙋‍♂️ Author
**Harsha Prasad Joy (HPDJOY)**

---

> 💡 Note: This app is not end-to-end encrypted. Use only for learning or trusted internal communication.