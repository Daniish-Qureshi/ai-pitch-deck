# 🚀 PitchAI — AI-Powered Pitch Deck Generator

<div align="center">

![PitchAI Banner](https://img.shields.io/badge/PitchAI-AI%20Pitch%20Deck%20Generator-blue?style=for-the-badge&logo=rocket)

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-Vercel-black?style=for-the-badge)](https://ai-pitch-deck-one.vercel.app/)
[![Backend](https://img.shields.io/badge/🔧%20Backend-Render-purple?style=for-the-badge)](https://ai-pitch-deck-ajbt.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Daniish--Qureshi-181717?style=for-the-badge&logo=github)](https://github.com/Daniish-Qureshi)

**India ka AI-Powered Pitch Deck Generator — Sirf 2 minute mein investor-ready presentation!**

</div>

---

## 📌 Project Overview

**PitchAI** is a full-stack web application that uses **Groq AI (Llama 3.3 70B)** to automatically generate professional 10-slide startup pitch decks. Built for Indian entrepreneurs, it includes India-specific features like government scheme recommendations and INR-based projections.

> 🎓 BCA Final Year Project | Danish Qureshi | Dadri, Uttar Pradesh, 2026

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Deck Generation** | 10-slide pitch deck in under 2 minutes using Groq AI |
| 🎯 **AI Pitch Score** | 8-category evaluation with grade, feedback & investor verdict |
| 🇮🇳 **India Schemes** | Relevant govt schemes — Startup India, Mudra, AIM, SIDBI |
| 🎨 **6 Templates** | Default, Ocean, Sunset, Forest, Galaxy, Fire |
| ✏️ **Edit Slides** | Edit heading, content & bullet points of any slide |
| 📄 **PDF Export** | A4 landscape PDF with all 10 slides |
| 📊 **PPTX Export** | Native PowerPoint format download |
| 🔗 **Shareable Link** | Public link to share deck with investors |
| 💾 **Dashboard** | Manage all your saved decks |

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwindcss)
![React Router](https://img.shields.io/badge/React%20Router-7-CA4245?logo=reactrouter)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens)

### AI & Export
![Groq](https://img.shields.io/badge/Groq-Llama%203.3%2070B-FF6B35)
![jsPDF](https://img.shields.io/badge/jsPDF-PDF%20Export-red)
![PptxGenJS](https://img.shields.io/badge/PptxGenJS-PPTX%20Export-orange)

---

## 📁 Project Structure

```
ai-pitch-deck/
├── client/                   # React.js Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── SlidePreview.jsx   # Main slide viewer
│   │   │   ├── PitchScore.jsx     # AI score modal
│   │   │   └── IndiaSchemes.jsx   # Govt schemes
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CreatePitch.jsx
│   │   │   └── SharedDeck.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   └── vite.config.js
│
└── server/                   # Node.js Backend
    ├── models/
    │   ├── User.js
    │   └── Deck.js
    ├── routes/
    │   ├── auth.js
    │   └── pitch.js
    └── index.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v20+
- MongoDB Atlas account (free)
- Groq API key (free) — [console.groq.com](https://console.groq.com)

### 1. Clone the Repository

```bash
git clone https://github.com/Daniish-Qureshi/ai-pitch-deck.git
cd ai-pitch-deck
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create `server/.env` file:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/pitchai
JWT_SECRET=your_jwt_secret_key
GROQ_API_KEY=gsk_your_groq_api_key
```

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) 🎉

---

## 🔌 API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Register new user |
| `/api/auth/login` | POST | Login + get JWT |
| `/api/pitch/generate` | POST | Generate 10-slide deck |
| `/api/pitch/score` | POST | Get AI pitch score |
| `/api/pitch/india-schemes` | POST | Get govt schemes |
| `/api/pitch/save` | POST | Save deck + get share link |
| `/api/pitch/share/:shareId` | GET | Get shared deck |
| `/api/pitch/my-decks/:userId` | GET | Get user's decks |
| `/api/pitch/delete/:shareId` | DELETE | Delete a deck |
| `/api/pitch/download-pptx` | POST | Download PPTX |

---

## 🌐 Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | [ai-pitch-deck.vercel.app](https://ai-pitch-deck-one.vercel.app/) |
| Backend | Render | [ai-pitch-deck-ajbt.onrender.com](https://ai-pitch-deck-ajbt.onrender.com) |
| Database | MongoDB Atlas | Cloud hosted |

---

## 📸 Screenshots

### 🏠 Landing Page
![Landing Page](https://github.com/Daniish-Qureshi/ai-pitch-deck/blob/main/screenshort/LadingPage.png)

### 📝 Deck Generator Form
![Form](https://github.com/Daniish-Qureshi/ai-pitch-deck/blob/main/screenshort/PitchForm.png)

### 🎨 Slide Preview
![Slides](https://github.com/Daniish-Qureshi/ai-pitch-deck/blob/main/screenshort/SliedPreview.png)

### 🎯 AI Pitch Score
![Score](https://github.com/Daniish-Qureshi/ai-pitch-deck/blob/main/screenshort/PitchScore.png)

### 🇮🇳 India Government Schemes
![Schemes](https://github.com/Daniish-Qureshi/ai-pitch-deck/blob/main/screenshort/IndianScheme.png)

---

## 🔮 Future Scope

- [ ] Voice input in Hindi/Hinglish
- [ ] WhatsApp sharing integration
- [ ] Deck view analytics
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Investor matching feature
- [ ] Freemium pricing model

---

## 👨‍💻 Developer

**Danish Qureshi**
- 🎓 BCA 3rd Year | Dadri, Uttar Pradesh
- 💼 Frontend Developer
- 🌐 Portfolio: [danish-qureshi-6ew5.vercel.app](https://danish-qureshi-6ew5.vercel.app)
- 🐙 GitHub: [github.com/Daniish-Qureshi](https://github.com/Daniish-Qureshi)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**⭐ Agar project pasand aaya toh star zaroor karo!**

Made with ❤️ in India 🇮🇳

</div>
