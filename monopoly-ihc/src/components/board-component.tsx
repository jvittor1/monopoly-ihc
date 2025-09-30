import { mockQuestionCards } from "../data/card-mock";
import { cornerTiles } from "../data/corner-cards";
import type { QuestionCard } from "../interfaces/question-card";
import type { CornerTile } from "../interfaces/corner-tile";
import CardComponent from "./card-component";
import CornerCardComponent from "./corner-card-component";

// união de tipos
export type Tile = QuestionCard | CornerTile;

const boardTiles: Tile[] = [
  cornerTiles[0], // Posição 0
  ...mockQuestionCards.slice(0, 6), // lado de baixo (6 perguntas)
  cornerTiles[1], // Posição 7
  ...mockQuestionCards.slice(6, 10), // lado esquerdo (4 perguntas)
  cornerTiles[2], // Posição 12
  ...mockQuestionCards.slice(10, 16), // lado de cima (6 perguntas)
  cornerTiles[3], // Posição 19
  ...mockQuestionCards.slice(16, 20), // lado direito (4 perguntas)
];

// Componente para uma fileira de cartas
interface RowProps {
  tiles: Tile[];
  isTopRow?: boolean;
}

function Row({ tiles, isTopRow = false }: RowProps) {
  return (
    <div className="flex">
      {tiles.map((tile, i) => {
        let rotationClass = "";
        if (isTopRow && i > 0 && i < tiles.length - 1) {
          rotationClass = "-rotate-180";
        }
        return "cornerType" in tile ? (
          <CornerCardComponent key={i} {...tile} className="" />
        ) : (
          <CardComponent key={i} {...tile} className={rotationClass} />
        );
      })}
    </div>
  );
}

// Componente para uma coluna de cartas
interface ColumnProps {
  tiles: Tile[];
  isRightColumn?: boolean;
}

function Column({ tiles, isRightColumn = false }: ColumnProps) {
  return (
    <div className="flex flex-col items-center gap-0">
      {tiles.map((tile, i) => {
        let rotationClass = isRightColumn ? "-rotate-90" : "rotate-90";
        let cardSizeClass = "w-[115px] h-[105px]"; // Inverte largura/altura
        return "cornerType" in tile ? (
          <CornerCardComponent key={i} {...tile} />
        ) : (
          <CardComponent
            key={i}
            {...tile}
            className={`${rotationClass} ${cardSizeClass}`}
          />
        );
      })}
    </div>
  );
}

// Componente principal do tabuleiro
export default function Board() {
  const bottomRowTiles = boardTiles.slice(0, 8); // 1 quina + 6 perguntas + 1 quina
  const leftColumnTiles = boardTiles.slice(8, 12); // 4 perguntas
  const topRowTiles = boardTiles.slice(12, 20); // 1 quina + 6 perguntas + 1 quina
  const rightColumnTiles = boardTiles.slice(20, 24); // 4 perguntas

  return (
    <div className="flex w-fit flex-col">
      <Row tiles={topRowTiles} isTopRow />
      <div className="flex items-center justify-between">
        <Column tiles={leftColumnTiles} />
        <h1 className="-rotate-45 text-5xl font-bold text-white uppercase">
          Monopoly <span className="text-red-400">IHC</span>
        </h1>
        <Column tiles={rightColumnTiles} isRightColumn />
      </div>
      <Row tiles={bottomRowTiles} />
    </div>
  );
}
