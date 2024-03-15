import { Rol } from "../data";

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
            icon = "SafeLaneIcon.svg";
            break;
          case Rol.MidLane:
            icon = "MidLaneIcon.svg";
            break;
          case Rol.OffLane:
            icon = "OffLaneIcon.svg";
            break;
          case Rol.SoftSupport:
            icon = "SoftSupportIcon.svg";
            break;
          case Rol.HardSupport:
            icon = "HardSupportIcon.svg";
            break;
          default:
            break;
        }
        return (
          <img
            key={`${player.id}-${rol}`}
            className={className}
            title={rol}
            src={`/src/assets/icons/${icon}`}
          />
        );
      })}
    </div>
  );
};
