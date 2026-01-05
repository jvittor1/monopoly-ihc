import { motion } from "framer-motion";

interface HouseComponentProps {
  color: string;
}

export default function HouseComponent({ color }: HouseComponentProps) {
  return (
    <div className="relative inline-block">
      <motion.div
        layout
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="relative cursor-pointer"
        style={{ width: "52px", height: "48px" }}
      >
        <svg
          width="52"
          height="48"
          viewBox="0 0 104 96"
          className="drop-shadow-lg"
          style={{ filter: "drop-shadow(0 3px 6px rgba(0, 0, 0, 0.4))" }}
        >
          <defs>
            {/* Gradiente para parede esquerda (mais escura) */}
            <linearGradient
              id={`wallLeft-${color}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={darkenColor(color, 40)} />
              <stop offset="100%" stopColor={darkenColor(color, 25)} />
            </linearGradient>

            {/* Gradiente para parede direita (mais clara) */}
            <linearGradient
              id={`wallRight-${color}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={darkenColor(color, 15)} />
              <stop offset="50%" stopColor={lightenColor(color, 5)} />
              <stop offset="100%" stopColor={darkenColor(color, 10)} />
            </linearGradient>

            {/* Gradiente para telhado esquerdo */}
            <radialGradient id={`roofLeft-${color}`} cx="30%" cy="40%">
              <stop offset="0%" stopColor={lightenColor(color, 25)} />
              <stop offset="70%" stopColor={lightenColor(color, 10)} />
              <stop offset="100%" stopColor={darkenColor(color, 5)} />
            </radialGradient>

            {/* Gradiente para telhado direito */}
            <radialGradient id={`roofRight-${color}`} cx="60%" cy="40%">
              <stop offset="0%" stopColor={lightenColor(color, 45)} />
              <stop offset="60%" stopColor={lightenColor(color, 25)} />
              <stop offset="100%" stopColor={lightenColor(color, 5)} />
            </radialGradient>

            {/* Gradiente para o topo */}
            <linearGradient
              id={`top-${color}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={darkenColor(color, 20)} />
              <stop offset="50%" stopColor={color} />
              <stop offset="100%" stopColor={darkenColor(color, 5)} />
            </linearGradient>

            {/* Filtro para sombra interna */}
            <filter id={`innerShadow-${color}`}>
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

          {/* Parede esquerda */}
          <path
            d="M 26 50
               L 26 82
               L 46 90
               L 46 58
               Z"
            fill={`url(#wallLeft-${color})`}
            filter={`url(#innerShadow-${color})`}
          />

          {/* Parede direita (frontal) */}
          <path
            d="M 46 58
               L 46 90
               L 78 82
               L 78 50
               Z"
            fill={`url(#wallRight-${color})`}
            filter={`url(#innerShadow-${color})`}
          />

          {/* Topo da casa */}
          <path
            d="M 26 50
               L 46 58
               L 78 50
               L 58 42
               Z"
            fill={`url(#top-${color})`}
          />

          {/* Telhado esquerdo */}
          <path
            d="M 18 52
               L 52 24
               L 46 58
               L 26 50
               Z"
            fill={`url(#roofLeft-${color})`}
          />

          {/* Telhado direito */}
          <path
            d="M 52 24
               L 86 52
               L 78 50
               L 58 42
               L 46 58
               Z"
            fill={`url(#roofRight-${color})`}
          />

          {/* Highlight no telhado direito */}
          <ellipse
            cx="60"
            cy="34"
            rx="8"
            ry="11"
            fill="white"
            opacity="0.25"
            transform="rotate(20 60 34)"
          />

          {/* Aresta do telhado */}
          <line
            x1="52"
            y1="24"
            x2="46"
            y2="58"
            stroke={lightenColor(color, 50)}
            strokeWidth="1"
            opacity="0.4"
          />

          {/* Sombra interna na parede direita */}
          <path
            d="M 78 50
               L 78 82
               L 76 81
               L 76 50
               Z"
            fill="black"
            opacity="0.15"
          />

          {/* Highlight na parede direita */}
          <path
            d="M 46 58
               L 46 90
               L 48 89
               L 48 59
               Z"
            fill="white"
            opacity="0.12"
          />
        </svg>

        {/* Sombra no chão */}
        <div
          className="absolute rounded-full"
          style={{
            width: "56px",
            height: "10px",
            bottom: "-5px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "black",
            opacity: 0.3,
            filter: "blur(5px)",
          }}
        />
      </motion.div>
    </div>
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
  if (!color || typeof color !== "string") return "#000000";

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
