import { GiCoffeeCup, GiPoliceOfficerHead, GiPrisoner } from "react-icons/gi";
import type { CornerTile } from "../interfaces/corner-tile";
import BaseCardComponent from "./base-card-component";
import { GoHome } from "react-icons/go";

const getIconByCornerType = (cornerType: CornerTile["cornerType"]) => {
  switch (cornerType) {
    case "start":
      return <GoHome className="rotate-45 text-8xl text-white" />;
    case "jail":
      return <GiPrisoner className="rotate-45 text-8xl text-white" />;
    case "free":
      return <GiCoffeeCup className="rotate-45 text-8xl text-white" />;
    case "go-to-jail":
      return <GiPoliceOfficerHead className="rotate-45 text-8xl text-white" />;
    default:
      return null;
  }
};

interface CornerCardProps extends CornerTile {
  className?: string;
}

export default function CornerCardComponent({
  text,
  cornerType,
  points,
  className,
}: CornerCardProps) {
  return (
    <BaseCardComponent
      className={`relative flex h-[215px] w-[215px] flex-col items-end ${className}`}
    >
      <div className="flex h-5/6 w-5/6 items-center justify-center border-2 border-white">
        {getIconByCornerType(cornerType)}
      </div>

      {/* lateral text */}
      <span className="absolute top-2/3 left-2 origin-top-left translate-y-1/2 -rotate-90 text-xs font-medium text-white uppercase">
        {text}
      </span>

      {/* bottom text */}
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium text-white uppercase">
        {text}
      </span>
    </BaseCardComponent>
  );
}
