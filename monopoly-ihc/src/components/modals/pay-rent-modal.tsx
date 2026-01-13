import { Home, TrendingDown, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import InfoModal from "../modals/info-modal";
import type { Player } from "@/interfaces/player";
import type { ReactNode } from "react";
import { GiMoneyStack } from "react-icons/gi";

interface PayRentModalProps {
  propertyName: string;
  rentPrice: number;
  owner: Player;
  currentPlayer: Player;
  playerId: number;
  onAction?: (params?: any) => void;
}

export default function PayRentModal({
  propertyName,
  rentPrice,
  owner,
  currentPlayer,
  playerId,
  onAction,
}: PayRentModalProps) {
  const rentDisplay: ReactNode = (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-4 rounded bg-red-900/20 p-3 text-center backdrop-blur-sm"
        style={{ border: "0.5px solid var(--color-red-border)" }}
      >
        <div className="mb-2 flex items-center justify-center gap-2">
          <Home className="h-4 w-4 text-red-400" />
          <h3 className="text-base font-bold text-red-50">{propertyName}</h3>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="text-xs text-gray-400">Proprietário:</p>
          <div
            className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
            style={{ background: owner.color }}
          >
            {owner.name.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs font-semibold text-gray-200">
            {owner.name}
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-4 flex items-center justify-center gap-3"
      >
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-white shadow-lg"
          style={{
            background: currentPlayer.color,
            border: "2px solid rgb(239, 68, 68)",
          }}
        >
          <span className="text-sm">
            {currentPlayer.name.charAt(0).toUpperCase()}
          </span>
        </div>

        <ArrowRight className="h-5 w-5 text-red-700" />

        <div className="flex items-center gap-1.5 rounded-full bg-red-900 px-3 py-1 shadow-lg">
          <GiMoneyStack className="h-3.5 w-3.5 text-white" />
          <span className="text-sm font-bold text-white">{rentPrice}</span>
        </div>

        <ArrowRight className="h-5 w-5 text-red-700" />

        <div
          className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-white shadow-lg"
          style={{
            background: owner.color,
            border: "2px solid rgb(34, 197, 94)",
          }}
        >
          <span className="text-sm">{owner.name.charAt(0).toUpperCase()}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded bg-red-900/20 p-3 backdrop-blur-sm"
        style={{ border: "0.5px solid var(--color-red-border)" }}
      >
        <div className="flex items-center justify-center gap-2">
          <TrendingDown className="h-4 w-4 text-red-400" />
          <p className="text-sm text-red-400">-{rentPrice} pontos</p>
        </div>
      </motion.div>
    </>
  );

  return (
    <InfoModal
      headerColor="bg-red-900"
      headerIcon={Home}
      headerTitle="Pagar Aluguel"
      mainIcon={Home}
      mainIconColor="bg-red-900"
      title="Propriedade Ocupada"
      description="Você caiu em uma propriedade de outro jogador"
      infoCard={rentDisplay}
      buttonText="Continuar"
      buttonColor="bg-red-800"
      playerId={playerId}
      onAction={onAction}
    />
  );
}
