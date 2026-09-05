import React, { useState, useEffect, useRef } from "react";

/* ---------------------------------------------------------
   Needle & Grain 3D — Realistic 3D Hindi Vinyl Showcase
   Features:
   - Authentic High-Res 3D Vinyl Covers with 3D Box Perspective & Disc Slide-Out
   - Hindi Retro Classics & Bollywood Masterpieces (A.R. Rahman, R.D. Burman, Kishore Kumar, etc.)
   - Web Audio Indian Raga & Tanpura Synthesizer + Vinyl Crackle
   - Prominent, Unmissable "🛒 ADD TO CART" buttons with quantity controls on every card
   - Floating Sticky Cart Bar & Multi-Step Indian UPI Checkout Flow in ₹ INR
--------------------------------------------------------- */

const PALETTE = {
  walnut: "#1A120B",
  walnutLight: "#2D1E13",
  walnutDeep: "#0F0A06",
  paper: "#F5EBE0",
  offwhite: "#F3E9D7",
  ink: "#17100B",
  brass: "#D4AF37",
  brassLight: "#F5D77F",
  goldGlow: "rgba(212, 175, 55, 0.4)",
  hindiGold: "#E5A93C",
  ragaRed: "#C84B4B",
  retroTeal: "#2A7B72",
  desiBlue: "#3B629B",
  vinylBlack: "#0D0B0A",
};

const RECORDS = [
  {
    id: 1,
    title: "Dil Chahta Hai (Special Gold Vinyl)",
    artist: "Shankar-Ehsaan-Loy",
    genre: "Hindi Retro",
    accent: PALETTE.hindiGold,
    price: 1299,
    year: 2001,
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    staffPick: true,
    note: "The album that defined a generation. Side A has 'Jaane Kyun' on 180g gold vinyl.",
    description: "Iconic soundtrack featuring modern acoustic guitars, synth brass, and soulful vocals recorded in 24-bit analog.",
    sideA: ["Jaane Kyun", "Dil Chahta Hai", "Kaisi Hai Yeh Rout"],
    sideB: ["Tanhayee", "Koi Kahe Kehta Rahe", "Akash's Theme"],
  },
  {
    id: 2,
    title: "Roja & Rahman Masterpieces",
    artist: "A.R. Rahman",
    genre: "Raga Fusion",
    accent: PALETTE.retroTeal,
    price: 1499,
    year: 1992,
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    staffPick: true,
    note: "Pure magic — 'Chaiyya Chaiyya' and 'Roja' in tube-mastered analog stereo.",
    description: "The album that revolutionized Indian film music. Deep synth basslines, lush Tamil strings, and haunting ragas.",
    sideA: ["Chaiyya Chaiyya", "Roja Janeman", "Dil Se Re"],
    sideB: ["Tu Hi Re", "Chinna Chinna Aasai", "Yeh Haseen Vaadiyan"],
  },
  {
    id: 3,
    title: "Pancham Gold: R.D. Burman Hits",
    artist: "R.D. Burman",
    genre: "Hindi Retro",
    accent: PALETTE.ragaRed,
    price: 1199,
    year: 1973,
    coverUrl: "https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=600&auto=format&fit=crop&q=80",
    staffPick: false,
    description: "Pancham Da's revolutionary brass funk, acoustic 12-strings, and eccentric percussion recorded on analog master tape.",
    sideA: ["Chura Liya Hai Tumne", "Dum Maro Dum", "Mehbooba Mehbooba"],
    sideB: ["Yamma Yamma", "O Mere Dil Ke Chain", "Tere Bina Zindagi Se"],
  },
  {
    id: 4,
    title: "Golden Ghazals & Velvet Soul",
    artist: "Jagjit Singh & Chitra",
    genre: "Hindi Retro",
    accent: PALETTE.walnutLight,
    price: 999,
    year: 1981,
    coverUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&auto=format&fit=crop&q=80",
    staffPick: false,
    description: "Intimate harmonium, tabla acoustics, and velvet vocal tones engineered for true vinyl audiophiles.",
    sideA: ["Tumko Dekha To Yeh Khayal", "Jhuki Jhuki Si Nazar", "Hothon Se Chhoo Lo"],
    sideB: ["Chitti Na Koi Sandesh", "Hazaron Khwahishein", "Kagaz Ki Kashti"],
  },
  {
    id: 5,
    title: "Lag Jaa Gale: Nightingale Classics",
    artist: "Lata Mangeshkar",
    genre: "Hindi Retro",
    accent: PALETTE.hindiGold,
    price: 1349,
    year: 1964,
    coverUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
    staffPick: true,
    note: "An absolute treasure. The violin orchestra section on Side A will give you goosebumps.",
    description: "Classic 60s Bollywood orchestra arrangements with silky violin sections and pristine vocal clarity.",
    sideA: ["Lag Jaa Gale", "Aap Ki Nazron Ne Samjha", "Aaye Dil-e-Nadan"],
    sideB: ["Tujhse Naraz Nahin Zindagi", "Ajeeb Dastan Hai Yeh", "Kora Kagaz Tha"],
  },
  {
    id: 6,
    title: "Evergreen Harmonies",
    artist: "Kishore Kumar",
    genre: "Hindi Retro",
    accent: PALETTE.desiBlue,
    price: 1099,
    year: 1975,
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    staffPick: false,
    description: "Full-bodied yodeling melodies, energetic acoustic rhythms, and timeless romantic classics pressed on heavyweight vinyl.",
    sideA: ["Pal Pal Dil Ke Paas", "O Saathi Re", "Roop Tera Mastana"],
    sideB: ["Ek Ajnabee Haseena Se", "Ye Sham Mastani", "Zindagi Ek Safar"],
  },
  {
    id: 7,
    title: "Aashiqui & 90s Romance",
    artist: "Nadeem-Shravan & Kumar Sanu",
    genre: "Hindi Retro",
    accent: PALETTE.ragaRed,
    price: 949,
    year: 1990,
    coverUrl: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=600&auto=format&fit=crop&q=80",
    staffPick: false,
    description: "The cassette era king reborn on vinyl. Rich accordion, dholak rhythms, and passionate 90s melodies.",
    sideA: ["Dheere Dheere Se", "Nazar Ke Samne", "Bas Ek Sanam Chahiye"],
    sideB: ["Main Duniya Bhula Doonga", "Ab Tere Bin", "Jaane Jigar Janeman"],
  },
  {
    id: 8,
    title: "Bombay Disco & Synth Pop",
    artist: "Bappi Lahiri & Nazia Hassan",
    genre: "Hindi Retro",
    accent: PALETTE.retroTeal,
    price: 1149,
    year: 1982,
    coverUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
    staffPick: false,
    description: "Vintage Moog synthesizers, slap basslines, and groovy disco beats that defined 80s club culture.",
    sideA: ["Disco Dancer", "Jimmy Jimmy Aaja", "Aap Jaisa Koi"],
    sideB: ["Koi Yahan Naha Naha", "I Am a Disco Dancer", "Zooby Zooby"],
  },
  {
    id: 9,
    title: "Swades: Roots of India",
    artist: "A.R. Rahman",
    genre: "Raga Fusion",
    accent: PALETTE.desiBlue,
    price: 1399,
    year: 2004,
    coverUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
    staffPick: false,
    description: "Orchestral shehnai, folk percussion, and epic vocal choruses mastered for vinyl dynamic range.",
    sideA: ["Yeh Jo Des Hai Tera", "Yun Hi Chala Chala", "Pal Pal Hai Bhaari"],
    sideB: ["Aahista Aahista", "Dekho Na", "Shehnaai Theme"],
  },
];

const INDIAN_STATES = [
  "Maharashtra", "Karnataka", "Delhi NCR", "Tamil Nadu",
  "Telangana", "West Bengal", "Gujarat", "Kerala", "Rajasthan", "Punjab"
];

function formatINR(n) {
  return "₹" + Number(n).toLocaleString("en-IN");
}

/* ---------------------------------------------------------
   Web Audio API Engine: Indian Raga Synth + Tanpura + Vinyl Crackle
--------------------------------------------------------- */
class VinylAudioEngine {
  constructor() {
    this.ctx = null;
    this.crackleNode = null;
    this.crackleGain = null;
    this.musicGain = null;
    this.analyser = null;
    this.synthOscs = [];
    this.isPlaying = false;
    this.rpmMultiplier = 1;
    this.crackleLevel = 0.4;
    this.melodyTimer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playNeedleDrop() {
    this.init();
    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.25;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
    }
    const scratch = this.ctx.createBufferSource();
    scratch.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(850, t);
    filter.Q.setValueAtTime(3.5, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

    scratch.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    scratch.start(t);
  }

  startVinylNoise() {
    if (this.crackleNode) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const noise = (Math.random() * 2 - 1) * 0.045;
      const pop = Math.random() > 0.9991 ? (Math.random() * 2 - 1) * 0.45 : 0;
      output[i] = noise + pop;
    }
    this.crackleNode = this.ctx.createBufferSource();
    this.crackleNode.buffer = buffer;
    this.crackleNode.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 2400;

    this.crackleGain = this.ctx.createGain();
    this.crackleGain.gain.value = this.crackleLevel * 0.25;

    this.crackleNode.connect(filter);
    filter.connect(this.crackleGain);
    this.crackleGain.connect(this.analyser);
    this.crackleNode.start();
  }

  stopVinylNoise() {
    if (this.crackleNode) {
      try { this.crackleNode.stop(); } catch (e) {}
      this.crackleNode.disconnect();
      this.crackleNode = null;
    }
  }

  setCrackleLevel(val) {
    this.crackleLevel = val;
    if (this.crackleGain && this.ctx) {
      this.crackleGain.gain.setValueAtTime(val * 0.25, this.ctx.currentTime);
    }
  }

