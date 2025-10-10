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

  console.log("-------------boardTiles-------------", boardTiles);

  const rightColumnTiles = boardTiles.slice(0, 6).reverse();
  const topRowTiles = boardTiles.slice(6, 12);
  const leftColumnTiles = boardTiles.slice(12, 18);
  const bottomRowTiles = boardTiles.slice(18, 24).reverse();

  return (
    <div className="flex w-fit flex-row">
      <Column
        tiles={rightColumnTiles}
        // isRightColumn
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
        <h1 className="font-titan my-4 -rotate-45 text-5xl font-bold text-white uppercase">
          Monopoly <span className="text-red-400">IHC</span>
        </h1>
        <Row tiles={bottomRowTiles} players={players} boardTiles={boardTiles} />
      </div>
      <Column
        tiles={leftColumnTiles}
        isRightColumn
        players={players}
        boardTiles={boardTiles}
      />

      {/* <Row
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

      <Row tiles={bottomRowTiles} players={players} boardTiles={boardTiles} /> */}
    </div>
  );
}
