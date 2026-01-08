import type { CornerTile } from "@/interfaces/corner-tile";
import { motion } from "framer-motion";
import { ShieldAlert, Lock } from "lucide-react";
import type { BaseModalProps } from "@/types/modal-type";
import ModalWrapper from "./modal-wrapper";

type GoToJailModalProps = BaseModalProps<CornerTile>;

export default function GoToJailModal({ onAction }: GoToJailModalProps) {
  const handleContinue = () => {
    if (onAction) onAction({});
  };

  return (
    <ModalWrapper isOpen={true} disableBackdropClick maxWidth="md">
      {/* Header */}
      <div
        className="rounded-t bg-gradient-to-r from-red-600 to-orange-600 p-4"
        style={{
          borderBottom: "0.5px solid var(--color-border-light)",
        }}
      >
        <div className="flex items-center justify-center gap-2">
          <ShieldAlert className="h-6 w-6 text-white" />
          <h2 className="text-xl font-bold tracking-wide text-white uppercase">
            VÁ PARA A PRISÃO!
          </h2>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        {/* Ícone */}
        <div className="mb-5 flex justify-center">
          <motion.div
            initial={{ scale: 0, rotate: 90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="rounded-full bg-gradient-to-br from-red-500 to-orange-500 p-4 shadow-lg"
          >
            <Lock className="h-12 w-12 text-white" />
          </motion.div>
        </div>

        {/* Mensagem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-5 text-center"
        >
          <h3 className="mb-2 text-2xl font-bold text-white">Você foi pego!</h3>
          <p className="text-base text-gray-300">
            Vá direto para a prisão sem passar pelo Início
          </p>
        </motion.div>

        {/* Aviso */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="mb-5 rounded bg-red-600/20 p-4 text-center backdrop-blur-sm"
          style={{ border: "0.5px solid var(--color-red-border-light)" }}
        >
          <p className="text-sm font-semibold text-red-300">
            Você precisará acertar uma pergunta para sair
          </p>
        </motion.div>

        {/* Botão */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          onClick={handleContinue}
          className="w-full cursor-pointer rounded bg-red-800 px-6 py-3 font-bold text-white uppercase shadow-lg transition-all hover:bg-red-900"
          style={{ border: "0.5px solid var(--color-red-border-light)" }}
        >
          IR PARA A PRISÃO
        </motion.button>
      </div>
    </ModalWrapper>
  );
}