  playRecord(genre, rpm = 33) {
    this.init();
    this.stopRecord();
    this.playNeedleDrop();

    this.rpmMultiplier = rpm === 45 ? 1.25 : 1.0;
    this.startVinylNoise();

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.musicGain.gain.linearRampToValueAtTime(0.24, this.ctx.currentTime + 0.8);
    this.musicGain.connect(this.analyser);

    // Tanpura Drone (C# / G# Indian Root drone)
    const droneFreqs = [138.59, 207.65, 277.18];
    droneFreqs.forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.value = freq * this.rpmMultiplier;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 450 * this.rpmMultiplier;

      gain.gain.value = 0.08;
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);

      osc.start();
      this.synthOscs.push(osc);
    });

    // Dynamic Evolving 4-Minute Song Melody Generator (Intro -> Mukhda -> Antara -> Interlude)
    const scales = {
      intro: [277.18, 311.13, 349.23, 415.30],
      mukhda: [349.23, 415.30, 466.16, 554.37, 622.25],
      antara: [415.30, 466.16, 554.37, 622.25, 698.46, 830.61],
      interlude: [277.18, 349.23, 415.30, 554.37, 622.25]
    };
    let noteIdx = 0;
    let stepCount = 0;

    this.melodyTimer = setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      stepCount++;
      const currentScale = stepCount < 20 ? scales.intro : (stepCount < 60 ? scales.mukhda : (stepCount < 100 ? scales.antara : scales.interlude));
      
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = genre === "Raga Fusion" ? "sine" : (stepCount % 8 < 4 ? "triangle" : "sawtooth");
      const freq = currentScale[noteIdx % currentScale.length] * this.rpmMultiplier;
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * (1 + (stepCount % 3 === 0 ? 0.03 : -0.01)), t + 0.35);

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = (800 + (stepCount % 5) * 200) * this.rpmMultiplier;

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.14, t + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.65);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);

      osc.start(t);
      osc.stop(t + 0.7);

      noteIdx = (noteIdx + 1 + Math.floor(Math.random() * 2)) % currentScale.length;
    }, 420);

    this.isPlaying = true;
  }

  setSpeed(rpm) {
    this.rpmMultiplier = rpm === 45 ? 1.25 : 1.0;
  }

  stopRecord() {
    if (this.melodyTimer) {
      clearInterval(this.melodyTimer);
      this.melodyTimer = null;
    }
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
    }
    setTimeout(() => {
      this.synthOscs.forEach(o => { try { o.stop(); o.disconnect(); } catch (e) {} });
      this.synthOscs = [];
      this.stopVinylNoise();
      this.isPlaying = false;
    }, 350);
  }

  getFrequencyData() {
    if (!this.analyser) return new Uint8Array(16);
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }
}

const audioEngine = new VinylAudioEngine();

/* ---------------------------------------------------------
   Real-Time Audio EQ Visualizer
--------------------------------------------------------- */
function AudioVisualizer({ isPlaying }) {
  const [bars, setBars] = useState([20, 45, 70, 30, 85, 60, 40, 75, 50, 90, 35, 65]);

  useEffect(() => {
    if (!isPlaying) {
      setBars([10, 15, 12, 10, 18, 14, 10, 16, 12, 20, 10, 14]);
      return;
    }
    const interval = setInterval(() => {
      const data = audioEngine.getFrequencyData();
      if (data && data.length >= 12) {
        const sliced = Array.from(data.slice(0, 12)).map(v => Math.max(12, Math.min(95, (v / 255) * 100)));
        setBars(sliced);
      } else {
        setBars(Array.from({ length: 12 }).map(() => Math.floor(Math.random() * 65 + 25)));
      }
    }, 80);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 28, padding: "0 4px" }}>
      {bars.map((h, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${h}%`,
            background: `linear-gradient(to top, ${PALETTE.hindiGold}, ${PALETTE.offwhite})`,
            borderRadius: 2,
            transition: "height 0.08s ease",
            opacity: isPlaying ? 0.95 : 0.35,
          }}
        />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------
   Interactive 3D Turntable Component
--------------------------------------------------------- */
function Turntable({ record, isPlaying, onToggle, rpm, onRpmChange, currentSide, onSideChange, crackle, onCrackleChange, onAddToCart }) {
  const spinSpeed = rpm === 45 ? "1.9s" : "2.6s";

  return (
    <div style={{ position: "relative", width: 370, maxWidth: "94vw", margin: "0 auto", perspective: "1200px" }}>
      {/* 3D Visualizer Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: 12, padding: "10px 18px", background: "rgba(15, 10, 6, 0.85)",
        borderRadius: 14, border: `1.5px solid rgba(229, 169, 60, 0.35)`, backdropFilter: "blur(8px)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            width: 10, height: 10, borderRadius: "50%",
            background: isPlaying ? "#4ADE80" : "#F87171",
            boxShadow: isPlaying ? "0 0 12px #4ADE80" : "none"
          }} />
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11.5, color: PALETTE.offwhite, letterSpacing: 0.5 }}>
            {isPlaying ? `3D DECK PLAYING (${rpm} RPM)` : "3D DECK READY"}
          </span>
        </div>
        <AudioVisualizer isPlaying={isPlaying} />
      </div>

      <div style={{
        background: `linear-gradient(145deg, ${PALETTE.walnutLight}, ${PALETTE.walnutDeep})`,
        borderRadius: 26, padding: 30,
        boxShadow: "0 40px 80px rgba(0,0,0,0.9), inset 0 2px 3px rgba(255,255,255,0.2), 0 0 50px " + PALETTE.goldGlow,
        border: `2px solid rgba(229, 169, 60, 0.45)`, position: "relative",
        transform: "rotateX(8deg)", transformStyle: "preserve-3d"
      }}>
        {/* Record Deck Platter */}
        <div style={{ position: "relative", width: "100%", aspectRatio: "1/1" }}>
          {/* Spinning 3D Vinyl Disc */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: `repeating-radial-gradient(circle at center, #0a0807 0px, #0a0807 2px, #1a1410 2px, #1a1410 4px)`,
            boxShadow: "inset 0 0 45px rgba(0,0,0,0.95), 0 18px 40px rgba(0,0,0,0.75)",
            animation: `spin ${spinSpeed} linear infinite`,
            animationPlayState: isPlaying ? "running" : "paused",
          }}>
            {/* Center Cover Image Art Label */}
            <div style={{
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
              width: "42%", height: "42%", borderRadius: "50%", overflow: "hidden",
              boxShadow: "0 4px 14px rgba(0,0,0,0.8), inset 0 1px 3px rgba(255,255,255,0.4)",
              border: `2.5px solid ${PALETTE.brass}`
            }}>
              <img
                src={record.coverUrl} alt={record.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{
                position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                textAlign: "center", padding: 4
              }}>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif", color: PALETTE.offwhite,
                  fontSize: 12, letterSpacing: 0.6, lineHeight: 1.0, textShadow: "0 1px 3px #000"
                }}>
                  {record.title}
                </span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8.5, color: PALETTE.hindiGold, marginTop: 2 }}>
                  SIDE {currentSide} · {rpm} RPM
                </span>
              </div>
            </div>
            {/* Center Metal Spindle */}
            <div style={{
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
              width: "6%", height: "6%", borderRadius: "50%", background: "#1a1512",
              boxShadow: "inset 0 1px 4px rgba(0,0,0,0.9)", border: `1.5px solid ${PALETTE.brass}`
            }} />
          </div>

          {/* 3D Tonearm */}
          <div style={{
            position: "absolute", top: "-4%", right: "-8%", width: "55%", height: "55%",
            transformOrigin: "86% 14%",
            transform: isPlaying ? "rotate(26deg)" : "rotate(-8deg)",
            transition: "transform 0.8s cubic-bezier(.3,.9,.4,1)",
            zIndex: 10, pointerEvents: "none"
          }}>
            <div style={{
              position: "absolute", top: "8%", right: "6%", width: 24, height: 24, borderRadius: "50%",
              background: `radial-gradient(circle, ${PALETTE.brassLight}, ${PALETTE.walnutDeep})`,
              boxShadow: "0 4px 14px rgba(0,0,0,0.8)", border: `1.5px solid ${PALETTE.brass}`
            }} />
            <div style={{
              position: "absolute", top: "14%", right: "13%", width: 5, height: "82%",
              background: `linear-gradient(${PALETTE.brassLight}, #7C5E1B)`,
              borderRadius: 3, transformOrigin: "top center", transform: "rotate(10deg)",
              boxShadow: "4px 6px 12px rgba(0,0,0,0.6)"
            }} />
            <div style={{
              position: "absolute", bottom: "-2%", left: "14%", width: 16, height: 26,
              background: PALETTE.ink, borderRadius: 3, border: `1.5px solid ${PALETTE.brass}`,
              transform: "rotate(-15deg)"
            }} />
          </div>
        </div>

        {/* Deck Speed & Flip Controls */}
        <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ display: "flex", background: PALETTE.walnutDeep, borderRadius: 10, padding: 3, border: `1px solid rgba(229,169,60,0.3)` }}>
            <button
              onClick={() => onRpmChange(33)}
              style={{
                flex: 1, padding: "7px 0", border: "none", borderRadius: 8, cursor: "pointer",
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
                background: rpm === 33 ? PALETTE.brass : "transparent",
                color: rpm === 33 ? PALETTE.walnutDeep : PALETTE.offwhite,
                fontWeight: rpm === 33 ? "600" : "400"
              }}
            >33 RPM</button>
            <button
              onClick={() => onRpmChange(45)}
              style={{
                flex: 1, padding: "7px 0", border: "none", borderRadius: 8, cursor: "pointer",
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
                background: rpm === 45 ? PALETTE.brass : "transparent",
                color: rpm === 45 ? PALETTE.walnutDeep : PALETTE.offwhite,
                fontWeight: rpm === 45 ? "600" : "400"
              }}
            >45 RPM</button>
          </div>

          <button
            onClick={() => onSideChange(currentSide === "A" ? "B" : "A")}
            style={{
              padding: "7px 12px", border: `1px solid rgba(229,169,60,0.35)`, borderRadius: 10, cursor: "pointer",
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, background: PALETTE.walnutDeep,
              color: PALETTE.brassLight, display: "flex", alignItems: "center", justifyContent: "center", gap: 6
            }}
          >
            Flip to Side {currentSide === "A" ? "B" : "A"}
          </button>
        </div>

        {/* Vinyl Crackle Adjuster */}
        <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: PALETTE.offwhite, opacity: 0.75 }}>
            Vinyl Crackle:
          </span>
          <input
            type="range" min="0" max="1" step="0.05"
            value={crackle}
            onChange={(e) => onCrackleChange(parseFloat(e.target.value))}
            style={{ flex: 1, accentColor: PALETTE.hindiGold, height: 5 }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 10, marginTop: 18 }}>
        <button onClick={onToggle} style={{
          padding: "15px 0", borderRadius: 999,
          cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5,
          letterSpacing: 1, textTransform: "uppercase", fontWeight: "600",
          background: isPlaying ? `linear-gradient(135deg, ${PALETTE.hindiGold}, ${PALETTE.brassLight})` : "transparent",
          color: isPlaying ? PALETTE.walnutDeep : PALETTE.offwhite,
          border: `1.5px solid ${PALETTE.brass}`,
          boxShadow: isPlaying ? `0 10px 28px ${PALETTE.goldGlow}` : "none",
          transition: "all 0.25s ease",
        }}>
          {isPlaying ? "♪ LIFT NEEDLE" : "♪ DROP NEEDLE"}
        </button>

        <button
          onClick={() => onAddToCart(record.id)}
          style={{
            padding: "15px 0", borderRadius: 999, border: "none",
            background: PALETTE.brass, color: PALETTE.walnutDeep,
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5,
            fontWeight: "700", cursor: "pointer", letterSpacing: 0.5,
            boxShadow: "0 6px 20px rgba(0,0,0,0.5)", textTransform: "uppercase"
          }}
        >
          🛒 ADD TO CART
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Genre Tag Component
--------------------------------------------------------- */
function GenreTag({ genre, accent, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: 0.5,
        color: active ? PALETTE.walnutDeep : accent,
        background: active ? accent : "transparent",
        border: `1px solid ${accent}`, borderRadius: 999,
        padding: "5px 14px", cursor: onClick ? "pointer" : "default",
        fontWeight: active ? "600" : "400", transition: "all 0.2s ease"
      }}
    >{genre}</button>
  );
}

