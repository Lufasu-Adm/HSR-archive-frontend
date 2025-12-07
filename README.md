# 🚀 HSR-archive-frontend

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

> **The modern, interactive Wiki interface for Honkai: Star Rail.**  
> Featuring Real-time Filtering, Damage Calculators, and Dynamic Tier Lists.

---

## 🔗 Connected Backend
This repository hosts the **Frontend Client**.  
To see the API Logic (Laravel), please visit the backend repository:  
👉 **[HSR-Archive API (Backend)](https://github.com/Lufasu-Adm/HSR-archive-backend)**

*(Replace `USERNAME_KAMU` and `HSR-archive-backend` with your actual GitHub username and repo name)*

---

## 🎮 Project Overview

**HSR-Archive-frontend** is a Single Page Application (SPA) designed to provide players with instant access to game data. Built with **Next.js 14 (App Router)**, it focuses on speed, interactivity, and a clean UI inspired by top-tier gaming wikis like Prydwen.

### Key Features ✨
* **📊 Meta Tier List:** Visually rich ranking system (SS/S/A tiers) fetched dynamically from the backend API.
* **🧮 Damage Calculator:** Interactive JS-based tool to estimate character output based on user stats (ATK/Crit).
* **🔍 Instant Search & Filter:** Filter characters by Element or Path in real-time without page reloads.
* **🛡️ Build Guides:** Visual recommendations for Best Relics, Light Cones, and Planar Ornaments.

---

## 📸 Screenshots

| Meta Tier List | Character Detail & Build |
| :---: | :---: |
| <img src="https://github.com/Lufasu-Adm/HSR-archive-frontend/blob/main/meta%20tier%20list.png " alt="Tier List" width="100%"> | <img src="https://github.com/Lufasu-Adm/HSR-archive-frontend/blob/main/build.png" alt="Detail Page" width="100%"> |

---

## 🛠️ Tech Stack

* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **State Management:** React Hooks (`useState`, `useEffect`)
* **Data Fetching:** Server Components & Fetch API

---

## ⚡ Getting Started

Follow these steps to run the frontend locally.

### 1. Clone the Repository
```bash
git clone https://github.com/USERNAME_KAMU/nexus-frontend.git
cd nexus-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
Make sure your Laravel Backend is running on port 8000 before starting the frontend.
```bash
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

---

## 📂 Project Structure
```
src/
├── app/
│   ├── characters/[slug]/      # Dynamic Detail Page
│   ├── tier-list/              # Tier List Page
│   └── page.tsx                # Home Page (Search & Filter)
├── components/
│   ├── CharacterList.tsx       # Client Component for Filtering
│   └── DamageCalculator.tsx    # Logic for DMG Calc
└── ...
```
