# 🎵 Needle & Grain 3D — Vintage Hindi Vinyl Record Shop

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Web Audio API](https://img.shields.io/badge/Audio-Web_Audio_API-orange?logo=webrtc&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Needle & Grain** is an interactive, 3D web showcase and e-commerce experience celebrating vintage Hindi vinyl records, Bollywood classics, and audiophile analog pressings. Built with **React**, **Vite**, and the native **Web Audio API**, it features a real-time synthesized turntable player, authentic vinyl crackle generator, tanpura drone synth, and a full multi-step checkout workflow.

> **Note:** This is a frontend-only project built for UI/UX and interaction design practice. The cart, checkout, and payment flows (UPI, Net Banking, COD) are fully simulated on the client side — there is no real backend, database, or payment gateway connected.

---

## ✨ Features & Highlights

### 🎧 Web Audio API Vinyl Engine & Interactive Turntable
- **Synthesized Audio Engine**: Built-in sound generator creating rich Indian Tanpura drones (C# / G# root notes) and procedural melodies using web oscillators and bandpass filters.
- **Procedural Vinyl Crackle**: Real-time white/pop noise generator simulating authentic analog vinyl surface noise with adjustable crackle volume slider.
- **Interactive Tonearm & Needle Drop**: Authentic needle drop sound effect and tonearm mechanics when records are played or paused.
- **Speed & Side Selection**: Toggle between **33 RPM** and **45 RPM** speed modes (modulating audio pitch & spin rate) and switch between **Side A** and **Side B** tracklists.
- **Canvas Audio Visualizer**: Real-time oscilloscope / frequency spectrum canvas visualizing active audio playback.

### 🎨 Realistic 3D Vinyl Crate Sleeves & Visuals
- **3D Sleeve Flip & Disc Slide-Out**: High-resolution record sleeve presentation featuring CSS 3D depth, perspective tilts, and animated vinyl disc slide-out on hover/select.
- **Spinning Record Animation**: Realistic vinyl grooves and custom center labels matched to each album's unique color palette.
- **Curator's Staff Picks**: Dedicated highlights section featuring hand-picked albums with curator notes and golden badges.

### 📚 Curated Hindi & Bollywood Catalog
- **Timeless Classics**: Features legendary pressings from A.R. Rahman, R.D. Burman, Kishore Kumar, Lata Mangeshkar, Jagjit Singh, Nadeem-Shravan, and Bappi Lahiri.
- **Genre & Search Filters**: Instant filtering across *Hindi Retro*, *Raga Fusion*, *Staff Picks*, or live title/artist text search.
- **Detailed Record Inspector**: Tracklist modal displaying Side A / Side B songs, release year, album notes, and track previews.

### 🛒 E-Commerce Cart & Multi-Step Indian UPI Checkout
- **Sticky Cart Bar & Slide-Out Drawer**: Instant cart updates with quantity steppers and price calculations in Indian Rupees (₹ INR).
- **Promo Code System**: Built-in discount support (e.g., try promo code `VINYL10` for 10% off).
- **Regional Indian Shipping**: Integrated state selection for pan-India express vinyl packaging.
- **Multi-Method Checkout**: Supports **UPI QR Code Scan**, **Net Banking**, and **Cash on Delivery (COD)** with instant order confirmation popups.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 18](https://reactjs.org/) (Functional Components, Custom Hooks, Refs)
- **Build Tool**: [Vite 5](https://vitejs.dev/) (Lightning fast HMR & ES modules)
- **Audio Processing**: Web Audio API (`AudioContext`, `BiquadFilterNode`, `OscillatorNode`, `GainNode`, `AnalyserNode`)
- **Styling**: Modern Vanilla CSS, CSS 3D Transforms (`perspective`, `transform-style: preserve-3d`), Custom Typography (`Arvo`, `Bebas Neue`, `IBM Plex Mono`)
- **Icons**: Inline SVG Icons (Phosphor / Feather inspired clean UI symbols)

---

## 📁 Directory Structure

```text
recordshop/
├── index.html              # HTML5 entry document & Google Fonts imports
├── vite.config.js          # Vite build configuration & React plugin
├── package.json            # Project dependencies & npm scripts
├── RecordShop.jsx          # Main application component & Web Audio Engine
└── src/
    ├── main.jsx            # React root DOM mounting script
    └── index.css           # Global typography & color scheme variables
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v16.0 or higher) and **npm** installed on your machine.

```bash
node -v
npm -v
```

### Installation

1. **Clone or download the repository**:
   ```bash
   git clone https://github.com/your-username/recordshop.git
   cd recordshop
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Open your browser and navigate to `http://localhost:5173` (or the URL provided in your terminal).

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode with live hot module replacement (HMR). |
| `npm run build` | Builds the optimized production bundle into the `dist/` directory. |
| `npm run preview` | Previews the production build locally. |

---

## 🔊 Audio Engine Overview

The audio system inside `RecordShop.jsx` operates directly through the browser's native **Web Audio API** without requiring external mp3 files or server dependencies:

```javascript
// Example snippet of the procedural vinyl crackle & tanpura drone
class VinylAudioEngine {
  init() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioCtx();
  }
  
  // Generates randomized micro-pops and lowpass filtered noise
  startVinylNoise() { ... }

  // Plays Tanpura drone tuned to Indian Classical Raga scale
  playRecord(genre, rpm) { ... }
}
```

---

## 💳 Testing Checkout & Promo Codes

- **Promo Code**: Enter `VINYL10` in the cart drawer to receive a **10% discount**.
- **Payment Options**: Select UPI to view the simulated QR code scanner flow.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Crafted with ❤️ for audiophiles and Hindi cinema music lovers.*