/* ---------------------------------------------------------
   Real 3D Vinyl Album Cover Box with Thickness & Slide-Out Disc
--------------------------------------------------------- */
function Real3DCrateSleeve({ record, active, onSelect, onAdd, onOpenDetail, justAdded }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => { onSelect(record.id); onOpenDetail(record); }}
      style={{
        cursor: "pointer", flex: "0 0 auto", width: 210, perspective: "1000px",
        transform: `translateY(${hover || active ? -14 : 0}px)`,
        transition: "transform 0.35s cubic-bezier(.3,.9,.4,1)",
      }}
    >
      {/* 3D Box Container */}
      <div
        style={{
          position: "relative", width: 210, height: 210, borderRadius: 12,
          transformStyle: "preserve-3d",
          transform: hover ? "rotateY(-28deg) rotateX(12deg) rotateZ(-2deg)" : "rotateY(-6deg) rotateX(4deg)",
          transition: "transform 0.45s cubic-bezier(.3,.9,.4,1)",
          boxShadow: active ? `0 20px 40px ${PALETTE.goldGlow}` : "0 14px 30px rgba(0,0,0,0.6)",
        }}
      >
        {/* Real 3D Vinyl Disc physically sliding OUT of jacket */}
        <div style={{
          position: "absolute", top: 12, left: 12, width: 186, height: 186, borderRadius: "50%",
          background: `repeating-radial-gradient(circle at center, #0a0807 0px, #0a0807 2px, #1d1712 2px, #1d1712 4px)`,
          boxShadow: "inset 0 0 20px rgba(0,0,0,0.9), 6px 8px 20px rgba(0,0,0,0.5)",
          transform: hover ? "translateX(75px) rotate(90deg)" : "translateX(0px)",
          transition: "transform 0.5s cubic-bezier(.3,.9,.4,1)",
          zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          {/* Disc Label with cover miniature */}
          <div style={{
            width: 64, height: 64, borderRadius: "50%", overflow: "hidden",
            border: `2px solid ${PALETTE.brass}`, boxShadow: "0 2px 8px rgba(0,0,0,0.8)"
          }}>
            <img src={record.coverUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

        {/* 3D Jacket Front Cover Face */}
        <div style={{
          position: "relative", zIndex: 2, width: "100%", height: "100%", borderRadius: 12, overflow: "hidden",
          border: active ? `2.5px solid ${PALETTE.brass}` : "2px solid rgba(243,233,215,0.2)",
          background: PALETTE.walnutDeep,
          boxShadow: "inset 0 0 25px rgba(0,0,0,0.5)"
        }}>
          <img
            src={record.coverUrl} alt={record.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />

          {/* Vignette Overlay & Album Title Badge */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(15,10,6,0.95) 0%, rgba(15,10,6,0.2) 60%, rgba(0,0,0,0.3) 100%)",
            padding: 12, display: "flex", flexDirection: "column", justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <button
                onClick={(e) => { e.stopPropagation(); onOpenDetail(record); }}
                style={{
                  background: "rgba(15,10,6,0.85)", border: `1px solid ${PALETTE.brass}`,
                  borderRadius: 6, padding: "3px 8px", color: PALETTE.brassLight,
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, cursor: "pointer",
                  fontWeight: "600", backdropFilter: "blur(4px)"
                }}
              >
                🔍 3D View
              </button>
              <span style={{
                background: PALETTE.hindiGold, color: PALETTE.walnutDeep, borderRadius: 4,
                padding: "2px 6px", fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, fontWeight: "bold"
              }}>
                {record.year}
              </span>
            </div>

            <div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: PALETTE.offwhite,
                letterSpacing: 0.5, lineHeight: 1.1, textShadow: "0 2px 4px rgba(0,0,0,0.9)"
              }}>
                {record.title}
              </div>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: PALETTE.paper,
                opacity: 0.85, marginTop: 2
              }}>
                {record.artist}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Explicit Add to Cart Area underneath 3D Jacket */}
      <div style={{ marginTop: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11.5, color: PALETTE.offwhite, opacity: 0.75 }}>
            {record.genre}
          </span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 15, color: PALETTE.hindiGold, fontWeight: "700" }}>
            {formatINR(record.price)}
          </span>
        </div>

        {/* BOLD PROMINENT ADD TO CART BUTTON */}
        <button
          onClick={(e) => { e.stopPropagation(); onAdd(record.id); }}
          style={{
            width: "100%", padding: "10px 0", borderRadius: 10, border: "none",
            background: justAdded ? "#4ADE80" : `linear-gradient(135deg, ${PALETTE.brass}, ${PALETTE.brassLight})`,
            color: PALETTE.walnutDeep, fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 12.5, fontWeight: "700", cursor: "pointer", letterSpacing: 0.5,
            boxShadow: "0 6px 16px rgba(0,0,0,0.4)", transition: "all 0.2s ease",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            textTransform: "uppercase"
          }}
        >
          {justAdded ? "✓ Added to Cart!" : `🛒 Add to Cart — ${formatINR(record.price)}`}
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Staff Pick Card Component
--------------------------------------------------------- */
function StaffPickCard({ record, onAdd, onOpenDetail, justAdded }) {
  return (
    <div
      onClick={() => onOpenDetail(record)}
      style={{
        position: "relative", background: PALETTE.walnutLight, borderRadius: 22,
        padding: 22, boxShadow: "0 24px 48px rgba(0,0,0,0.6)", border: `1.5px solid rgba(229,169,60,0.3)`,
        cursor: "pointer"
      }}
    >
      <div
        style={{
          position: "relative", borderRadius: 14, overflow: "hidden",
          height: 260, boxShadow: "0 10px 24px rgba(0,0,0,0.5)"
        }}
      >
        <img src={record.coverUrl} alt={record.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(15,10,6,0.9) 0%, transparent 60%)"
        }} />
      </div>
      
      <div style={{
        position: "absolute", top: -14, right: -10, width: 88, height: 88, borderRadius: "50%",
        background: PALETTE.paper, transform: "rotate(-12deg)",
        display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center",
        boxShadow: "0 10px 24px rgba(0,0,0,0.5)", border: `2px dashed ${PALETTE.ink}66`,
      }}>
        <span style={{
          fontFamily: "'Caveat', cursive", fontWeight: 700, fontSize: 18, color: PALETTE.ink, lineHeight: 1.1,
        }}>staff<br />pick</span>
      </div>

      <div style={{ marginTop: 20 }}>
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: PALETTE.offwhite,
            letterSpacing: 0.5
          }}
        >
          {record.title}
        </div>
        <div style={{ fontFamily: "'Arvo', serif", fontSize: 14, color: PALETTE.offwhite, opacity: 0.8, marginTop: 2 }}>
          {record.artist} ({record.year})
        </div>
        <div style={{ fontFamily: "'Caveat', cursive", fontSize: 21, color: record.accent, marginTop: 10 }}>
          “{record.note}”
        </div>

        <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <GenreTag genre={record.genre} accent={record.accent} />
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 17, color: PALETTE.hindiGold, fontWeight: "700" }}>
            {formatINR(record.price)}
          </span>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onAdd(record.id); }}
          style={{
            marginTop: 16, width: "100%", padding: "12px 0", borderRadius: 12,
            border: "none", background: justAdded ? "#4ADE80" : PALETTE.brass,
            color: PALETTE.walnutDeep, fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 13, letterSpacing: 0.5, cursor: "pointer", fontWeight: "700",
            textTransform: "uppercase", boxShadow: "0 6px 18px rgba(0,0,0,0.4)"
          }}
        >
          {justAdded ? "✓ Added to Cart!" : `🛒 Add to Cart — ${formatINR(record.price)}`}
        </button>
      </div>
    </div>
  );
}

