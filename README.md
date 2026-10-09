# Nature Explorer AI 🌿
*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 1: Touch Grass](https://dev.to/challenges/hacktoberfest-week1-2026-10-05)*

---

## What I Built

**Nature Explorer AI** is an open-source, full-stack web application designed to counter digital screen fatigue by turning outdoor exploration into an engaging, educational adventure.

Instead of keeping users tethered to their desks or doom-scrolling feeds, Nature Explorer AI acts as an intentional, lightweight field companion. When you step outside into a city park, hiking trail, forest reserve, or your own backyard, you can snap photographs of birds, native wildflowers, trees, and insects. The app leverages **open-weight vision models** to identify species, teach ecological context, highlight distinguishing characteristics, and recommend safe, hands-on outdoor activities.

### Key Capabilities:
- 🦅 **Open-Weight AI Vision Identification:** Instant classification for birds, plants, insects, and other wildlife using open-weight Vision Transformers, paired with confidence indicators and ecological disclaimers.
- 📖 **Personal Discovery Journal:** A 100% private field notebook stored locally in your browser (`localStorage`) with thumbnail downscaling, keyword search, kingdom filtering (Birds, Plants, Insects, All), and detail inspection.
- 🌲 **Touch Grass Outdoor Quests:** 8 curated, screen-free micro-challenges—such as mapping natural soundscapes, finding five distinct leaf shapes, or practicing 15 minutes of uninterrupted forest bathing—complete with local progress tracking and a **"Surprise Me!"** random adventure generator.
- 🎨 **Sensory Nature Design:** An organic palette of deep forest greens, soothing sage, and warm parchment cream tones built with Tailwind CSS, custom typography, and accessible UI components.

### Who It Is For:
- Anyone experiencing screen burnout who wants a fun reason to step outside and **touch grass**.
- Amateur naturalists, hikers, and weekend explorers wanting to learn about local biodiversity.
- Students, families, and educators looking for an open-source, privacy-first field guide.

---

## Demo

- **Live Local App:** [http://localhost:5173](http://localhost:5173) (Frontend) & [http://localhost:3001](http://localhost:3001) (API Server)
- **Health Check Status:** [http://localhost:3001/api/health](http://localhost:3001/api/health)

### Visual Walkthrough

| Home & Exploration Hero | Species Identification Result |
| :---: | :---: |
| *Step Outside. Discover More Hero with biodiversity highlights* | *European Robin match with distinguishing traits & confidence* |

| My Nature Field Journal | Touch Grass Outdoor Quests |
| :---: | :---: |
| *Filterable, searchable local discoveries grid* | *Interactive quest cards, progress bar & Surprise Me modal* |

---

## Code

The complete source code is organized into a clean, modular full-stack architecture:

- **Repository:** [https://github.com/KaushalTukadiya-Creator/Nature-Explore-AI](https://github.com/KaushalTukadiya-Creator/Nature-Explore-AI)
- **License:** [MIT License](LICENSE)

### Repository Architecture

```text
nature-explorer-ai/
├── public/                     # Favicons, vector logos, and imagery
├── src/
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, PageLayout
│   │   ├── home/               # HeroSection, FeatureCards, NatureStats
│   │   ├── explorer/           # ImageUploader, ImagePreview, IdentificationResult, ConfidenceIndicator, ExplorationTips
│   │   ├── journal/            # JournalCard, EmptyJournal
│   │   └── ui/                 # Button, Card, Badge, Dialog, Toast
│   ├── pages/                  # HomePage, ExplorerPage, JournalPage, ActivitiesPage, AboutPage, NotFoundPage
│   ├── hooks/                  # useLocalStorage, useIdentification
│   ├── services/               # aiService, journalService, activityService
│   ├── types/                  # nature.ts, journal.ts, api.ts
│   ├── lib/                    # utils.ts, validation.ts
│   ├── __tests__/              # Automated test suite (Vitest + JSDOM)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── server/
│   ├── src/
│   │   ├── routes/             # identification.ts (GET /api/health, POST /api/identify)
│   │   ├── services/           # modelService.ts (Provider Abstraction)
│   │   ├── middleware/         # errorHandler.ts
│   │   ├── types/              # index.d.ts
│   │   ├── app.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

---

## How I Built It

### 1. Open-Source AI Architecture
The backend (`server/src/services/modelService.ts`) implements a clean **Model Provider Abstraction** (`IModelProvider`) that supports multiple open inference modes:

- **Hugging Face Inference Providers (Default):** Runs open-weight models such as `google/vit-base-patch16-224` (Apache 2.0 license) or `Qwen/Qwen2-VL-7B-Instruct` via hosted inference endpoints.
- **Local Air-Gapped Inference with Ollama:** When enabled via `LOCAL_MODEL_ENABLED=true`, requests route to a locally running Ollama instance (`http://localhost:11434/api/generate`) with `llava` or `minicpm-v`. This allows 100% offline species identification deep in forests or mountains without cellular reception.
- **Verified Biological Taxonomy Reference Engine:** Provides an offline fallback taxonomy database for instant development, demonstration, and reliable automated testing.

### 2. Separation of Concerns & Security
- **Backend API Proxy:** The Express backend acts as an isolation barrier. API tokens (`HF_API_TOKEN`) never leak into client-side Vite bundles.
- **Strict Validation:** Incoming requests and images are strictly validated with **Zod** (checking MIME types and enforcing a 10MB file limit).
- **Graceful Storage Optimization:** To prevent `localStorage` quota errors (typically 5MB), client-side canvas routines in `lib/utils.ts` downscale uploaded photos to compact thumbnails before persisting journal records.

### 3. Testing & Verification
The project includes automated tests using **Vitest** and **React Testing Library**:
- File validation & MIME rejection tests (`src/__tests__/validation.test.ts`)
- Journal save, filter, and delete tests (`src/__tests__/journal.test.ts`)
- Outdoor activity toggle & random generator tests (`src/__tests__/activities.test.ts`)

---

## Why Does Open Innovation Matter?

Open innovation is essential when building technology designed for the natural world:

1. **True Privacy in the Wild:** Commercial closed-source vision APIs log user prompts, images, and geolocation to train proprietary models. Nature lovers and families deserve the freedom to photograph local flora and fauna without corporate surveillance.
2. **Offline Independence:** Nature exists beyond cell towers. Closed APIs fail the moment you lose LTE connection. Open-weight models (via Ollama or ONNX/Transformers.js) can run directly on consumer laptops and edge devices anywhere on Earth.
3. **Ecological Safety & Transparency:** Proprietary black boxes can produce unpredictable, confident hallucinations without accountability. With open-weight architectures, researchers and communities can inspect classification weights, calibrate confidence metrics, and enforce strict disclaimers against hazardous foraging.
4. **Democratized Environmental Education:** Open-source AI eliminates per-token API paywalls, allowing schools, non-profits, and park rangers to deploy biodiversity tools at zero software cost.

---

## My Agent Session

This project was built iteratively with pair-programming assistance from the AI agent:
- Architecture design of the provider abstraction (`IModelProvider`).
- Development of nature-tailored CSS design tokens (forest, sage, cream).
- Implementation of client-side canvas image thumbnailing to protect `localStorage` quotas.
- Creation of the automated test suite with Vitest.

---

## Prize Categories

- **Hacktoberfest 2026 Week 1:** *Touch Grass* (Grand Prize & General Category)
  - Encouraging screen-free mindfulness, outdoor observation, and real-world connection to nature powered by open-weight AI.
