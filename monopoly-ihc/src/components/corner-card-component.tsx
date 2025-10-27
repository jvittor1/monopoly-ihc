import { GiCoffeeCup, GiPoliceOfficerHead, GiPrisoner } from "react-icons/gi";
import type { CornerTile } from "../interfaces/corner-tile";
import BaseCardComponent from "./base-card-component";
import { GoHome } from "react-icons/go";

const getIconByCornerType = (cornerType: CornerTile["type"]) => {
  switch (cornerType) {
    case "start":
      return <GoHome className="rotate-45 text-5xl text-white" />;
    case "jail":
      return <GiPrisoner className="rotate-45 text-5xl text-white" />;
    case "free":
      return <GiCoffeeCup className="rotate-45 text-5xl text-white" />;
    case "go-to-jail":
      return <GiPoliceOfficerHead className="rotate-45 text-5xl text-white" />;
    default:
      return null;
  }
};

interface CornerCardProps extends CornerTile {
  className?: string;
}

export default function CornerCardComponent({
  text,
  type,
  points,
  className,
}: CornerCardProps) {
  const getDegreeByCornerType = (type: CornerTile["type"]) => {
    switch (type) {
      case "start":
        return "rotate-0";
      case "jail":
        return "rotate-[90deg]";
      case "free":
        return "rotate-[180deg]";
      case "go-to-jail":
        return "rotate-[270deg]";
      default:
        return "rotate-0";
    }
  };
  // console.log(type);
  // console.log(getDegreeByCornerType(type));

  return (
    <BaseCardComponent
      className={`relative flex h-[115px] ${getDegreeByCornerType(type)} w-[115px] flex-col items-end ${className}`}
    >
      <div className="flex h-5/6 w-5/6 items-center justify-center border-b-2 border-l-2 border-white">
        {getIconByCornerType(type)}
      </div>

      {/* lateral text */}
      <span className="text-sxs absolute top-9/12 left-1 origin-top-left translate-y-1/2 -rotate-90 font-medium text-white uppercase">
        {text}
      </span>

      {/* bottom text */}
      <span className="text-sxs absolute bottom-1 left-1/2 w-full -translate-x-1/2 text-center font-medium text-white uppercase">
        {text}
      </span>
    </BaseCardComponent>
  );
}