const SONG_LYRICS = {
  "Chaiyya Chaiyya": [
    { start: 0, end: 18, line: "🎵 [Intro - Acoustic Guitar & Dholak Groove]" },
    { start: 18, end: 35, line: "🎤 Chaiyya Chaiyya Chaiyya Chaiyya..." },
    { start: 35, end: 55, line: "🎤 Jiske sar ho ishq ki chhaon, paon ke tale jannat hogi..." },
    { start: 55, end: 80, line: "🎤 Gulposh kabhi itraaye, phoolon ki tarah balkhaaye..." },
    { start: 80, end: 105, line: "🎵 [Interlude - Flute & Percussion Raga Solo]" },
    { start: 105, end: 135, line: "🎤 Woh yaar hai jo khushboo ki tarah, jiski zubaan urdu ki tarah..." },
    { start: 135, end: 165, line: "🎤 Yaar misaale osh chale, paon ke tale jannat hogi..." },
    { start: 165, end: 195, line: "🎵 [Chorus - Brass Funk & Sufi Drums]" },
    { start: 195, end: 225, line: "🎤 Main uski gali mein rehta hoon, chal chaiyya chaiyya..." },
    { start: 225, end: 264, line: "🎼 [Outro - Tabla & Vocal Chorus Fade]" }
  ],
  "Tu Hi Re": [
    { start: 0, end: 20, line: "🎵 [Intro - Violins & Flute Symphony]" },
    { start: 20, end: 45, line: "🎤 Tu hi re, tu hi re, tere bina main kaise jiyoond..." },
    { start: 45, end: 75, line: "🎤 Aaja re, aaja re, oas jaisi hai yeh zindagii..." },
    { start: 75, end: 105, line: "🎤 Bheegi bheegi saanson se, tera naam pukaroond..." },
    { start: 105, end: 140, line: "🎵 [Interlude - Accordion & Tube Strings]" },
    { start: 140, end: 175, line: "🎤 Doosra koi dil mein na aaya, sirf tumko hi chaha hai..." },
    { start: 175, end: 215, line: "🎤 Tu hi re, tu hi re, tere bina main kaise jiyoond..." },
    { start: 215, end: 282, line: "🎼 [Outro - Grand Orchestra Fade]" }
  ],
  "Dil Se Re": [
    { start: 0, end: 22, line: "🎵 [Intro - Electric Sitar & Synth Bass]" },
    { start: 22, end: 48, line: "🎤 Ek sooraj nikla tha, kuch chaand bhi chamke the..." },
    { start: 48, end: 80, line: "🎤 Dil se re... dil se re... dil se re..." },
    { start: 80, end: 110, line: "🎤 Dil toh aakhir dil hai na, meethi si mushkil hai na..." },
    { start: 110, end: 145, line: "🎵 [Interlude - Rock Guitar & Shehnai Riff]" },
    { start: 145, end: 185, line: "🎤 Bandhan kisi dore se bandha ho, phoolon ki tarah..." },
    { start: 185, end: 225, line: "🎤 Dil se re... dil se re... dil se re..." },
    { start: 225, end: 285, line: "🎼 [Outro - Deep Synth Bass Fade]" }
  ],
  "Jaane Kyun": [
    { start: 0, end: 15, line: "🎵 [Intro - Acoustic 12-String Guitar Riff]" },
    { start: 15, end: 40, line: "🎤 Jaane kyun log pyar karte hain..." },
    { start: 40, end: 70, line: "🎤 Jaane kyun woh kisi pe marte hain..." },
    { start: 70, end: 100, line: "🎤 Pyar toh hai ek dhokha, pyar toh hai ek rog..." },
    { start: 100, end: 135, line: "🎵 [Interlude - Synth Brass & Rhythm]" },
    { start: 135, end: 180, line: "🎤 Pyar mein jeena, pyar mein marna..." },
    { start: 180, end: 258, line: "🎼 [Outro - Acoustic Guitar Chorus Fade]" }
  ],
  DEFAULT: [
    { start: 0, end: 20, line: "🎵 [Intro - Classic Hindi Vinyl Prelude]" },
    { start: 20, end: 60, line: "🎤 Mukhda: Romantic Retro Vocal Line..." },
    { start: 60, end: 100, line: "🎵 [Antara 1 - Harmonium & Flute Interlude]" },
    { start: 100, end: 150, line: "🎤 Verse: Soulful Bollywood Lyrics..." },
    { start: 150, end: 200, line: "🎵 [Antara 2 - Tabla & Sitar Solo]" },
    { start: 200, end: 255, line: "🎼 [Outro - Mastered Vinyl Stereo Fade]" }
  ]
};

const TRACK_DURATIONS = {
  "Chaiyya Chaiyya": 264, // 4:24
  "Roja Janeman": 252,    // 4:12
  "Dil Se Re": 285,       // 4:45
  "Tu Hi Re": 282,        // 4:42
  "Chinna Chinna Aasai": 240, // 4:00
  "Yeh Haseen Vaadiyan": 276, // 4:36

  "Jaane Kyun": 258,       // 4:18
  "Dil Chahta Hai": 291,   // 4:51
  "Kaisi Hai Yeh Rout": 248, // 4:08
  "Tanhayee": 272,        // 4:32

  "Chura Liya Hai Tumne": 260, // 4:20
  "Dum Maro Dum": 225,       // 3:45
  "Mehbooba Mehbooba": 242,   // 4:02

  "Lag Jaa Gale": 255,      // 4:15
  "Aap Ki Nazron Ne Samjha": 246, // 4:06

  "Pal Pal Dil Ke Paas": 268, // 4:28
  "O Saathi Re": 270,        // 4:30

  DEFAULT: 255 // 4:15
};

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

