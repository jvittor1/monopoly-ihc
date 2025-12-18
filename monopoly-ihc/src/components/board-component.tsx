import CardComponent from "./card-component";
import CornerCardComponent from "./corner-card-component";
import type { Player } from "@/interfaces/player";
import PlayerComponent from "./player-component";
import { useGame } from "@/contexts/game-context";
import type { Tile } from "@/types/tile";
import { useBoard } from "@/contexts/board-context";
import { motion } from "framer-motion";
import { MousePointerClick } from "lucide-react";

function BackgroundBoard() {
  return (
    <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-6 backdrop-blur-sm">
      <div className="text-center">
        <MousePointerClick className="mx-auto mb-2 h-8 w-8 text-cyan-400" />
        <h1 className="font-titan mb-1 text-4xl font-bold text-white uppercase">
          Monopoly IHC
        </h1>
        <div className="mx-auto mb-2 h-px w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        <p className="text-xs tracking-wider text-slate-400 uppercase">
          Edição Acadêmica
        </p>
      </div>
    </div>
  );
}

// -------------------- Row --------------------
interface RowProps {
  tiles: Tile[];
  isTopRow?: boolean;
  players: Player[];
  boardTiles: Tile[];
}

function Row({ tiles, isTopRow = false, players, boardTiles }: RowProps) {
  return (
    <div className="flex">
      {tiles.map((tile, i) => {
        const indexPosition = boardTiles.indexOf(tile);
        const playersOnTile = players.filter(
          (p) => p.position === indexPosition,
        );

        let rotationClass = "";
        if (isTopRow && !tile.isCorner) {
          rotationClass = "rotate-180";
        }

        return (
          <div className="relative" key={i}>
            {tile.isCorner ? (
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
  boardTiles: Tile[];
}

function Column({
  tiles,
  isRightColumn = false,
  players,
  boardTiles,
}: ColumnProps) {
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
            {tile.isCorner ? (
              <CornerCardComponent {...tile} />
            ) : (
              <CardComponent
                {...tile}
                className={`${rotationClass} ${cardSizeClass}`}
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
  const { boardTiles } = useBoard();

  // console.log("-------------boardTiles-------------", boardTiles);

  const rightColumnTiles = boardTiles.slice(0, 6).reverse();
  const topRowTiles = boardTiles.slice(6, 12);
  const leftColumnTiles = boardTiles.slice(12, 18);
  const bottomRowTiles = boardTiles.slice(18, 24).reverse();

  return (
    <div className="flex w-fit flex-row justify-center">
      <Column
        tiles={rightColumnTiles}
        players={players}
        boardTiles={boardTiles}
      />

      <div className="flex flex-col items-center justify-between">
        <Row
          tiles={topRowTiles}
          isTopRow
          players={players}
          boardTiles={boardTiles}
        />
        <BackgroundBoard />
        <Row tiles={bottomRowTiles} players={players} boardTiles={boardTiles} />
      </div>
      <Column
        tiles={leftColumnTiles}
        isRightColumn
        players={players}
        boardTiles={boardTiles}
      />
    </div>
  );
}
