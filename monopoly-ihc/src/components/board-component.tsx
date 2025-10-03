import { mockQuestionCards } from "../data/card-mock";
import { cornerTiles } from "../data/corner-cards";
import type { QuestionCard } from "../interfaces/question-card";
import type { CornerTile } from "../interfaces/corner-tile";
import CardComponent from "./card-component";
import CornerCardComponent from "./corner-card-component";
import type { Player } from "@/interfaces/player";
import PlayerComponent from "./player-component";
import { useGame } from "@/contexts/game-context";

export type Tile = QuestionCard | CornerTile;

const boardTiles: Tile[] = [
  cornerTiles[0], // 0 - start (bottom left)
  ...mockQuestionCards.slice(0, 6), // 1-6 bottom row (esquerda → direita)
  cornerTiles[1], // 7 - bottom right
  ...mockQuestionCards.slice(16, 20).reverse(), // 8-11 right column
  cornerTiles[2], // 12 - top right
  ...mockQuestionCards.slice(10, 16).reverse(), // 13-18 top row
  cornerTiles[3], // 19 - top left
  ...mockQuestionCards.slice(6, 10), // 20-23 left column
];

// -------------------- Row --------------------
interface RowProps {
  tiles: Tile[];
  isTopRow?: boolean;
  players: Player[];
}

function Row({ tiles, isTopRow = false, players }: RowProps) {
  return (
    <div className="flex">
      {tiles.map((tile, i) => {
        const indexPosition = boardTiles.indexOf(tile);
        const playersOnTile = players.filter(
          (p) => p.position === indexPosition,
        );

        let rotationClass = "";
        if (isTopRow && i > 0 && i < tiles.length - 1)
          rotationClass = "-rotate-180";

        return (
          <div className="relative" key={i}>
            {"cornerType" in tile ? (
              <CornerCardComponent {...tile} />
            ) : (
              <CardComponent {...tile} className={rotationClass} />
            )}

            {/* Players dentro da tile */}
            <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-wrap gap-3 p-1">
              {playersOnTile.map((player) => (
                <PlayerComponent key={player.id} color={player.color} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// -------------------- Column --------------------
interface ColumnProps {
  tiles: Tile[];
  isRightColumn?: boolean;
  players: Player[];
}

function Column({ tiles, isRightColumn = false, players }: ColumnProps) {
  return (
    <div className="flex flex-col items-center gap-0">
      {tiles.map((tile, i) => {
        const indexPosition = boardTiles.indexOf(tile);
        const playersOnTile = players.filter(
          (p) => p.position === indexPosition,
        );

        let rotationClass = isRightColumn ? "-rotate-90" : "rotate-90";
        let cardSizeClass = "w-[115px] h-[105px]";

        return (
          <div className="relative" key={i}>
            {"cornerType" in tile ? (
              <CornerCardComponent {...tile} />
            ) : (
              <CardComponent
                className={`${rotationClass} ${cardSizeClass}`}
                {...tile}
              />
            )}

            {/* Players dentro da tile */}
            <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-wrap gap-3 p-1">
              {playersOnTile.map((player) => (
                <PlayerComponent key={player.id} color={player.color} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// -------------------- Board --------------------
export default function Board() {
  const { players } = useGame();

  const bottomRowTiles = boardTiles.slice(0, 8);
  const rightColumnTiles = boardTiles.slice(8, 12).reverse();
  const topRowTiles = boardTiles.slice(12, 20).reverse();
  const leftColumnTiles = boardTiles.slice(20, 24);

  return (
    <div className="flex w-fit flex-col">
      <Row tiles={topRowTiles} isTopRow players={players} />

      <div className="flex items-center justify-between">
        <Column tiles={leftColumnTiles} players={players} />
        <h1 className="font-titan -rotate-45 text-5xl font-bold text-white uppercase">
          Monopoly <span className="text-red-400">IHC</span>
        </h1>
        <Column tiles={rightColumnTiles} isRightColumn players={players} />
      </div>

      <Row tiles={bottomRowTiles} players={players} />
    </div>
  );
}
