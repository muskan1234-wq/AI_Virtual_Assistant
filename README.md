# 🤖 Virtual Assistant – MERN Stack AI Assistant

## 📌 Overview
This is a full-stack Virtual Assistant web application built using the MERN stack.  
It allows users to interact with an AI-based assistant that can answer queries, manage tasks, and provide smart responses in real time.

The system uses React for frontend, Node.js + Express for backend, and MongoDB for database storage.

---

## ✨ Key Features

🧠 AI Virtual Assistant  
- Smart chat-based assistant interface  
- Real-time response system  
- Context-aware replies  

👤 User Management  
- User registration and login  
- Secure authentication using JWT  
- Profile management  

💬 Chat System  
- Interactive chat UI  
- Message history stored in database  
- Real-time conversation experience  

📂 Task Assistance  
- Reminders and task handling (basic level)  
- Query-based responses  

🔐 Security  
- JWT authentication  
- Password hashing (bcrypt)  
- Protected routes  

---

## 🧱 Tech Stack

### 🎨 Frontend
- React.js (Vite)  
- Tailwind CSS  
- Axios  
- Context API  

### ⚙️ Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT Authentication  
- bcrypt.js  

---

## 📂 Project Structure

VirtualAssistant/
│
├── client/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ ├── hooks/
│ │ └── utils/
│ │
│ ├── App.jsx
│ └── main.jsx
│
├── server/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── config/
│
├── .env
├── package.json
└── README.md

yaml
Copy code

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/virtual-assistant.git
cd virtual-assistant
2️⃣ Backend Setup
bash
Copy code
cd server
npm install
npm run dev
Create .env file:

ini
Copy code
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
PORT=5000
3️⃣ Frontend Setup
bash
Copy code
cd client
npm install
npm run dev
Open:

arduino
Copy code
http://localhost:5173
📸 App Screenshots
💬 Chat Interface

🔐 Login Page

🏠 Dashboard

🚀 Future Improvements
AI integration with OpenAI API

Voice-based assistant support

Mobile app version

Smart task automation

Cloud deployment (AWS / Vercel)

👩‍💻 Developer
Muskan Pathan
BTech Computer Science & Engineering
Project: MERN Stack Virtual Assistant



