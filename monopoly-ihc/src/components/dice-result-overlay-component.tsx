import type { DiceResultOverlayInterface } from "@/interfaces/dice-result-overlay";

export default function DiceResultOverlay({
  value,
}: DiceResultOverlayInterface) {
  return (
    <div className="font-titan animate-fade-in fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/30 text-7xl text-red-400">
      <h2 className="text-stroke text-center font-bold">Avance</h2>

      <span className="text-stroke text-center font-bold">{value}</span>

      <h2 className="text-stroke text-center font-bold">
        {value === 1 ? "Casa" : "Casas"}
      </h2>
    </div>
  );
}
