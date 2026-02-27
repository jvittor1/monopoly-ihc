import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { tutorialSlides } from "@/data/tutorial-data/tutorial";
import ModalWrapper from "./modals/modal-wrapper";

interface TutorialComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

console.log(tutorialSlides);

export function TutorialComponent({ isOpen, onClose }: TutorialComponentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slide = tutorialSlides[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === tutorialSlides.length - 1;

  const goTo = (newIndex: number) => {
    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentIndex(newIndex);
  };

  const handlePrev = () => {
    if (!isFirst) goTo(currentIndex - 1);
  };

  const handleNext = () => {
    if (!isLast) goTo(currentIndex + 1);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} maxWidth="3xl">
      <div className="relative max-h-[90vh] w-full overflow-hidden">
        <div
          className="flex items-center justify-between rounded-t bg-gray-800 p-2"
          style={{
            borderBottom: "0.5px solid var(--color-border-light)",
          }}
        >
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold tracking-wide text-blue-400 uppercase">
              Tutorial: {currentIndex + 1}/{tutorialSlides.length}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer rounded p-2 transition-all duration-200 hover:bg-white/10"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex gap-1 px-6 pt-4">
          {tutorialSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="h-1 flex-1 cursor-pointer rounded-full transition-all duration-300"
              style={{
                backgroundColor: i <= currentIndex ? "#3B82F6" : "#374151",
              }}
            />
          ))}
        </div>

        <div className="relative overflow-hidden px-6 pt-5 pb-4">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              className="max-h-[65vh] overflow-y-scroll"
              key={slide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3 className="mb-4 text-center text-xl font-bold text-white">
                {slide.title}
              </h3>

              <div
                className="mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-gray-800/60"
                style={{
                  border: "0.5px solid var(--color-border-subtle)",
                  minHeight: "280px",
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="max-h-[350px] w-full rounded-lg object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

              <div
                className="rounded-lg bg-gray-800/60 p-4 backdrop-blur-sm"
                style={{
                  border: "0.5px solid var(--color-border-subtle)",
                }}
              >
                <p className="text-center text-sm font-semibold text-gray-300">
                  {slide.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className="flex items-center justify-between rounded-b bg-gray-800 p-5"
          style={{
            borderTop: "0.5px solid var(--color-border-light)",
          }}
        >
          <motion.button
            onClick={handlePrev}
            disabled={isFirst}
            className="group flex cursor-pointer items-center gap-2 rounded bg-zinc-600 px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Anterior
          </motion.button>

          {isLast ? (
            <motion.button
              onClick={onClose}
              className="flex cursor-pointer items-center gap-2 rounded bg-blue-800 px-6 py-2.5 text-sm font-bold text-white uppercase shadow-lg transition-all duration-300 hover:bg-blue-900"
              style={{
                border: "0.5px solid var(--color-border-lighter)",
              }}
            >
              Entendido
            </motion.button>
          ) : (
            <motion.button
              onClick={handleNext}
              className="group flex cursor-pointer items-center gap-2 rounded bg-blue-800 px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-blue-900"
              style={{
                border: "0.5px solid var(--color-blue-border-medium)",
              }}
            >
              Próximo
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
}