/* ---------------------------------------------------------
   3D Record Detail Modal Component
--------------------------------------------------------- */
function RecordDetailModal({ record, onClose, onAdd, onPlayTrack, justAdded, playingTrack, isPlaying, onTogglePlay, audioProgress, onSeek }) {
  if (!record) return null;
  const [activeSide, setActiveSide] = useState("A");
  const trackDuration = TRACK_DURATIONS[playingTrack] || 255;
  const lyricsList = SONG_LYRICS[playingTrack] || SONG_LYRICS.DEFAULT;
  const currentLyric = lyricsList.find(
    (l) => audioProgress && audioProgress.currentTime >= l.start && audioProgress.currentTime < l.end
  ) || lyricsList[0];

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      backdropFilter: "blur(10px)"
    }}>
      <div style={{
        background: PALETTE.walnutDeep, border: `2px solid ${PALETTE.brass}`,
        borderRadius: 26, maxWidth: 740, width: "100%", padding: 34,
        boxShadow: "0 40px 80px rgba(0,0,0,0.95), 0 0 60px " + PALETTE.goldGlow,
        position: "relative", color: PALETTE.offwhite, fontFamily: "'Arvo', serif"
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 18, right: 22, background: "none", border: "none",
            color: PALETTE.offwhite, fontSize: 28, cursor: "pointer", opacity: 0.8
          }}
        >×</button>

        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 30 }}>
          <div>
            <div style={{
              borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.7)",
              transform: "rotateY(-12deg)", transformStyle: "preserve-3d", height: 260
            }}>
              <img src={record.coverUrl} alt={record.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ marginTop: 18, textAlign: "center" }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 22, color: PALETTE.hindiGold, fontWeight: "700" }}>
                {formatINR(record.price)}
              </span>
            </div>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <GenreTag genre={record.genre} accent={record.accent} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, opacity: 0.75 }}>
                Released {record.year} · 180g Vinyl Pressing
              </span>
            </div>
            
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, letterSpacing: 0.5, margin: "8px 0 2px" }}>
              {record.title}
            </h2>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, opacity: 0.8, marginBottom: 14 }}>
              by {record.artist}
            </div>

            <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.85, marginBottom: 20 }}>
              {record.description}
            </p>

            {/* Tracklist Preview */}
            <div style={{ background: PALETTE.walnutLight, borderRadius: 14, padding: 16, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: PALETTE.hindiGold, fontWeight: "700" }}>
                  SONG TRACKLIST (SIDE {activeSide})
                </span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    onClick={() => setActiveSide("A")}
                    style={{
                      padding: "4px 12px", fontSize: 11, fontFamily: "'IBM Plex Mono', monospace",
                      border: "none", borderRadius: 6, cursor: "pointer",
                      background: activeSide === "A" ? PALETTE.brass : "transparent",
                      color: activeSide === "A" ? PALETTE.walnutDeep : PALETTE.offwhite
                    }}
                  >Side A</button>
                  <button
                    onClick={() => setActiveSide("B")}
                    style={{
                      padding: "4px 12px", fontSize: 11, fontFamily: "'IBM Plex Mono', monospace",
                      border: "none", borderRadius: 6, cursor: "pointer",
                      background: activeSide === "B" ? PALETTE.brass : "transparent",
                      color: activeSide === "B" ? PALETTE.walnutDeep : PALETTE.offwhite
                    }}
                  >Side B</button>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {(activeSide === "A" ? record.sideA : record.sideB).map((track, idx) => {
                  const isTrackPlaying = playingTrack === track && isPlaying;
                  return (
                    <div
                      key={idx}
                      onClick={() => onPlayTrack(record, track)}
                      style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        fontSize: 13, fontFamily: "'IBM Plex Mono', monospace", padding: "8px 14px",
                        borderRadius: 8, cursor: "pointer",
                        background: isTrackPlaying ? "rgba(229,169,60,0.25)" : "rgba(15,10,6,0.45)",
                        border: isTrackPlaying ? `1.5px solid ${PALETTE.hindiGold}` : "1px solid transparent",
                        transition: "all 0.2s"
                      }}
                    >
                      <span style={{ fontWeight: isTrackPlaying ? "700" : "400", color: isTrackPlaying ? PALETTE.hindiGold : PALETTE.offwhite }}>
                        ♪ {idx + 1}. {track}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); onPlayTrack(record, track); }}
                        style={{
                          background: isTrackPlaying ? PALETTE.brass : "rgba(229,169,60,0.15)",
                          color: isTrackPlaying ? PALETTE.walnutDeep : PALETTE.brassLight,
                          border: `1px solid ${PALETTE.brass}`, borderRadius: 6,
                          padding: "3px 10px", fontSize: 11, fontWeight: "600", cursor: "pointer"
                        }}
                      >
                        {isTrackPlaying ? "🔊 PLAYING NOW" : "▶ Listen Song"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* In-Modal Real Audio Player & Karaoke Lyrics Controls */}
            {playingTrack && (
              <div style={{
                marginBottom: 16, background: "rgba(229,169,60,0.15)", border: `1.5px solid ${PALETTE.hindiGold}`,
                borderRadius: 14, padding: "14px 18px", display: "flex", flexDirection: "column", gap: 10,
                boxShadow: "0 4px 16px " + PALETTE.goldGlow
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 20 }}>🎵</span>
                    <div>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: "bold", color: PALETTE.hindiGold }}>
                        NOW PLAYING: {playingTrack}
                      </div>
                      <div style={{ fontSize: 11.5, opacity: 0.75, fontFamily: "'IBM Plex Mono', monospace" }}>
                        {record.artist} · Full Hi-Fi Song Stream ({formatTime(trackDuration)})
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={onTogglePlay}
                    style={{
                      padding: "7px 16px", borderRadius: 999, border: "none",
                      background: PALETTE.brass, color: PALETTE.walnutDeep,
                      fontFamily: "'IBM Plex Mono', monospace", fontSize: 11.5, fontWeight: "bold", cursor: "pointer"
                    }}
                  >
                    {isPlaying ? "⏸ Pause Song" : "▶ Play Song"}
                  </button>
                </div>

                {/* Live Synchronized Song Lyrics Box */}
                <div style={{
                  background: "rgba(15,10,6,0.6)", borderRadius: 8, padding: "10px 14px",
                  borderLeft: `3.5px solid ${PALETTE.hindiGold}`, fontFamily: "'Arvo', serif",
                  fontSize: 13, color: PALETTE.offwhite, transition: "all 0.3s ease"
                }}>
                  <div style={{ fontSize: 10, fontFamily: "'IBM Plex Mono', monospace", color: PALETTE.hindiGold, marginBottom: 2 }}>
                    LIVE SONG LYRICS &amp; SECTION:
                  </div>
                  <div style={{ fontStyle: "italic", fontWeight: "600" }}>
                    {currentLyric ? currentLyric.line : "🎵 [Playing 180g Analog Mastered Vinyl Track...]"}
                  </div>
                </div>

                {/* Interactive Audio Seek Progress Bar Line */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 2 }}>
                  <span style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", color: PALETTE.brassLight, width: 35 }}>
                    {formatTime(audioProgress ? audioProgress.currentTime : 0)}
                  </span>
                  <input
                    type="range" min="0" max={trackDuration}
                    value={audioProgress ? Math.min(audioProgress.currentTime, trackDuration) : 0}
                    onChange={(e) => onSeek && onSeek(Number(e.target.value))}
                    onInput={(e) => onSeek && onSeek(Number(e.target.value))}
                    onClick={(e) => onSeek && onSeek(Number(e.target.value))}
                    style={{ flex: 1, accentColor: PALETTE.hindiGold, cursor: "pointer", height: 6, borderRadius: 3 }}
                  />
                  <span style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", opacity: 0.7, width: 35 }}>
                    {formatTime(trackDuration)}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={() => onAdd(record.id)}
              style={{
                width: "100%", padding: "15px 0", borderRadius: 999, border: "none",
                background: justAdded ? "#4ADE80" : PALETTE.brass,
                color: PALETTE.walnutDeep, fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 14, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer",
                fontWeight: "700", transition: "all 0.2s ease", boxShadow: "0 8px 24px rgba(0,0,0,0.5)"
              }}
            >
              {justAdded ? "✓ Added to Crate Bag" : `🛒 Add to Cart — ${formatINR(record.price)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Quantity Stepper Component
--------------------------------------------------------- */
function QtyStepper({ qty, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <button onClick={() => onChange(qty - 1)} style={stepBtn}>−</button>
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13.5, minWidth: 18, textAlign: "center" }}>{qty}</span>
      <button onClick={() => onChange(qty + 1)} style={stepBtn}>+</button>
    </div>
  );
}
const stepBtn = {
  width: 28, height: 28, borderRadius: "50%", border: `1px solid ${PALETTE.brass}88`,
  background: "transparent", color: PALETTE.offwhite, cursor: "pointer", fontSize: 15, lineHeight: "26px", padding: 0,
};

/* ---------------------------------------------------------
   Comprehensive Cart & Multi-Step Indian Checkout Drawer
--------------------------------------------------------- */
function CartDrawer({
  open, onClose, cart, records, onQtyChange, onRemove,
  step, setStep, form, setForm, promo, setPromo, discountPct, setDiscountPct,
  paymentMethod, setPaymentMethod, orderData, onPlaceOrder, onReset
}) {
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const [upiId, setUpiId] = useState("");

  const items = Object.entries(cart)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => ({ record: records.find((r) => r.id === Number(id)), qty }));

  const subtotal = items.reduce((sum, i) => sum + (i.record ? i.record.price * i.qty : 0), 0);
  const discountAmount = Math.round((subtotal * discountPct) / 100);
  const discountedSubtotal = subtotal - discountAmount;
  
  const freeShippingThreshold = 1499;
  const shippingFee = discountedSubtotal > 0 && discountedSubtotal < freeShippingThreshold ? 99 : 0;
  const codFee = paymentMethod === "cod" ? 50 : 0;
  const gstAmount = Math.round(discountedSubtotal * 0.18);
  const total = discountedSubtotal + shippingFee + codFee + gstAmount;

  function applyPromoCode() {
    const code = promoInput.trim().toUpperCase();
    if (code === "VINYL10" || code === "DESI10" || code === "HINDI10") {
      setPromo(code);
      setDiscountPct(10);
      setPromoError("");
    } else if (code === "NEEDLE20" || code === "RAHMAN20") {
      setPromo(code);
      setDiscountPct(20);
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try 'HINDI10' or 'RAHMAN20'");
    }
  }

  return (
    <>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 80,
        opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity 0.3s ease",
        backdropFilter: "blur(5px)"
      }} />

      <aside style={{
        position: "fixed", top: 0, right: 0, height: "100vh", width: 450, maxWidth: "95vw",
        background: PALETTE.walnutDeep, zIndex: 81, boxShadow: "-20px 0 50px rgba(0,0,0,0.8)",
        transform: open ? "translateX(0)" : "translateX(100%)", transition: "transform 0.35s cubic-bezier(.3,.9,.4,1)",
        display: "flex", flexDirection: "column", fontFamily: "'Arvo', serif", color: PALETTE.offwhite,
        borderLeft: `2px solid ${PALETTE.brass}66`
      }}>
        {/* Drawer Header */}
        <div style={{ padding: "22px 28px", borderBottom: `1px solid rgba(243,233,215,0.12)`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: 0.8, color: PALETTE.brassLight }}>
              {step === "cart" ? "YOUR CRATE BAG" : step === "form" ? "SHIPPING & DELIVERY" : step === "payment" ? "PAYMENT METHOD" : "ORDER CONFIRMED"}
            </span>
            {step !== "done" && (
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, opacity: 0.65 }}>
                STEP {step === "cart" ? "1 OF 3" : step === "form" ? "2 OF 3" : "3 OF 3"}
              </div>
            )}
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: PALETTE.offwhite, fontSize: 28, cursor: "pointer" }}>×</button>
        </div>

        {/* Free shipping progress bar */}
        {step === "cart" && subtotal > 0 && (
          <div style={{ background: PALETTE.walnutLight, padding: "12px 28px", borderBottom: `1px solid rgba(243,233,215,0.08)` }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11.5, marginBottom: 5, display: "flex", justifyContent: "space-between" }}>
              <span>
                {discountedSubtotal >= freeShippingThreshold ? "🎉 FREE Express Shipping unlocked in India!" : `Add ${formatINR(freeShippingThreshold - discountedSubtotal)} more for FREE Express Shipping`}
              </span>
            </div>
            <div style={{ height: 5, background: "rgba(243,233,215,0.15)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${Math.min(100, (discountedSubtotal / freeShippingThreshold) * 100)}%`,
                background: PALETTE.brass, transition: "width 0.3s ease"
              }} />
            </div>
          </div>
        )}

        {/* Drawer Body Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 28px" }}>
          {/* STEP 1: CART ITEMS */}
          {step === "cart" && (
            items.length === 0 ? (
              <div style={{ textAlign: "center", marginTop: 80 }}>
                <div style={{ fontSize: 56, opacity: 0.4, marginBottom: 16 }}>📀</div>
                <p style={{ opacity: 0.85, fontSize: 16 }}>Your crate bag is empty.</p>
                <p style={{ opacity: 0.6, fontSize: 13, fontFamily: "'IBM Plex Mono', monospace", marginTop: 8 }}>
                  Browse our 3D Hindi vinyl crate and click "🛒 Add to Cart".
                </p>
              </div>
            ) : (
              <div>
                {items.map(({ record, qty }) => (
                  <div key={record.id} style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: `1px solid rgba(243,233,215,0.08)` }}>
                    <div style={{ width: 72, height: 72, borderRadius: 10, overflow: "hidden", flexShrink: 0, boxShadow: "0 4px 14px rgba(0,0,0,0.6)" }}>
                      <img src={record.coverUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 0.4 }}>{record.title}</div>
                      <div style={{ fontSize: 12, opacity: 0.7, fontFamily: "'IBM Plex Mono', monospace" }}>{record.artist}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                        <QtyStepper qty={qty} onChange={(n) => onQtyChange(record.id, n)} />
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 14.5, color: PALETTE.hindiGold, fontWeight: "700" }}>
                          {formatINR(record.price * qty)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemove(record.id)}
                      style={{ background: "none", border: "none", color: "#F87171", opacity: 0.8, cursor: "pointer", fontSize: 12.5, alignSelf: "flex-start", fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      remove
                    </button>
                  </div>
                ))}

                {/* Promo Code Input */}
                <div style={{ marginTop: 24, padding: 18, background: PALETTE.walnutLight, borderRadius: 14, border: `1px solid rgba(229,169,60,0.25)` }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11.5, opacity: 0.85, marginBottom: 8, fontWeight: "600" }}>
                    PROMO / DISCOUNT CODE:
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      type="text"
                      placeholder="e.g. HINDI10 or RAHMAN20"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      style={{
                        flex: 1, padding: "9px 14px", borderRadius: 8, border: `1px solid rgba(243,233,215,0.2)`,
                        background: PALETTE.walnutDeep, color: PALETTE.offwhite, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5
                      }}
                    />
                    <button
                      onClick={applyPromoCode}
                      style={{
                        padding: "9px 18px", borderRadius: 8, border: `1px solid ${PALETTE.brass}`,
                        background: PALETTE.brass, color: PALETTE.walnutDeep, fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 12.5, fontWeight: "700", cursor: "pointer"
                      }}
                    >
                      Apply
                    </button>
                  </div>
                  {promo && (
                    <div style={{ color: "#4ADE80", fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, marginTop: 8 }}>
                      ✓ Applied code {promo} ({discountPct}% OFF)
                    </div>
                  )}
                  {promoError && (
                    <div style={{ color: "#F87171", fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, marginTop: 8 }}>
                      {promoError}
                    </div>
                  )}
                </div>
              </div>
            )
          )}

          {/* STEP 2: SHIPPING FORM */}
          {step === "form" && (
            <form
              onSubmit={(e) => { e.preventDefault(); setStep("payment"); }}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input
                  required type="text" value={form.name} placeholder="e.g. Amit Sharma"
                  onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Email Address *</label>
                <input
                  required type="email" value={form.email} placeholder="palaksheth9114@gmail.com"
                  onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Street Address & House No. *</label>
                <input
                  required type="text" value={form.address} placeholder="Flat 4B, Wood Street, Bandra West"
                  onChange={(e) => setForm({ ...form, address: e.target.value })} style={inputStyle}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <div>
                  <label style={labelStyle}>City *</label>
                  <input
                    required type="text" value={form.city} placeholder="Mumbai"
                    onChange={(e) => setForm({ ...form, city: e.target.value })} style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>State *</label>
                  <select
                    required value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    style={{ ...inputStyle, padding: "9px 6px" }}
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st} style={{ background: PALETTE.walnutDeep, color: PALETTE.offwhite }}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>PIN Code *</label>
                  <input
                    required type="text" value={form.pincode} placeholder="400050" pattern="[0-9]{6}"
                    onChange={(e) => setForm({ ...form, pincode: e.target.value })} style={inputStyle}
                  />
                </div>
              </div>

              <button type="submit" style={{
                marginTop: 14, padding: "15px 0", borderRadius: 999, border: "none",
                background: PALETTE.brass, color: PALETTE.walnutDeep, fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 13.5, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", fontWeight: "700"
              }}>
                Proceed to Payment →
              </button>

              <button type="button" onClick={() => setStep("cart")} style={{
                background: "none", border: "none", color: PALETTE.offwhite, opacity: 0.7,
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5, cursor: "pointer", textAlign: "center"
              }}>
                ← Back to Crate Bag
              </button>
            </form>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {step === "payment" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5, opacity: 0.85, fontWeight: "600" }}>
                Select Payment Option (India):
              </div>

              {/* UPI Option */}
              <div
                onClick={() => setPaymentMethod("upi")}
                style={{
                  padding: 18, borderRadius: 14, cursor: "pointer",
                  background: paymentMethod === "upi" ? PALETTE.walnutLight : "rgba(15,10,6,0.4)",
                  border: `2px solid ${paymentMethod === "upi" ? PALETTE.brass : "rgba(243,233,215,0.15)"}`
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: "700", fontSize: 15 }}>Instant UPI (GPay / PhonePe / Paytm)</span>
                  <span style={{ color: PALETTE.brass, fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", fontWeight: "bold" }}>Fastest</span>
                </div>
                {paymentMethod === "upi" && (
                  <div style={{ marginTop: 14, background: PALETTE.walnutDeep, padding: 16, borderRadius: 12 }}>
                    <div style={{ textAlign: "center", marginBottom: 12 }}>
                      <div style={{ background: "#FFF", width: 135, height: 135, margin: "0 auto 10px", padding: 10, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #000" }}>
                        <svg viewBox="0 0 100 100" width="115" height="115">
                          <rect width="100" height="100" fill="#FFF" />
                          <rect x="10" y="10" width="30" height="30" fill="#000" />
                          <rect x="15" y="15" width="20" height="20" fill="#FFF" />
                          <rect x="20" y="20" width="10" height="10" fill="#000" />
                          <rect x="60" y="10" width="30" height="30" fill="#000" />
                          <rect x="65" y="15" width="20" height="20" fill="#FFF" />
                          <rect x="70" y="20" width="10" height="10" fill="#000" />
                          <rect x="10" y="60" width="30" height="30" fill="#000" />
                          <rect x="15" y="65" width="20" height="20" fill="#FFF" />
                          <rect x="20" y="70" width="10" height="10" fill="#000" />
                          <rect x="50" y="50" width="15" height="15" fill="#000" />
                          <rect x="75" y="75" width="15" height="15" fill="#000" />
                        </svg>
                      </div>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11.5, opacity: 0.8 }}>
                        Scan QR code with GPay / PhonePe / Paytm
                      </span>
                    </div>
                    <input
                      type="text" placeholder="username@upi VPA ID" value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      style={{ ...inputStyle, fontFamily: "'IBM Plex Mono', monospace" }}
                    />
                  </div>
                )}
              </div>

              {/* Cards Option */}
              <div
                onClick={() => setPaymentMethod("card")}
                style={{
                  padding: 18, borderRadius: 14, cursor: "pointer",
                  background: paymentMethod === "card" ? PALETTE.walnutLight : "rgba(15,10,6,0.4)",
                  border: `2px solid ${paymentMethod === "card" ? PALETTE.brass : "rgba(243,233,215,0.15)"}`
                }}
              >
                <div style={{ fontWeight: "700", fontSize: 15 }}>Credit / Debit Card</div>
                {paymentMethod === "card" && (
                  <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                    <input type="text" placeholder="Card Number (4532 ...)" style={inputStyle} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <input type="text" placeholder="MM / YY" style={inputStyle} />
                      <input type="password" placeholder="CVV" maxLength="4" style={inputStyle} />
                    </div>
                  </div>
                )}
              </div>

              {/* Cash on Delivery Option */}
              <div
                onClick={() => setPaymentMethod("cod")}
                style={{
                  padding: 18, borderRadius: 14, cursor: "pointer",
                  background: paymentMethod === "cod" ? PALETTE.walnutLight : "rgba(15,10,6,0.4)",
                  border: `2px solid ${paymentMethod === "cod" ? PALETTE.brass : "rgba(243,233,215,0.15)"}`
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: "700", fontSize: 15 }}>Cash on Delivery (COD)</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: PALETTE.hindiGold, fontWeight: "bold" }}>+ ₹50 Fee</span>
                </div>
              </div>

              <button
                onClick={() => onPlaceOrder(total)}
                style={{
                  marginTop: 14, padding: "16px 0", borderRadius: 999, border: "none",
                  background: PALETTE.brass, color: PALETTE.walnutDeep, fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 14, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", fontWeight: "700"
                }}
              >
                Pay &amp; Place Order — {formatINR(total)}
              </button>

              <button type="button" onClick={() => setStep("form")} style={{
                background: "none", border: "none", color: PALETTE.offwhite, opacity: 0.7,
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5, cursor: "pointer", textAlign: "center"
              }}>
                ← Back to Shipping Info
              </button>
            </div>
          )}

          {/* STEP 4: ORDER CONFIRMED */}
          {step === "done" && orderData && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{
                width: 76, height: 76, borderRadius: "50%", background: PALETTE.brass,
                color: PALETTE.walnutDeep, margin: "0 auto 20px", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: "bold",
                boxShadow: "0 10px 28px " + PALETTE.goldGlow
              }}>✓</div>
              
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, letterSpacing: 0.8, color: PALETTE.brassLight }}>
                ORDER CONFIRMED!
              </div>

              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, opacity: 0.85, marginTop: 6 }}>
                ORDER ID: <span style={{ color: PALETTE.hindiGold, fontWeight: "bold" }}>#{orderData.orderNumber}</span>
              </div>

              <p style={{ opacity: 0.85, fontSize: 14.5, marginTop: 18, lineHeight: 1.6 }}>
                Thank you, <strong style={{ color: PALETTE.offwhite }}>{form.name}</strong>! Your Hindi vinyl collection is carefully packed with rigid wooden protection and dispatched to <strong style={{ color: PALETTE.offwhite }}>{form.city}, {form.state}</strong>.
              </p>

              <div style={{ background: PALETTE.walnutLight, borderRadius: 14, padding: 18, marginTop: 22, textAlign: "left", fontSize: 13, fontFamily: "'IBM Plex Mono', monospace" }}>
                <div style={{ color: PALETTE.hindiGold, marginBottom: 6, fontWeight: "bold" }}>ESTIMATED DELIVERY</div>
                <div>Standard Express: 3 - 4 Business Days</div>
                <div style={{ opacity: 0.7, marginTop: 4 }}>Tracking updates will be sent to {form.email}</div>
              </div>

              <button
                onClick={onReset}
                style={{
                  marginTop: 28, padding: "14px 28px", borderRadius: 999, border: `1.5px solid ${PALETTE.brass}`,
                  background: "transparent", color: PALETTE.offwhite, fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 13, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer"
                }}
              >
                Continue Browsing Vinyl Crate
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer Price Summary */}
        {step === "cart" && items.length > 0 && (
          <div style={{ padding: "20px 28px 28px", borderTop: `1px solid rgba(243,233,215,0.12)`, background: PALETTE.walnutLight }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, opacity: 0.8, marginBottom: 4, fontFamily: "'IBM Plex Mono', monospace" }}>
              <span>Subtotal</span><span>{formatINR(subtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#4ADE80", marginBottom: 4, fontFamily: "'IBM Plex Mono', monospace" }}>
                <span>Discount ({discountPct}%)</span><span>−{formatINR(discountAmount)}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, opacity: 0.8, marginBottom: 4, fontFamily: "'IBM Plex Mono', monospace" }}>
              <span>GST (18% Music Tax)</span><span>{formatINR(gstAmount)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, opacity: 0.8, marginBottom: 12, fontFamily: "'IBM Plex Mono', monospace" }}>
              <span>Shipping in India</span><span>{shippingFee === 0 ? "FREE" : formatINR(shippingFee)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, marginBottom: 18, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 0.6 }}>
              <span>Estimated Total</span><span style={{ color: PALETTE.hindiGold, fontSize: 24 }}>{formatINR(total)}</span>
            </div>
            <button onClick={() => setStep("form")} style={{
              width: "100%", padding: "15px 0", borderRadius: 999, border: "none",
              background: PALETTE.brass, color: PALETTE.walnutDeep, fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 14, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", fontWeight: "700"
            }}>
              Proceed to Shipping →
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

