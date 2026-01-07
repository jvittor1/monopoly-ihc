import { motion, AnimatePresence } from "framer-motion";
import { X, Users, Clock, Trophy, Dices, Home, Lightbulb } from "lucide-react";

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RulesModal({ isOpen, onClose }: RulesModalProps) {
  if (!isOpen) return null;

  const rules = [
    {
      icon: Users,
      title: "Jogadores",
      description:
        "A partida é disputada entre 2 jogadores que alternam turnos.",
    },
    {
      icon: Clock,
      title: "Tempo por Pergunta",
      description:
        "Cada pergunta possui 60 segundos para ser respondida. Caso o tempo acabe, a resposta será considerada incorreta.",
    },
    {
      icon: Home,
      title: "Casas de Propriedade",
      description:
        "Ao cair em uma propriedade, você responderá uma pergunta. Se acertar, ganha a propriedade. Se errar, nada acontece e a propriedade continua disponível.",
    },
    {
      icon: Lightbulb,
      title: "Sorte ou Revés",
      description:
        "Essas casas especiais também apresentam perguntas. Acerte e ganhe uma recompensa! Erre e sofra uma penalidade.",
    },
    {
      icon: Dices,
      title: "Movimentação",
      description:
        "No seu turno, role os dados para determinar quantas casas você avançará no tabuleiro.",
    },
    {
      icon: Trophy,
      title: "Objetivo",
      description:
        "Mantenha seu saldo positivo! O jogador que falir primeiro (saldo chegar a zero ou negativo) perde a partida. Vence quem conseguir manter-se financeiramente saudável até o final.",
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4"
      >
        <motion.div
          key="modal"
          initial={{ y: 50, opacity: 0, scale: 0.85 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.85 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded bg-gray-900/95 text-white shadow-2xl backdrop-blur-sm"
          style={{ border: "0.5px solid var(--color-border-light)" }}
        >
          <div
            className="sticky top-0 z-10 flex items-center justify-between rounded-t bg-gray-800 p-5"
            style={{
              borderBottom: "0.5px solid var(--color-border-light)",
            }}
          >
            <h2 className="bg-gradient-to-r text-lg font-bold tracking-wide text-blue-400 uppercase">
              Regras do Jogo
            </h2>
            <button
              onClick={onClose}
              className="rounded p-2 transition-all duration-200 hover:bg-white/10"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4 p-6">
            {rules.map((rule, index) => {
              const Icon = rule.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative rounded bg-gray-800/60 p-5 backdrop-blur-sm transition-all duration-300 hover:bg-gray-800/80"
                  style={{ border: "0.5px solid var(--color-border-subtle)" }}
                >
                  <div
                    className="absolute top-0 bottom-0 left-0 w-1 rounded-l"
                    style={{ backgroundColor: "var(--color-blue-primary)" }}
                  />

                  <div className="ml-3 flex items-start gap-4">
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-blue-500/20"
                      style={{
                        border: "0.5px solid var(--color-blue-border)",
                      }}
                    >
                      <Icon className="h-5 w-5 text-blue-400" />
                    </div>

                    <div className="flex-1">
                      <h3 className="mb-2 text-lg font-bold text-blue-300">
                        {rule.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-300">
                        {rule.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div
            className="sticky bottom-0 flex justify-end rounded-b bg-gray-800 p-5"
            style={{
              borderTop: "0.5px solid var(--color-border-light)",
            }}
          >
            <motion.button
              onClick={onClose}
              className="cursor-pointer rounded bg-blue-800 px-6 py-2.5 text-sm font-bold text-white uppercase shadow-lg transition-all duration-300 hover:bg-blue-900"
              style={{
                border: "0.5px solid var(--color-border-lighter)",
              }}
            >
              Entendido
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
