import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface MenuButtonProps {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  index: number;
  description?: string;
}

export const MenuButton = ({
  label,
  icon,
  onClick,
  index,
  description,
}: MenuButtonProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.1 }}
      onClick={onClick}
      className="group relative flex w-full cursor-pointer items-center justify-between overflow-hidden rounded bg-gray-800/60 p-4 text-left backdrop-blur-sm transition-all duration-300 hover:bg-gray-700/70"
      style={{
        border: "0.5px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-800/0 to-blue-800/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-center gap-3">
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-white/10 transition-all group-hover:scale-110 group-hover:bg-blue-800/30"
          style={{
            border: "0.5px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <span className="text-blue-400 group-hover:text-blue-300">
            {icon}
          </span>
        </div>
        <div className="flex-1">
          <span className="text-base font-medium text-white">{label}</span>
          {description && (
            <p className="text-xs text-gray-400">{description}</p>
          )}
        </div>
      </div>

      <div className="relative flex items-center text-blue-400/60 transition-all group-hover:translate-x-1 group-hover:text-blue-300">
        {icon}
      </div>
    </motion.button>
  );
};
