import { useEffect } from 'react';

// Audio context for sound effects
let audioContext: AudioContext | null = null;

const initAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

// Generate premium sound effects
const createTone = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
  const ctx = initAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
  oscillator.type = type;
  
  gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
};

export const SoundEffects = {
  hover: () => {
    createTone(800, 0.1, 'sine');
  },
  
  click: () => {
    createTone(1000, 0.15, 'square');
    setTimeout(() => createTone(800, 0.1, 'sine'), 50);
  },
  
  success: () => {
    createTone(523.25, 0.2, 'sine'); // C5
    setTimeout(() => createTone(659.25, 0.2, 'sine'), 100); // E5
    setTimeout(() => createTone(783.99, 0.3, 'sine'), 200); // G5
  },
  
  error: () => {
    createTone(200, 0.3, 'sawtooth');
  },
  
  connect: () => {
    createTone(440, 0.2, 'sine'); // A4
    setTimeout(() => createTone(554.37, 0.2, 'sine'), 100); // C#5
    setTimeout(() => createTone(659.25, 0.3, 'sine'), 200); // E5
  }
};

export function useSoundEffects() {
  useEffect(() => {
    // Initialize audio context on first user interaction
    const initAudio = () => {
      initAudioContext();
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
    };
    
    document.addEventListener('click', initAudio);
    document.addEventListener('keydown', initAudio);
    
    return () => {
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
    };
  }, []);

  return SoundEffects;
}

// Enhanced Button with sound effects
export function SoundButton({ 
  children, 
  onClick, 
  onMouseEnter,
  variant = "primary",
  ...props 
}: {
  children: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  variant?: string;
  [key: string]: unknown;
}) {
  const sounds = useSoundEffects();
  
  const handleMouseEnter = () => {
    sounds.hover();
    onMouseEnter?.();
  };
  
  const handleClick = () => {
    sounds.click();
    onClick?.();
  };
  
  return (
    <button
      className={`btn btn-${variant}`}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default SoundEffects;
