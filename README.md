# 🏋️ WorkoutTracker

Jednoduchá aplikácia na sledovanie tréningov, postavená ako SPA v Reacte a REST API pomocou Node.js a Expressu.

## 📁 Štruktúra projektu

- `React SPA application/` – frontendová aplikácia v Reacte
- `NodeJS Express Server/` – backendová REST API aplikácia

---

## 🧑‍💻 Spustenie projektu

### 1. Klonovanie repozitára

```bash
git clone https://github.com/vsb-vaj/2025s-project-kos0378.git
cd 2025s-project-kos0378

```

---

### 2. Spustenie backendu (NodeJS Express Server)

#### a) Prejdi do zložky servera:

```bash
cd "NodeJS Express Server"
```

#### b) Inštaluj závislosti:

```bash
npm install
```

#### c) Vytvor súbor .env

Aplikácia potrebuje súbor `.env` s prístupovými údajmi k databáze. Po stiahnutí projektu z GitHubu je potrebné:

1. Vytvor súbor s názvom `.env` v priečinku `NodeJS Express Server`
2. Skopíruj do neho obsah zo súboru `.env.example` 
3. Pre lokálnu SQLite databázu použi: `DATABASE_URL="file:./dev.db"`


#### d) Generuj Prisma klienta:

```bash
npx prisma generate
```

#### e) Spusti server (vývojový mód):

```bash
npm run dev
```

Server beží na adrese `http://localhost:3000/` (ak nie je zmenené).

---

### 3. Spustenie frontendovej aplikácie (React SPA)

#### a) Prejdi do zložky React aplikácie:

```bash
cd "../React SPA application"
```

#### b) Inštaluj závislosti:

```bash
npm install
```

#### c) Spusti vývojový server:

```bash
npm run dev
```

Frontend beží na adrese `http://localhost:5173/` (štandardne cez Vite).

---

## 🔗 API komunikácia

Frontend komunikuje s REST API backendom. Uisti sa, že oba servery bežia súčasne.
