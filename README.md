# 🌍 SkyFlow x Dishcovery — AI-Powered Travel & Food Assistant

SkyFlow x Dishcovery is a multi-agent AI platform that seamlessly combines **food ordering** and **travel planning** into one unified experience.  
Using voice or text, users can discover restaurants, book flights, find hotels, and manage trips — all through intelligent agent communication.

---

## 🧠 Features

### 🍽️ Dishcovery (Food Ordering)
- Personalized restaurant recommendations based on preferences & allergies
- Voice-first meal ordering with language translation
- AI-verified reviews & real-time menu availability
- Mama-put / street vendor friendly queries like “Find lunch under $2 near me”

### ✈️ SkyFlow (Travel Assistant)
- Predicts hidden airline fees before booking
- Auto-refunds and rebookings for canceled flights
- Visa violation detection and rerouting suggestions
- Real-time itinerary sync (flights, trains, hotels)

### 🔄 Core Architecture
- 🔊 Input Agent: Converts voice → text → English
- 🧠 Intent Agent: Classifies input (Dishcovery or SkyFlow)
- 📍 Response Agent: Adds user data & geolocation
- 🧾 Service Agent: Books flight / suggests restaurant / finds hotel

---

## 🚀 Live Demo

> 🔐 Login Required  
Frontend: [Skyflow x Dishcovery](https://hackathon-frontend-seven-self.vercel.app/)  
Backend: [https://github.com/skyflow-dishcovery/user-agent](#)

Use live voice input or type natural prompts like:
- “I want sushi near Gulshan”
- “Book me a flight to Nairobi next Friday under \$400”
- “Find a vegetarian restaurant open now”

---

## 🧰 Tech Stack

| Layer       | Tech Used                         |
|-------------|-----------------------------------|
| Frontend    | React, TailwindCSS, Vite          |
| Backend     | FastAPI, PostgreSQL (Supabase)    |
| AI Models   | LLaMA-3 (Groq API), Whisper       |
| Auth        | JWT (secure token-based login)    |
| Hosting     | Vercel (frontend), AWS EC2 (API)  |
| Agents      | LangChain + modular Python agents |

---

## 🛠 Local Setup (Frontend)

```bash
git clone https://github.com/your-username/your-frontend-repo.git
cd your-frontend-repo
npm install
npm run dev
