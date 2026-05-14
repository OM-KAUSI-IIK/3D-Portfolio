# Om Kaushik | 3D Agentic AI Portfolio

A premium, high-performance developer portfolio featuring an **interactive AI-aware 3D avatar**, cinematic scroll-linked GSAP animations, and a sophisticated dark aesthetic. This project showcases the intersection of **Full-Stack Development** and **Agentic AI Engineering** through an immersive, state-of-the-art web experience.

---

## 🚀 Key Features

- **Interactive 3D Avatar**: A high-fidelity GLB model with "Anatomical Head Tracking" that naturally follows the user's cursor with cinematic smoothing.
- **Cinematic GSAP Animations**: Custom scroll-linked timelines that orchestrate complex camera movements and section transitions.
- **Agentic AI Showcase**: Dedicated architecture for presenting advanced AI capabilities and Full-Stack expertise.
- **Automated Deployment**: Fully configured GitHub Actions CI/CD pipeline for seamless updates.
- **Premium Performance**: Optimized Three.js render loop with frame-rate stabilization and lazy-loaded components.

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **3D Engine**: Three.js, React Three Fiber (R3F)
- **Animation**: GSAP (GreenSock Animation Platform) + ScrollTrigger
- **Styling**: Vanilla CSS (Premium Dark Mode System)
- **CI/CD**: GitHub Actions

## 📂 Project Structure

```text
.
├── .github/workflows/         # Automated deployment pipeline
├── public/                    # 3D Models (Final_model.glb) & static assets
├── src/
│   ├── components/
│   │   ├── Character/         # 3D Scene logic & Bone tracking
│   │   ├── styles/            # Component-specific CSS
│   │   ├── MainContainer.tsx  # Page orchestration
│   │   └── ...                # Functional sections (About, Career, Work)
│   ├── utils/                 # GSAP Scroll utilities
│   └── App.tsx                # Application Entry
└── vite.config.ts             # Optimized Build Configuration
```

## 🏗 Getting Started

1. **Clone & Install**:
   ```bash
   npm install
   ```

2. **Development**:
   ```bash
   npm run dev
   ```

3. **Build**:
   ```bash
   npm run build
   ```

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

Designed and Developed by **Om Kaushik**
