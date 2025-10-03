import { motion } from "framer-motion";

interface PlayerComponentProps {
  color: string;
}

export default function PlayerComponent({ color }: PlayerComponentProps) {
  return (
    <motion.div
      layout
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="relative inline-block"
      style={{ width: "30px", height: "40px" }}
    >
      {/* SVG para criar forma unificada */}
      <svg
        width="30"
        height="40"
        viewBox="0 0 60 80"
        className="drop-shadow-lg"
        style={{ filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))" }}
      >
        <defs>
          {/* Gradiente radial para a cabeça */}
          <radialGradient id={`headGradient-${color}`} cx="35%" cy="35%">
            <stop offset="0%" stopColor={lightenColor(color, 40)} />
            <stop offset="70%" stopColor={color} />
            <stop offset="100%" stopColor={darkenColor(color, 20)} />
          </radialGradient>

          {/* Gradiente linear para o corpo */}
          <linearGradient
            id={`bodyGradient-${color}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor={darkenColor(color, 30)} />
            <stop offset="50%" stopColor={color} />
            <stop offset="100%" stopColor={darkenColor(color, 30)} />
          </linearGradient>

          {/* Gradiente para a base */}
          <linearGradient
            id={`baseGradient-${color}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={darkenColor(color, 35)} />
          </linearGradient>

          {/* Filtro para sombra interna */}
          <filter id="innerShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
            <feOffset dx="0" dy="1" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.5" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Base - trapézio com cantos bem arredondados */}
        <path
          d="M 14 58 
             Q 14 56 15 56
             L 18 56
             L 42 56
             L 45 56
             Q 46 56 46 58
             L 49 76
             Q 50 78 49 79
             Q 48 80 46 80
             L 14 80
             Q 12 80 11 79
             Q 10 78 11 76
             Z"
          fill={`url(#baseGradient-${color})`}
          filter="url(#innerShadow)"
        />

        {/* Transição base-corpo - curva suave */}
        <ellipse cx="30" cy="56" rx="14" ry="3" fill={color} opacity="0.9" />

        {/* Corpo - cilindro com perspectiva */}
        <rect
          x="22"
          y="34"
          width="16"
          height="22"
          fill={`url(#bodyGradient-${color})`}
          rx="1"
        />

        {/* Topo do corpo - elipse */}
        <ellipse
          cx="30"
          cy="34"
          rx="8"
          ry="2.5"
          fill={lightenColor(color, 20)}
        />

        {/* Transição corpo-cabeça - pescoço suave */}
        <path
          d="M 24 34
             Q 24 32 26 30
             L 34 30
             Q 36 32 36 34
             Z"
          fill={color}
        />

        {/* Cabeça - círculo com gradiente 3D */}
        <circle cx="30" cy="16" r="16" fill={`url(#headGradient-${color})`} />

        {/* Highlight na cabeça */}
        <ellipse cx="24" cy="12" rx="6" ry="8" fill="white" opacity="0.3" />

        {/* Sombra interna na cabeça */}
        <path
          d="M 30 32
             A 16 16 0 0 0 46 16
             A 16 16 0 0 0 30 0
             A 16 16 0 0 0 14 16
             A 16 16 0 0 0 20 26
             L 30 32 Z"
          fill="black"
          opacity="0.1"
        />
      </svg>

      {/* Sombra no chão */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: "28px",
          height: "6px",
          bottom: "-4px",
          backgroundColor: "black",
          opacity: 0.25,
          filter: "blur(3px)",
        }}
      />
    </motion.div>
  );
}

// Funções auxiliares para manipular cores
function lightenColor(color: string, percent: number): string {
  return adjustColorBrightness(color, percent);
}

function darkenColor(color: string, percent: number): string {
  return adjustColorBrightness(color, -percent);
}

function adjustColorBrightness(color: string, percent: number): string {
  const clamp = (num: number) => Math.min(Math.max(num, 0), 255);

  if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const adjust = (val: number) => clamp(val + (percent * 255) / 100);

    return `rgb(${adjust(r)}, ${adjust(g)}, ${adjust(b)})`;
  }

  if (color.startsWith("rgb")) {
    const matches = color.match(/\d+/g);
    if (matches) {
      const [r, g, b] = matches.map(Number);
      const adjust = (val: number) => clamp(val + (percent * 255) / 100);
      return `rgb(${adjust(r)}, ${adjust(g)}, ${adjust(b)})`;
    }
  }

  return color;
}