const labelStyle = {
  fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, opacity: 0.8, textTransform: "uppercase",
  display: "block", marginBottom: 4, letterSpacing: 0.5, fontWeight: "600"
};
const inputStyle = {
  width: "100%", padding: "10px 14px", borderRadius: 8,
  border: `1px solid rgba(243,233,215,0.25)`, background: PALETTE.walnutLight,
  color: PALETTE.offwhite, fontFamily: "'Arvo', serif", fontSize: 13.5
};

/* ---------------------------------------------------------
   Toast Notification Banner Component
--------------------------------------------------------- */
function ToastNotification({ message, onClose }) {
  if (!message) return null;
  return (
    <div style={{
      position: "fixed", bottom: 85, right: 28, zIndex: 120,
      background: PALETTE.walnutDeep, color: PALETTE.offwhite,
      border: `2px solid ${PALETTE.brass}`, padding: "14px 24px", borderRadius: 14,
      boxShadow: "0 14px 40px rgba(0,0,0,0.8), 0 0 30px " + PALETTE.goldGlow,
      fontFamily: "'IBM Plex Mono', monospace", fontSize: 13,
      display: "flex", alignItems: "center", gap: 14,
      animation: "slideUp 0.3s cubic-bezier(.3,.9,.4,1)"
    }}>
      <span>♪ {message}</span>
      <button onClick={onClose} style={{ background: "none", border: "none", color: PALETTE.hindiGold, cursor: "pointer", fontSize: 16 }}>×</button>
    </div>
  );
}

