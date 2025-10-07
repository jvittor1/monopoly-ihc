import CardComponent from "./card-component";
import CornerCardComponent from "./corner-card-component";
import type { Player } from "@/interfaces/player";
import PlayerComponent from "./player-component";
import { useGame } from "@/contexts/game-context";
import { useBoard, type Tile } from "@/hooks/use-board";

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
        if (isTopRow && i > 0 && i < tiles.length - 1)
          rotationClass = "-rotate-180";

        return (
          <div className="relative" key={i}>
            {tile.kind === "corner" ? (
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
            {tile.kind === "corner" ? (
              <CornerCardComponent {...tile} className={rotationClass} />
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
  const bottomRowTiles = boardTiles.slice(0, 8);
  const rightColumnTiles = boardTiles.slice(8, 12).reverse();
  const topRowTiles = boardTiles.slice(12, 20).reverse();
  const leftColumnTiles = boardTiles.slice(20, 24);

  return (
    <div className="flex w-fit flex-col">
      <Row
        tiles={topRowTiles}
        isTopRow
        players={players}
        boardTiles={boardTiles}
      />

      <div className="flex items-center justify-between">
        <Column
          tiles={leftColumnTiles}
          players={players}
          boardTiles={boardTiles}
        />
        <h1 className="font-titan -rotate-45 text-5xl font-bold text-white uppercase">
          Monopoly <span className="text-red-400">IHC</span>
        </h1>
        <Column
          tiles={rightColumnTiles}
          isRightColumn
          players={players}
          boardTiles={boardTiles}
        />
      </div>

      <Row tiles={bottomRowTiles} players={players} boardTiles={boardTiles} />
    </div>
  );
}
