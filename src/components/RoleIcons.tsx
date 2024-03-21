import { Rol } from "../data";
import SafeLaneIcon from "../assets/icons/SafeLaneIcon.svg";
import MidLaneIcon from "../assets/icons/MidLaneIcon.svg";
import OffLaneIcon from "../assets/icons/OffLaneIcon.svg";
import SoftSupportIcon from "../assets/icons/SoftSupportIcon.svg";
import HardSupportIcon from "../assets/icons/HardSupportIcon.svg";

interface RoleIconsProps {
  player: Player;
  className: string;
}

export const RoleIcons = ({ player, className }: RoleIconsProps) => {
  return (
    <div className="gap-3 flex justify-center">
      {player.roles?.map((rol) => {
        let icon;
        switch (rol) {
          case Rol.SafeLane:
            icon = SafeLaneIcon;
            break;
          case Rol.MidLane:
            icon = MidLaneIcon;
            break;
          case Rol.OffLane:
            icon = OffLaneIcon;
            break;
          case Rol.SoftSupport:
            icon = SoftSupportIcon;
            break;
          case Rol.HardSupport:
            icon = HardSupportIcon;
            break;
          default:
            break;
        }
        return (
          <img
            key={`${player.id}-${rol}`}
            className={className}
            title={rol}
            src={icon}
          />
        );
      })}
    </div>
  );
};
