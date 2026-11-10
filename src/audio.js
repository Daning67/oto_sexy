// Web Audio API Synthesizer for Seductive & Sexy Atmosphere

class SexyAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.tempo = 65; // Slow, seductive R&B tempo
    this.intervalId = null;
    this.step = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 1.2, gainLevel = 0.15, detune = 0) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.detune.setValueAtTime(detune, this.ctx.currentTime);

    // Warm low-pass filter for smooth sexy feel
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
    filter.Q.setValueAtTime(2, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(gainLevel, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(gainLevel * 0.7, now + duration * 0.5);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  playChord(frequencies, duration = 2.4, gainLevel = 0.08) {
    frequencies.forEach((f, i) => {
      this.playTone(f, 'sine', duration, gainLevel, i * 3 - 3);
      this.playTone(f * 2, 'triangle', duration * 0.8, gainLevel * 0.25, 2);
    });
  }

  playBass(freq, duration = 1.6) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const sub = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    sub.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    sub.frequency.setValueAtTime(freq / 2, this.ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(250, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.exponentialRampToValueAtTime(0.2, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    sub.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    sub.start(now);
    osc.stop(now + duration);
    sub.stop(now + duration);
  }

  // Seductive chords (D minor 9 -> G 13 -> C maj 9 -> A 7#9)
  tickLoop() {
    // Frequencies:
    // Dm9: D3 (146.83), F3 (174.61), A3 (220.00), C4 (261.63), E4 (329.63)
    // G13: G2 (98.00), F3 (174.61), B3 (246.94), E4 (329.63), A4 (440.00)
    // Cmaj9: C3 (130.81), E3 (164.81), G3 (196.00), B3 (246.94), D4 (293.66)
    // Bb13 / A7alt: A2 (110.00), G3 (196.00), C#4 (277.18), F4 (349.23)

    const chords = [
      { bass: 73.42, notes: [174.61, 220.00, 261.63, 329.63] }, // Dm9
      { bass: 98.00, notes: [174.61, 246.94, 329.63, 440.00] }, // G13
      { bass: 65.41, notes: [164.81, 196.00, 246.94, 293.66] }, // Cmaj9
      { bass: 55.00, notes: [196.00, 277.18, 349.23, 415.30] }  // A7#9
    ];

    const currentChord = chords[this.step % chords.length];
    this.playBass(currentChord.bass, 2.5);
    this.playChord(currentChord.notes, 2.6, 0.08);

    // Sensual melodic tease
    const teaseMelody = [440, 523.25, 587.33, 659.25, 783.99];
    if (Math.random() > 0.4) {
      setTimeout(() => {
        if (!this.isPlaying) return;
        const note = teaseMelody[Math.floor(Math.random() * teaseMelody.length)];
        this.playTone(note, 'sine', 1.4, 0.06);
      }, 700);
    }

    this.step++;
  }

  toggleMusic() {
    this.init();
    if (this.isPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  startMusic() {
    this.init();
    this.isPlaying = true;
    this.step = 0;
    this.tickLoop();
    this.intervalId = setInterval(() => {
      this.tickLoop();
    }, 2800);
  }

  stopMusic() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  // Sound Effect: Sexy Kiss / Muack
  playKissSound() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.16);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.2, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Sound Effect: Whoosh Fire
  playFireWhoosh() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.exponentialRampToValueAtTime(1200, now + 0.15);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.35);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.exponentialRampToValueAtTime(0.3, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 0.4);
  }

  // Sound Effect: Red Alert Siren
  playAlertSound() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.linearRampToValueAtTime(900, now + 0.2);
    osc.frequency.linearRampToValueAtTime(600, now + 0.4);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.45);
  }

  // Sound Effect: Ice / Cool down splash
  playCoolSound() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [1200, 1600, 2000, 2400].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.08, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.35);
    });
  }
}

export const audioEngine = new SexyAudioEngine();