const TRACK_AUDIO_MAP = {
  "Jaane Kyun": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "Dil Chahta Hai": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "Kaisi Hai Yeh Rout": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "Tanhayee": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",

  "Chaiyya Chaiyya": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  "Roja Janeman": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  "Dil Se Re": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  "Tu Hi Re": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  "Chinna Chinna Aasai": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
  "Yeh Haseen Vaadiyan": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",

  "Chura Liya Hai Tumne": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
  "Dum Maro Dum": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
  "Mehbooba Mehbooba": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",

  "Lag Jaa Gale": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
  "Aap Ki Nazron Ne Samjha": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",

  "Pal Pal Dil Ke Paas": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
  "O Saathi Re": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",

  DEFAULT: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
};

/* ---------------------------------------------------------
   MAIN COMPONENT: RecordShop
--------------------------------------------------------- */
export default function RecordShop() {
  const [activeId, setActiveId] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rpm, setRpm] = useState(33);
  const [currentSide, setCurrentSide] = useState("A");
  const [crackle, setCrackle] = useState(0.4);

  // Cart & Checkout state
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [step, setStep] = useState("cart");
  const [form, setForm] = useState({
    name: "Palak Sheth", email: "palaksheth9114@gmail.com", address: "Palak Sheth Estate, 118 Harbor Row, Bandra West", city: "Mumbai", state: "Maharashtra", pincode: "400050"
  });
  const [promo, setPromo] = useState("");
  const [discountPct, setDiscountPct] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [orderData, setOrderData] = useState(null);

  // Crate Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");

  // Detail Modal & Toast state
  const [detailRecord, setDetailRecord] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [justAddedId, setJustAddedId] = useState(null);
  const [playingTrack, setPlayingTrack] = useState("Chaiyya Chaiyya");

  // Deterministic Audio Playback Timer state
  const [playSeconds, setPlaySeconds] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaySeconds((s) => {
          if (s >= 215) {
            setIsPlaying(false);
            audioEngine.stopRecord();
            return 0;
          }
          return s + 1;
        });
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const audioProgress = { currentTime: playSeconds, duration: 215 };

  const fontInjected = useRef(false);

  useEffect(() => {
    if (fontInjected.current) return;
    fontInjected.current = true;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Arvo:wght@400;700&family=IBM+Plex+Mono:wght@400;500;600;700&family=Caveat:wght@600;700&display=swap";
    document.head.appendChild(link);
  }, []);

  const activeRecord = RECORDS.find((r) => r.id === activeId) || RECORDS[0];

  function showToast(msg) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage((cur) => (cur === msg ? "" : cur)), 3500);
  }

  function selectRecord(id) {
    setActiveId(id);
    const rec = RECORDS.find(r => r.id === id);
    if (rec) {
      const firstTrack = rec.sideA && rec.sideA[0] ? rec.sideA[0] : rec.title;
      handlePlayTrack(rec, firstTrack);
      showToast(`Loaded "${rec.title}" on 3D turntable`);
    }
  }

  function handleTogglePlay() {
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      audioEngine.stopRecord();
      setIsPlaying(false);
    } else {
      if (audioRef.current && audioRef.current.src) {
        audioRef.current.play().catch((e) => console.log("Audio play error:", e));
      } else {
        const firstTrack = activeRecord.sideA && activeRecord.sideA[0] ? activeRecord.sideA[0] : activeRecord.title;
        handlePlayTrack(activeRecord, firstTrack);
        return;
      }
      audioEngine.playRecord(activeRecord.genre, rpm);
      setIsPlaying(true);
      showToast(`Resumed real song playback for "${playingTrack || activeRecord.title}"`);
    }
  }

  function handleSeek(timeSec) {
    setPlaySeconds(timeSec);
    if (audioRef.current) {
      try { audioRef.current.currentTime = timeSec; } catch (e) {}
    }
  }

  function handleRpmChange(newRpm) {
    setRpm(newRpm);
    audioEngine.setSpeed(newRpm);
    if (isPlaying) {
      showToast(`Adjusted speed to ${newRpm} RPM`);
    }
  }

  function handleCrackleChange(val) {
    setCrackle(val);
    audioEngine.setCrackleLevel(val);
  }

  function handlePlayTrack(record, trackName) {
    setActiveId(record.id);
    setPlayingTrack(trackName);
    setPlaySeconds(1);

    const audioUrl = TRACK_AUDIO_MAP[trackName] || TRACK_AUDIO_MAP.DEFAULT;
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.src = audioUrl;
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((e) => console.log("Audio play notice:", e));
      } catch (e) {
        console.log("Audio load error:", e);
      }
    }

    audioEngine.playRecord(record.genre, rpm);
    setIsPlaying(true);
    showToast(`♪ Playing real song "${trackName}"`);
  }

  function addToCart(id) {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
    setJustAddedId(id);
    const rec = RECORDS.find(r => r.id === id);
    if (rec) {
      showToast(`Added "${rec.title}" to crate bag!`);
    }
    setTimeout(() => setJustAddedId((cur) => (cur === id ? null : cur)), 900);
  }

  function setQty(id, n) {
    setCart((c) => ({ ...c, [id]: Math.max(0, n) }));
  }

  function removeItem(id) {
    setCart((c) => {
      const next = { ...c };
      delete next[id];
      return next;
    });
  }

  function placeOrder(totalAmount) {
    const num = Math.floor(100000 + Math.random() * 900000);
    setOrderData({ orderNumber: num, total: totalAmount });
    setStep("done");
    showToast(`Order #${num} confirmed!`);
  }

  function resetShop() {
    setCart({});
    setStep("cart");
    setCartOpen(false);
    setOrderData(null);
  }

  // Filtering & Sorting
  const filteredRecords = RECORDS.filter((r) => {
    const matchesGenre = selectedGenre === "All" || r.genre === selectedGenre;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "year") return b.year - a.year;
    return a.id - b.id;
  });

  const cartCount = Object.values(cart).reduce((s, q) => s + q, 0);
  const cartSubtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const r = RECORDS.find(rec => rec.id === Number(id));
    return sum + (r ? r.price * qty : 0);
  }, 0);

  const staffPicks = RECORDS.filter((r) => r.staffPick);

  return (
    <div style={{
      background: PALETTE.walnut, minHeight: "100vh",
      fontFamily: "'Arvo', serif", color: PALETTE.offwhite, paddingBottom: cartCount > 0 ? 80 : 0
    }}>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        * { box-sizing: border-box; }
        .crate-row::-webkit-scrollbar { height: 10px; }
        .crate-row::-webkit-scrollbar-thumb { background: ${PALETTE.hindiGold}88; border-radius: 5px; }
        .ng-link { color: ${PALETTE.offwhite}; opacity: 0.85; text-decoration: none; font-family: 'IBM Plex Mono', monospace; font-size: 13px; transition: color 0.2s; }
        .ng-link:hover { color: ${PALETTE.hindiGold}; opacity: 1; }
        input:focus, select:focus { outline: 1.5px solid ${PALETTE.hindiGold}; }
      `}</style>

      {/* Navigation Header */}
      <nav style={{ borderBottom: `1px solid rgba(243,233,215,0.12)`, padding: "18px 0", position: "sticky", top: 0, background: PALETTE.walnutDeep, zIndex: 50, backdropFilter: "blur(10px)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 26, color: PALETTE.hindiGold }}>♪</span>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: 1.5, color: PALETTE.offwhite }}>
              NEEDLE &amp; GRAIN <span style={{ color: PALETTE.hindiGold, fontSize: 18 }}>3D</span>
            </span>
          </div>

          <div style={{ display: "flex", gap: 26, alignItems: "center" }}>
            <a className="ng-link" href="#crate">Hindi &amp; Desi Classics</a>
            <a className="ng-link" href="#picks">Staff Picks</a>
            <a className="ng-link" href="#visit">Visit Store</a>
            
            <button
              onClick={() => { setCartOpen(true); if (step === "done") setStep("cart"); }}
              style={{
                position: "relative", background: `linear-gradient(135deg, ${PALETTE.brass}, ${PALETTE.brassLight})`,
                border: "none", borderRadius: 999, padding: "10px 22px", color: PALETTE.walnutDeep, cursor: "pointer",
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, display: "flex", alignItems: "center", gap: 8,
                fontWeight: "700", boxShadow: "0 4px 18px " + PALETTE.goldGlow
              }}
            >
              🛒 Crate Bag
              {cartCount > 0 && (
                <span style={{
                  background: PALETTE.walnutDeep, color: PALETTE.hindiGold, borderRadius: 999,
                  fontSize: 12, fontWeight: "bold", minWidth: 22, height: 22, display: "inline-flex",
                  alignItems: "center", justifyContent: "center", padding: "0 6px",
                }}>{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Real 3D Turntable */}
      <header style={{ maxWidth: 1160, margin: "0 auto", padding: "50px 28px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5, color: PALETTE.hindiGold, marginBottom: 12, letterSpacing: 1, fontWeight: "600" }}>
              EST. 2016 — MUMBAI, INDIA · HINDI RETRO &amp; ANALOG VINYL
            </div>
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(46px, 6vw, 76px)",
              lineHeight: 0.96, letterSpacing: 0.5, margin: 0, color: PALETTE.offwhite
            }}>
              Pure 3D Sound &amp; Legendary Hindi Vinyl.
            </h1>
            <p style={{ fontSize: 16.5, lineHeight: 1.7, opacity: 0.85, maxWidth: "48ch", marginTop: 22 }}>
              Flip through 3D vinyl covers of Hindi retro classics, A.R. Rahman masterpieces, and rare analog pressings. Test every side on our live 3D turntable before ordering.
            </p>

            <div style={{ marginTop: 26, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, opacity: 0.7 }}>
                Filter Genres:
              </span>
              {["All", "Hindi Retro", "Raga Fusion", "Soul", "Jazz", "Psych"].map((g) => (
                <GenreTag
                  key={g} genre={g}
                  accent={g === "All" ? PALETTE.hindiGold : (RECORDS.find((r) => r.genre === g) || RECORDS[0]).accent}
                  active={selectedGenre === g}
                  onClick={() => setSelectedGenre(g)}
                />
              ))}
            </div>
          </div>

          {/* 3D Turntable Player Deck */}
          <Turntable
            record={activeRecord} isPlaying={isPlaying} onToggle={handleTogglePlay}
            rpm={rpm} onRpmChange={handleRpmChange}
            currentSide={currentSide} onSideChange={setCurrentSide}
            crackle={crackle} onCrackleChange={handleCrackleChange}
            onAddToCart={addToCart}
          />
        </div>
      </header>

      {/* 3D Vinyl Crate Digging Section with Real Cover Images */}
      <section id="crate" style={{ padding: "40px 0 70px", background: "rgba(15,10,6,0.45)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 14 }}>
            <div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 34, letterSpacing: 0.5, margin: 0, color: PALETTE.hindiGold }}>
                Flip the 3D Vinyl Crate
              </h2>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, opacity: 0.7 }}>
                Hover a 3D album cover to pop out vinyl disc · Click [🛒 Add to Cart] button
              </span>
            </div>

            {/* Search & Sort Controls */}
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <input
                type="text" placeholder="Search Hindi song, artist..."
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: "9px 16px", borderRadius: 999, border: `1px solid rgba(243,233,215,0.25)`,
                  background: PALETTE.walnutDeep, color: PALETTE.offwhite, fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 12.5, width: 240
                }}
              />
              <select
                value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: "9px 16px", borderRadius: 999, border: `1px solid rgba(243,233,215,0.25)`,
                  background: PALETTE.walnutDeep, color: PALETTE.offwhite, fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 12.5, cursor: "pointer"
                }}
              >
                <option value="recommended">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="year">Release Year</option>
              </select>
            </div>
          </div>

          <div className="crate-row" style={{ display: "flex", gap: 28, overflowX: "auto", paddingBottom: 22, paddingTop: 12 }}>
            {filteredRecords.map((r) => (
              <Real3DCrateSleeve
                key={r.id} record={r} active={r.id === activeId}
                onSelect={selectRecord} onAdd={addToCart}
                onOpenDetail={setDetailRecord} justAdded={justAddedId === r.id}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Curator Picks & Bollywood Heritage */}
      <section id="picks" style={{ background: PALETTE.walnutDeep, padding: "75px 0", borderTop: `1px solid rgba(243,233,215,0.08)` }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 32 }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 34, letterSpacing: 0.5, margin: 0 }}>
              Curator Picks &amp; Bollywood Heritage
            </h2>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5, opacity: 0.7 }}>
              Tested on vintage tube amplifiers
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: 28 }}>
            {staffPicks.map((r) => (
              <StaffPickCard
                key={r.id} record={r} onAdd={addToCart}
                onOpenDetail={setDetailRecord} justAdded={justAddedId === r.id}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Store Visit Section */}
      <section id="visit" style={{ padding: "75px 0 50px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 28px", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center" }}>
          <div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 34, letterSpacing: 0.5, margin: "0 0 16px" }}>
              Experience Hindi Vinyl in Bandra, Mumbai
            </h2>
            <p style={{ opacity: 0.85, lineHeight: 1.7, maxWidth: "44ch", fontSize: 15.5 }}>
              Photos never do a virgin Hindi vinyl pressing justice. Stop by our store in Bandra West, Mumbai. Ask us to drop the needle on any classic by A.R. Rahman or R.D. Burman while sipping fresh filter coffee.
            </p>
          </div>
          <div style={{
            background: PALETTE.walnutLight, borderRadius: 18, padding: 26, border: `1.5px solid rgba(229,169,60,0.25)`,
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 13.5, lineHeight: 2.1, opacity: 0.95
          }}>
            <div style={{ color: PALETTE.hindiGold, fontWeight: "bold", marginBottom: 6 }}>📍 MUMBAI STORE LOCATION &amp; HOURS</div>
            <div style={{ fontWeight: "bold", color: PALETTE.offwhite }}>Palak Sheth Vinyl Estate</div>
            <div>118 Harbor Row, Bandra West, Mumbai</div>
            <div>Owner &amp; Curator: Palak Sheth</div>
            <div>Wed–Mon: 11:00 AM – 8:30 PM</div>
            <div>Closed Tuesdays, always</div>
            <div style={{ marginTop: 10, color: PALETTE.brassLight, fontSize: 12 }}>
              ✉ palaksheth9114@gmail.com
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid rgba(243,233,215,0.12)`, padding: "28px 0", textAlign: "center", background: PALETTE.walnutDeep }}>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, opacity: 0.7 }}>
          Needle &amp; Grain 3D — Founded by Palak Sheth. Premium Hindi Retro &amp; Bollywood Vinyl Showcase in India (₹ INR).
        </span>
      </footer>

      {/* Detail Modal */}
      {detailRecord && (
        <RecordDetailModal
          record={detailRecord}
          onClose={() => setDetailRecord(null)}
          onAdd={addToCart}
          onPlayTrack={handlePlayTrack}
          justAdded={justAddedId === detailRecord.id}
          playingTrack={playingTrack}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
        />
      )}

      {/* Sticky Bottom Cart Bar */}
      {cartCount > 0 && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0, height: 65,
          background: PALETTE.walnutDeep, borderTop: `2px solid ${PALETTE.brass}`,
          zIndex: 70, display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "0 32px", boxShadow: "0 -10px 30px rgba(0,0,0,0.7)", backdropFilter: "blur(10px)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{
              background: PALETTE.hindiGold, color: PALETTE.walnutDeep, borderRadius: 999,
              padding: "4px 12px", fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: "bold"
            }}>
              {cartCount} {cartCount === 1 ? "Item" : "Items"}
            </span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, color: PALETTE.offwhite }}>
              Subtotal: <strong style={{ color: PALETTE.hindiGold, fontSize: 16 }}>{formatINR(cartSubtotal)}</strong>
            </span>
          </div>

          <button
            onClick={() => { setCartOpen(true); if (step === "done") setStep("cart"); }}
            style={{
              padding: "10px 24px", borderRadius: 999, border: "none",
              background: `linear-gradient(135deg, ${PALETTE.brass}, ${PALETTE.brassLight})`,
              color: PALETTE.walnutDeep, fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 13, fontWeight: "bold", cursor: "pointer", letterSpacing: 0.5,
              boxShadow: "0 4px 16px " + PALETTE.goldGlow, textTransform: "uppercase"
            }}
          >
            🛒 View Cart Bag &amp; Checkout →
          </button>
        </div>
      )}

      {/* Cart & Checkout Drawer */}
      <CartDrawer
        open={cartOpen} onClose={() => setCartOpen(false)}
        cart={cart} records={RECORDS}
        onQtyChange={setQty} onRemove={removeItem}
        step={step} setStep={setStep}
        form={form} setForm={setForm}
        promo={promo} setPromo={setPromo}
        discountPct={discountPct} setDiscountPct={setDiscountPct}
        paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}
        orderData={orderData} onPlaceOrder={placeOrder}
        onReset={resetShop}
      />

      {/* Floating Toast Notification */}
      <ToastNotification message={toastMessage} onClose={() => setToastMessage("")} />
    </div>
  );
}
