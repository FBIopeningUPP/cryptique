let audioCtx = null;
let activeTrack = 'none';
let gainNode = null;
let sourceNodes = [];

export const AMBIENT_TRACK_IDS = ['none', 'vinyl', 'rain', 'wind'];

function getContext() {
    if (typeof window === 'undefined') return null;
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
            audioCtx = new AudioContextClass();
        }
    }

    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
    }

    return audioCtx;
}

export function stopAmbient() {
    sourceNodes.forEach((node) => {
        try {
            node.stop();
            node.disconnect();
        } catch {
        }
    });
    sourceNodes = [];
    if (gainNode) {
        try {
            gainNode.disconnect();
        } catch {
        }
        gainNode = null;
    }
    activeTrack = 'none';
}

export function resumeAmbientContext() {
    getContext();
}

export function playAmbient(trackId = 'none', volume = 0.5) {
    if (trackId === 'vinyl') playVinylCrackle(volume);
    else if (trackId === 'rain') playAtticRain(volume);
    else if (trackId === 'wind') playNightWind(volume);
    else stopAmbient();
}

export function setAmbientVolume(volumeRatio = 0.5) {
    if (gainNode && audioCtx) {
        const clamped = Math.max(0, Math.min(1, volumeRatio));
        gainNode.gain.setValueAtTime(clamped * 0.25, audioCtx.currentTime);
    }
}

export function playVinylCrackle(volume = 0.5) {
    stopAmbient();
    const ctx = getContext();
    if (!ctx) return;
    
    gainNode = ctx.createGain();
    setAmbientVolume(volume);
    gainNode.connect(ctx.destination);

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        let sample = (Math.random() * 2 - 1) * 0.04;
        if (Math.random() < 0.008) {
            sample += (Math.random() * 2 - 1) * 0.7;
        }
        data[i] = sample;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1200;
    filter.Q.value = 1.2;

    noiseSource.connect(filter);
    filter.connect(gainNode);
    noiseSource.start();

    sourceNodes.push(noiseSource);
    activeTrack = 'vinyl';
}

export function playAtticRain(volume = 0.5) {
    stopAmbient();
    const ctx = getContext();
    if (!ctx) return;

    gainNode = ctx.createGain();
    setAmbientVolume(volume);
    gainNode.connect(ctx.destination);

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
    }

    const rainSource = ctx.createBufferSource();
    rainSource.buffer = buffer;
    rainSource.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 850;

    rainSource.connect(filter);
    filter.connect(gainNode);
    rainSource.start();

    sourceNodes.push(rainSource);
    activeTrack = 'rain';
}

export function playNightWind(volume = 0.5) {
    stopAmbient();
    const ctx = getContext();
    if (!ctx) return;

    gainNode = ctx.createGain();
    setAmbientVolume(volume);
    gainNode.connect(ctx.destination);

    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.05;
    }

    const windSource = ctx.createBufferSource();
    windSource.buffer = buffer;
    windSource.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 350;
    filter.Q.value = 3.5;

    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.frequency.value = 0.2;
    oscGain.gain.value = 150;
    osc.connect(oscGain);
    oscGain.connect(filter.frequency);
    osc.start();

    windSource.connect(filter);
    filter.connect(gainNode);
    windSource.start();

    sourceNodes.push(windSource, osc);
    activeTrack = 'wind';
}

export function getCurrentAmbientTrack() {
    return activeTrack;
}