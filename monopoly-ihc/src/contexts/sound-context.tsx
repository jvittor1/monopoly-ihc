import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

type SoundType = "buy" | "win" | "error" | "success" | "purchase" | "click";

interface SoundContextType {
  playSound: (sound: SoundType) => void;
  toggleMute: () => void;
  isMuted: boolean;
  volume: number;
  setVolume: (volume: number) => void;
  startBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

const SOUND_MAP: Record<SoundType, string> = {
  buy: "/sounds/purchase-success.mp3",
  win: "/sounds/victory.mp3",
  error: "/sounds/error.mp3",
  success: "/sounds/success.mp3",
  purchase: "/sounds/purchase-success.mp3",
  click: "/sounds/click.mp3",
};

const BACKGROUND_TRACK = "/sounds/game-track-background.mp3";

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const musicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Inicializar objeto de áudio da música (sem tocar ainda)
    const music = new Audio(BACKGROUND_TRACK);
    music.loop = true;
    music.volume = volume * 0.15;
    music.muted = isMuted;
    musicRef.current = music;

    return () => {
      music.pause();
      music.currentTime = 0;
    };
  }, []);

  const startBackgroundMusic = async () => {
    if (!musicRef.current) return;
    try {
      await musicRef.current.play();
    } catch (e) {
      console.warn("Erro ao iniciar música de fundo:", e);
    }
  };

  const stopBackgroundMusic = () => {
    if (!musicRef.current) return;
    musicRef.current.pause();
    musicRef.current.currentTime = 0;
  };

  useEffect(() => {
    // Pré-carregar sons de efeitos
    Object.entries(SOUND_MAP).forEach(([key, path]) => {
      const audio = new Audio(path);
      audioRefs.current[key] = audio;
    });
  }, []);

  useEffect(() => {
    // Atualizar volume de efeitos
    Object.values(audioRefs.current).forEach((audio) => {
      audio.volume = isMuted ? 0 : volume;
    });

    // Atualizar musica de fundo
    if (musicRef.current) {
      musicRef.current.volume = volume * 0.1;
      musicRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const playSound = (sound: SoundType) => {
    if (isMuted) return;

    const path = SOUND_MAP[sound];
    if (!path) return;

    let audio = audioRefs.current[sound];
    if (!audio) {
      audio = new Audio(path);
      audioRefs.current[sound] = audio;
    }

    const soundClone = audio.cloneNode() as HTMLAudioElement;

    let volumeMultiplier = 1.0;
    if (sound === "error") volumeMultiplier = 0.05; // voulume erro
    if (sound === "purchase") volumeMultiplier = 0.1; // volume propriedade
    if (sound === "win") volumeMultiplier = 0.2; // volume vitória
    if (sound === "success") volumeMultiplier = 0.1; // volume acerto
    if (sound === "click") volumeMultiplier = 0.2; // volume click
    soundClone.volume = Math.min(volume * volumeMultiplier, 1.0); // Garante que não passe de 1.0

    soundClone.play().catch((e) => {
      console.warn(`Erro ao tocar som: ${sound}`, e);
    });
  };

  // Global click listener
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]') ||
        target.closest(".clickable");

      if (isInteractive) {
        playSound("click");
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [isMuted, volume]);

  const toggleMute = () => setIsMuted((prev) => !prev);

  return (
    <SoundContext.Provider
      value={{
        playSound,
        toggleMute,
        isMuted,
        volume,
        setVolume,
        startBackgroundMusic,
        stopBackgroundMusic,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
};
